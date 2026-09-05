import type { MetadataRoute } from "next";
import { storeInfo } from "@/data/store";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: storeInfo.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
