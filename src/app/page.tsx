/*
 * THESIS: Termco keeps every tool pointed at one working directory, so project
 * context survives the move from shell to code, review, agents, and remote work.
 * OWN-WORLD: terminal-dark surfaces, iris signal, prompt-led section markers,
 * boot output, and uncropped evidence from the real application.
 * STORY: name the context tax, show the unified workspace, tour real workflows,
 * expose the toolkit, then make installing and inspecting Termco straightforward.
 * FIRST VIEWPORT: plain thesis, platform-aware download, source access, a live
 * boot sequence, and the complete workspace capture.
 * FORM: a continuous command-line narrative with alternating product chapters,
 * not a catalogue of interchangeable SaaS cards.
 */
import Image from "next/image";
import Link from "next/link";
import { DownloadButton } from "@/components/download-button";
import { HomeTerminal } from "@/components/home-terminal";
import { ProductFilm } from "@/components/product-frame";
import { getLatestRelease, releaseFallback } from "@/lib/releases";

const withoutTermco = [
  ["Terminal app", "cd … again"],
  ["Editor", "find the file again"],
  ["Git client", "locate the diff again"],
  ["AI chat in a browser", "paste the context again"],
  ["SSH session", "re-orient again"],
] as const;

const withTermco = [
  ["Terminal · files · editor", "same directory"],
  ["Git review", "beside the change"],
  ["AI agents", "already have context"],
  ["Preview + containers", "one glance away"],
  ["Remote rigs over SSH", "same workspace model"],
] as const;

const facts = [
  ["No account, ever", "Install, open a folder, work."],
  ["Your AI provider", "Hosted, compatible, or fully local."],
  ["Open source", "Apache-2.0, end to end."],
  ["Forkable plugins", "Replace any part you disagree with."],
] as const;

const tools = [
  ["Workflows", "Repeatable project tasks"],
  ["MCP clients", "External clients, same context"],
  ["Port forwarding", "Remote services, local feel"],
  ["Containers", "Managed beside their code"],
  ["Protected secrets", "OS-protected, on-device"],
  ["LSP + search", "Editor feedback, fast search"],
  ["Team profiles", "Org security controls"],
  ["Independent updates", "Update only what changed"],
] as const;

const faqs = [
  ["Is Termco free?", "Yes. Open source under Apache-2.0 — the application, the plugin contracts, and the release process are all public."],
  ["Do I need an account?", "No. Install Termco and open a workspace — nothing is gated behind a login."],
  ["Which AI providers work?", "Whatever fits the project — hosted providers, compatible endpoints, or local models. External MCP clients can connect to the workspace too."],
  ["Where do my credentials live?", "On your device, behind OS-protected storage. They don't need to pass through Termco services."],
  ["How do updates work?", "The app and its plugins release independently. Update only what changed — and roll a plugin back any time."],
] as const;

