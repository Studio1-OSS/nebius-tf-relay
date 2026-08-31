# Changelog

User-visible changes to Nebius TF Relay, newest first. This changelog starts at
0.14.0; earlier release history remains in Git.

## 0.15.1 - 2026-08-31

### Fixed

- Context overflow now recovers instead of failing the turn. Nebius phrases its
  error with "of" and "from the input messages"; the parser recognised neither
  wording, so the reactive context-fit retry could not read the ceiling and gave
  up. Any turn that exceeded the window
  returned a hard 500 where the proxy should have clamped `max_tokens` and
  retried silently. All four known phrasings (Nebius, vLLM, Kimi/Moonshot
  parenthetical, and `request resolved to`) are now pinned by tests.
- `ndeepseek --model X` is honored again. dsh persists the model last picked in
  its web UI to `$DSH_HOME/settings.yaml`, and that setting outranks the config
  the relay generates - so the model you asked for was silently ignored while
  the banner still announced it. Measured: a run launched as GLM 5.3 Flash
  billed at DeepSeek V4 Pro's rate. The relay now runs against a throwaway
  `DSH_HOME` with only that override removed; your real `~/.dsh` is untouched.

### Added

- `ndeepseek --profile <name>`, so `--profile headless "task"` answers one task
  and exits. Previously the relay always booted dsh's web UI, which cannot be
  scripted.

## 0.15.0 - 2026-08-29

### Changed

- **GLM 5.3 Flash is the new default model** (Z.ai, via Nebius Token Factory):
  1M context at $0.15/$0.50 per M, against Kimi K3's $3.00/$15.00. On a measured
  Codex turn, $0.0129 versus $0.1200. Kimi K3 remains one `--model` away.
  Existing installs keep whatever model they last used; the new default applies
  to fresh ones.

### Fixed

- GLM 5.3 Flash leaked its chain-of-thought into replies. At
  `reasoning_effort: "none"` - the relay's default, chosen for speed - the model
  still reasons but does not route it to `reasoning_content`, emitting the whole
  chain into `content` ending in a stray `</think>`. Effort is now floored per
  model; `low` is both clean and cheaper here (11 reasoning tokens versus 27).

## 0.14.3 - 2026-08-27

### Added

- `nebiusrelay chatgpt off` (also `codex off`, `restore`, or bare
  `nebiusrelay off`) disables the relay-managed `~/.codex/config.toml` and
  restores your previous profile. The managed config is shared by ChatGPT
  Desktop and the Codex CLI, so disabling from either fixes both. `--restore`
  still works.
- `NEBIUSRELAY_REASONING_HISTORY=off|interleaved|full` controls how much of
  previous turns' reasoning is replayed. On a long session that is a large and
  growing share of input tokens. Default stays `full`, so upgrading changes
  nothing.

### Fixed

- Harnesses that write no persistent config now refuse `off`/`restore` with a
  clear error. Previously the verb was forwarded to the harness as a prompt -
  `nebiusrelay codex off` launched Codex with "off" as the task.
- Disabling when nothing is managed is a friendly no-op rather than a
  missing-backup error.

## 0.14.2 - 2026-08-27

### Fixed

- `nebiusrelay usage` counts sessions that are still running. It required an end
  timestamp, and ChatGPT Desktop registers without a pid so it never ends while
  the app is open - its spend was permanently invisible.
- Session cost survives a daemon restart. Proxied sessions only persisted cost
  at exit, so a restart lost whatever was in flight. Cost is now flushed after
  each response and for every live session on shutdown.
- A dead-pid session is closed out with its recorded spend instead of `$0.0000`,
  which used to overwrite real totals rather than merely fail to save them.
- Spawned harnesses are attributed to their model in `usage`. Model ids were
  persisted only for proxied sessions, so every Pi/Prime/Hermes/DeepSeek/Grok
  session was filed under "unknown".

## 0.14.1 - 2026-08-18

### Fixed

- The interactive launcher lists all eight harnesses. It enumerated five by
  hand, so Hermes, DeepSeek and Grok shipped with wrappers and docs but never
  appeared in the menu. It now derives from the harness registry.

## 0.14.0 - 2026-08-17

### Added

- **Cost metering for the spawned harnesses** (`NEBIUSRELAY_METER=1`, opt-in).
  Pi, Prime, Hermes, DeepSeek and Grok hold the API key and call Nebius
  directly, so none of the proxied path reached them: no per-turn cost, no model
  fallback, no circuit breaker, no retries. They can now route through the
  daemon, which also keeps the real Nebius key out of the harness - it only ever
  sees a local session token. If the daemon is unreachable the launcher says so
  and connects directly.
- Codex durable memory (`/v1/memories/trace_summarize`). The endpoint used to
  404, so Codex retained nothing between sessions.
- `NEBIUSRELAY_CACHE_READ_RATIO` to price cached input tokens.

### Changed

- Cached input tokens are billed at the full input rate rather than zero.
  **Reported costs will rise** - the spend is unchanged, the accounting was
  wrong. Nebius serves cached prompts but publishes no cached price, so zero was
  an under-report; on a long agentic session most input tokens are cache hits.

### Fixed

- Ctrl-C now prints the session cost and releases the session. Several harnesses
  have no other way to exit, so a run ended with no cost line and the session
  sat registered until the daemon reaped it - the tokens looked free.
