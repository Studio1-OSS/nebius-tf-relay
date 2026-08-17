import { describe, expect, test } from "vitest";
import {
  invalidMemoryTraces,
  memoryOutput,
  parseMemoryJson,
} from "../../cli/src/lib/codex/memories.js";
import {
  CODEX_MEMORIES_PATH,
  isCodexMemoriesPath,
  isCodexResponsesPath,
  normalizeCodexPath,
} from "../../cli/src/lib/codex/compaction.js";

describe("Codex memories validation", () => {
  test("rejects a body without traces", () => {
    expect(invalidMemoryTraces({})).toContain("traces must be an array");
    expect(invalidMemoryTraces(null)).toContain("object");
  });

  // An empty batch would otherwise return `{output: []}`, which reads to Codex
  // as "the summarizer produced nothing" rather than "you sent nothing".
  test("rejects an empty traces array", () => {
    expect(invalidMemoryTraces({ traces: [] })).toContain("must not be empty");
  });

  test("accepts a well-formed batch", () => {
    expect(invalidMemoryTraces({ traces: [{ id: "t1", items: [] }] })).toBeUndefined();
  });
});

describe("Codex memory JSON parsing", () => {
  test("parses the documented two-field object", () => {
    const parsed = parseMemoryJson('{"trace_summary":"did X","memory_summary":"prefers Y"}');
    expect(parsed).toEqual({ trace_summary: "did X", memory_summary: "prefers Y" });
  });

  // Models fence JSON despite being told not to; a fenced block is still valid.
  test("strips a markdown fence", () => {
    const parsed = parseMemoryJson('```json\n{"trace_summary":"a","memory_summary":"b"}\n```');
    expect(parsed).toEqual({ trace_summary: "a", memory_summary: "b" });
  });

  test("rejects an object missing a required field", () => {
    expect(parseMemoryJson('{"trace_summary":"a"}')).toBeUndefined();
    expect(parseMemoryJson('{"trace_summary":1,"memory_summary":"b"}')).toBeUndefined();
  });

  test("rejects non-JSON", () => {
    expect(parseMemoryJson("I could not summarize that.")).toBeUndefined();
  });
});

describe("Codex memory output fallback", () => {
  // Failing the turn over malformed JSON would lose a summary Codex can still
  // use; degrade to the raw text instead.
  test("plain-text content becomes both summaries", () => {
    const out = memoryOutput({
      choices: [{ message: { content: "  we migrated the schema  " } }],
    } as Parameters<typeof memoryOutput>[0]);
    expect(out.trace_summary).toBe("we migrated the schema");
    expect(out.memory_summary).toBe("we migrated the schema");
  });

  test("an empty response still yields strings, never undefined", () => {
    const out = memoryOutput({ choices: [] } as Parameters<typeof memoryOutput>[0]);
    expect(typeof out.trace_summary).toBe("string");
    expect(out.trace_summary).toContain("no memory summary");
  });
});

describe("Codex memories routing", () => {
  test("the memories path is recognized prefixed and un-prefixed", () => {
    expect(isCodexMemoriesPath("/v1/memories/trace_summarize")).toBe(true);
    expect(isCodexMemoriesPath("/memories/trace_summarize")).toBe(true);
    expect(normalizeCodexPath("/memories/trace_summarize")).toBe(CODEX_MEMORIES_PATH);
  });

  // It must not be mistaken for a turn: a turn would forward the raw trace to
  // the user's coding model with the full tool schema attached.
  test("memories is not a responses path", () => {
    expect(isCodexResponsesPath("/v1/memories/trace_summarize")).toBe(false);
    expect(isCodexMemoriesPath("/v1/responses")).toBe(false);
  });
});
