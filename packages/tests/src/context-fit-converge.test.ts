import { describe, expect, test } from "vitest";
import {
  applyContextFit,
  newContextFitState,
  CONTEXT_FIT_MAX_ATTEMPTS,
} from "../../cli/src/lib/context-fit.js";
import { GLM_5_2 } from "../../models/src/index.js";

/**
 * Nebius advertises 1,024,000 context for GLM 5.3 Flash while the serving
 * backend enforces 262,144. With a fixed safety margin the retry ladder landed
 * exactly one token over the limit and stayed there - observed live as
 * 131,072 out + 131,073 in = 262,145, then 54,923 + 207,222 = 262,145 again.
 * It burned every attempt on the same near-miss and surfaced a 500.
 *
 * The margin now grows per attempt, so each retry asks for strictly less.
 */
const CEILING = 262_144;

function overflowError(inputTokens: number, outputTokens: number): string {
  const total = inputTokens + outputTokens;
  return JSON.stringify({
    error: {
      message:
        `This model's maximum context length is ${CEILING} tokens. However, you ` +
        `requested ${outputTokens} output tokens and your prompt contains at least ` +
        `${inputTokens} input tokens, for a total of at least ${total} tokens.`,
    },
  });
}

describe("context-fit convergence", () => {
  test("each successive attempt asks for strictly less output", () => {
    const payload: Record<string, unknown> = {
      max_tokens: 131_072,
      messages: [{ role: "user", content: "x".repeat(400_000) }],
    };
    const state = newContextFitState(payload);

    // Same near-miss reported every time: the ladder must still shrink.
    const asked: number[] = [];
    for (let i = 0; i < 3; i += 1) {
      const outcome = applyContextFit(payload, overflowError(131_073, 131_072), GLM_5_2, state);
      expect(outcome.mutated).toBe(true);
      asked.push(payload.max_tokens as number);
    }

    // Strictly decreasing, and by a widening step - Nebius reports lower
    // bounds, so a linear margin can lose the race against an unknown error.
    expect(asked[1]!).toBeLessThan(asked[0]!);
    expect(asked[2]!).toBeLessThan(asked[1]!);
    expect(asked[0]! - asked[1]!).toBeLessThan(asked[1]! - asked[2]!);
  });

  test("the clamped request actually fits inside the reported ceiling", () => {
    const payload: Record<string, unknown> = {
      max_tokens: 131_072,
      messages: [{ role: "user", content: "x".repeat(400_000) }],
    };
    const state = newContextFitState(payload);
    const inputTokens = 131_073;

    applyContextFit(payload, overflowError(inputTokens, 131_072), GLM_5_2, state);
    const clamped = payload.max_tokens as number;

    // The whole point: input + requested output must land under the limit.
    expect(inputTokens + clamped).toBeLessThan(CEILING);
  });

  test("the margin cannot starve output within the attempt budget", () => {
    const payload: Record<string, unknown> = {
      max_tokens: 131_072,
      messages: [{ role: "user", content: "x".repeat(400_000) }],
    };
    const state = newContextFitState(payload);
    for (let i = 0; i < CONTEXT_FIT_MAX_ATTEMPTS; i += 1) {
      applyContextFit(payload, overflowError(131_073, 131_072), GLM_5_2, state);
    }
    expect(payload.max_tokens as number).toBeGreaterThan(0);
  });
});
