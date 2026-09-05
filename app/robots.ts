import type { MetadataRoute } from "next";
import { storeInfo } from "@/data/store";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${storeInfo.url}/sitemap.xml`,
  };
}
