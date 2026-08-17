import { runWebSearchDetailed, type WebSearchResult } from "../tavily-search.js";

/**
 * Codex standalone search (`/v1/alpha/search`), served from Tavily.
 *
 * Codex's `web_search_request` feature posts a batch of search commands here
 * and expects a rendered result blob back. Upstream treats this route as
 * OpenAI-only and 404s it, which disables Codex's search entirely against a
 * third-party provider. We already hold a Tavily key for the Claude-side web
 * search, so the same backend can serve this.
 *
 * Scope: only the `search_query` command is served. Codex's full protocol also
 * carries `open`/`click`/`find`/`screenshot`/`finance`/`weather`/`sports`
 * commands, which are a hosted browsing surface backed by a page cache we do
 * not have. Those are reported as unsupported in the output text rather than
 * silently answered with nothing, so the model can see why and move on.
 *
 * The response shape here is derived from the Codex client rather than a
 * published spec, so the route is opt-in via NEBIUSRELAY_CODEX_SEARCH=1.
 */

export const CODEX_SEARCH_ENV = "NEBIUSRELAY_CODEX_SEARCH";

/** Commands we cannot serve without a hosted page cache. */
const UNSUPPORTED_COMMANDS = [
  "image_query",
  "open",
  "click",
  "find",
  "screenshot",
  "finance",
  "weather",
  "sports",
  "time",
] as const;

/** Codex sends at most 4 queries per call; cap so one request can't fan out. */
const MAX_QUERIES = 4;

export type CodexSearchQuery = {
  q?: string;
  recency?: number | null;
  domains?: string[] | null;
};

export type CodexSearchRequest = {
  search_query?: CodexSearchQuery[];
  response_length?: "short" | "medium" | "long";
  [command: string]: unknown;
};

export type CodexSearchResponse = {
  output: string;
  sources: Array<{ id: string; title: string; url: string }>;
};

export function codexSearchEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const raw = env[CODEX_SEARCH_ENV]?.trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

/** How much text to keep per result, by the client's requested verbosity. */
function snippetLimit(responseLength: CodexSearchRequest["response_length"]): number {
  if (responseLength === "short") {
    return 400;
  }
  if (responseLength === "long") {
    return 4_000;
  }
  return 1_200;
}

/**
 * Reference ids follow the ChatGPT convention Codex already renders
 * (`turn0search0`), so citations in the model's reply resolve to a source.
 */
function referenceId(queryIndex: number, resultIndex: number): string {
  return `turn${queryIndex}search${resultIndex}`;
}

function renderResult(result: WebSearchResult, id: string, limit: number): string {
  const title = result.title?.trim() || result.url?.trim() || "(untitled)";
  const body = (result.text ?? "").trim().slice(0, limit);
  const lines = [`【${id}】 ${title}`];
  if (result.url) {
    lines.push(result.url);
  }
  if (result.publishedDate) {
    lines.push(`Published: ${result.publishedDate}`);
  }
  if (body) {
    lines.push(body);
  }
  return lines.join("\n");
}

export function unsupportedCommands(body: CodexSearchRequest): string[] {
  return UNSUPPORTED_COMMANDS.filter((command) => {
    const value = body[command];
    return Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null;
  });
}

export function searchQueries(body: CodexSearchRequest): CodexSearchQuery[] {
  if (!Array.isArray(body.search_query)) {
    return [];
  }
  // Codex sends `{"q": ""}` as its documented no-op; drop those rather than
  // spending a Tavily call on an empty query.
  return body.search_query.filter((entry) => entry?.q?.trim()).slice(0, MAX_QUERIES);
}

export async function runCodexSearch(
  body: CodexSearchRequest,
  tavilyApiKey: string | undefined,
  debugLog?: (label: string, value: unknown) => void,
): Promise<CodexSearchResponse> {
  const queries = searchQueries(body);
  const unsupported = unsupportedCommands(body);
  const limit = snippetLimit(body.response_length);
  const sections: string[] = [];
  const sources: CodexSearchResponse["sources"] = [];

  const outcomes = await Promise.all(
    queries.map((entry) =>
      runWebSearchDetailed({
        query: entry.q,
        allowedDomains: entry.domains ?? [],
        blockedDomains: [],
        tavilyApiKey,
        includePublishedDate: true,
        ...(debugLog ? { debugLog } : {}),
      }),
    ),
  );

  outcomes.forEach((outcome, queryIndex) => {
    const header = `## Results for "${outcome.query}"`;
    if (outcome.errorCode || outcome.results.length === 0) {
      // Surface the failure to the model instead of an empty section, so it
      // does not read "no results" as "this does not exist on the web".
      sections.push(`${header}\n${outcome.text || "No results."}`);
      return;
    }
    const rendered = outcome.results.map((result, resultIndex) => {
      const id = referenceId(queryIndex, resultIndex);
      sources.push({
        id,
        title: result.title?.trim() ?? "",
        url: result.url?.trim() ?? "",
      });
      return renderResult(result, id, limit);
    });
    sections.push([header, ...rendered].join("\n\n"));
  });

  if (queries.length === 0) {
    sections.push("No search queries were provided.");
  }
  if (unsupported.length > 0) {
    sections.push(
      `Unsupported here: ${unsupported.join(", ")}. This relay serves web search only; ` +
        "browse the URLs above with your own tools instead.",
    );
  }

  return { output: sections.join("\n\n"), sources };
}
