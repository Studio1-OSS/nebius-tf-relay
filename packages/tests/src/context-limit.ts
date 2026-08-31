import { assert, looksLikeContextError } from "./assert.js";
import {
  deleteSession,
  registerClaudeSession,
  registerCodexSession,
  startTestDaemon,
} from "./daemon-session.js";
import { makeLongRecords, recordsToOverflow } from "./long-context.js";
import { findModelById } from "@nebiusrelay/models";
import { initModelCatalog } from "../../cli/src/lib/model-catalog-init.js";
import type { TestContext } from "./types.js";

export async function assertClaudeContextLimitRetry(context: TestContext): Promise<void> {
  const daemon = await startTestDaemon(context);
  const token = await registerClaudeSession(context, daemon);
  try {
    const prompt = [
      "This request intentionally exceeds the model context window when paired with the requested max_tokens.",
      "If the proxy retries correctly with a reduced max_tokens value, answer exactly: CONTEXT_RETRY_OK",
      makeLongRecords(
        await overflowRecords("zai-org/GLM-5.2", 164_000),
        "CLAUDE_CONTEXT_RETRY_FINAL",
      ),
    ].join("\n\n");
    const response = await fetch(`${daemon.url}/v1/messages`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "nebius-glm-5-2",
        max_tokens: 164000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const text = await response.text();
    assert(
      response.ok,
      `expected context-limit retry to recover, got ${response.status}: ${text.slice(0, 1000)}`,
    );
    assert(!looksLikeContextError(text), "context-length error leaked to the client");
    const stderr = daemon.stderr();
    assert(
      stderr.includes("[nebiusrelay proxy] context-fit retry") ||
        stderr.includes('"maxTokens":28000') ||
        stderr.includes("retrying nebius request with reduced max_tokens") ||
        stderr.includes("clamped request max_tokens to estimated context budget") ||
        stderr.includes("trimmed request input to reserve requested output") ||
        (stderr.includes("nebiusrelay: trimmed") && stderr.includes("(retry path")) ||
        (stderr.includes("nebiusrelay: DROPPED A LARGE PORTION") && stderr.includes("(retry path")),
      `daemon did not log context-limit prevention; stderr=${stderr.slice(-2000)}`,
    );
    assert(/CONTEXT_RETRY_OK/i.test(text), "retry response did not include expected final answer");
  } finally {
    await deleteSession(daemon, token);
    await daemon.stop();
  }
}

export async function assertCodexContextLimitRetry(context: TestContext): Promise<void> {
  const daemon = await startTestDaemon(context);
  const token = await registerCodexSession(context, daemon);
  try {
    const prompt = [
      "This Responses request intentionally exceeds the model context window when paired with the requested max_output_tokens.",
      "If the proxy retries correctly with a reduced max_tokens value, answer exactly: CODEX_CONTEXT_RETRY_OK",
      makeLongRecords(
        await overflowRecords("zai-org/GLM-5.2", 164_000),
        "CODEX_CONTEXT_RETRY_FINAL",
      ),
    ].join("\n\n");
    const response = await fetch(`${daemon.url}/v1/responses`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "zai-org/GLM-5.2",
        max_output_tokens: 164000,
        input: [{ type: "message", role: "user", content: [{ type: "input_text", text: prompt }] }],
      }),
    });
    const text = await response.text();
    assert(
      response.ok,
      `expected context-limit retry to recover, got ${response.status}: ${text.slice(0, 1000)}`,
    );
    assert(!looksLikeContextError(text), "context-length error leaked to the client");
    assert(
      daemon.stderr().includes("[nebiusrelay proxy] context-fit retry"),
      "daemon did not log Codex context-limit retry",
    );
    assert(
      /CODEX_CONTEXT_RETRY_OK/i.test(text),
      "retry response did not include expected final answer",
    );
  } finally {
    await deleteSession(daemon, token);
    await daemon.stop();
  }
}

/**
 * Size the payload against the model's LIVE context window.
 *
 * The daemon refreshes its catalog from Nebius, so the test has to look at the
 * same numbers or the two disagree: Nebius raised GLM-5.2 from 262K to 1M, the
 * hardcoded payload stopped overflowing, and the retry under test silently
 * stopped firing while the assertion still claimed to check it.
 */
async function overflowRecords(modelId: string, maxOutputTokens: number): Promise<number> {
  await initModelCatalog({});
  const model = findModelById(modelId);
  assert(model !== undefined, `context-limit test needs ${modelId} in the catalog`);
  return recordsToOverflow(model.limit.context, maxOutputTokens);
}
