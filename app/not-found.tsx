import Link from "next/link";
import { storeInfo } from "@/data/store";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
import { HeadingFont } from "@/lib/fonts";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-rose-50 via-amber-50 to-orange-50 px-4 py-16">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold text-rose-700 tracking-widest uppercase mb-3">
          Halaman Tidak Ditemukan
        </p>

        <h1
          className={`${HeadingFont.className} text-5xl md:text-6xl text-rose-800 mb-5 leading-tight`}
        >
          {storeInfo.name}
        </h1>

        <p className="text-stone-600 mb-10 leading-relaxed">
          Halaman yang Anda cari tidak ada atau sudah dipindahkan. Silakan
          kembali ke beranda untuk melihat menu kami.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 text-white bg-rose-700 hover:bg-rose-800 font-semibold rounded-full text-base transition-[background-color,box-shadow,transform] hover:shadow-xl hover:shadow-rose-200/50 hover:-translate-y-0.5"
          >
            Kembali ke Beranda
          </Link>
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
      </div>
    </main>
  );
}
