import { Pacifico, Poppins } from "next/font/google";

export const HeadingFont = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
  display: "swap",
  preload: true,
});

export const BodyFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});
