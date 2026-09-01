/*
 * THESIS: Termco keeps the entire project in one inspectable window.
 * OWN-WORLD: terminal-dark surfaces, operational green, and real UI evidence.
 * STORY: context problem, unified workspace, workflow tour, install.
 * FIRST VIEWPORT: product thesis, download, source, terminal, real workspace.
 * FORM: continuous command-line narrative with alternating product chapters.
 */
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://termco.app"),
  title: { default: "Termco — The developer workspace that stays yours", template: "%s · Termco" },
  description: "A terminal-first workspace for code, Git, AI, containers, SSH, and independently updateable plugins.",
  applicationName: "Termco",
  keywords: ["terminal", "developer tools", "AI coding", "SSH", "containers", "plugins", "open source"],
  openGraph: {
    type: "website",
    siteName: "Termco",
    title: "Termco — One workspace from local shell to remote systems",
    description: "Terminal, files, code, Git, AI, containers, remote environments, and plugins in one inspectable workspace.",
    images: [{ url: "/screens/workspace.png", width: 2000, height: 1200, alt: "The Termco developer workspace" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/termco-icon.png", apple: "/termco-icon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#14151b", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
