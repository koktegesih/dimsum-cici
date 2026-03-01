import { storeInfo } from "@/data/store";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
import { HeadingFont } from "@/lib/fonts";
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
              Buka Hari Ini &mdash; Order Sekarang!
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
              <svg
                className="w-5 h-5 text-emerald-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
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
