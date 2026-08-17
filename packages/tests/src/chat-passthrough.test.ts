import { describe, expect, test } from "vitest";
import {
  isChatCompletionsPath,
  isPassthroughPath,
  readUsage,
  usageFromSseChunk,
} from "../../cli/src/lib/daemon/chat-passthrough.js";
import { METER_ENV, meteringEnabled } from "../../cli/src/lib/metered-spawn.js";

describe("passthrough routing", () => {
  test("chat completions is recognized prefixed and un-prefixed", () => {
    expect(isChatCompletionsPath("/v1/chat/completions")).toBe(true);
    expect(isChatCompletionsPath("/chat/completions")).toBe(true);
    expect(isChatCompletionsPath("/v1/responses")).toBe(false);
  });

  // A spawned harness lists models before its first turn; without this the
  // model picker is empty and the harness cannot start.
  test("model listing is part of the passthrough", () => {
    expect(isPassthroughPath("/v1/models")).toBe(true);
    expect(isPassthroughPath("/models")).toBe(true);
  });

  test("unrelated paths are not passthrough", () => {
    expect(isPassthroughPath("/v1/messages")).toBe(false);
    expect(isPassthroughPath("/healthz")).toBe(false);
  });
});

describe("usage extraction", () => {
  test("reads prompt, cached, and completion tokens", () => {
    const usage = readUsage({
      usage: {
        prompt_tokens: 1_200,
        completion_tokens: 300,
        prompt_tokens_details: { cached_tokens: 900 },
      },
    });
    expect(usage).toEqual({ promptTokens: 1_200, cachedTokens: 900, completionTokens: 300 });
  });

  test("a response with no cached detail still meters", () => {
    expect(readUsage({ usage: { prompt_tokens: 10, completion_tokens: 5 } })).toEqual({
      promptTokens: 10,
      cachedTokens: 0,
      completionTokens: 5,
    });
  });

  // Mid-stream deltas carry no usage; treating them as a zero-token turn would
  // reset nothing but would waste an addUsage call per chunk.
  test("absent or empty usage yields undefined", () => {
    expect(readUsage({})).toBeUndefined();
    expect(readUsage({ usage: {} })).toBeUndefined();
    expect(readUsage(null)).toBeUndefined();
  });
});

describe("streamed usage extraction", () => {
  test("finds the terminal usage frame", () => {
    const sse = [
      'data: {"choices":[{"delta":{"content":"hi"}}]}',
      'data: {"choices":[],"usage":{"prompt_tokens":50,"completion_tokens":7,' +
        '"prompt_tokens_details":{"cached_tokens":20}}}',
      "data: [DONE]",
      "",
    ].join("\n\n");
    expect(usageFromSseChunk(sse)).toEqual({
      promptTokens: 50,
      cachedTokens: 20,
      completionTokens: 7,
    });
  });

  // Chunk boundaries split frames mid-JSON all the time; a partial must not
  // throw and take the stream down with it.
  test("a truncated frame is skipped, not fatal", () => {
    expect(() => usageFromSseChunk('data: {"choices":[{"delta"')).not.toThrow();
    expect(usageFromSseChunk('data: {"choices":[{"delta"')).toBeUndefined();
  });

  test("content-only chunks report nothing", () => {
    expect(usageFromSseChunk('data: {"choices":[{"delta":{"content":"x"}}]}')).toBeUndefined();
  });
});

describe("metering opt-in", () => {
  // Metering redirects every request from these harnesses through the daemon.
  // That must be a choice, not something that happens on upgrade.
  test("off unless explicitly enabled", () => {
    expect(meteringEnabled({})).toBe(false);
    expect(meteringEnabled({ [METER_ENV]: "0" })).toBe(false);
  });

  test("accepts the usual truthy spellings", () => {
    for (const value of ["1", "true", "yes"]) {
      expect(meteringEnabled({ [METER_ENV]: value })).toBe(true);
    }
  });
});
