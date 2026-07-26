import { resolveCodexModel } from "../codex/defaults.js";
import { runCodexNebius } from "../codex/core.js";
import { HARNESS } from "../harness.js";
import { defineHarness, type HarnessContext, type HarnessResult } from "../harness-types.js";
import { resolveNebiusApiKey, resolveNebiusBaseUrl } from "../nebius-core.js";
import { readAgentModelPreference, recordAgentModel } from "../model-preferences.js";

/** Resolve a Codex model, falling back to the default if the id is invalid. */
function resolveCodexModelSafe(value: string | undefined) {
  try {
    return resolveCodexModel(value);
  } catch {
    return resolveCodexModel(undefined);
  }
}

export default defineHarness({
  id: HARNESS.CODEX,
  label: "Codex",

  async run(ctx: HarnessContext): Promise<HarnessResult> {
    const apiKey = await resolveNebiusApiKey({
      apiKey: ctx.apiKey,
      home: ctx.home,
    });
    if (!apiKey) {
      throw new Error("No Nebius API key found. Pass --api-key or set NEBIUS_API_KEY.");
    }

    // Model precedence: explicit --model wins and is remembered; otherwise fall
    // back to the last model used (persisted by the daemon on /model changes),
    // then the catalog default. A stale/invalid stored id safely falls back.
    const requested = ctx.main ?? (await readAgentModelPreference("codex"));
    const selectedModel = resolveCodexModelSafe(requested);
    if (ctx.main) {
      await recordAgentModel("codex", selectedModel.id);
    }
    const result = await runCodexNebius({
      apiKey,
      baseUrl: resolveNebiusBaseUrl(),
      home: ctx.home,
      modelId: selectedModel.id,
      ...(ctx.passthrough ? { args: ctx.passthrough } : {}),
    });
    if (typeof result.status === "number") {
      process.exitCode = result.status;
    }
    return {};
  },
});
