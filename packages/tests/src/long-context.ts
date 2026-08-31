export function makeLongRecords(count: number, finalToken: string): string {
  const filler =
    "alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma tau upsilon phi chi psi omega";
  const records: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const token = i === count - 1 ? finalToken : `checksum_${String(i).padStart(4, "0")}`;
    records.push(`record ${i}: ${filler} ${filler} ${filler} token=${token}`);
  }
  return records.join("\n");
}

/**
 * How many filler records make `prompt + max_output_tokens` exceed the model's
 * context window - while keeping the prompt itself comfortably inside it.
 *
 * That distinction is the whole test. The proxy recovers by clamping
 * max_tokens, so the prompt must still fit; a prompt that is itself larger than
 * the window is unrecoverable and the request simply 400s.
 *
 * This used to be a hardcoded 1,650, calibrated when GLM-5.2 had a 262K window.
 * Nebius raised it to 1M, the payload stopped overflowing, and the retry under
 * test quietly stopped firing while the assertion still claimed to check it.
 */
export function recordsToOverflow(contextTokens: number, maxOutputTokens: number): number {
  const RECORD_CHARS = 370; // one record from makeLongRecords
  const CHARS_PER_TOKEN = 4; // matches the proxy's own estimator
  // 92% of the window: over the limit once max_output is added, under it alone.
  const promptTokens = Math.floor(contextTokens * 0.92);
  if (promptTokens + maxOutputTokens <= contextTokens) {
    throw new Error(
      `max_output_tokens ${maxOutputTokens} is too small to overflow a ${contextTokens}-token window`,
    );
  }
  return Math.ceil((promptTokens * CHARS_PER_TOKEN) / RECORD_CHARS);
}
