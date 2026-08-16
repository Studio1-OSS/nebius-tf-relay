import { spawn } from "node:child_process";
import { resolveCodexModel } from "../codex/defaults.js";
import {
  buildDeepseekLaunchSpec,
  resolveDeepseekPatchPath,
  writeDeepseekPatch,
} from "../deepseek/core.js";
import { HARNESS } from "../harness.js";
import { defineHarness, type HarnessContext, type HarnessResult } from "../harness-types.js";
import { resolveNebiusApiKey, resolveNebiusBaseUrl } from "../nebius-core.js";

export default defineHarness({
  id: HARNESS.DEEPSEEK,
  label: "DeepSeek Harness (alpha)",

  async run(ctx: HarnessContext): Promise<HarnessResult> {
    const apiKey = await resolveNebiusApiKey({ apiKey: ctx.apiKey, home: ctx.home });
    if (!apiKey) {
      throw new Error("No Nebius API key found. Pass --api-key or set NEBIUS_API_KEY.");
    }

    const selectedModel = resolveCodexModel(ctx.main);
    const baseUrl = resolveNebiusBaseUrl();
    const nativeDeepseekApiKey = process.env.DEEPSEEK_API_KEY;
    const patchPath = resolveDeepseekPatchPath(selectedModel, baseUrl, process.env);
    await writeDeepseekPatch(patchPath, selectedModel, baseUrl, nativeDeepseekApiKey);
    const launch = buildDeepseekLaunchSpec({
      apiKey,
      baseUrl,
      patchPath,
      passthrough: ctx.passthrough ?? [],
    });

    if (process.env.NEBIUSRELAY_DEBUG === "1") {
      process.stderr.write(`[nebiusrelay deepseek] model: ${selectedModel.id}\n`);
      process.stderr.write(`[nebiusrelay deepseek] patch: ${patchPath}\n`);
    }

    process.stderr.write(
      `Nebius TF Relay ▸ Launching DeepSeek Harness with Nebius Token Factory (${selectedModel.definition.name}). Alpha.\n`,
    );
    const child = spawn(launch.binary, launch.args, { env: launch.env, stdio: "inherit" });
    const result = await new Promise<{ status: number | null }>((resolve) => {
      child.on("error", (err) => {
        process.stderr.write(
          `Nebius TF Relay ▸ Failed to launch ${launch.binary}: ${err.message}.\n`,
        );
        resolve({ status: 1 });
      });
      child.on("exit", (status) => resolve({ status }));
    });

    if (typeof result.status === "number") {
      process.exitCode = result.status;
    }
    return {};
  },
});
