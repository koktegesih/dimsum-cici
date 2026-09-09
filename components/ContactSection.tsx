import { storeInfo } from "@/data/store";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
import { offlineHoursLabel } from "@/lib/schedule";
import { MapPin, Smartphone, Clock7, ArrowRight } from "lucide-react";

const steps = [
  { num: 1, text: "Pilih menu dimsum favorit Anda" },
  { num: 2, text: "Klik tombol Pesan via WhatsApp" },
  { num: 3, text: "Konfirmasi pesanan & alamat pengiriman" },
  { num: 4, text: "Dimsum lezat siap diantar ke rumah Anda!" },
];

export default function ContactSection() {
  return (
    <section id="kontak" className="py-20 md:py-28 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-rose-700 tracking-widest uppercase mb-3">
            Kontak
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-3">
            Hubungi Kami
          </h2>
          <p className="text-stone-500 max-w-md mx-auto">
            Siap melayani pesanan Anda dengan sepenuh hati
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-stone-200/50 transition-[box-shadow,transform] duration-300 border border-stone-100 group hover:-translate-y-1">
            <div className="bg-rose-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-100 transition-colors">
              <MapPin className="w-6 h-6 text-rose-600" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-stone-800 mb-1.5 text-sm uppercase tracking-wide">
              Lokasi Lapak
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed">
              {storeInfo.address}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-stone-200/50 transition-[box-shadow,transform] duration-300 border border-stone-100 group hover:-translate-y-1">
            <div className="bg-amber-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 transition-colors">
              <Clock7 className="w-6 h-6 text-amber-600" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-stone-800 mb-1.5 text-sm uppercase tracking-wide">
              Jadwal Lapak
            </h3>
            <p className="text-stone-500 text-sm">{storeInfo.offlineDays}</p>
            <p className="text-stone-500 text-sm">{offlineHoursLabel}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-stone-200/50 transition-[box-shadow,transform] duration-300 border border-stone-100 group hover:-translate-y-1">
            <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-100 transition-colors">
              <Smartphone
                className="w-6 h-6 text-emerald-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-semibold text-stone-800 mb-1.5 text-sm uppercase tracking-wide">
              WhatsApp
            </h3>
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-medium text-sm transition-colors"
            >
              +{storeInfo.whatsapp}
            </a>
            <p className="text-stone-500 text-xs mt-1">
              {storeInfo.onlineOrder}
            </p>
          </div>
        </div>

        {/* How to Order */}
        <div className="mt-16 bg-linear-to-br from-stone-800 to-stone-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />

          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Cara Pemesanan
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={step.num} className="text-center relative">
                  <div className="bg-rose-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    {step.num}
                  </div>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    {step.text}
                  </p>
                  {i < steps.length - 1 && (
                    <ArrowRight
                      className="hidden md:block w-4 h-4 text-stone-500 absolute top-3 -right-3"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
