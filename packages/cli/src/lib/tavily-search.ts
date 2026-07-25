export type WebSearchResult = {
  title?: string;
  url?: string;
  text?: string;
  publishedDate?: string;
};

export type WebSearchErrorCode = "invalid_tool_input" | "too_many_requests" | "unavailable";

export type WebSearchOutcome = {
  query: string;
  text: string;
  results: WebSearchResult[];
  errorCode?: WebSearchErrorCode;
};

type TavilySearchResult = {
  title?: string;
  url?: string;
  content?: string;
  published_date?: string;
  score?: number;
};

type TavilySearchResponse = {
  query?: string;
  answer?: string;
  results?: TavilySearchResult[];
};

type NativeToolPromptOptions<Message, NativeTool> = {
  mergeLeadingSystemMessages?: (messages: Message[]) => Message[];
  toolName?: (tool: NativeTool) => string;
};

export type WebSearchParams = {
  query: unknown;
  allowedDomains: string[];
  blockedDomains: string[];
  tavilyApiKey: string | undefined;
  queryKeys?: string[];
  debugLog?: (label: string, value: unknown) => void;
  missingApiKeyMessage?: string;
  includePublishedDate?: boolean;
  snippetLength?: number;
};

export function withNativeToolSystemPrompt<
  Message extends { role: string; content?: unknown },
  NativeTool,
>(
  messages: Message[],
  nativeTools: NativeTool[],
  options: NativeToolPromptOptions<Message, NativeTool> = {},
): Message[] {
  const toolName = options.toolName ?? ((tool: NativeTool) => String(tool));
  const prompt = [
    "Native server tools are available through function calls.",
    ...nativeTools.map(
      (tool) =>
        `- ${toolName(tool)}: call this for live web search. Always provide a concise non-empty query.`,
    ),
    "After tool results are returned, answer from the provided sources and include source URLs when relevant.",
  ].join("\n");
  const nextMessages = [{ role: "system", content: prompt } as Message, ...messages];
  return options.mergeLeadingSystemMessages
    ? options.mergeLeadingSystemMessages(nextMessages)
    : nextMessages;
}

export function nativeToolMaxUses(tool: { max_uses?: unknown }): number {
  const value = tool.max_uses;
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 5;
}

export async function runWebSearch(params: WebSearchParams): Promise<string> {
  return (await runWebSearchDetailed(params)).text;
}

export async function runWebSearchDetailed(params: WebSearchParams): Promise<WebSearchOutcome> {
  const query = webSearchQuery(params.query, params.queryKeys);
  if (!query) {
    return failedSearch("", "Web search error: missing query.", "invalid_tool_input");
  }

  const body = tavilySearchBody({
    query,
    allowedDomains: params.allowedDomains,
    blockedDomains: params.blockedDomains,
  });
  const tavilyApiKey = params.tavilyApiKey?.trim();
  if (!tavilyApiKey) {
    return failedSearch(
      query,
      params.missingApiKeyMessage ??
        "Web search error: TAVILY_API_KEY is not set. Set it and retry.",
      "unavailable",
    );
  }

  params.debugLog?.("tavily search request", { query, hasApiKey: Boolean(tavilyApiKey), body });
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tavilyApiKey}`,
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  if (!response.ok) {
    params.debugLog?.("tavily search error", {
      status: response.status,
      body: text.slice(0, 1000),
    });
    return failedSearch(
      query,
      `Web search error from Tavily (${response.status}): ${text.slice(0, 1200)}`,
      response.status === 429 ? "too_many_requests" : "unavailable",
    );
  }

  let json: TavilySearchResponse;
  try {
    json = JSON.parse(text) as TavilySearchResponse;
  } catch {
    return failedSearch(
      query,
      `Web search error: Tavily returned non-JSON content: ${text.slice(0, 1200)}`,
      "unavailable",
    );
  }

  const results: WebSearchResult[] = (json.results ?? []).slice(0, 5).map((result) => {
    const mapped: WebSearchResult = {};
    if (result.title !== undefined) mapped.title = result.title;
    if (result.url !== undefined) mapped.url = result.url;
    if (result.content !== undefined) mapped.text = result.content;
    if (result.published_date !== undefined) mapped.publishedDate = result.published_date;
    return mapped;
  });
  if (results.length === 0) {
    return {
      query,
      results,
      text: `Web search completed for "${query}" but returned no results.${
        json.answer ? ` Answer: ${json.answer}` : ""
      }`,
    };
  }

  const lines = [`Web search results for "${query}" via Tavily:`];
  if (json.answer) {
    lines.push(`Answer: ${trimSearchText(json.answer, params.snippetLength)}`);
  }
  results.forEach((result, index) => {
    lines.push(
      [
        `${index + 1}. ${result.title ?? "Untitled"}`,
        `URL: ${result.url ?? ""}`,
        params.includePublishedDate && result.publishedDate
          ? `Published: ${result.publishedDate}`
          : "",
        `Snippet: ${trimSearchText(result.text ?? "", params.snippetLength)}`,
      ]
        .filter(Boolean)
        .join("\n"),
    );
  });
  return { query, results, text: lines.join("\n\n") };
}

function failedSearch(
  query: string,
  text: string,
  errorCode: WebSearchErrorCode,
): WebSearchOutcome {
  return { query, text, results: [], errorCode };
}

export function tavilySearchBody(params: {
  query: string;
  allowedDomains: string[];
  blockedDomains: string[];
}): Record<string, unknown> {
  const body: Record<string, unknown> = {
    query: params.query,
    max_results: 5,
    search_depth: "basic",
    include_answer: true,
  };
  if (params.allowedDomains.length > 0) {
    body.include_domains = params.allowedDomains;
  }
  if (params.blockedDomains.length > 0) {
    body.exclude_domains = params.blockedDomains;
  }
  return body;
}

export function webSearchQuery(
  input: unknown,
  keys = ["query", "q", "search_query", "input"],
): string {
  if (typeof input === "string") {
    return input.trim();
  }
  if (typeof input !== "object" || input === null) {
    return "";
  }
  const record = input as Record<string, unknown>;
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

export function stringArray(value: unknown, options: { requireTrimmed?: boolean } = {}): string[] {
  const requireTrimmed = options.requireTrimmed ?? true;
  return Array.isArray(value)
    ? value.filter(
        (item): item is string =>
          typeof item === "string" && (requireTrimmed ? item.trim().length > 0 : item.length > 0),
      )
    : [];
}

export function trimSearchText(value: string, maxLength = 700): string {
  return value.replaceAll(/\s+/g, " ").trim().slice(0, maxLength);
}
