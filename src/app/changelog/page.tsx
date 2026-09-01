import type { Metadata } from "next";
import { ExternalIcon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";
import { getRecentReleases } from "@/lib/releases";

export const metadata: Metadata = { title: "Changelog", description: "Recent Termco application releases and links to their verified GitHub artifacts." };

function shortNotes(notes: string) {
  return notes
    .split("\n")
    .map((line) => line
      .replace(/^[-*#\s]+/, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim())
    .filter((line) => line && !/^https?:\/\//i.test(line) && !/^full changelog\b/i.test(line))
    .slice(0, 4);
}

export default async function ChangelogPage() {
  const releases = await getRecentReleases(8);
  return (
    <>
      <PageIntro kicker="Release history" title="What changed in Termco.">
        <p>Application releases carry platform or contract changes. Compatible feature updates can arrive separately through the official plugin channel.</p>
      </PageIntro>
      <section className="changelog shell">
        {releases.length ? releases.map((release, index) => {
          const notes = shortNotes(release.notes);
          return <article key={release.version} className="release-entry"><div className="release-date"><span>{index === 0 ? "Current" : "Release"}</span><time>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(release.publishedAt))}</time></div><div className="release-body"><h2>{release.name}</h2>{notes.length ? <ul>{notes.map((note) => <li key={note}>{note}</li>)}</ul> : <p>Platform builds and update metadata published through the official release workflow.</p>}<a className="text-link" href={release.url}>Full release on GitHub <ExternalIcon /></a></div></article>;
        }) : <div className="release-empty"><h2>Release history is on GitHub.</h2><p>The live release feed could not be reached. Open the verified repository to see every build and note.</p><a className="button button-primary" href="https://github.com/termco-ai/termco/releases">View releases <ExternalIcon /></a></div>}
      </section>
    </>
  );
}
