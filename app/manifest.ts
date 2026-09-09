import type { MetadataRoute } from "next";
import { storeInfo } from "@/data/store";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${storeInfo.name}: ${storeInfo.tagline}`,
    short_name: storeInfo.name,
    description: storeInfo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#c20039",
    lang: "id",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
