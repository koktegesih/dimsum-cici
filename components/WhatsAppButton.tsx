"use client";

import { generateWhatsAppUrl } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function WhatsAppButton() {
  return (
    <a
      href={generateWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat via WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
      <span className="relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-full shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-200/60 transition-all hover:-translate-y-0.5">
        <WhatsAppIcon className="w-5 h-5" />
        <span className="text-sm font-semibold hidden sm:inline">
          Chat Kami
        </span>
      </span>
    </a>
  );
}