export default async function Home() {
  const release = await getLatestRelease();
  const releaseUrl = release?.url || releaseFallback();
  const downloads = [
    ["macOS", "Apple Silicon & Intel", "Separate builds for both chips from the latest GitHub release.", "/download"],
    ["Windows", "x64 · WSL supported", "WSL projects work through the same workspace model.", release?.downloads.windows?.browser_download_url || releaseUrl],
    ["Linux", "AppImage · deb · rpm", "Pick the package format for your distribution.", release?.downloads.appimage?.browser_download_url || releaseUrl],
  ] as const;

  return (
    <div className="home-v3">
      <section className="v3-hero" id="top" aria-labelledby="home-title">
        <div className="v3-hero-glow" aria-hidden="true" />
        <div className="v3-hero-grid-lines" aria-hidden="true" />
        <div className="v3-shell v3-hero-grid">
          <div className="v3-hero-copy">
            <Link className="v3-release-badge" href="/changelog"><span />v{release?.version || "0.9"} · open source · no account required</Link>
            <h1 id="home-title">The whole project.<br /><em>One window.</em></h1>
            <p>Terminal, files, editor, Git review, AI agents, containers, and remote rigs — all pointed at the same working directory. Stop re-explaining your project to five different apps.</p>
            <div className="v3-hero-actions"><DownloadButton suffix=" — free" /><a className="button button-secondary" href="https://github.com/termco-ai/termco">Star on GitHub</a></div>
            <p className="v3-hero-meta">Apache-2.0 · macOS / Windows + WSL / Linux · your AI keys, your machine</p>
          </div>
          <HomeTerminal />
        </div>
        <div className="v3-shell">
          <figure className="v3-workspace">
            <figcaption><span aria-hidden="true" />orbit-api — terminal · files · editor · git · agents · preview</figcaption>
            <Image src="/screens/workspace.png" alt="The Termco workspace: terminal, file explorer, editor, and Git in one window" width={2880} height={1800} priority sizes="(max-width: 1440px) 100vw, 1380px" />
          </figure>
        </div>
      </section>

      <section className="v3-why" id="why" aria-labelledby="why-title">
        <div className="v3-shell">
          <p className="v3-prompt">$ why termco</p>
          <h2 id="why-title">Your context is the most expensive thing you rebuild every day.</h2>
          <div className="v3-comparison">
            <article className="v3-compare-before"><p>WITHOUT — the alt-tab loop</p><ul>{withoutTermco.map(([tool, task]) => <li key={tool}><span>{tool}</span><code>{task}</code></li>)}</ul></article>
            <span className="v3-compare-arrow" aria-hidden="true">→</span>
            <article className="v3-compare-after"><p>WITH — one workspace</p><ul>{withTermco.map(([tool, task]) => <li key={tool}><span>{tool}</span><code>{task}</code></li>)}</ul></article>
          </div>
          <ul className="v3-facts" aria-label="Termco project facts">{facts.map(([title, detail]) => <li key={title}><strong>{title}</strong><span>{detail}</span></li>)}</ul>
        </div>
      </section>

      <section className="v3-inside v3-shell" id="chapters" aria-labelledby="tour-title">
        <header className="v3-section-head"><p className="v3-prompt">$ termco --tour</p><h2 id="tour-title">Watch it work.</h2><p>Every capture below is the real application. No mockups.</p></header>

        <article className="v3-chapter">
          <div className="v3-chapter-copy"><span>01 / agents</span><h3>AI that shows its work.</h3><p>Chat, launch managed coding agents, or connect an MCP client — against the workspace you&apos;re looking at. Every tool call and file change stays visible, gated behind your approval.</p><code>your keys · your provider · even local models</code></div>
          <div className="v3-chapter-media"><ProductFilm src="/media/managed-coding-agents.mp4" poster="/screens/managed-agent.png" caption="A managed coding agent working in the current Termco project." /></div>
        </article>

        <article className="v3-chapter reverse">
          <div className="v3-chapter-media v3-still"><Image src="/screens/git-diff.png" alt="Git diff review beside the working tree" width={2880} height={1800} sizes="(max-width: 1040px) 100vw, 980px" /></div>
          <div className="v3-chapter-copy"><span>02 / git</span><h3>Review diffs where you made them.</h3><p>Git review lives beside the working tree. Checking an agent&apos;s change — or your own — means glancing sideways, not finding your place in another app.</p></div>
        </article>

        <article className="v3-chapter">
          <div className="v3-chapter-copy"><span>03 / preview</span><h3>See the app beside its code.</h3><p>Run a local service and open its Preview next to the editor. Change, glance, repeat — the loop never leaves the window.</p></div>
          <div className="v3-chapter-media v3-still"><Image src="/screens/preview.png" alt="Local preview rendering beside the code" width={2880} height={1800} sizes="(max-width: 1040px) 100vw, 980px" /></div>
        </article>

        <article className="v3-chapter reverse">
          <div className="v3-chapter-media"><ProductFilm src="/media/ssh-rig-and-container.mp4" poster="/screens/remote-agent.png" caption="A remote SSH rig and its container opened as a Termco workspace." /></div>
          <div className="v3-chapter-copy"><span>04 / remote</span><h3>Local feel. Remote reach.</h3><p>Connect an SSH rig, browse its files and containers, forward ports, hand the same directory to an agent. Only the machine changes.</p></div>
        </article>

        <article className="v3-chapter">
          <div className="v3-chapter-copy"><span>05 / plugins</span><h3>Fork the parts you disagree with.</h3><p>The whole runtime is plugins that release independently. Don&apos;t like how a piece works? Fork it, edit it, replace it — restore the original any time.</p><code className="v3-chip">fork → edit → verify → replace</code></div>
          <div className="v3-chapter-media"><ProductFilm src="/media/plugin-fork-replace.mp4" poster="/screens/plugins.png" caption="An official Termco plugin being forked, edited, verified, and replaced." /></div>
        </article>
      </section>

      <section className="v3-toolkit v3-shell" aria-label="More of the Termco toolkit"><ul className="v3-tool-grid">{tools.map(([name, description]) => <li key={name}><strong>{name}</strong><span>{description}</span></li>)}</ul></section>

      <section className="v3-download v3-shell" id="download" aria-labelledby="download-title">
        <p className="v3-prompt">$ termco --install</p>
        <header className="v3-split-head"><h2 id="download-title">Try it on a real project.</h2><p>Releases live on GitHub. Download, open a folder you actually work in, and see if the window feels smaller than five apps did.</p></header>
        <div className="v3-download-grid">{downloads.map(([platform, build, detail, href]) => <article key={platform}><span>{platform}</span><strong>{build}</strong><p>{detail}</p>{href.startsWith("/") ? <Link className="button button-primary" href={href}>Download for {platform}</Link> : <a className="button button-primary" href={href}>Download for {platform}</a>}</article>)}</div>
        <p className="v3-download-note">app: <a href="https://github.com/termco-ai/termco/releases">termco-ai/termco</a> · plugins: <a href="https://github.com/termco-ai/termco-plugin-releases/releases">termco-plugin-releases</a></p>
      </section>

      <section className="v3-faq v3-shell" id="faq" aria-labelledby="faq-title">
        <div className="v3-faq-layout">
          <header><p className="v3-prompt">$ man termco</p><h2 id="faq-title">Questions, answered.</h2><p>Anything else — open a discussion on GitHub. The whole project is public.</p></header>
          <div className="v3-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="v3-final" aria-labelledby="final-title">
        <div className="v3-final-glow" aria-hidden="true" />
        <div className="v3-shell v3-final-inner">
          <p className="v3-prompt">$ termco .</p>
          <h2 id="final-title">Open the project. Keep the context.</h2>
          <div><DownloadButton suffix=" — free" /><a className="button button-secondary" href="https://github.com/termco-ai/termco">Read the source</a></div>
        </div>
      </section>
    </div>
  );
}
