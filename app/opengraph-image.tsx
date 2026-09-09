import { ImageResponse } from "next/og";
import { storeInfo } from "@/data/store";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${storeInfo.name}: ${storeInfo.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff1f2",
        backgroundImage:
          "linear-gradient(135deg, #fff1f2 0%, #fffbeb 55%, #fff7ed 100%)",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 128,
          fontWeight: 700,
          color: "#9f1239",
          letterSpacing: "-0.03em",
        }}
      >
        {storeInfo.name}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 40,
          color: "#57534e",
          textAlign: "center",
        }}
      >
        {storeInfo.tagline}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 56,
          fontSize: 28,
          fontWeight: 600,
          color: "#ffffff",
          backgroundColor: "#c20039",
          padding: "18px 44px",
          borderRadius: 999,
        }}
      >
        Pesan via WhatsApp
      </div>
    </div>,
    { ...size },
  );
}
