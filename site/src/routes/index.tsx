import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const installCommand = "curl -fsSL https://nebius-tf-relay.vercel.app/install.sh | sh";
const githubUrl = "https://github.com/shivaylamba/nebius-tf-relay";
const docsUrl = "https://github.com/shivaylamba/nebius-tf-relay/blob/main/README.md";
const nebiusApiKeysUrl = "https://tokenfactory.nebius.com/?modals=create-api-key";
const tavilyKeysUrl = "https://app.tavily.com";
const llmsUrl = "/llms.txt";

type Agent = {
  name: string;
  command: string;
  status: "Stable" | "Beta";
  mark: ReactNode;
  blurb: string;
};

const agents: Agent[] = [
  {
    name: "Claude Code",
    command: "nclaude",
    status: "Beta",
    mark: <ClaudeMark />,
    blurb:
      "Routes Claude Code through a local Anthropic-to-Nebius translation proxy. Your subscription, login, and config stay untouched.",
  },
  {
    name: "Codex CLI",
    command: "ncodex",
    status: "Stable",
    mark: <CodexMark />,
    blurb:
      "Talks to Nebius through a local Responses-to-chat proxy, with headless exec support. Sessions stay resumable across providers.",
  },
  {
    name: "OpenCode",
    command: "nopencode",
    status: "Stable",
    mark: <OpenCodeMark />,
    blurb:
      "Launches with Nebius wired in as an OpenAI-compatible provider, injected only for that run. Close it and your setup is exactly as it was.",
  },
  {
    name: "Pi Code",
    command: "npi",
    status: "Stable",
    mark: <PiMark />,
    blurb:
      "Starts with a custom Nebius provider and a temporary config directory, while normal local session history keeps persisting.",
  },
  {
    name: "Prime Agent",
    command: "nprime",
    status: "Beta",
    mark: <PrimeMark />,
    blurb:
      "PrimeIntellect's RLM agent, with its persistent IPython tool and subagents running on Nebius models. Your own Prime config stays untouched.",
  },
];

const steps = [
  {
    title: "Install once",
    body: (
      <>
        Run the one-liner. It drops <code>nebiusrelay</code> plus <code>nclaude</code>,{" "}
        <code>ncodex</code>, <code>nopencode</code>, <code>npi</code>, and <code>nprime</code> onto
        your PATH and installs Bun if you don&apos;t have it.
      </>
    ),
  },
  {
    title: "Add your keys",
    body: (
      <>
        On first run, <code>nebiusrelay configure</code> asks for your{" "}
        <a className="link" href={nebiusApiKeysUrl} target="_blank" rel="noopener noreferrer">
          Nebius Token Factory
        </a>{" "}
        key and an optional{" "}
        <a className="link" href={tavilyKeysUrl} target="_blank" rel="noopener noreferrer">
          Tavily
        </a>{" "}
        key for live web search.
      </>
    ),
  },
  {
    title: "Launch an agent",
    body: (
      <>
        Type <code>nclaude</code> or <code>ncodex</code> and keep working. The Relay injects Nebius
        settings for that run only. Nothing is written to your real agent config.
      </>
    ),
  },
];

const features = [
  {
    title: "One relay, five harnesses",
    body: "Claude Code, Codex, OpenCode, Pi Code, and Prime Agent all run on Nebius open models through a single local install.",
  },
  {
    title: "Live web search, built in",
    body: "The proxy emulates native web_search with Tavily and streams real Anthropic citation blocks straight into your agent.",
  },
  {
    title: "Cost tracking per session",
    body: "Every turn is metered against the model's real per-token rates and printed as a running total when you exit.",
  },
  {
    title: "Config-free & self-updating",
    body: "Nothing rewrites your agent config files. The installed binary keeps itself current from the release site.",
  },
];

const stats = [
  { value: "5", label: "coding agents" },
  { value: "1", label: "install command" },
  { value: "0", label: "config files rewritten" },
];

