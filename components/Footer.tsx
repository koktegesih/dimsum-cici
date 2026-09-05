import { Instagram, MapPin, PhoneCall } from "lucide-react";
import { storeInfo } from "@/data/store";
import { HeadingFont } from "@/lib/fonts";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-[2fr_1fr_0.8fr_1.5fr] gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`text-xl font-bold text-white ${HeadingFont.className}`}
              >
                {storeInfo.name}
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              {storeInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Menu Cepat
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#tentang"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Menu Dimsum
                </a>
              </li>
              <li>
                <a
                  href="#kontak"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Ikuti Kami
            </h4>
            <div className="flex items-center gap-4">
              <a
                href={`https://www.instagram.com/${storeInfo.instagram.replace("@", "")}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={`https://www.tiktok.com/${storeInfo.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Kontak
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{storeInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>+{storeInfo.whatsapp}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-400 text-sm">
              &copy; {currentYear} {storeInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
