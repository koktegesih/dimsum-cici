import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProductCard from "@/components/ProductCard";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { products } from "@/data/products";

export default function Home() {
  return (
    <>
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-rose-700 focus:shadow-lg"
      >
        Lewati ke konten utama
      </a>
      <Header />
      <main id="konten-utama" tabIndex={-1} className="min-h-screen bg-white">
        <Hero />
        <AboutSection />

        {/* Menu Section */}
        <section
          id="menu"
          className="py-20 md:py-28 bg-linear-to-b from-white via-stone-50/50 to-stone-50"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-rose-700 tracking-widest uppercase mb-3">
                Menu
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-3">
                Pilihan Dimsum Kami
              </h2>
              <p className="text-stone-500 max-w-md mx-auto">
                Pilih dimsum favorit Anda dan pesan langsung via WhatsApp
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
