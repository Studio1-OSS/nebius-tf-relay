import { describe, expect, test } from "vitest";
import {
  parseNebiusContextLengthInputTokens,
  parseNebiusContextLengthMaxTokens,
} from "../../cli/src/lib/context-fit.js";

/**
 * The reactive context-fit retry only fires if it can read the ceiling and the
 * input size out of the upstream 400. Nebius phrases it with "of" rather than
 * "is", which no pattern matched - so a real overflow reached the user as a
 * hard 500 instead of self-healing, and the live gauntlet's context test failed
 * with "daemon did not log context-fit retry".
 *
 * Message below is copied verbatim from a failing run.
 */
const NEBIUS =
  "Requested token count exceeds the model's maximum context length of 1048576 tokens. " +
  "You requested a total of 1124213 tokens: 993141 tokens from the input messages and " +
  "131072 tokens for the completion. Please reduce the number of tokens in the input " +
  "messages or the completion to fit within the limit.";

describe("Nebius context-length error", () => {
  test("the ceiling is parsed from the 'of N tokens' phrasing", () => {
    expect(parseNebiusContextLengthMaxTokens(NEBIUS)).toBe(1_048_576);
  });

  test("the input size is parsed from 'N tokens from the input messages'", () => {
    expect(parseNebiusContextLengthInputTokens(NEBIUS)).toBe(993_141);
  });

  // Do not regress the phrasings that already worked.
  test("vLLM phrasing still parses", () => {
    const vllm =
      "This model's maximum context length is 262144 tokens. However, you requested " +
      "270000 tokens (250000 in the messages, 20000 in the completion).";
    expect(parseNebiusContextLengthMaxTokens(vllm)).toBe(262_144);
    expect(parseNebiusContextLengthInputTokens(vllm)).toBe(250_000);
  });

  test("Kimi/Moonshot parenthetical phrasing still parses", () => {
    const kimi = "maximum context length (262144) exceeded; input token count (271234) exceeds it";
    expect(parseNebiusContextLengthMaxTokens(kimi)).toBe(262_144);
    expect(parseNebiusContextLengthInputTokens(kimi)).toBe(271_234);
  });

  test("an unrelated error yields nothing rather than a wrong number", () => {
    const other = "Rate limit exceeded. Please retry in 30 seconds.";
    expect(parseNebiusContextLengthMaxTokens(other)).toBeUndefined();
    expect(parseNebiusContextLengthInputTokens(other)).toBeUndefined();
  });
});
