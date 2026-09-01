"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { DownloadButton } from "@/components/download-button";

const links = [
  ["/#why", "Why"],
  ["/#chapters", "Inside"],
  ["/#download", "Download"],
  ["/#faq", "FAQ"],
  ["https://github.com/termco-ai/termco", "GitHub"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="Termco home">
          <Image src="/termco-icon.png" alt="" width={28} height={28} priority />
          <span>termco<em>_</em></span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([href, label]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <DownloadButton compact />
          <button
            ref={menuButton}
            className="menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open ? <nav id="mobile-navigation" className="mobile-nav open" aria-label="Mobile navigation">
        {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link href="/docs" onClick={() => setOpen(false)}>Documentation</Link>
      </nav> : null}
    </header>
  );
}
