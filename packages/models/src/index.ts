/**
 * Single source of truth for the Nebius models nebiusrelay routes to:
 * ids, capabilities, modalities, and per-token cost. Both harnesses (Claude
 * Code's local proxy and OpenCode's ephemeral config) import from here so the
 * facts can't drift between them.
 *
 * This is intentionally pure data + tiny helpers - no fetch, no spawning. It
 * is the future home of the remotely-updatable curated manifest referenced in
 * the repo PLAN.md; for now the manifest is static and shipped in-tree.
 *
 * Model ids below were verified against the live Nebius Token Factory catalog
 * (`GET https://api.tokenfactory.nebius.com/v1/models`) on 2026-07-16. That
 * endpoint returns ids only - per-token pricing and context/output limits are
 * best-effort estimates and should be reconciled against Nebius's pricing page.
 * Cost/limits affect only the cost banner and the proactive context budget; the
 * reactive context-fit self-corrects from Nebius's real reported token counts.
 */

export const NEBIUS_BASE_URL = "https://api.tokenfactory.nebius.com/v1";

export type ModelCost = {
  /** USD per 1M input tokens. */
  input: number;
  /** USD per 1M output tokens. */
  output: number;
  /** USD per 1M cached input tokens (Nebius shared prefix cache). 0 if none. */
  cache_read: number;
};

export type ModelLimit = {
  /** Max input context window in tokens. */
  context: number;
  /** Max output tokens per response. */
  output: number;
};

export type ModelModalities = {
  input: readonly ("text" | "audio" | "image" | "video" | "pdf")[];
  output: readonly ("text" | "audio" | "image" | "video" | "pdf")[];
};

export type ModelDefinition = {
  /** The Nebius API model id, e.g. "zai-org/GLM-5.2". */
  id: string;
  /** Human-readable display name. */
  name: string;
  /** Claude Code's ANTHROPIC_MODEL alias for this model, or null for non-primary. */
  anthropicAlias: string | null;
  cost: ModelCost;
  limit: ModelLimit;
  /** Accepts image attachments (vision). */
  attachment: boolean;
  /** Supports reasoning/thinking tokens. */
  reasoning: boolean;
  /** Accepts a temperature setting. */
  temperature: boolean;
  /** Supports tool/function calling. */
  tool_call: boolean;
  modalities: ModelModalities;
};

const TOKENS_PER_MILLION = 1_000_000;

/** Convert a per-1M-token price to a per-token price. */
export function costPerToken(costPerMillion: number): number {
  return costPerMillion / TOKENS_PER_MILLION;
}

/**
 * GLM-5.2 - Zhipu AI's flagship MoE, the default coding model for both
 * harnesses. Text-only: image blocks must be routed elsewhere (the Claude
 * proxy intercepts them; OpenCode uses the `@vision` subagent).
 */
export const GLM_5_2: ModelDefinition = {
  id: "zai-org/GLM-5.2",
  name: "GLM 5.2 · default",
  anthropicAlias: "nebius-glm-5-2",
  cost: { input: 1.4, output: 4.4, cache_read: 0.26 },
  limit: { context: 262_144, output: 164_000 },
  attachment: false,
  reasoning: true,
  temperature: true,
  tool_call: true,
  modalities: { input: ["text"], output: ["text"] },
};

/**
 * Kimi K2.6 - Moonshot's newest reasoning + vision flagship. Vision-capable,
 * so it can serve as a vision primary (images reach it directly, no subagent).
 * Pricing/context from Nebius changelog (June 2026); output limit per
 * models.dev. Pinned to the OpenCode `@vision` subagent is the older K2.7-Code
 * (below) - kept there for stability; K2.6 is selectable as a primary.
 */
export const KIMI_K2_6: ModelDefinition = {
  id: "moonshotai/Kimi-K2.6",
  name: "Kimi K2.6 · vision",
  anthropicAlias: null,
  cost: { input: 1.2, output: 4.5, cache_read: 0.2 },
  limit: { context: 262_144, output: 131_000 },
  attachment: true,
  reasoning: true,
  temperature: true,
  tool_call: true,
  modalities: { input: ["text", "image"], output: ["text"] },
};

