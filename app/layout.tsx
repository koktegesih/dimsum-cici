import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { BodyFont } from "@/lib/fonts";
import { storeInfo } from "@/data/store";
import { products, formatPrice } from "@/data/products";
import "./globals.css";

const title = `${storeInfo.name} — Dimsum Segar & Lezat`;
const description =
  "Pesan dimsum segar berkualitas dengan cita rasa autentik. Dimsum Cici siap antar ke pintu Anda!";

export const metadata: Metadata = {
  metadataBase: new URL(storeInfo.url),
  title: {
    default: title,
    template: `%s | ${storeInfo.name}`,
  },
  description,
  keywords: [
    "dimsum",
    "dimsum mentai",
    "dimsum Timika",
    "dimsum Mimika",
    "dimsum Papua Tengah",
    "pesan dimsum online",
    storeInfo.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: storeInfo.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#be123c",
};

const prices = products.map((product) => product.price);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: storeInfo.name,
  description: storeInfo.description,
  url: storeInfo.url,
  telephone: `+${storeInfo.whatsapp}`,
  servesCuisine: ["Dimsum", "Chinese", "Asian"],
  priceRange: `${formatPrice(Math.min(...prices))} - ${formatPrice(Math.max(...prices))}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: storeInfo.address,
    addressRegion: "Papua Tengah",
    addressCountry: "ID",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "07:00",
      closes: "09:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "16:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    `https://www.instagram.com/${storeInfo.instagram.replace("@", "")}/`,
    `https://www.tiktok.com/${storeInfo.tiktok}`,
  ],
  hasMenu: {
    "@type": "Menu",
    hasMenuSection: {
      "@type": "MenuSection",
      name: "Dimsum",
      hasMenuItem: products.map((product) => ({
        "@type": "MenuItem",
        name: product.name,
        description: product.description,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "IDR",
        },
      })),
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${BodyFont.className} antialiased bg-white text-stone-900`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
