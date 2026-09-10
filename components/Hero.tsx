import Image from "next/image";
import { storeInfo } from "@/data/store";
import { products, priceLabel } from "@/data/products";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
import { HeadingFont } from "@/lib/fonts";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import LapakStatus from "@/components/LapakStatus";
import { Bike, ChefHat, ShieldCheck } from "lucide-react";

const highlights = [
  { icon: ChefHat, label: "Fresh Tiap Hari" },
  { icon: ShieldCheck, label: "Halal & Higienis" },
  { icon: Bike, label: "Antar ke Rumah" },
];

const heroProduct =
  products.find((product) => product.id === "cheddar") ?? products[0];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-rose-50 via-amber-50 to-orange-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-100/60 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-125 h-125 bg-amber-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-orange-50/40 rounded-full blur-3xl" />
      </div>

      {/* Memudarkan dasar hero ke putih agar menyatu dengan section menu. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-linear-to-b from-transparent to-white" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-20 md:pt-12 md:pb-24 lg:pt-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          {/* Copy */}
          <div className="text-center">
            <LapakStatus />

            <h1
              className={`${HeadingFont.className} text-5xl md:text-7xl text-rose-800 mb-6 leading-tight`}
            >
              {storeInfo.name}
            </h1>

            <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {storeInfo.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-center items-center">
              <a
                href="#menu"
                className="w-full sm:w-auto px-8 py-3.5 text-white bg-rose-700 hover:bg-rose-800 font-semibold rounded-full text-base transition-[background-color,box-shadow,transform] hover:shadow-xl hover:shadow-rose-200/50 hover:-translate-y-0.5"
              >
                Lihat Menu
              </a>
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 text-stone-700 bg-white hover:bg-stone-50 font-semibold rounded-full text-base transition-[background-color,box-shadow,transform] shadow-sm border border-stone-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-5 h-5 text-emerald-600" />
                Chat WhatsApp
              </a>
            </div>

            {/* Highlights */}
            <div className="mt-10 flex flex-wrap justify-center gap-x-6 sm:gap-x-10 gap-y-6 max-w-md mx-auto">
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="text-center">
                  <Icon
                    className="w-8 h-8 mx-auto mb-3 text-rose-800"
                    aria-hidden="true"
                  />
                  <p className="text-xs font-medium text-stone-600 tracking-wide uppercase">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Product photo */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div className="relative aspect-square rounded-4xl overflow-hidden border-8 border-white shadow-2xl shadow-rose-200/60">
              <Image
                src={heroProduct.image}
                alt={`${heroProduct.name} siap disantap`}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 384px, 448px"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl shadow-stone-300/40 border border-stone-100 px-5 py-3 text-center">
              <p className="text-xs text-stone-500">{heroProduct.name}</p>
              <p className="text-base font-bold text-rose-700">
                {priceLabel(heroProduct)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
