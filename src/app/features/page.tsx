import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";
import { ProductFilm, ProductFrame } from "@/components/product-frame";

export const metadata: Metadata = { title: "Features", description: "Explore Termco's workspace, AI, remote environments, Git, workflows, and plugin architecture." };

const inventory = [
  ["Workspace", "Terminal sessions, panes, files, editor, LSP, search, command palette, and shortcuts."],
  ["Review", "Git status, staged changes, diff review, commit graph, and local Preview in the same project."],
  ["AI", "Provider-backed chat, tool approvals, workflows, managed agents, and external MCP access."],
  ["Environments", "Local projects, SSH rigs, remote files, containers, ports, logs, and forwarded Preview."],
  ["Composition", "Official, team, and user plugins with versioned contracts and independent releases."],
  ["Profiles", "Share team-level plugins and commands while keeping user control over the active composition."],
] as const;

export default function FeaturesPage() {
  return (
    <>
      <PageIntro kicker="The complete workspace" title="Tools change. The project stays put.">
        <p>Termco treats the project—not a terminal tab, AI conversation, or remote host—as the unit of work. Each capability appears around that shared context.</p>
      </PageIntro>

      <section className="feature-hero shell">
        <ProductFrame src="/screens/preview.png" alt="Termco showing local Preview next to Git changes" label="release/1.4 · local preview" priority />
        <div className="feature-hero-note"><span>One active project</span><strong>Source → runtime → review</strong></div>
      </section>

      <section className="feature-inventory shell" aria-label="Termco feature inventory">
        {inventory.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{text}</p></article>)}
      </section>

      <section id="workspace" className="feature-chapter shell">
        <div className="chapter-copy"><p className="kicker"><span />Workspace</p><h2>Move through the work, not between apps.</h2><p>Start a shell, edit a file, inspect diagnostics, search the project, review the diff, then run the result in Preview. The working directory and project state are already there.</p><ul className="check-list"><li><CheckIcon />Persistent shell sessions and pane layouts</li><li><CheckIcon />Editor, LSP, syntax, search, and file navigation</li><li><CheckIcon />Git changes, history, staging, commit, and diff surfaces</li></ul></div>
        <ProductFilm src="/media/workspace-tour.mp4" poster="/screens/workspace.png" caption="The Termco workspace moving through its built-in project surfaces." />
      </section>

      <section id="ai" className="feature-chapter reverse shell">
        <ProductFilm src="/media/managed-coding-agents.mp4" poster="/screens/managed-agent.png" caption="Starting and following a managed coding agent against the current project." />
        <div className="chapter-copy"><p className="kicker"><span />AI and agents</p><h2>Choose how assistance enters the project.</h2><p>Use a model provider in built-in chat, author repeatable workflows, launch a managed agent locally or over SSH, or expose scoped tools to an external MCP client.</p><ul className="check-list"><li><CheckIcon />Provider configuration before chat is offered</li><li><CheckIcon />Visible tool and file-change approvals</li><li><CheckIcon />Current project directory prefilled for managed agents</li></ul></div>
      </section>

      <section id="remote" className="feature-chapter dark-chapter shell">
        <div className="chapter-copy"><p className="kicker"><span />Remote systems</p><h2>Carry the workspace across the connection.</h2><p>SSH is a first-class rig, not a detached terminal session. Browse remote files, inspect containers, forward ports, open services, and run agents where the project lives.</p><Link className="text-link light" href="/docs#remote">Set up a remote rig <ArrowIcon /></Link></div>
        <ProductFilm src="/media/ssh-rig-and-container.mp4" poster="/screens/remote-agent.png" caption="Remote files and containers inside an SSH rig." />
      </section>

      <section id="plugins" className="feature-chapter shell">
        <div className="chapter-copy"><p className="kicker"><span />Plugin platform</p><h2>Change the feature, not the whole application.</h2><p>Plugins carry product capabilities behind explicit contracts. Official plugins update independently. Developers can create a new plugin, fork an existing one, replace its contribution, verify it, and roll back.</p><Link className="text-link" href="/docs#plugins">Read the plugin model <ArrowIcon /></Link></div>
        <ProductFilm src="/media/plugin-fork-replace.mp4" poster="/screens/plugins.png" caption="A plugin fork replacing an official contribution inside Termco." />
      </section>
    </>
  );
}
