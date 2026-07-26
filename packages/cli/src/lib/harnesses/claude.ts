import { resolveClaudeModel } from "../claude/defaults.js";
import { HARNESS } from "../harness.js";
import { defineHarness } from "../harness-types.js";
import { resolveNebiusApiKey, resolveNebiusBaseUrl } from "../nebius-core.js";
import { runClaudeNebius } from "../claude/core.js";
import { readAgentModelPreference, recordAgentModel } from "../model-preferences.js";

/** Resolve a Claude model, falling back to the default if the value is invalid. */
function resolveClaudeModelSafe(value: string | undefined) {
  try {
    return resolveClaudeModel(value);
  } catch {
    return resolveClaudeModel(undefined);
  }
}

export default defineHarness({
  id: HARNESS.CLAUDE,
  label: "Claude Code",

  async run(ctx) {
    const apiKey = await resolveNebiusApiKey({
      apiKey: ctx.apiKey,
      home: ctx.home,
    });
    if (!apiKey) {
      throw new Error("No Nebius API key found. Pass --api-key or set NEBIUS_API_KEY.");
    }

    // Model precedence: explicit --model/--main wins and is remembered;
    // otherwise the last model used (persisted by the daemon on /model changes),
    // then the default. A stale/invalid stored id safely falls back.
    const requested = ctx.main ?? (await readAgentModelPreference("claude"));
    const selectedModel = resolveClaudeModelSafe(requested);
    if (ctx.main) {
      await recordAgentModel("claude", selectedModel.definition.id);
    }
    const launchOptions = {
      apiKey,
      baseUrl: resolveNebiusBaseUrl(),
      modelId: selectedModel.alias,
      ...(ctx.passthrough ? { args: ctx.passthrough } : {}),
    };
    const result = await runClaudeNebius(launchOptions);
    if (typeof result.status === "number") {
      process.exitCode = result.status;
    }
    return {};
  },
});
