import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, GithubIcon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "About", description: "Why Termco is built as an open, composable developer workspace." };

export default function AboutPage() {
  return (
    <>
      <PageIntro kicker="About Termco" title="Developer tools should fit the project—not fragment it.">
        <p>Termco began with a simple constraint: the terminal is still the most honest center of developer work, but the project around it now spans source, services, remote infrastructure, and AI.</p>
      </PageIntro>

      <section className="about-mark shell"><div className="about-icon"><Image src="/termco-icon.png" width={420} height={420} alt="The Termco mark" priority /></div><div className="about-statement"><span className="story-index">The operating idea</span><h2>One stable platform.<br />Many replaceable capabilities.</h2><p>The application provides the secure host and shared contracts. Plugins compose the visible product. That separation lets a useful feature improve without forcing a full desktop reinstall—and lets developers inspect or replace what their workspace is made from.</p></div></section>

      <section className="principles shell">
        <article><span>01</span><h2>Project before tool</h2><p>The active project and environment are the continuity. Interfaces are temporary views into that work.</p></article>
        <article><span>02</span><h2>Control before magic</h2><p>AI, external access, and plugin changes are strongest when their boundaries remain visible.</p></article>
        <article><span>03</span><h2>Composition before lock-in</h2><p>A workspace should be extendable, replaceable, and understandable by the people who depend on it.</p></article>
        <article><span>04</span><h2>Open by default</h2><p>Termco is developed in public and licensed under Apache-2.0.</p></article>
      </section>

      <section className="about-open shell"><div><p className="kicker"><span />Built in the open</p><h2>Inspect the direction. Change the code.</h2><p>Follow releases, read the application and plugin runtime, or open an issue in the public repository.</p></div><div className="hero-actions"><a className="button button-primary" href="https://github.com/termco-ai/termco"><GithubIcon />View the source</a><Link className="button button-secondary" href="/docs">Read the docs <ArrowIcon /></Link></div></section>
    </>
  );
}
