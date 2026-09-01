import type { Metadata } from "next";
import { GithubIcon, TerminalIcon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Documentation", description: "Start using Termco and understand its workspace, plugins, AI, and remote environment model." };

const sections = [
  ["Start", "Install Termco, open a project, and understand the workspace model.", "#getting-started"],
  ["Workspace", "Use terminal sessions, surfaces, files, editor, Git, Preview, and commands.", "#workspace"],
  ["AI", "Configure a provider, use chat, run workflows, and launch coding agents.", "#ai"],
  ["Remote", "Connect an SSH rig, work with remote files, containers, and forwarded ports.", "#remote"],
  ["Plugins", "Inspect, update, create, fork, replace, disable, and restore plugins.", "#plugins"],
  ["Security", "Understand local storage, permissions, approvals, and external access.", "#security"],
] as const;

export default function DocsPage() {
  return (
    <>
      <PageIntro kicker="Documentation" title="Understand the workspace, then make it yours.">
        <p>Termco combines familiar developer tools with a plugin runtime. These notes cover the mental model and the shortest path to productive use.</p>
      </PageIntro>

      <section className="docs-layout shell">
        <aside className="docs-nav"><strong>On this page</strong>{sections.map(([title, , href]) => <a href={href} key={title}>{title}</a>)}</aside>
        <div className="docs-content">
          <section id="getting-started"><p className="kicker"><span />Getting started</p><h2>Open the project you already have.</h2><p>Install the current build for your platform, start Termco, and choose a directory. The first launch installs the signed official plugin set. Later launches reuse that installation and only offer updates when versions change.</p><div className="command-block"><TerminalIcon /><code>termco /path/to/project</code><span>Open a project directly</span></div><p>The active directory becomes the default context for shells, file tools, built-in AI, workflows, and newly created managed agents.</p></section>

          <section id="workspace"><p className="kicker"><span />Workspace</p><h2>Rigs contain workspaces. Workspaces contain surfaces.</h2><p>A rig represents an environment: local or connected over SSH. Within it, a workspace binds a project directory to the tools and state you use around it. Surfaces are the visible work areas—terminal, editor, diff, Preview, and plugin-defined views.</p><div className="term-diagram"><div><strong>Rig</strong><span>environment + connection</span></div><i /><div><strong>Workspace</strong><span>project + state</span></div><i /><div><strong>Surface</strong><span>terminal · editor · preview</span></div></div></section>

          <section id="ai"><p className="kicker"><span />AI and agents</p><h2>Configure a provider before opening chat.</h2><p>Termco does not pretend a model is available before one is configured. Add a supported or OpenAI-compatible provider in Settings, test the connection, then choose the model used by chat and workflows.</p><ul><li><strong>Built-in chat</strong> uses workspace-aware tools with visible approval boundaries.</li><li><strong>Workflows</strong> package repeatable, reviewable sequences.</li><li><strong>Managed coding agents</strong> run locally or on an SSH rig using the active project directory by default.</li><li><strong>External clients</strong> connect through scoped MCP access you can revoke.</li></ul></section>

          <section id="remote"><p className="kicker"><span />Remote work</p><h2>Add SSH as a rig, not a disposable session.</h2><p>Create an SSH rig from the rig menu, configure its host and authentication, then connect. Termco exposes the same workspace surfaces against that environment where supported.</p><ol><li>Create or select the SSH rig.</li><li>Open the remote project directory.</li><li>Inspect files and running containers.</li><li>Forward a service port and open it in Preview.</li><li>Launch an agent against the remote working directory when needed.</li></ol></section>

          <section id="plugins"><p className="kicker"><span />Plugin platform</p><h2>Application updates and plugin updates are different.</h2><p>The main application owns the Electron host, security boundary, lifecycle, and platform contracts. Plugins own product capabilities behind those contracts and can be released independently when the host contract remains compatible.</p><div className="docs-comparison"><div><strong>Application release</strong><span>Electron runtime</span><span>native dependencies</span><span>platform APIs</span><span>contract changes</span></div><div><strong>Plugin release</strong><span>feature behavior</span><span>interface composition</span><span>commands and tools</span><span>compatible fixes</span></div></div><p>In Settings, inspect active and inactive plugins. A plugin can be disabled, restored, forked for local development, or replaced after verification.</p></section>

          <section id="security"><p className="kicker"><span />Security</p><h2>Keep boundaries explicit.</h2><p>Termco stores configured credentials locally using Electron safeStorage and the operating system’s protection mechanism. Tool calls, plugin sources, and external MCP access carry explicit approvals or scopes rather than relying on an invisible global permission.</p><ul><li>No required Termco account.</li><li>Termco does not collect product telemetry; configured third-party providers have their own data policies.</li><li>Plugin downloads are verified against the official release publisher.</li><li>MCP access uses revocable tokens and visible tool approval.</li></ul></section>

          <div className="docs-next"><div><span>Need implementation detail?</span><strong>The source is the final reference.</strong></div><a className="button button-secondary" href="https://github.com/termco-ai/termco"><GithubIcon />Open GitHub</a></div>
        </div>
      </section>
    </>
  );
}
