import Image from "next/image";
import { CalendarClock, Plus } from "lucide-react";
import {
  Product,
  ProductBadge,
  badgeLabels,
  categoryLabels,
  priceLabel,
} from "@/data/products";
import { requiresVariant } from "@/lib/cart";

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
  onAdd: (product: Product, variantName?: string) => void;
}

// Amber khusus menandai produk unggulan; netral dipakai untuk label faktual agar
// hijau tetap berarti WhatsApp saja.
const badgeStyles: Record<ProductBadge, string> = {
  "best-seller": "bg-amber-400 text-stone-900",
  new: "bg-stone-900 text-white",
};

export default function ProductCard({
  product,
  onOpen,
  onAdd,
}: ProductCardProps) {
  const imageSrc = product.image || "/images/logo.png";
  const featured = product.featured === true;
  const hasVariants = requiresVariant(product);

  return (
    <article
      className={`group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 ${
        featured ? "sm:flex-row sm:col-span-2 lg:col-span-4" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative aspect-square bg-stone-100 overflow-hidden ${
          featured ? "sm:w-72 sm:shrink-0" : ""
        }`}
      >
        <Image
          src={imageSrc}
          alt={`Gambar produk ${product.name}`}
          fill
          quality={65}
          sizes={
            featured
              ? "(max-width: 640px) 100vw, 18rem"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {product.badge && (
          <span
            className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${badgeStyles[product.badge]}`}
          >
            {badgeLabels[product.badge]}
          </span>
        )}
      </div>

      {/* Content */}
      <div
        className={`flex flex-col grow p-5 ${featured ? "sm:justify-center sm:p-7" : ""}`}
      >
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-rose-700">
            {categoryLabels[product.category]}
          </span>
          {product.pieces != null && (
            <span className="text-xs font-medium text-stone-500">
              {product.pieces} pcs
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-stone-800 mb-1.5 group-hover:text-rose-700 transition-colors">
          {product.name}
        </h3>

        <p
          className={`text-stone-500 text-sm mb-4 leading-relaxed ${
            featured ? "sm:text-base" : "line-clamp-2"
          }`}
        >
          {product.description}
        </p>

        <p className="text-rose-700 font-bold mb-4">{priceLabel(product)}</p>

        {product.preOrderNote ? (
          <p className="mb-4 flex items-start gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">
            <CalendarClock
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            {product.preOrderNote}
          </p>
        ) : null}

        <div
          className={`mt-auto flex gap-2 ${featured ? "sm:mt-0 sm:justify-start" : ""}`}
        >
          <button
            type="button"
            onClick={() => onOpen(product)}
            className={`grow rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50 hover:text-rose-700 ${
              featured ? "sm:grow-0 sm:px-6" : ""
            }`}
          >
            Lihat Detail
          </button>

          <button
            type="button"
            onClick={() => (hasVariants ? onOpen(product) : onAdd(product))}
            aria-label={
              hasVariants
                ? `Pilih varian ${product.name}`
                : `Tambah ${product.name} ke pesanan`
            }
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-700 text-white transition-[background-color,box-shadow] hover:bg-rose-800 hover:shadow-lg hover:shadow-rose-200/40 ${
              featured ? "sm:h-12 sm:w-auto sm:px-6 sm:gap-2" : ""
            }`}
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
            {featured ? (
              <span className="hidden text-sm font-semibold sm:inline">
                Tambah
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </article>
  );
}
