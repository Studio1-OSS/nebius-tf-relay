import { describe, expect, test } from "vitest";
import {
  DEFAULT_REASONING_HISTORY_MODE,
  REASONING_HISTORY_ENV,
  currentReasoningHistoryPolicy,
  reasoningHistoryPolicy,
  resolveReasoningHistoryMode,
} from "../../cli/src/lib/reasoning-history.js";
import { toOpenAIMessages } from "../../cli/src/lib/claude/translate-request.js";
import type { AnthropicMessagesRequest } from "../../cli/src/lib/claude/wire-types.js";

const env = (mode: string) => ({ [REASONING_HISTORY_ENV]: mode });

describe("reasoning history mode", () => {
  // Upgrading must not silently change what any turn costs.
  test("defaults to full, preserving previous behavior", () => {
    expect(resolveReasoningHistoryMode({})).toBe("full");
    expect(DEFAULT_REASONING_HISTORY_MODE).toBe("full");
    expect(currentReasoningHistoryPolicy({})).toEqual({
      includeHistoricalReasoning: true,
      clearThinking: false,
    });
  });

  test("each mode maps to its documented policy", () => {
    expect(currentReasoningHistoryPolicy(env("full"))).toEqual({
      includeHistoricalReasoning: true,
      clearThinking: false,
    });
    expect(currentReasoningHistoryPolicy(env("interleaved"))).toEqual({
      includeHistoricalReasoning: true,
      clearThinking: true,
    });
    expect(currentReasoningHistoryPolicy(env("off"))).toEqual({
      includeHistoricalReasoning: false,
      clearThinking: true,
    });
  });

  test("case and whitespace are tolerated", () => {
    expect(resolveReasoningHistoryMode(env("  OFF  "))).toBe("off");
  });

  // A typo would quietly change spend on every turn, so fail loudly instead.
  test("an unrecognized value throws rather than falling back", () => {
    expect(() => resolveReasoningHistoryMode(env("ful"))).toThrow(/must be one of/);
    expect(() => resolveReasoningHistoryMode(env("none"))).toThrow(REASONING_HISTORY_ENV);
  });

  // The no-argument form returns the DEFAULT, not the environment's mode -
  // easy to reach for by mistake, and it would disable the feature silently.
  test("the explicit-mode form ignores the environment by design", () => {
    expect(reasoningHistoryPolicy("off").includeHistoricalReasoning).toBe(false);
    expect(reasoningHistoryPolicy().includeHistoricalReasoning).toBe(true);
  });
});

describe("what Claude actually sends", () => {
  const body = {
    model: "x",
    messages: [
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "PRIOR-REASONING" },
          { type: "text", text: "answer" },
        ],
      },
      { role: "user", content: "next" },
    ],
  } as unknown as AnthropicMessagesRequest;

  const replays = (mode?: Parameters<typeof toOpenAIMessages>[2]): boolean =>
    JSON.stringify(toOpenAIMessages(body, undefined, mode)).includes("PRIOR-REASONING");

  test("full and interleaved replay prior reasoning; off drops it", () => {
    expect(replays("full")).toBe(true);
    expect(replays("interleaved")).toBe(true);
    expect(replays("off")).toBe(false);
  });

  test("the current turn's own content always survives", () => {
    const sent = JSON.stringify(toOpenAIMessages(body, undefined, "off"));
    expect(sent).toContain("answer");
    expect(sent).toContain("next");
  });
});
