import os from "node:os";
import * as clack from "@clack/prompts";
import { ALL_HARNESSES, HARNESS_LABEL, type HarnessId } from "../harness.js";
import { isHarnessImplemented } from "../harness-registry.js";
import { detectInstalledHarnesses } from "../detect.js";
import {
  readGlobalConfig,
  setGlobalApiKey,
  resolveStoredApiKey,
  resolveStoredTavilyApiKey,
  setGlobalTavilyApiKey,
} from "../global-config.js";
import { VERSION } from "../version.js";

export function printHelp() {
  console.log(`nebiusrelay v${VERSION} - Nebius Token Factory for coding CLIs

Usage:
  nebiusrelay configure
  nebiusrelay whoami
  nebiusrelay chatgpt [--model <model>] [--restore]  (alpha)
  nebiusrelay codex [...]       (alias: ncodex)
  nebiusrelay claude [...]      (alias: nclaude)
  nebiusrelay pi [...]          (alias: npi)
  nebiusrelay opencode [...]    (alias: nopencode)

Extra args after codex/claude/pi/opencode are passed through.
ChatGPT App support is alpha; run \`nebiusrelay chatgpt --restore\` (alias: codex-app) to restore the previous desktop config.

Docs: https://nebius-tf-relay.vercel.app/llms.txt
  LLM-readable documentation - if you are an AI agent asked to install, configure,
  or use nebiusrelay (including headless use), read that file first.
`);
}

export async function runConfigure(home = os.homedir()): Promise<boolean> {
  clack.intro("nebiusrelay configure");

  const detected = detectInstalledHarnesses();
  const notImplemented = ALL_HARNESSES.filter((h) => !isHarnessImplemented(h));

  const lines = ALL_HARNESSES.map((h) => {
    const found = detected[h].installed ? "found" : "not found";
    const support = isHarnessImplemented(h) ? " (ephemeral settings)" : " (support coming later)";
    return `  ${HARNESS_LABEL[h]}: ${found}${support}`;
  });
  clack.log.info(`Detected tools:\n${lines.join("\n")}`);

  const existing = resolveStoredApiKey((await readGlobalConfig(home)).apiKey);
  let apiKey = existing || process.env.NEBIUS_API_KEY || "";
  if (!apiKey) {
    const entered = await clack.password({
      message: "Nebius API key (from https://tokenfactory.nebius.com/?modals=create-api-key):",
      validate: (value) => (value.trim() ? undefined : "An API key is required"),
    });
    if (clack.isCancel(entered)) {
      clack.cancel("Cancelled.");
      return false;
    }
    apiKey = entered.trim();
  }
  await setGlobalApiKey(home, apiKey);

  // Tavily powers the proxy's native web_search emulation for Claude Code and
  // Codex. It's optional - without it, searches return a clear "TAVILY_API_KEY
  // not set" error rather than failing silently - so allow skipping.
  const existingTavily = resolveStoredTavilyApiKey((await readGlobalConfig(home)).tavilyApiKey);
  let tavilyApiKey = existingTavily || process.env.TAVILY_API_KEY || "";
  if (!tavilyApiKey) {
    const enteredTavily = await clack.password({
      message:
        "Tavily API key for web search (from https://app.tavily.com - press Enter to skip; web search will be disabled):",
      validate: (value) => (value.trim() || value === "" ? undefined : undefined),
    });
    if (clack.isCancel(enteredTavily)) {
      clack.cancel("Cancelled.");
      return false;
    }
    tavilyApiKey = enteredTavily.trim();
  }
  // `configure` is the explicit persistent-credential flow. Store the resolved
  // Tavily key just like the Nebius key above so it survives a cold start even
  // when the current shell's TAVILY_API_KEY does not. (This fixes the papercut
  // where a daemon started before configure kept failing web search.)
  await setGlobalTavilyApiKey(home, tavilyApiKey);
  if (tavilyApiKey) {
    clack.log.success("Tavily web search enabled.");
  } else {
    clack.log.info("Tavily key skipped - web search will be unavailable in your agents.");
  }

  const launchable = ALL_HARNESSES.filter(
    (h) => isHarnessImplemented(h) && detected[h as HarnessId].installed,
  );
  if (launchable.length > 0) {
    clack.log.info(
      `Ready to launch: ${launchable
        .map((h) => HARNESS_LABEL[h])
        .join(", ")}. Run \`nebiusrelay <harness>\` to start - nothing is written to disk.`,
    );
  }

  if (notImplemented.length > 0) {
    clack.log.info(
      `${notImplemented.map((h) => HARNESS_LABEL[h]).join(" and ")} support is coming in a later phase (needs a local translation proxy).`,
    );
  }

  clack.outro("Done.");
  return true;
}
