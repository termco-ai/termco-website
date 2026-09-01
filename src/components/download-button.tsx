"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DownloadIcon } from "@/components/icons";
import type { PlatformKey, PublicRelease } from "@/lib/releases";

type DetectedPlatform = {
  key: PlatformKey | null;
  name: string;
};

type NavigatorWithArchitecture = Navigator & {
  userAgentData?: {
    getHighEntropyValues(hints: string[]): Promise<{ architecture?: string }>;
  };
};

async function detectPlatform(): Promise<DetectedPlatform | null> {
  const agent = navigator.userAgent.toLowerCase();
  if (agent.includes("win")) return { key: "windows", name: "Windows" };
  if (agent.includes("mac") || navigator.platform.toLowerCase().includes("mac")) {
    try {
      const architecture = await (navigator as NavigatorWithArchitecture).userAgentData?.getHighEntropyValues(["architecture"]);
      if (/arm|aarch64/i.test(architecture?.architecture || "")) return { key: "mac-arm", name: "macOS" };
      if (/x86|x64/i.test(architecture?.architecture || "")) return { key: "mac-intel", name: "macOS" };
    } catch {
      // Safari does not expose Mac architecture reliably; let the user choose.
    }
    return { key: null, name: "macOS" };
  }
  if (agent.includes("linux")) return { key: "appimage", name: "Linux" };
  return null;
}

export function DownloadButton({ compact = false, inverse = false, suffix = "" }: { compact?: boolean; inverse?: boolean; suffix?: string }) {
  const [release, setRelease] = useState<PublicRelease | null>(null);
  const [platform, setPlatform] = useState<DetectedPlatform | null>(null);

  useEffect(() => {
    let cancelled = false;
    detectPlatform().then((detected) => {
      if (!cancelled) setPlatform(detected);
    });
    fetch("/api/releases/latest")
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (!cancelled) setRelease(data); })
      .catch(() => { if (!cancelled) setRelease(null); });
    return () => { cancelled = true; };
  }, []);

  const asset = platform?.key ? release?.downloads[platform.key] : null;
  const label = compact ? `Download${platform ? ` for ${platform.name}` : ""}${suffix}` : `Download for ${platform?.name || "your platform"}${suffix}`;
  const className = `button button-primary${inverse ? " inverse" : ""}${compact ? " compact" : ""}`;

  if (asset) {
    return <a className={className} href={asset.browser_download_url}><DownloadIcon />{label}</a>;
  }

  return <Link className={className} href="/download"><DownloadIcon />{label}</Link>;
}
