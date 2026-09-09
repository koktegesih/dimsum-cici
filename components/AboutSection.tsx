import Image from "next/image";
import { storeInfo } from "@/data/store";
import { CheckCircle2 } from "lucide-react";

const features = [
  {
    title: "Bahan Segar Berkualitas",
    desc: "Menggunakan bahan-bahan pilihan yang segar setiap hari.",
  },
  {
    title: "Resep Autentik",
    desc: "Perpaduan resep klasik dengan sentuhan rasa oriental.",
  },
  {
    title: "Higienis & Halal",
    desc: "Proses pembuatan yang higienis dan menggunakan bahan halal.",
  },
];

export default function AboutSection() {
  return (
    <section id="tentang" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-rose-700 tracking-widest uppercase mb-3">
            Tentang Kami
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
            Kenapa Pilih <span className="text-rose-700">{storeInfo.name}</span>
            ?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-linear-to-br from-rose-100 to-amber-100 rounded-3xl blur-2xl opacity-60" />
            <div className="relative bg-linear-to-br from-rose-50 to-amber-50 rounded-2xl p-8 flex items-center justify-center aspect-square max-h-105">
              <Image
                src="/images/logo-transparant.png"
                alt={`Logo ${storeInfo.name}`}
                width={320}
                height={320}
                className="rounded-2xl object-cover drop-shadow-xl"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-stone-500 mb-8 leading-relaxed text-base">
              {storeInfo.description}
            </p>

            <div className="space-y-5">
              {features.map((item) => (
                <div key={item.title} className="flex items-start gap-4 group">
                  <div className="shrink-0 mt-0.5">
                    <CheckCircle2
                      className="w-5 h-5 text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