/**
 * MiniMax M3 - newest MiniMax, vision-capable, 512K context, the cheapest
 * vision primary. Pricing from Nebius changelog (June 2026); output limit
 * (128K) per models.dev.
 */
export const MINIMAX_M3: ModelDefinition = {
  id: "MiniMaxAI/MiniMax-M3",
  name: "MiniMax M3 · vision · 512K",
  anthropicAlias: null,
  cost: { input: 0.3, output: 1.2, cache_read: 0.06 },
  limit: { context: 524_288, output: 128_000 },
  attachment: true,
  reasoning: true,
  temperature: true,
  tool_call: true,
  modalities: { input: ["text", "image"], output: ["text"] },
};

/**
 * Qwen3.5 397B (A17B MoE) - the strongest Qwen in the live Nebius catalog and
 * a strong general/coding flagship. Text-only here (not a VL model). Pricing
 * and limits are estimates pending Nebius's pricing page.
 */
export const QWEN_3_5_397B: ModelDefinition = {
  id: "Qwen/Qwen3.5-397B-A17B",
  name: "Qwen 3.5 397B · flagship",
  anthropicAlias: null,
  cost: { input: 2.5, output: 3.75, cache_read: 0 },
  limit: { context: 262_144, output: 65_536 },
  attachment: false,
  reasoning: true,
  temperature: true,
  tool_call: true,
  modalities: { input: ["text"], output: ["text"] },
};

/**
 * DeepSeek V4 Pro - newest DeepSeek, long-context (512K) reasoning. Text-only
 * on Nebius (not in the vision models table). Pricing is the post-June-9-2026
 * reduction ($1.74/$3.48); output limit (384K) per models.dev.
 */
export const DEEPSEEK_V4_PRO: ModelDefinition = {
  id: "deepseek-ai/DeepSeek-V4-Pro",
  name: "DeepSeek V4 Pro · 512K",
  anthropicAlias: null,
  cost: { input: 1.74, output: 3.48, cache_read: 0.2 },
  limit: { context: 512_000, output: 384_000 },
  attachment: false,
  reasoning: true,
  temperature: true,
  tool_call: true,
  modalities: { input: ["text"], output: ["text"] },
};

/**
 * Capabilities string Claude Code reads from ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES.
 * Mirrors what GLM-5.2 supports on Nebius: adjustable reasoning effort
 * (incl. xhigh/max), thinking, adaptive thinking, and interleaved thinking.
 */
export const GLM_5_2_ANTHROPIC_CAPABILITIES =
  "effort,xhigh_effort,max_effort,thinking,adaptive_thinking,interleaved_thinking";

/**
 * Kimi K2.7 Code - Moonshot's coding-focused model. Used as OpenCode's
 * `@vision` subagent primary and as an optional Claude Code backend.
 */
export const KIMI_K2_7_CODE: ModelDefinition = {
  id: "moonshotai/Kimi-K2.7-Code",
  name: "Kimi K2.7 Code",
  anthropicAlias: "nebius-kimi-k2-7-code",
  cost: { input: 0.95, output: 4.0, cache_read: 0.19 },
  limit: { context: 262_144, output: 131_072 },
  attachment: true,
  reasoning: true,
  temperature: true,
  tool_call: true,
  modalities: { input: ["text", "image"], output: ["text"] },
};

/**
 * Qwen2.5-VL 72B - a dedicated vision-language model in the live Nebius
 * catalog; the vision fallback for image description. Verified end-to-end
 * against a real image on 2026-07-16. Pricing/limits are estimates.
 */
export const QWEN_2_5_VL_72B: ModelDefinition = {
  id: "Qwen/Qwen2.5-VL-72B-Instruct",
  name: "Qwen2.5-VL 72B · vision",
  anthropicAlias: null,
  cost: { input: 0.25, output: 0.75, cache_read: 0 },
  limit: { context: 131_072, output: 32_768 },
  attachment: true,
  reasoning: false,
  temperature: true,
  tool_call: true,
  modalities: { input: ["text", "image"], output: ["text"] },
};

