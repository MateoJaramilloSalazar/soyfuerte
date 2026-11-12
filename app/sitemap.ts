import type { MetadataRoute } from "next";
import { routes, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
