export type ReleaseAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};

type GitHubRelease = {
  tag_name: string;
  name: string | null;
  html_url: string;
  published_at: string;
  body: string | null;
  assets: ReleaseAsset[];
};

export type PlatformKey = "mac-arm" | "mac-intel" | "windows" | "appimage" | "deb" | "rpm";

export type PublicRelease = {
  version: string;
  name: string;
  url: string;
  publishedAt: string;
  notes: string;
  downloads: Partial<Record<PlatformKey, ReleaseAsset>>;
};

const releasePage = "https://github.com/termco-ai/termco/releases/latest";

function isInstaller(asset: ReleaseAsset, suffix: string) {
  return asset.name.toLowerCase().endsWith(suffix) && !asset.name.endsWith(".blockmap");
}

function normalizeRelease(release: GitHubRelease): PublicRelease {
  const assets = release.assets ?? [];
  const macArm = assets.find((asset) => /arm64\.dmg$/i.test(asset.name));
  const macIntel = assets.find((asset) => isInstaller(asset, ".dmg") && !/arm64/i.test(asset.name));
  const windows = assets.find((asset) => isInstaller(asset, ".exe"));
  const appimage = assets.find((asset) => isInstaller(asset, ".appimage"));
  const deb = assets.find((asset) => isInstaller(asset, ".deb"));
  const rpm = assets.find((asset) => isInstaller(asset, ".rpm"));

  return {
    version: release.tag_name.replace(/^v/, ""),
    name: release.name || release.tag_name,
    url: release.html_url,
    publishedAt: release.published_at,
    notes: release.body || "",
    downloads: {
      "mac-arm": macArm,
      "mac-intel": macIntel,
      windows,
      appimage,
      deb,
      rpm,
    },
  };
}

export async function getLatestRelease(): Promise<PublicRelease | null> {
  try {
    const response = await fetch("https://api.github.com/repos/termco-ai/termco/releases/latest", {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    return normalizeRelease((await response.json()) as GitHubRelease);
  } catch {
    return null;
  }
}

export async function getRecentReleases(limit = 6): Promise<PublicRelease[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/termco-ai/termco/releases?per_page=${limit}`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 300 },
      },
    );
    if (!response.ok) return [];
    return ((await response.json()) as GitHubRelease[]).map(normalizeRelease);
  } catch {
    return [];
  }
}

export function releaseFallback() {
  return releasePage;
}

export function formatBytes(bytes: number) {
  return `${Math.round(bytes / 1024 / 1024)} MB`;
}
