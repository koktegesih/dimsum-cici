"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, CalendarClock, Plus, X } from "lucide-react";
import {
  Product,
  categoryLabels,
  formatPrice,
  priceLabel,
  productGallery,
} from "@/data/products";

interface ProductDetailDialogProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product, variantName?: string) => void;
}

export default function ProductDetailDialog({
  product,
  onClose,
  onAdd,
}: ProductDetailDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // showModal() memberi jebakan fokus, tombol Escape, dan pengembalian fokus secara bawaan.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (product && !dialog.open) {
      // Produk bervarian tidak punya harga dasar, jadi varian pertama langsung dipilih.
      setActiveIndex(product.variants?.length ? 1 : 0);
      dialog.showModal();
    } else if (!product && dialog.open) {
      dialog.close();
    }
  }, [product]);

  const gallery = product ? productGallery(product) : [];
  const variant = product?.variants?.[activeIndex - 1];

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      // Escape bawaan <dialog> tidak selalu terpicu, jadi ditangani eksplisit.
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      aria-labelledby="judul-detail-produk"
      className="m-auto w-[min(34rem,calc(100vw-2rem))] overflow-hidden rounded-3xl p-0 backdrop:bg-stone-900/60 backdrop:backdrop-blur-sm md:w-[min(54rem,calc(100vw-4rem))]"
    >
      {product && (
        <>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail produk"
            className="absolute top-3 right-3 z-10 rounded-full bg-white p-2 text-stone-600 shadow-md ring-1 ring-stone-900/5 transition-colors hover:bg-stone-100 hover:text-rose-700"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="max-h-[85vh] overflow-y-auto overscroll-contain md:grid md:grid-cols-2 md:overflow-hidden">
            <div className="relative aspect-square bg-stone-100 md:aspect-auto md:min-h-96">
              <Image
                src={gallery[activeIndex]?.src ?? product.image}
                alt={gallery[activeIndex]?.label ?? product.name}
                fill
                quality={75}
                sizes="(max-width: 768px) 100vw, 27rem"
                className="object-cover"
              />
            </div>

            <div className="min-h-0 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8 sm:py-8 md:pr-14">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-rose-700">
                  {categoryLabels[product.category]}
                </span>
                {product.pieces != null && (
                  <span className="text-xs font-medium text-stone-500">
                    {product.pieces} pcs
                  </span>
                )}
              </div>

              <h2
                id="judul-detail-produk"
                className="mb-3 text-2xl font-bold text-stone-800"
              >
                {product.name}
              </h2>

              <p className="mb-6 leading-relaxed text-stone-600">
                {product.description}
              </p>

              {product.preOrderNote ? (
                <p className="mb-6 flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
                  <CalendarClock
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {product.preOrderNote}
                </p>
              ) : null}

              {product.variants?.length ? (
                <div className="mb-6">
                  <p className="mb-3 text-sm font-semibold text-stone-800">
                    Pilih Varian
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((item, index) => {
                      const isActive = activeIndex === index + 1;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => setActiveIndex(index + 1)}
                          className={`rounded-xl border px-4 py-2 text-left text-sm font-medium transition-colors ${
                            isActive
                              ? "border-rose-700 bg-rose-50 text-rose-700"
                              : "border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50"
                          }`}
                        >
                          <span className="block">
                            {item.name}
                            <span className="ml-2 text-xs text-stone-500 tabular-nums">
                              {formatPrice(item.price)}
                            </span>
                          </span>
                          {item.pieces != null ? (
                            <span className="block text-xs text-stone-500">
                              Isi {item.pieces} pcs
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div className="border-t border-stone-100 pt-6">
                <p className="text-xs uppercase tracking-wide text-stone-500">
                  Harga
                </p>
                <p className="text-2xl font-bold text-rose-700">
                  {variant ? formatPrice(variant.price) : priceLabel(product)}
                </p>

                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onAdd(product, variant?.name);
                      onClose();
                    }}
                    className="flex items-center justify-center gap-2 rounded-full bg-rose-700 px-6 py-3.5 font-semibold text-white transition-[background-color,box-shadow,transform] hover:bg-rose-800 hover:shadow-lg hover:shadow-rose-200/50 hover:-translate-y-0.5"
                  >
                    <Plus className="h-5 w-5" aria-hidden="true" />
                    Tambah ke Pesanan
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3.5 font-semibold text-stone-700 transition-colors hover:bg-stone-50 hover:text-rose-700"
                  >
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                    Kembali
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
