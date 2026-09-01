import type { Metadata } from "next";
import { DownloadIcon, GithubIcon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";
import { formatBytes, getLatestRelease, releaseFallback, type PlatformKey } from "@/lib/releases";

export const metadata: Metadata = { title: "Download", description: "Download the latest Termco release for macOS, Windows, or Linux." };

const platforms: Array<{ key: PlatformKey; family: string; label: string; note: string }> = [
  { key: "mac-arm", family: "macOS", label: "Apple silicon", note: "For M-series Macs · DMG" },
  { key: "mac-intel", family: "macOS", label: "Intel", note: "For Intel-based Macs · DMG" },
  { key: "windows", family: "Windows", label: "Windows installer", note: "Windows 10 or later · EXE" },
  { key: "appimage", family: "Linux", label: "AppImage", note: "Portable x86_64 application" },
  { key: "deb", family: "Linux", label: "Debian / Ubuntu", note: "x86_64 · DEB package" },
  { key: "rpm", family: "Linux", label: "Fedora / RHEL", note: "x86_64 · RPM package" },
];

export default async function DownloadPage() {
  const release = await getLatestRelease();
  return (
    <>
      <PageIntro kicker={`Current release · ${release?.version || "latest"}`} title="Download Termco.">
        <p>Choose the build for this computer. The application can update itself; feature plugins are checked and updated independently.</p>
      </PageIntro>

      <section className="download-shell shell">
        <div className="download-grid">
          {platforms.map(({ key, family, label, note }) => {
            const asset = release?.downloads[key];
            return (
              <a className={`download-row ${asset ? "" : "unavailable"}`} key={key} href={asset?.browser_download_url || release?.url || releaseFallback()}>
                <span className="download-platform">{family}</span>
                <span><strong>{label}</strong><small>{note}</small></span>
                <span className="download-size">{asset ? formatBytes(asset.size) : "Releases"}</span>
                <DownloadIcon />
              </a>
            );
          })}
        </div>
        <aside className="release-aside">
          <span className="story-index">Release channel</span><h2>{release?.name || "Latest Termco release"}</h2>
          <dl><div><dt>Version</dt><dd>{release?.version || "Current"}</dd></div><div><dt>Published</dt><dd>{release?.publishedAt ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(release.publishedAt)) : "GitHub"}</dd></div><div><dt>License</dt><dd>Apache-2.0</dd></div></dl>
          <a className="button button-secondary" href={release?.url || releaseFallback()}><GithubIcon />Release notes</a>
        </aside>
      </section>

      <section className="install-notes shell">
        <article><span>01</span><h2>Install the application</h2><p>Use the native installer for your platform. On first launch, Termco verifies and installs the current official plugin set.</p></article>
        <article><span>02</span><h2>Open a project</h2><p>Select a directory or launch Termco from the project context. Your workspace remains local unless you connect a remote rig.</p></article>
        <article><span>03</span><h2>Configure only what you use</h2><p>Add a model provider for AI, connect SSH when needed, and change the plugin composition from Settings.</p></article>
      </section>
    </>
  );
}
