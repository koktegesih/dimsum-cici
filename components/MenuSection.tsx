"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductDetailDialog from "@/components/ProductDetailDialog";
import CartBar from "@/components/CartBar";
import CartDialog from "@/components/CartDialog";
import {
  Product,
  ProductCategory,
  categoryLabels,
  products,
} from "@/data/products";
import { CartItem, addToCart, cartTotal, requiresVariant, setQty } from "@/lib/cart";

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
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const visible =
    filter === "semua"
      ? products
      : products.filter((product) => product.category === filter);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const total = cartTotal(items);

  const handleAdd = (product: Product, variantName?: string) => {
    if (requiresVariant(product) && !variantName) {
      setSelected(product);
      return;
    }

    setItems((current) => addToCart(current, product.id, variantName));
  };

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
              onAdd={handleAdd}
            />
          ))}
        </div>
      </div>

      <ProductDetailDialog
        product={selected}
        onClose={() => setSelected(null)}
        onAdd={handleAdd}
      />

      <CartBar count={count} total={total} onOpen={() => setCartOpen(true)} />

      <CartDialog
        open={cartOpen}
        items={items}
        onClose={() => setCartOpen(false)}
        onChangeQty={(productId, variantName, qty) =>
          setItems((current) => setQty(current, productId, variantName, qty))
        }
        onClear={() => setItems([])}
      />
    </section>
  );
}
