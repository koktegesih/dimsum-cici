import type { Metadata } from "next";
import { BodyFont } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dimsum Cici — Dimsum Segar & Lezat",
  description:
    "Pesan dimsum segar berkualitas dengan cita rasa autentik. Dimsum Cici siap antar ke pintu Anda!",
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
      </body>
    </html>
  );
}
