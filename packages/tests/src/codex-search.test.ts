import { describe, expect, test } from "vitest";
import {
  CODEX_SEARCH_ENV,
  codexSearchEnabled,
  searchQueries,
  unsupportedCommands,
} from "../../cli/src/lib/codex/search.js";
import {
  CODEX_SEARCH_PATH,
  isCodexResponsesPath,
  isCodexSearchPath,
  normalizeCodexPath,
} from "../../cli/src/lib/codex/compaction.js";

describe("Codex search opt-in", () => {
  // The response shape is derived from the client, not a published spec, so a
  // wrong guess must not reach anyone who did not ask for it.
  test("disabled unless explicitly turned on", () => {
    expect(codexSearchEnabled({})).toBe(false);
    expect(codexSearchEnabled({ [CODEX_SEARCH_ENV]: "0" })).toBe(false);
    expect(codexSearchEnabled({ [CODEX_SEARCH_ENV]: "" })).toBe(false);
  });

  test("accepts the usual truthy spellings", () => {
    for (const value of ["1", "true", "TRUE", "yes"]) {
      expect(codexSearchEnabled({ [CODEX_SEARCH_ENV]: value })).toBe(true);
    }
  });
});

describe("Codex search query extraction", () => {
  test("keeps only non-empty queries", () => {
    const queries = searchQueries({
      search_query: [{ q: "kimi k3 context window" }, { q: "  " }, {}],
    });
    expect(queries).toHaveLength(1);
    expect(queries[0]?.q).toBe("kimi k3 context window");
  });

  // Codex's documented no-op is `{"q": ""}`; spending a Tavily call on it would
  // bill the user for a search the client explicitly meant to skip.
  test("the documented empty-query no-op costs nothing", () => {
    expect(searchQueries({ search_query: [{ q: "" }] })).toHaveLength(0);
  });

  test("caps the batch so one request cannot fan out", () => {
    const many = Array.from({ length: 9 }, (_, i) => ({ q: `q${i}` }));
    expect(searchQueries({ search_query: many })).toHaveLength(4);
  });

  test("a body with no search_query yields nothing", () => {
    expect(searchQueries({})).toHaveLength(0);
    expect(searchQueries({ search_query: "not-an-array" } as never)).toHaveLength(0);
  });
});

describe("Codex search unsupported commands", () => {
  // Reporting these lets the model see why it got nothing, instead of reading
  // silence as "the web has no answer".
  test("populated browsing commands are reported", () => {
    const reported = unsupportedCommands({
      search_query: [{ q: "x" }],
      open: [{ ref_id: "turn0search0" }],
      weather: [{ location: "Bengaluru" }],
    } as never);
    expect(reported).toContain("open");
    expect(reported).toContain("weather");
    expect(reported).not.toContain("search_query");
  });

  test("absent or empty commands are not reported", () => {
    expect(unsupportedCommands({ search_query: [{ q: "x" }], find: [] } as never)).toEqual([]);
  });
});

describe("Codex search routing", () => {
  test("the search path is recognized prefixed and un-prefixed", () => {
    expect(isCodexSearchPath("/v1/alpha/search")).toBe(true);
    expect(isCodexSearchPath("/alpha/search")).toBe(true);
    expect(normalizeCodexPath("/alpha/search")).toBe(CODEX_SEARCH_PATH);
  });

  test("search is not a responses path", () => {
    expect(isCodexResponsesPath("/v1/alpha/search")).toBe(false);
    expect(isCodexSearchPath("/v1/responses")).toBe(false);
  });
});
