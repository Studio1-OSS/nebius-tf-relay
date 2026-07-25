import { resolveClaudeModel } from "../claude/defaults.js";
import { HARNESS } from "../harness.js";
import { defineHarness } from "../harness-types.js";
import { resolveNebiusApiKey, resolveNebiusBaseUrl } from "../nebius-core.js";
import { runClaudeNebius } from "../claude/core.js";

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

    const selectedModel = resolveClaudeModel(ctx.main);
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