/**
 * Curated vision models for image description, ordered primary-first. The
 * Claude proxy iterates this list with automatic failover; OpenCode wires only
 * the primary (VISION_MODELS[0]) into its `@vision` subagent since subagents
 * take a single model. Reasoning is always disabled on these calls
 * (perception, not reasoning) - handled by callers, not encoded here.
 */
export const VISION_MODELS: readonly ModelDefinition[] = [KIMI_K2_7_CODE, QWEN_2_5_VL_72B];

/** Primary vision model (first in VISION_MODELS). */
export const VISION_PRIMARY: ModelDefinition = VISION_MODELS[0] ?? {
  id: "",
  name: "",
  anthropicAlias: null,
  cost: { input: 0, output: 0, cache_read: 0 },
  limit: { context: 0, output: 0 },
  attachment: true,
  reasoning: true,
  temperature: true,
  tool_call: true,
  modalities: { input: ["text", "image"], output: ["text"] },
};

/**
 * Curated current-flagship Nebius models surfaced in OpenCode's `/models`.
 * Nebius's full serverless catalog is hidden via the provider `whitelist`
 * (opencode PR #3416); only these ids appear. Each `name` carries a short tip
 * because OpenCode has no per-model `description` field - the display name is
 * the only place a user-facing hint can live. Order = the picker order.
 *
 * Sources: Nebius changelog (ids/pricing/context, June 2026) +
 * models.dev (output limits). See per-model doc comments for specifics.
 */
export const SELECTABLE_MODELS: readonly ModelDefinition[] = [
  GLM_5_2,
  VISION_PRIMARY, // moonshotai/Kimi-K2.7-Code - also the @vision subagent model
  KIMI_K2_6,
  MINIMAX_M3,
  QWEN_3_5_397B,
  DEEPSEEK_V4_PRO,
];

/**
 * Whether a model accepts image input (vision-capable). Used to pick the right
 * OpenCode build-agent system prompt: vision primaries receive images directly,
 * text-only primaries must route to the `@vision` subagent.
 */
export function isVisionModel(model: ModelDefinition): boolean {
  return model.attachment && model.modalities.input.includes("image");
}

/**
 * Find a model definition by its Nebius id across the curated + vision lists.
 * Returns undefined if not found.
 */
export function findModelById(id: string): ModelDefinition | undefined {
  const all = [...SELECTABLE_MODELS, ...VISION_MODELS];
  return all.find((model) => model.id === id);
}

/**
 * Resolve a model from a list by trying each candidate key against `value`,
 * falling back to the model whose id is `defaultId` (or the first in the list)
 * when no value is given. Returns undefined only when a value is given but no
 * model matches - the caller decides whether that is an error. Pure: no I/O,
 * no throwing; the per-harness "Unsupported <harness> model" error is a cli
 * policy that lives in the thin wrappers, not here.
 */
export function resolveModelByKeys(
  list: readonly ModelDefinition[],
  value: string | undefined,
  keys: ReadonlyArray<(model: ModelDefinition) => string | null | undefined>,
  defaultId: string,
): ModelDefinition | undefined {
  const defaultModel = list.find((model) => model.id === defaultId) ?? list[0];
  if (!value) {
    return defaultModel;
  }
  return list.find((model) => keys.some((key) => key(model) === value));
}

/**
 * Prompt for the image-description sub-call. Shared by the Claude proxy (which
 * injects it on its own vision fetch) and the OpenCode `@vision` subagent
 * (which uses it as the agent system prompt). Keep it perception-focused and
 * concise so the main model reasons over a tight description.
 */
export const VISION_PROMPT =
  "Describe this image for a coding assistant that cannot see it. " +
  "Be concise but specific: layout, UI elements, colors, any text (quote it " +
  "verbatim), diagrams, charts, or notable details. If it is a screenshot, " +
  "describe the visible UI. Keep it under 150 words.";
