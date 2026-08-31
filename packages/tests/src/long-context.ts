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
 * How many filler records are needed to overflow a model's context window.
 *
 * The two context-limit gauntlet tests used to hardcode 1,650 records, a number
 * calibrated when GLM-5.2 had a 262K window. Nebius later raised it to 1M, the
 * payload stopped overflowing, the retry under test never fired, and the
 * assertion failed - the test rotted the moment a provider changed a number we
 * did not control. Derive it instead.
 *
 * `overshoot` pushes comfortably past the limit so the test is not sitting on
 * the boundary of the estimator's accuracy.
 */
export function recordsToOverflow(
  contextTokens: number,
  maxOutputTokens: number,
  overshoot = 1.35,
): number {
  const RECORD_CHARS = 370; // one record from makeLongRecords
  const CHARS_PER_TOKEN = 4; // matches the proxy's own estimator
  const budget = Math.max(0, contextTokens - maxOutputTokens);
  const needTokens = Math.ceil(budget * overshoot) + 1_000;
  return Math.max(1_650, Math.ceil((needTokens * CHARS_PER_TOKEN) / RECORD_CHARS));
}
