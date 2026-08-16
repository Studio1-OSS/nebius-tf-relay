import { describe, expect, test } from "vitest";
import { GLM_5_2 } from "../../models/src/index.js";
import {
  COMPACTION_SUMMARY_PREFIX,
  compactionResponse,
  compactionSummary,
  decodeCompactionSummary,
  encodeCompactionSummary,
  isCodexCompactionRequest,
  normalizeCompactionInput,
  toCompactionPayload,
} from "../../cli/src/lib/codex/compaction.js";
import type { ResponsesInputItem, ResponsesRequest } from "../../cli/src/lib/codex/wire-types.js";

function request(input: ResponsesInputItem[]): ResponsesRequest {
  return { model: GLM_5_2.id, input } as ResponsesRequest;
}

const userItem = { type: "message", role: "user", content: "do the thing" } as ResponsesInputItem;
const triggerItem = { type: "compaction_trigger" } as ResponsesInputItem;

describe("Codex compaction detection", () => {
  test("detects a trailing compaction_trigger", () => {
    expect(isCodexCompactionRequest(request([userItem, triggerItem]))).toBe(true);
  });

  test("an ordinary turn is not a compaction request", () => {
    expect(isCodexCompactionRequest(request([userItem]))).toBe(false);
  });

  test("a trigger that is not last does not count", () => {
    expect(isCodexCompactionRequest(request([triggerItem, userItem]))).toBe(false);
  });

  test("string input is never a compaction request", () => {
    expect(isCodexCompactionRequest({ model: GLM_5_2.id, input: "hi" } as ResponsesRequest)).toBe(
      false,
    );
  });
});

describe("Codex compaction payload", () => {
  test("drops tools, forces non-stream, and caps output", () => {
    const translated = {
      model: GLM_5_2.id,
      messages: [{ role: "user", content: "history" }],
      tools: [{ type: "function", function: { name: "bash" } }],
      tool_choice: "auto",
      stream: true,
      max_tokens: 100_000,
    };
    const payload = toCompactionPayload(translated, GLM_5_2);

    // A summary must not call tools - leaving them in wastes tokens and lets
    // the model "continue the task" instead of summarizing it.
    expect(payload.tools).toBeUndefined();
    expect(payload.tool_choice).toBeUndefined();
    expect(payload.stream).toBe(false);
    expect(payload.max_tokens).toBe(Math.min(8192, GLM_5_2.limit.output));
    // The summarize instruction is appended after the existing history.
    const messages = payload.messages as Array<{ role: string; content: string }>;
    expect(messages).toHaveLength(2);
    expect(messages[0]?.content).toBe("history");
    expect(messages[1]?.role).toBe("user");
    expect(messages[1]?.content).toContain("context checkpoint compaction");
  });
});

describe("Codex compaction round-trip", () => {
  test("encode then decode returns the original summary", () => {
    const summary = "Fixed the parser; still need to update docs. Non-ASCII: café ✓";
    expect(decodeCompactionSummary(encodeCompactionSummary(summary))).toBe(summary);
  });

  test("decode ignores content we did not mint", () => {
    expect(decodeCompactionSummary("openai-opaque-blob")).toBeUndefined();
    expect(decodeCompactionSummary(undefined)).toBeUndefined();
  });

  test("the response Codex receives carries the encoded summary", () => {
    const body = compactionResponse("done so far: X", GLM_5_2.id) as {
      status: string;
      output: Array<{ type: string; encrypted_content: string }>;
    };
    expect(body.status).toBe("completed");
    expect(body.output[0]?.type).toBe("compaction");
    expect(decodeCompactionSummary(body.output[0]?.encrypted_content)).toBe("done so far: X");
  });

  test("a stored compaction item replays as readable text, not an opaque blob", () => {
    const stored = {
      type: "compaction",
      encrypted_content: encodeCompactionSummary("we already migrated the schema"),
    } as unknown as ResponsesInputItem;

    const normalized = normalizeCompactionInput([userItem, stored, triggerItem]);

    // The trigger is dropped and the checkpoint becomes plain conversation.
    expect(normalized).toHaveLength(2);
    const replayed = normalized[1] as unknown as {
      type: string;
      role: string;
      content: Array<{ text: string }>;
    };
    expect(replayed.type).toBe("message");
    expect(replayed.role).toBe("user");
    expect(replayed.content[0]?.text).toContain(COMPACTION_SUMMARY_PREFIX);
    expect(replayed.content[0]?.text).toContain("we already migrated the schema");
  });

  test("a foreign compaction item is passed through untouched", () => {
    const foreign = {
      type: "compaction",
      encrypted_content: "someone-elses-format",
    } as unknown as ResponsesInputItem;
    const [only] = normalizeCompactionInput([foreign]);
    expect(only).toBe(foreign);
  });
});

describe("Codex compaction summary extraction", () => {
  test("prefers content, falls back to reasoning_content", () => {
    expect(compactionSummary({ choices: [{ message: { content: "  summary  " } }] })).toBe(
      "summary",
    );
    expect(
      compactionSummary({ choices: [{ message: { content: "", reasoning_content: "fallback" } }] }),
    ).toBe("fallback");
    expect(compactionSummary({ choices: [] })).toBe("");
  });
});
