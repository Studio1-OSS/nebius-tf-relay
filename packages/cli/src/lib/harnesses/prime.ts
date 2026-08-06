import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { NEBIUS_BASE_URL } from "@nebiusrelay/models";
import { getCodexSupportedModels, resolveCodexModel } from "../codex/defaults.js";
import { HARNESS } from "../harness.js";
import { defineHarness, type HarnessContext, type HarnessResult } from "../harness-types.js";
import { resolveNebiusApiKey } from "../nebius-core.js";
import { nebiusrelayHome } from "../paths.js";

/**
 * Prime Agent (PrimeIntellect) - a spawned harness, like OpenCode and Pi.
 *
 * Prime Agent already speaks OpenAI chat-completions, which is Nebius's native
 * wire format, so it needs no translation proxy: we declare Nebius as a custom
 * provider in its `models.json` and point it straight at Token Factory. (The
 * relay daemon only serves /v1/messages and /v1/responses, so proxied routing
 * would not apply here anyway.)
 *
 * Config dir: unlike Pi, Prime Agent is daemon-backed and bootstraps state
 * (auth, sessions, logs, an IPython runtime) inside its config directory - a
 * throwaway temp dir per launch would re-run that bootstrap every time and
 * stall the first turn. So we keep ONE persistent relay-owned directory under
 * ~/.nebiusrelay/prime-agent and write our provider config there. The user's
 * own ~/.prime/agent stays completely untouched.
 */

const PRIME_PROVIDER_ID = "nebius";
const PRIME_BIN = "prime-agent";

/** Relay-owned Prime Agent config dir (never the user's ~/.prime/agent). */
function primeAgentDir(): string {
  return join(nebiusrelayHome(), "prime-agent");
}

const VALUE_FLAGS = new Set(["--api-key", "--provider", "--model", "--models"]);

function primeArgsWithoutNebiusrelayOverrides(args: string[]): string[] {
  const sanitized: string[] = [];
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === undefined) {
      continue;
    }
    if (VALUE_FLAGS.has(arg)) {
      i += 1;
      continue;
    }
    if (
      arg.startsWith("--api-key=") ||
      arg.startsWith("--provider=") ||
      arg.startsWith("--model=") ||
      arg.startsWith("--models=")
    ) {
      continue;
    }
    sanitized.push(arg);
  }
  return sanitized;
}

/** Nebius as a custom `openai-completions` provider in Prime Agent's models.json. */
export function primeModelsJson(apiKey: string): string {
  const models = getCodexSupportedModels().map(({ definition }) => ({
    id: definition.id,
    name: definition.name,
    reasoning: definition.reasoning,
    input: definition.modalities.input,
    contextWindow: definition.limit.context,
    maxTokens: definition.limit.output,
    cost: {
      input: definition.cost.input,
      output: definition.cost.output,
      cacheRead: definition.cost.cache_read ?? 0,
      cacheWrite: 0,
    },
  }));

  return `${JSON.stringify(
    {
      providers: {
        [PRIME_PROVIDER_ID]: {
          baseUrl: NEBIUS_BASE_URL,
          api: "openai-completions",
          apiKey,
          // Nebius runs on vLLM, which does not understand the OpenAI
          // "developer" role; send the system prompt as a system message.
          compat: { supportsDeveloperRole: false },
          models,
        },
      },
    },
    null,
    2,
  )}\n`;
}

export default defineHarness({
  id: HARNESS.PRIME,
  label: "Prime Agent",

  async run(ctx: HarnessContext): Promise<HarnessResult> {
    const apiKey = await resolveNebiusApiKey({
      apiKey: ctx.apiKey,
      home: ctx.home,
    });
    if (!apiKey) {
      throw new Error("No Nebius API key found. Pass --api-key or set NEBIUS_API_KEY.");
    }

    const agentDir = primeAgentDir();
    mkdirSync(agentDir, { recursive: true, mode: 0o700 });
    writeFileSync(join(agentDir, "models.json"), primeModelsJson(apiKey), {
      encoding: "utf8",
      mode: 0o600,
    });

    const selectedModel = resolveCodexModel(ctx.main);
    const args = [
      "--provider",
      PRIME_PROVIDER_ID,
      "--model",
      selectedModel.id,
      ...primeArgsWithoutNebiusrelayOverrides(ctx.passthrough ?? []),
    ];

    if (process.env.NEBIUSRELAY_DEBUG === "1") {
      process.stderr.write(`[nebiusrelay prime] provider: ${PRIME_PROVIDER_ID}\n`);
      process.stderr.write(`[nebiusrelay prime] model: ${selectedModel.id}\n`);
      process.stderr.write(`[nebiusrelay prime] config dir: ${agentDir}\n`);
    }

    process.stderr.write(
      `Nebius TF Relay ▸ Launching Prime Agent with Nebius Token Factory (${selectedModel.definition.name}).\n`,
    );
    const child = spawn(PRIME_BIN, args, {
      env: {
        ...process.env,
        PRIME_AGENT_CODING_AGENT_DIR: agentDir,
        NEBIUS_API_KEY: apiKey,
      },
      stdio: "inherit",
    });

    const result = await new Promise<{ status: number | null; signal: NodeJS.Signals | null }>(
      (resolve) => {
        child.on("error", (err) => {
          process.stderr.write(
            `Nebius TF Relay ▸ Failed to launch ${PRIME_BIN}: ${err.message}.\n`,
          );
          resolve({ status: 1, signal: null });
        });
        child.on("exit", (status, signal) => resolve({ status, signal }));
      },
    );

    if (typeof result.status === "number") {
      process.exitCode = result.status;
    }
    return {};
  },
});
