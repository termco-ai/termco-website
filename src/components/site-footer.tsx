import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner shell">
        <span className="footer-brand"><Image src="/termco-icon.png" alt="" width={20} height={20} />Termco — the inspectable workspace</span>
        <nav className="footer-links" aria-label="Footer navigation"><Link href="/docs">Documentation</Link><a href="https://github.com/termco-ai/termco">GitHub</a><a href="https://github.com/termco-ai/termco/releases">Releases</a><a href="https://github.com/termco-ai/termco-plugin-releases/releases">Plugin releases</a></nav>
        <span className="footer-base">Apache-2.0 · termco.app · ai generated</span>
      </div>
    </footer>
  );
}
