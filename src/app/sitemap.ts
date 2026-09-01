import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/features", "/download", "/docs", "/changelog", "/about", "/faq"].map((path) => ({ url: `https://termco.app${path}`, changeFrequency: path === "/changelog" ? "weekly" : "monthly", priority: path === "" ? 1 : 0.7 }));
}
