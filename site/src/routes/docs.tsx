import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const installCommand = "curl -fsSL https://nebius-tf-relay.vercel.app/install.sh | sh";
const githubUrl = "https://github.com/Studio1-OSS/nebius-tf-relay";
const changelogUrl = "https://github.com/Studio1-OSS/nebius-tf-relay/blob/main/CHANGELOG.md";
const nebiusApiKeysUrl = "https://tokenfactory.nebius.com/?modals=create-api-key";
const tavilyUrl = "https://app.tavily.com";
const llmsUrl = "https://nebius-tf-relay.vercel.app/llms.txt";

export const Route = createFileRoute("/docs")({ component: Docs });

/** Section ids drive both the sidebar and the scroll-spy highlight. */
const sections = [
  { id: "what-it-does", label: "What it does" },
  { id: "install", label: "Install" },
  { id: "harnesses", label: "Harnesses" },
  { id: "commands", label: "Commands" },
  { id: "models", label: "Models" },
  { id: "web-search", label: "Web search" },
  { id: "metering", label: "Cost metering" },
  { id: "env", label: "Environment" },
  { id: "agents", label: "For AI agents" },
];

const harnesses = [
  ["Claude Code", "nclaude", "Proxied", "Anthropic Messages API translated to Nebius."],
  ["Codex CLI", "ncodex", "Proxied", "OpenAI Responses API translated to Nebius."],
  ["OpenCode", "nopencode", "Spawned", "Nebius wired in as an OpenAI-compatible provider."],
  ["Pi Code", "npi", "Spawned", "Custom Nebius provider in a temporary config directory."],
  ["Prime Agent", "nprime", "Spawned", "PrimeIntellect's RLM agent on Nebius models."],
  ["Hermes Agent", "nhermes", "Spawned", "Nous Research's agent, isolated home overlay."],
  ["DeepSeek Harness", "ndeepseek", "Spawned", "DeepSeek's web profile with Nebius layered in."],
  ["Grok Build", "ngrok", "Spawned", "xAI's terminal harness; your key never reaches api.x.ai."],
];

const models = [
  ["GLM 5.3 Flash", "Fast, very low cost, agentic", "1M", "No", true],
  ["Kimi K3", "Frontier coding + agentic", "1M", "No", false],
  ["Kimi K2.6", "Vision flagship", "262K", "Yes", false],
  ["Kimi K2.7 Code", "Coding", "262K", "No", false],
  ["MiniMax M3", "Fast, cheap", "196K", "No", false],
  ["Qwen 3.5 397B", "General / coding flagship", "262K", "No", false],
  ["DeepSeek V4 Flash", "Fast DeepSeek V4", "1M", "No", false],
  ["DeepSeek V4 Pro", "Long-context reasoning", "1M", "No", false],
  ["Qwen2.5-VL 72B", "Vision fallback", "32K", "Yes", false],
];

const envVars: Array<[string, ReactNode]> = [
  [
    "NEBIUS_API_KEY",
    <>
      Nebius Token Factory key (or set it via <Code>configure</Code>).
    </>,
  ],
  [
    "TAVILY_API_KEY",
    <>
      Enables web search (or set it via <Code>configure</Code>).
    </>,
  ],
  [
    "NEBIUS_BASE_URL",
    <>
      Override the API base. Default <Code>https://api.tokenfactory.nebius.com/v1</Code>.
    </>,
  ],
  [
    "NEBIUSRELAY_REASONING_EFFORT",
    <>
      <Code>none</Code> | <Code>low</Code> | <Code>medium</Code> | <Code>high</Code> |{" "}
      <Code>max</Code>. Default <Code>none</Code> for speed; raise it for harder tasks.
    </>,
  ],
  [
    "NEBIUSRELAY_FALLBACK_MODEL",
    <>
      Model to fail over to when the target returns no response headers. Default{" "}
      <Code>moonshotai/Kimi-K2.6</Code>; set <Code>off</Code> to disable.
    </>,
  ],
  [
    "NEBIUSRELAY_METER=1",
    <>
      Route the spawned harnesses through the daemon so they get cost metering, model fallback and
      retries. Off by default.
    </>,
  ],
  [
    "NEBIUSRELAY_REASONING_HISTORY",
    <>
      <Code>full</Code> (default) | <Code>interleaved</Code> | <Code>off</Code>. How much prior
      reasoning is replayed each turn. <Code>off</Code> is cheapest on long sessions.
    </>,
  ],
  [
    "NEBIUSRELAY_CACHE_READ_RATIO",
    <>
      Price of a cached input token as a fraction of the input price. Default <Code>1</Code>, since
      Nebius publishes no cached rate - so the total is an upper bound.
    </>,
  ],
  [
    "NEBIUSRELAY_CODEX_MEMORY_MODEL",
    <>Model that summarizes Codex traces for durable memory. Defaults to MiniMax M3.</>,
  ],
  ["NEBIUSRELAY_DISABLE_AUTOUPDATE=1", <>Stop the installed binary from self-updating.</>],
  [
    "NEBIUSRELAY_TELEMETRY_URL",
    <>Opt in to telemetry by pointing at your own collector. Off by default.</>,
  ],
];