const modelHighlights = [
  { name: "Kimi K3", note: "default coding" },
  { name: "Kimi K2.6", note: "vision" },
  { name: "DeepSeek V4 Flash", note: "fast 1M context" },
  { name: "DeepSeek V4 Pro", note: "long-context reasoning" },
  { name: "Qwen 3.5", note: "flagship" },
];

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "select">("idle");
  const [release, setRelease] = useState<{ version?: string; age?: string }>({});
  const commandRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch("/latest.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((m: { version?: string; publishedAt?: string }) => {
        setRelease({
          version: m.version ? `v${m.version}` : undefined,
          age: formatReleaseAge(m.publishedAt) ?? undefined,
        });
      })
      .catch(() => {});
  }, []);

  const handleCopy = async () => {
    try {
      await copyText(installCommand);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1500);
    } catch {
      const node = commandRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNode(node);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
      setCopyState("select");
      window.setTimeout(() => setCopyState("idle"), 1800);
    }
  };

  const releaseLabel =
    [release.version, release.age].filter(Boolean).join(" · ") || "auto-updating";

  return (
    <div className="min-h-screen bg-white">
      {/* subtle top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_100%_at_50%_-10%,#f1f0ff_0%,rgba(255,255,255,0)_70%)]"
      />

      <div className="mx-auto max-w-[1120px] px-6 max-[520px]:px-4">
        {/* NAV */}
        <header className="flex items-center gap-3 py-5">
          <a href="/" className="flex items-center gap-2.5">
            <BrandMark />
            <span className="flex items-baseline gap-1.5">
              <span className="text-[15.5px] font-semibold tracking-tight text-ink">
                Nebius TF Relay
              </span>
            </span>
          </a>
          <nav className="ml-auto flex items-center gap-1 text-[14px] font-medium text-muted">
            <a
              className="hidden rounded-lg px-3 py-2 transition hover:bg-code hover:text-ink sm:block"
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
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
              className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-violet px-3.5 py-2 text-[13.5px] font-semibold text-white shadow-[0_1px_2px_rgba(10,10,10,.14),0_8px_20px_-8px_rgba(106,92,243,.7)] transition hover:brightness-[1.06] active:scale-[.98]"
              href={nebiusApiKeysUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get API key
              <ArrowUpRight />
            </a>
          </nav>
        </header>

        {/* HERO */}
        <section className="pt-14 pb-6 text-center max-[520px]:pt-10">
          <a
            href={nebiusApiKeysUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/80 py-1.5 pr-3.5 pl-1.5 text-[13px] font-medium text-muted shadow-[0_1px_2px_rgba(10,10,10,.04)] backdrop-blur transition hover:text-ink"
          >
            <img
              src="/nebius-token-factory.png"
              alt=""
              aria-hidden="true"
              className="size-5 rounded-full"
            />
            Powered by Nebius Token Factory
            <span className="text-faint">·</span>
            <span className="text-ink">open models</span>
          </a>

          <h1 className="mx-auto max-w-[860px] text-balance text-[clamp(36px,6.4vw,60px)] font-semibold leading-[1.04] tracking-[-0.02em] text-ink">
            Run your coding agents on{" "}
            <span className="relative whitespace-nowrap">
              Nebius Token Factory
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-[10px] rounded-full bg-lime/70"
                style={{ zIndex: -1 }}
              />
            </span>
          </h1>
          <p className="mx-auto mt-6 mb-9 max-w-[600px] text-pretty text-[18.5px] leading-relaxed text-muted">
            A local relay that points Claude Code, Codex, OpenCode, Pi Code, and Prime Agent at open
            models on Nebius Token Factory, including Kimi, Qwen, MiniMax, and DeepSeek V4, with
            short commands and zero edits to your real tool config.
          </p>

          {/* dark install card: the focal surface */}
          <div className="mx-auto max-w-[680px]">
            <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(150deg,var(--color-surface)_0%,var(--color-surface-2)_100%)] p-2 shadow-[0_1px_2px_rgba(10,10,10,.1),0_30px_60px_-30px_rgba(10,15,30,.6)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 right-6 size-40 rounded-full bg-lime/18 blur-3xl"
              />
              <div className="flex items-center gap-1.5 px-3 pt-1.5 pb-2">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="ml-2 font-mono text-[11.5px] tracking-wide text-white/40">
                  install.sh
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-black/25 px-4 py-3.5 text-left ring-1 ring-white/[.06] max-[560px]:flex-col max-[560px]:items-stretch">
                <span className="select-none font-mono text-[15px] text-lime">$</span>
                <code
                  ref={commandRef}
                  className="min-w-0 flex-1 overflow-x-auto font-mono text-[13.5px] leading-snug whitespace-nowrap text-white/90 max-[560px]:text-[12.5px]"
                >
                  {installCommand}
                </code>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy install command"
                  className="inline-flex min-w-[92px] cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 font-sans text-[13px] font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15 active:scale-95 data-[copied=true]:bg-lime data-[copied=true]:text-ink data-[copied=true]:ring-lime"
                  data-copied={copyState === "copied"}
                >
                  {copyState === "copied" ? (
                    <>
                      <CheckMark /> Copied
                    </>
                  ) : copyState === "select" ? (
                    "Press ⌘C"
                  ) : (
                    <>
                      <CopyMark /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>
            <p className="mt-3 text-[13px] text-faint">
              macOS &amp; Linux · installs Bun if needed · stays up to date ({releaseLabel})
            </p>
          </div>

          {/* agent command pills */}
          <div className="mx-auto mt-9 flex max-w-[640px] flex-wrap items-center justify-center gap-2.5">
            {agents.map((a) => (
              <div
                key={a.command}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white py-1.5 pr-3.5 pl-2 text-[13.5px] shadow-[0_1px_2px_rgba(10,10,10,.03)]"
              >
                <span className="flex size-6 items-center justify-center text-ink">{a.mark}</span>
                <span className="font-mono font-medium text-ink">{a.command}</span>
              </div>
            ))}
          </div>

          {/* stats */}
          <div className="mx-auto mt-10 grid max-w-[560px] grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-line-strong bg-canvas px-4 py-3.5 text-left"
              >
                <div className="text-[26px] font-semibold leading-none text-ink tabular-nums">
                  {s.value}
                </div>
                <div className="mt-1.5 text-[12.5px] font-medium leading-snug text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-7 max-w-[780px] rounded-2xl border border-line-strong bg-white px-4 py-3 shadow-[0_1px_2px_rgba(10,10,10,.03)]">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {modelHighlights.map((model) => (
                <span
                  key={model.name}
                  className="inline-flex items-center gap-2 rounded-full bg-code px-3 py-1.5 text-[12.5px] text-muted"
                >
                  <span className="font-semibold text-ink">{model.name}</span>
                  <span className="text-faint">·</span>
                  <span>{model.note}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* START / HOW IT WORKS */}
        <section className="mt-20 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <div className="rounded-2xl border border-line-strong bg-white p-7 max-[520px]:p-6">
            <SectionEyebrow>Start relaying</SectionEyebrow>
            <h2 className="mt-3 mb-6 text-[24px] font-semibold tracking-tight text-ink">
              Three commands from zero to running.
            </h2>
            <ol className="flex flex-col gap-5">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-ink text-[13px] font-semibold text-white tabular-nums">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[15.5px] font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-muted [&_a.link]:font-medium [&_a.link]:text-violet [&_a.link]:underline [&_a.link]:decoration-violet/30 [&_a.link]:underline-offset-2 hover:[&_a.link]:decoration-violet [&_code]:rounded [&_code]:bg-code [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-ink">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* dark accent card: echoes the dashboard's dedicated-endpoints panel */}
          <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(155deg,var(--color-surface)_0%,var(--color-surface-2)_100%)] p-7 max-[520px]:p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -right-10 size-56 rounded-full bg-violet/25 blur-3xl"
            />
            <div className="relative">
              <h3 className="text-[26px] font-semibold leading-tight tracking-tight text-lime">
                One key.
                <br />
                Every agent.
              </h3>
              <p className="mt-4 max-w-[280px] text-[14.5px] leading-relaxed text-white/65">
                One Nebius Token Factory key powers all five agents through a single local proxy.
                The model list is pulled live from Nebius, with bundled fallbacks for new DeepSeek
                V4 models while regional catalogs catch up.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Kimi K3", "Kimi K2.6", "DeepSeek V4 Flash", "DeepSeek V4 Pro", "Qwen 3.5"].map(
                  (m) => (
                    <span
                      key={m}
                      className="rounded-full bg-white/[.08] px-3 py-1.5 font-mono text-[12px] text-white/75 ring-1 ring-white/10"
                    >
                      {m}
                    </span>
                  ),
                )}
              </div>
              <a
                href={nebiusApiKeysUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-1.5 rounded-lg bg-lime px-4 py-2.5 text-[13.5px] font-semibold text-ink transition hover:brightness-[1.03] active:scale-[.98]"
              >
                Get a Token Factory key
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </section>

        {/* AGENT GRID */}
        <section className="mt-20">
          <SectionEyebrow>Supported harnesses</SectionEyebrow>
          <h2 className="mt-3 mb-7 max-w-[620px] text-[26px] font-semibold tracking-tight text-ink">
            The coding agents you already use, on open models.
          </h2>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {agents.map((a) => (
              <article
                key={a.name}
                className="group flex flex-col rounded-2xl border border-line-strong bg-white p-6 transition hover:border-faint hover:shadow-[0_1px_2px_rgba(10,10,10,.04),0_16px_40px_-24px_rgba(10,15,30,.28)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-line-strong bg-canvas text-ink">
                    {a.mark}
                  </span>
                  <StatusBadge status={a.status} />
                </div>
                <div className="mt-4 flex items-baseline gap-2.5">
                  <h3 className="text-[17px] font-semibold text-ink">{a.name}</h3>
                  <code className="font-mono text-[13px] text-violet">{a.command}</code>
                </div>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{a.blurb}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="mt-20">
          <SectionEyebrow>Why route through the Relay</SectionEyebrow>
          <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-line-strong bg-white p-5">
                <span className="mb-4 block h-1 w-8 rounded-full bg-lime" />
                <h3 className="text-[15px] font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="mt-20 mb-6 overflow-hidden rounded-2xl border border-line-strong bg-canvas px-8 py-12 text-center max-[520px]:px-5">
          <h2 className="mx-auto max-w-[560px] text-balance text-[28px] font-semibold tracking-tight text-ink">
            Point your agents at Nebius in one line.
          </h2>
          <p className="mx-auto mt-3 mb-7 max-w-[480px] text-[15px] leading-relaxed text-muted">
            Free to install, config-free, and reversible. Your subscriptions and logins stay exactly
            where they are.
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2.5 rounded-xl bg-ink px-5 py-3 font-mono text-[13.5px] text-white shadow-[0_1px_2px_rgba(10,10,10,.14),0_16px_40px_-20px_rgba(10,15,30,.6)] transition hover:brightness-110 active:scale-[.98]"
          >
            <span className="text-lime">$</span>
            <span className="max-[520px]:hidden">
              curl -fsSL nebius-tf-relay.vercel.app/install.sh | sh
            </span>
            <span className="hidden max-[520px]:inline">curl … | sh</span>
            <span className="ml-1 text-white/50">{copyState === "copied" ? "✓" : "⧉"}</span>
          </button>
        </section>

        {/* FOOTER */}
        <footer className="mt-4 flex flex-col gap-4 border-t border-line py-8 text-[13px] text-muted sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <BrandMark />
            <span className="font-semibold text-ink">Nebius TF Relay</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:ml-auto">
            <a
              className="transition hover:text-ink"
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
            </a>
            <a
              className="transition hover:text-ink"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="transition hover:text-ink"
              href={llmsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              llms.txt
            </a>
            <a
              className="transition hover:text-ink"
              href={nebiusApiKeysUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Nebius keys
            </a>
            <span className="text-faint">MIT licensed</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ---------- small pieces ---------- */

function SectionEyebrow({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] text-violet uppercase">
      <span className="size-1.5 rounded-full bg-lime" />
      {children}
    </span>
  );
}

function StatusBadge({ status }: Readonly<{ status: "Stable" | "Beta" }>) {
  const stable = status === "Stable";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase"
      style={{
        background: stable ? "rgba(198,241,53,.16)" : "rgba(106,92,243,.1)",
        color: stable ? "var(--color-lime-ink)" : "var(--color-violet)",
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ background: stable ? "#7fae00" : "var(--color-violet)" }}
      />
      {status === "Stable" ? "Supported" : "Beta"}
    </span>
  );
}

function BrandMark() {
  return (
    <span className="relative flex size-8 items-center justify-center rounded-[9px] bg-ink">
      <span className="absolute inset-0 rounded-[9px] bg-[radial-gradient(120%_120%_at_20%_0%,rgba(198,241,53,.4)_0%,rgba(198,241,53,0)_55%)]" />
      <PiMarkWhite />
    </span>
  );
}

function PiMarkWhite() {
  return (
    <svg className="relative size-[18px]" viewBox="0 0 800 800" aria-hidden="true">
      <path
        fill="#c6f135"
        fillRule="evenodd"
        d="M165.29 165.29H517.36V400H400V517.36H282.65V634.72H165.29ZM282.65 282.65V400H400V282.65Z"
      />
      <path fill="#ffffff" d="M517.36 400H634.72V634.72H517.36Z" />
    </svg>
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

function OpenCodeMark() {
  return (
    <svg className="h-6 w-[19px]" viewBox="0 0 240 300" fill="none" aria-hidden="true">
      <path d="M180 240H60V120H180V240Z" fill="#CFCECD" />
      <path d="M180 60H60V240H180V60ZM240 300H0V0H240V300Z" fill="#211E1E" />
    </svg>
  );
}

function ClaudeMark() {
  return (
    <svg className="size-[22px]" viewBox="0 0 1200 1200" aria-hidden="true">
      <path
        fill="#d97757"
        d="M233.96 800.215 468.644 668.537l3.947-11.436-3.947-6.363h-11.436l-39.221-2.416-134.094-3.624-116.296-4.832-112.671-6.04-28.349-6.041L0 592.752l2.738-17.477 23.839-16.027 34.148 2.98 75.463 5.155 113.235 7.812 82.148 4.832 121.691 12.644h19.329l2.738-7.812-6.604-4.832-5.154-4.832-117.182-79.41-126.846-83.919-66.442-48.322-35.92-24.483-18.12-22.953-7.813-50.094 32.617-35.92 43.812 2.98 11.195 2.98 44.376 34.148 94.792 73.369 123.785 91.168 18.121 15.06 7.248-5.154.886-3.624-8.134-13.611-67.329-121.691-71.839-123.785-31.973-51.302-8.456-30.765c-2.98-12.644-5.154-23.275-5.154-36.241L312.322 13.208l20.537-6.604 49.53 6.604 20.859 18.121 30.765 70.389 49.852 110.819 77.316 150.684 22.631 44.698 12.08 41.396 4.511 12.645h7.812v-7.248l6.362-84.886 11.759-104.215 11.436-134.094 3.946-37.772 18.685-45.262L697.53 24l28.993 13.852L750.363 72l-3.302 22.067-14.175 92.134-27.785 144.322-18.121 96.645h10.55l12.081-12.081 48.886-64.912 82.148-102.685 36.241-40.752 42.282-45.02 27.141-21.423h51.302l37.772 56.134-16.913 57.987-52.832 67.007-43.812 56.778-62.819 84.564-39.221 67.651 3.624 5.396 9.342-.886 141.906-30.201 76.671-13.852 91.49-15.705 41.396 19.329 4.51 19.651-16.268 40.188-97.852 24.161-114.765 22.953-170.899 40.429-2.094 1.53 2.416 2.98 76.993 7.248 32.94 1.772h80.617l150.121 11.195 39.221 25.933 23.517 31.732-3.946 24.161-60.403 30.765-81.503-19.329-190.228-45.262-65.235-16.268h-9.02v5.396l54.362 53.154 99.624 89.96 124.752 115.973 6.362 28.671-16.027 22.631-16.912-2.416-109.611-82.47-42.282-37.127-95.758-80.618h-6.363v8.456l22.067 32.295 116.537 175.168 6.04 53.718-8.456 17.476-30.201 10.55-33.181-6.04-68.215-95.758-70.389-107.839-56.779-96.644-6.926 3.946-33.503 360.886-15.705 18.443L565.53 1200l-30.201-22.953-16.027-37.127 16.027-73.369 19.329-95.758 15.705-76.107 14.174-94.55 8.456-31.41-.563-2.095-6.927.886-71.275 97.852-108.402 146.497-85.772 91.812-20.537 8.134-35.597-18.443 3.302-32.939 19.893-29.316 118.711-151.007 71.597-93.583 46.228-54.04-.323-7.812h-2.738L205.289 929.396l-56.135 7.248-24.161-22.63 2.98-37.128 11.436-12.081 94.792-65.234-.322.322Z"
      />
    </svg>
  );
}

function CodexMark() {
  return (
    <svg
      className="size-[24px]"
      viewBox="2 2.7 20 18.7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <title>Codex</title>
      <path
        d="M9.064 3.344a4.578 4.578 0 012.285-.312c1 .115 1.891.54 2.673 1.275.01.01.024.017.037.021a.09.09 0 00.043 0 4.55 4.55 0 013.046.275l.047.022.116.057a4.581 4.581 0 012.188 2.399c.209.51.313 1.041.315 1.595a4.24 4.24 0 01-.134 1.223.123.123 0 00.03.115c.594.607.988 1.33 1.183 2.17.289 1.425-.007 2.71-.887 3.854l-.136.166a4.548 4.548 0 01-2.201 1.388.123.123 0 00-.081.076c-.191.551-.383 1.023-.74 1.494-.9 1.187-2.222 1.846-3.711 1.838-1.187-.006-2.239-.44-3.157-1.302a.107.107 0 00-.105-.024c-.388.125-.78.143-1.204.138a4.441 4.441 0 01-1.945-.466 4.544 4.544 0 01-1.61-1.335c-.152-.202-.303-.392-.414-.617a5.81 5.81 0 01-.37-.961 4.582 4.582 0 01-.014-2.298.124.124 0 00.006-.056.085.085 0 00-.027-.048 4.467 4.467 0 01-1.034-1.651 3.896 3.896 0 01-.251-1.192 5.189 5.189 0 01.141-1.6c.337-1.112.982-1.985 1.933-2.618.212-.141.413-.251.601-.33.215-.089.43-.164.646-.227a.098.098 0 00.065-.066 4.51 4.51 0 01.829-1.615 4.535 4.535 0 011.837-1.388zm3.482 10.565a.637.637 0 000 1.272h3.636a.637.637 0 100-1.272h-3.636zM8.462 9.23a.637.637 0 00-1.106.631l1.272 2.224-1.266 2.136a.636.636 0 101.095.649l1.454-2.455a.636.636 0 00.005-.64L8.462 9.23z"
        fill="url(#codex-mark-gradient)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="codex-mark-gradient"
          x1="12"
          x2="12"
          y1="3"
          y2="21"
        >
          <stop stopColor="#B1A7FF" />
          <stop offset=".5" stopColor="#7A9DFF" />
          <stop offset="1" stopColor="#3941FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function PiMark() {
  return (
    <svg className="size-[22px]" viewBox="0 0 800 800" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M165.29 165.29H517.36V400H400V517.36H282.65V634.72H165.29ZM282.65 282.65V400H400V282.65Z"
      />
      <path fill="currentColor" d="M517.36 400H634.72V634.72H517.36Z" />
    </svg>
  );
}
function PrimeMark() {
  // Recursive/nested squares: the RLM idea of agents spawning agents.
  return (
    <svg className="size-[22px]" viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="7.25"
        y="7.25"
        width="9.5"
        height="9.5"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect x="10.75" y="10.75" width="2.5" height="2.5" rx="0.6" fill="currentColor" />
    </svg>
  );
}

function CopyMark() {
  return (
    <svg className="size-[14px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 15.5V6.8C5 5.8 5.8 5 6.8 5h8.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg className="size-[14px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4.2 4L19 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {}
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    if (!document.execCommand("copy")) throw new Error("Copy command failed");
  } finally {
    document.body.removeChild(textarea);
  }
}

function formatReleaseAge(publishedAt: string | undefined) {
  if (!publishedAt) return null;
  const timestamp = new Date(publishedAt).getTime();
  if (!Number.isFinite(timestamp)) return null;
  const diffMs = Math.max(0, Date.now() - timestamp);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  if (diffMs < minute) return "just now";
  if (diffMs < hour) return `${Math.floor(diffMs / minute)}m ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)}h ago`;
  if (diffMs < week) return `${Math.floor(diffMs / day)}d ago`;
  return `${Math.floor(diffMs / week)}w ago`;
}
