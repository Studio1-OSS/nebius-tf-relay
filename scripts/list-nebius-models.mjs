#!/usr/bin/env node
/**
 * List the live Nebius Token Factory model catalog.
 *
 * The curated catalog in `packages/models/src/index.ts` is maintained by hand;
 * this helper prints the ids the API actually serves so the curated list can be
 * reconciled after Nebius adds or removes models. Prices and context windows
 * are NOT returned by `/v1/models` - check Nebius's pricing page for those.
 *
 * Usage:
 *   NEBIUS_API_KEY=... node scripts/list-nebius-models.mjs
 */

const BASE_URL = process.env.NEBIUS_BASE_URL ?? "https://api.tokenfactory.nebius.com/v1";
const apiKey = process.env.NEBIUS_API_KEY;

if (!apiKey) {
  console.error("NEBIUS_API_KEY is not set. Export it and re-run.");
  process.exit(1);
}

const res = await fetch(`${BASE_URL}/models`, {
  headers: { Authorization: `Bearer ${apiKey}` },
});

if (!res.ok) {
  console.error(`GET /models failed: ${res.status} ${res.statusText}`);
  console.error(await res.text());
  process.exit(1);
}

const body = await res.json();
const models = Array.isArray(body?.data) ? body.data : [];
models.sort((a, b) => String(a.id).localeCompare(String(b.id)));

console.log(`${models.length} models on ${BASE_URL}:\n`);
for (const model of models) {
  console.log(`  ${model.id}`);
}
