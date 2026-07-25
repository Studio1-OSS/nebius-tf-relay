import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, test, vi } from "vitest";

import { runConfigure } from "../../cli/src/lib/commands/global.js";
import { readGlobalConfig, resolveStoredTavilyApiKey } from "../../cli/src/lib/global-config.js";

const temporaryHomes: string[] = [];

afterEach(async () => {
  vi.unstubAllEnvs();
  await Promise.all(
    temporaryHomes.splice(0).map((home) => rm(home, { recursive: true, force: true })),
  );
});

describe("nebiusrelay configure", () => {
  test("persists an Exa key across a cold start even when configure reads it from the environment", async () => {
    const home = await mkdtemp(path.join(os.tmpdir(), "nebiusrelay-configure-"));
    temporaryHomes.push(home);
    vi.stubEnv("NEBIUS_API_KEY", "nebius-test-key");
    vi.stubEnv("TAVILY_API_KEY", "exa-test-key");

    await runConfigure(home);

    vi.stubEnv("TAVILY_API_KEY", "");
    const stored = (await readGlobalConfig(home)).tavilyApiKey;

    expect(stored).toBe("exa-test-key");
    expect(resolveStoredTavilyApiKey(stored)).toBe("exa-test-key");
  });
});
