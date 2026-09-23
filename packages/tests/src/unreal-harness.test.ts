import { describe, expect, test } from "vitest";
import { ALL_HARNESSES, HARNESS, HARNESS_BIN } from "../../cli/src/lib/harness.js";
import { isHarnessImplemented } from "../../cli/src/lib/harness-registry.js";
import { isProxiedAgent, speaksResponsesApi } from "../../cli/src/lib/daemon/state.js";
import {
  buildUnrealEnv,
  needsTaskPrompt,
  UNREAL_BIN,
  UNREAL_ENV,
} from "../../cli/src/lib/unreal/core.js";

describe("unreal agent harness", () => {
  test("is registered as a proxied, Responses-speaking harness", () => {
    expect(ALL_HARNESSES).toContain(HARNESS.UNREAL);
    expect(isHarnessImplemented(HARNESS.UNREAL)).toBe(true);
    expect(HARNESS_BIN[HARNESS.UNREAL]).toBe(UNREAL_BIN);
    expect(isProxiedAgent("unreal")).toBe(true);
    expect(speaksResponsesApi("unreal")).toBe(true);
    expect(speaksResponsesApi("claude")).toBe(false);
    expect(speaksResponsesApi(undefined)).toBe(false);
  });

  test("points the runner's openai provider at the session route with the daemon token", () => {
    const env = buildUnrealEnv(
      { PATH: "/usr/bin", NEBIUS_API_KEY: "real-key", UNREAL_HARNESS_LLM_PROVIDER: "ollama" },
      {
        proxyUrl: "http://127.0.0.1:7878/session/tok",
        authToken: "session-token",
        modelId: "zai-org/GLM-5.3-Flash",
      },
    );
    expect(env[UNREAL_ENV.provider]).toBe("openai");
    expect(env[UNREAL_ENV.baseUrl]).toBe("http://127.0.0.1:7878/session/tok/v1");
    expect(env[UNREAL_ENV.apiKey]).toBe("session-token");
    expect(env[UNREAL_ENV.model]).toBe("zai-org/GLM-5.3-Flash");
    expect(env.PATH).toBe("/usr/bin");
    // The daemon holds the Nebius key; the runner never sees it.
    expect(env.NEBIUS_API_KEY).toBeUndefined();
  });

  test("asks for a task only when launched interactively with nothing to run", () => {
    expect(needsTaskPrompt([], true)).toBe(true);
    expect(needsTaskPrompt([], false)).toBe(false); // piped JSON request
    expect(needsTaskPrompt(["-p", "do it"], true)).toBe(false);
    expect(needsTaskPrompt(['{"prompt":"x"}'], true)).toBe(false);
  });
});