function Docs() {
  const [active, setActive] = useState(sections[0]!.id);

  // Highlight the section currently nearest the top of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto max-w-[1180px] px-6">
        <header className="flex items-center gap-3 py-5">
          <a className="flex items-center gap-2.5" href="/">
            <BrandMark />
            <span className="text-[15.5px] font-semibold tracking-tight text-ink">
              Nebius TF Relay
            </span>
          </a>
          <span className="rounded-full bg-code px-2.5 py-1 text-[12px] font-medium text-muted">
            Docs
          </span>
          <nav className="ml-auto flex items-center gap-1 text-[14px] font-medium text-muted">
            <a className="rounded-lg px-3 py-2 transition hover:bg-code hover:text-ink" href="/">
              Home
            </a>
            <a
              className="hidden rounded-lg px-3 py-2 transition hover:bg-code hover:text-ink sm:block"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-violet px-3.5 py-2 text-[13.5px] font-semibold text-white transition hover:brightness-[1.06] active:scale-[.98]"
              href={nebiusApiKeysUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get API key
              <ArrowUpRight />
            </a>
          </nav>
        </header>

        <div className="flex gap-12 pb-24">
          <aside className="hidden w-[190px] shrink-0 lg:block">
            <nav className="sticky top-8 flex flex-col gap-0.5 text-[14px]">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    active === s.id ? "bg-code font-semibold text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {s.label}
                </a>
              ))}
              <a
                className="mt-3 rounded-lg px-3 py-1.5 text-muted transition hover:text-ink"
                href={changelogUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Changelog ↗
              </a>
            </nav>
          </aside>

          <article className="min-w-0 flex-1">
            <h1 className="text-[clamp(30px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em]">
              Documentation
            </h1>
            <p className="mt-4 max-w-[640px] text-[17px] leading-relaxed text-muted">
              Run Claude Code, Codex, OpenCode, Pi, Prime Agent, Hermes, DeepSeek Harness and Grok
              Build on Nebius Token Factory open models. One install, no edits to your real agent
              config.
            </p>
            <CopyBox className="mt-7 max-w-[640px]" text={installCommand} />

            <Section id="what-it-does" title="What it does">
              <P>
                Nebius Token Factory serves open models over an OpenAI-compatible API. It does not
                speak the Anthropic Messages API that Claude Code uses, nor the OpenAI Responses API
                that Codex uses. The relay runs a small local daemon that translates those wire
                formats to Nebius <Code>/chat/completions</Code> on the fly - your agent believes it
                is talking to its native backend, while every token is served by Nebius.
              </P>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Card title="Proxied harnesses">
                  Claude Code and Codex. The daemon translates each request and response, tracks
                  cost, retries transient failures, trims context to fit, and emulates native web
                  search.
                </Card>
                <Card title="Spawned harnesses">
                  Everything else. Launched with a generated provider config pointed at Nebius - no
                  proxy needed, since they already speak the OpenAI-compatible format.
                </Card>
              </div>
              <Callout>
                Nothing about your agent install changes. The relay injects a base URL and API key
                per session and writes nothing permanent to your agent's config.
              </Callout>
            </Section>

            <Section id="install" title="Install">
              <P>
                The one-liner installs <Code>nebiusrelay</Code> plus a short alias per harness into{" "}
                <Code>~/.nebiusrelay/bin/</Code>, and installs Bun for you if it is not already
                present.
              </P>
              <CopyBox className="mt-4" text={installCommand} />
              <P className="mt-5">First run walks you through configuration, or run it directly:</P>
              <CopyBox className="mt-3" text="nebiusrelay configure" />
              <P className="mt-5">You will be asked for two keys:</P>
              <Table head={["Key", "Where to get it", "Required"]}>
                <Row>
                  <Cell strong>Nebius API key</Cell>
                  <Cell>
                    <Link href={nebiusApiKeysUrl}>tokenfactory.nebius.com</Link>
                  </Cell>
                  <Cell>Yes</Cell>
                </Row>
                <Row>
                  <Cell strong>Tavily API key</Cell>
                  <Cell>
                    <Link href={tavilyUrl}>app.tavily.com</Link>
                  </Cell>
                  <Cell>Optional - enables web search</Cell>
                </Row>
              </Table>
              <Callout>
                Both are stored in <Code>~/.nebiusrelay/</Code> and never leave your machine. If the
                underlying agent CLI is not installed, the relay prints its official install command
                and exits - it never installs agents for you.
              </Callout>
            </Section>

            <Section id="harnesses" title="Harnesses">
              <P>
                Launch any of them directly. Extra arguments are passed straight through to the
                underlying agent.
              </P>
              <Table head={["Harness", "Command", "Mode", "Notes"]}>
                {harnesses.map(([name, cmd, mode, note]) => (
                  <Row key={cmd}>
                    <Cell strong>{name}</Cell>
                    <Cell>
                      <Code>{cmd}</Code>
                    </Cell>
                    <Cell>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[12px] font-medium ${
                          mode === "Proxied"
                            ? "bg-violet-soft text-violet"
                            : "bg-lime/25 text-lime-ink"
                        }`}
                      >
                        {mode}
                      </span>
                    </Cell>
                    <Cell>{note}</Cell>
                  </Row>
                ))}
              </Table>
              <CopyBox className="mt-5" text={'nclaude -p "explain this repo"'} />
            </Section>

            <Section id="commands" title="Commands">
              <Table head={["Command", "What it does"]}>
                {[
                  ["nebiusrelay", "Interactive launcher - pick a harness."],
                  ["nebiusrelay configure", "Set your API keys."],
                  ["nebiusrelay usage --last 7d", "Local spend by model and tool. Never uploaded."],
                  ["nebiusrelay update", "Update to the latest release now."],
                  ["nebiusrelay daemon install", "Start the daemon at login (launchd / systemd)."],
                  ["nebiusrelay daemon status", "Show auto-start status."],
                  ["nebiusrelay daemon stop", "Stop the running daemon."],
                  ["nebiusrelay chatgpt off", "Restore your previous Codex / ChatGPT config."],
                ].map(([cmd, what]) => (
                  <Row key={cmd}>
                    <Cell>
                      <Code>{cmd}</Code>
                    </Cell>
                    <Cell>{what}</Cell>
                  </Row>
                ))}
              </Table>
            </Section>

            <Section id="models" title="Models">
              <P>
                The model list is fetched live from Nebius at startup, so every model they serve is
                available and each model's vision support comes from the API's own modality field -
                never a hand-maintained list. Results are cached locally and fall back to a bundled
                snapshot when offline.
              </P>
              <Table head={["Model", "Best for", "Context", "Vision"]}>
                {models.map(([name, best, ctx, vision, isDefault]) => (
                  <Row key={name as string}>
                    <Cell strong>
                      {name}
                      {isDefault ? (
                        <span className="ml-2 rounded-full bg-lime/25 px-2 py-0.5 text-[11px] font-semibold text-lime-ink">
                          DEFAULT
                        </span>
                      ) : null}
                    </Cell>
                    <Cell>{best}</Cell>
                    <Cell>{ctx}</Cell>
                    <Cell>{vision}</Cell>
                  </Row>
                ))}
              </Table>
              <Callout>
                Claude Code and Codex are text-native, so image blocks are auto-routed to a
                vision-capable model. Switch models inside your agent, or with <Code>--model</Code>{" "}
                before the harness name.
              </Callout>
            </Section>

            <Section id="web-search" title="Web search">
              <P>
                Claude Code and Codex expose a native <Code>web_search</Code> tool. The relay backs
                it with Tavily: with a key configured, searches return real results with citations.
                Without one, a search returns a clear "TAVILY_API_KEY not set" message rather than
                failing silently. Nebius has no hosted search tool, so this is how agents get live
                web access.
              </P>
            </Section>

            <Section id="metering" title="Cost metering">
              <P>
                Claude and Codex are proxied, so the daemon meters every turn. The other harnesses
                hold the key and call Nebius directly, which is why they report $0.00.{" "}
                <Code>NEBIUSRELAY_METER=1</Code> points them at the daemon instead:
              </P>
              <CopyBox className="mt-4" text={'NEBIUSRELAY_METER=1 npi --print "..."'} />
              <pre className="mt-3 overflow-x-auto rounded-xl bg-code px-4 py-3 font-mono text-[13px] leading-relaxed text-muted">
                {
                  "Nebius TF Relay ▸ Launching Pi Code with Nebius Token Factory.\n[nebiusrelay cost] session total: $0.0056 (1,518 in, 69 out)"
                }
              </pre>
              <P className="mt-4">
                They then share the same client as everyone else - automatic model fallback, the
                per-model circuit breaker, transient-fault retries - and the real Nebius key stays
                inside the daemon, since the harness only ever sees a local session token. If the
                daemon is unreachable the launcher says so and connects directly, so metering can
                never be the reason a session fails to start.
              </P>
            </Section>

            <Section id="env" title="Environment">
              <Table head={["Variable", "Effect"]}>
                {envVars.map(([name, effect]) => (
                  <Row key={name}>
                    <Cell>
                      <Code>{name}</Code>
                    </Cell>
                    <Cell>{effect}</Cell>
                  </Row>
                ))}
              </Table>
            </Section>

            <Section id="agents" title="For AI agents">
              <P>
                An LLM-readable doc is published at <Link href={llmsUrl}>llms.txt</Link>. If you are
                an agent asked to install, configure or drive nebiusrelay - including headless -
                read that first. It covers install, configure, every command, the models, and
                headless usage patterns.
              </P>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 text-[14px] font-semibold text-white transition hover:brightness-110"
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source on GitHub
                  <ArrowUpRight />
                </a>
                <a
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-4 py-2.5 text-[14px] font-semibold text-ink transition hover:bg-code"
                  href={changelogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Changelog
                  <ArrowUpRight />
                </a>
              </div>
            </Section>
          </article>
        </div>
      </div>
    </main>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-14 scroll-mt-8">
      <h2 className="text-[24px] font-semibold tracking-[-0.01em] text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function P({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`max-w-[680px] text-[16px] leading-relaxed text-muted ${className}`}>
      {children}
    </p>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-code px-1.5 py-0.5 font-mono text-[13px] text-ink">
      {children}
    </code>
  );
}

function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      className="text-violet underline underline-offset-2 transition hover:text-ink"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-line p-4">
      <div className="text-[15px] font-semibold text-ink">{title}</div>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{children}</p>
    </div>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 max-w-[680px] rounded-xl border border-line bg-code/60 px-4 py-3 text-[14.5px] leading-relaxed text-muted">
      {children}
    </div>
  );
}

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-line">
      <table className="w-full border-collapse text-left text-[14.5px]">
        <thead>
          <tr className="border-b border-line bg-code/50">
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-[12.5px] font-semibold tracking-wide text-faint uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <tr className="border-b border-line last:border-0">{children}</tr>;
}

function Cell({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <td className={`px-4 py-2.5 align-top ${strong ? "font-semibold text-ink" : "text-muted"}`}>
      {children}
    </td>
  );
}

function CopyBox({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      className={`flex items-center gap-3 rounded-xl bg-[linear-gradient(150deg,var(--color-surface)_0%,var(--color-surface-2)_100%)] px-4 py-3 ${className}`}
    >
      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-[13.5px] whitespace-nowrap text-white/90">
        <span className="text-lime">$</span> {text}
      </code>
      <button
        type="button"
        className="shrink-0 rounded-lg bg-white/10 px-2.5 py-1.5 text-[12.5px] font-medium text-white/80 transition hover:bg-white/20"
        onClick={() => {
          void navigator.clipboard?.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function BrandMark() {
  return (
    <span className="relative flex size-8 items-center justify-center rounded-[9px] bg-ink">
      <span className="absolute inset-0 rounded-[9px] bg-[radial-gradient(120%_120%_at_20%_0%,rgba(198,241,53,.4)_0%,rgba(198,241,53,0)_55%)]" />
      <svg className="relative size-[18px]" viewBox="0 0 800 800" aria-hidden="true">
        <path
          fill="#c6f135"
          fillRule="evenodd"
          d="M165.29 165.29H517.36V400H400V517.36H282.65V634.72H165.29ZM282.65 282.65V400H400V282.65Z"
        />
        <path fill="#ffffff" d="M517.36 400H634.72V634.72H517.36Z" />
      </svg>
    </span>
  );
}

function ArrowUpRight() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H8M17 7v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
