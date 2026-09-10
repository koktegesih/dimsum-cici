"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductDetailDialog from "@/components/ProductDetailDialog";
import {
  Product,
  ProductCategory,
  categoryLabels,
  products,
} from "@/data/products";

type Filter = "semua" | ProductCategory;

const availableCategories = (
  Object.keys(categoryLabels) as ProductCategory[]
).filter((category) => products.some((p) => p.category === category));

const filters: Filter[] = ["semua", ...availableCategories];

const filterLabels: Record<Filter, string> = {
  semua: "Semua",
  ...categoryLabels,
};

export default function MenuSection() {
  const [filter, setFilter] = useState<Filter>("semua");
  const [selected, setSelected] = useState<Product | null>(null);

  const visible =
    filter === "semua"
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <section id="menu" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-rose-700 tracking-widest uppercase mb-3">
            Menu
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-3">
            Pilihan Dimsum Kami
          </h2>
          <p className="text-stone-500 max-w-md mx-auto">
            Pilih dimsum favorit Anda, lihat detailnya, lalu pesan via WhatsApp
          </p>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {filters.map((item) => {
            const isActive = filter === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(item)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-rose-700 bg-rose-700 text-white"
                    : "border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50"
                }`}
              >
                {filterLabels[item]}
              </button>
            );
          })}
        </div>

        <p
          className="mb-8 text-center text-sm text-stone-500"
          aria-live="polite"
        >
          Menampilkan {visible.length} menu
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      <ProductDetailDialog
        product={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
