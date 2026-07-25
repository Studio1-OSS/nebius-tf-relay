import { resolveCodexModel } from "../codex/defaults.js";
import { runCodexNebius } from "../codex/core.js";
import { HARNESS } from "../harness.js";
import { defineHarness, type HarnessContext, type HarnessResult } from "../harness-types.js";
import { resolveNebiusApiKey, resolveNebiusBaseUrl } from "../nebius-core.js";

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

    const selectedModel = resolveCodexModel(ctx.main);
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
