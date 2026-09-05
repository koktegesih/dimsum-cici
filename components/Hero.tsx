import { storeInfo } from "@/data/store";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
import { HeadingFont } from "@/lib/fonts";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Rocket, Trophy, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-rose-50 via-amber-50 to-orange-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-100/60 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-125 h-125 bg-amber-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-orange-50/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-rose-100 rounded-full px-4 py-1.5 mb-8 shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-stone-600">
              Terima Pesanan Setiap Hari &mdash; Order Sekarang!
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={`${HeadingFont.className} text-5xl md:text-7xl lg:text-8xl text-rose-800 mb-6 leading-tight`}
          >
            {storeInfo.name}
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed font-light">
            {storeInfo.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#menu"
              className="w-full sm:w-auto px-8 py-3.5 text-white bg-rose-700 hover:bg-rose-800 font-semibold rounded-full text-base transition-all hover:shadow-xl hover:shadow-rose-200/50 hover:-translate-y-0.5"
            >
              Lihat Menu
            </a>
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 text-stone-700 bg-white hover:bg-stone-50 font-semibold rounded-full text-base transition-all shadow-sm border border-stone-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5 text-emerald-600" />
              Chat WhatsApp
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-3 text-rose-800" />
              <p className="text-xs font-medium text-stone-500 tracking-wide uppercase">
                Fresh Daily
              </p>
            </div>
            <div className="text-center">
              <Trophy className="w-8 h-8 mx-auto mb-3 text-rose-800" />
              <p className="text-xs font-medium text-stone-500 tracking-wide uppercase">
                Premium
              </p>
            </div>
            <div className="text-center">
              <Rocket className="w-8 h-8 mx-auto mb-3 text-rose-800" />
              <p className="text-xs font-medium text-stone-500 tracking-wide uppercase">
                Fast Delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
