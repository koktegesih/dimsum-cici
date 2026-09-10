import Image from "next/image";
import {
  Product,
  ProductBadge,
  badgeLabels,
  categoryLabels,
  priceLabel,
} from "@/data/products";

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

// Amber khusus menandai produk unggulan; netral dipakai untuk label faktual agar
// hijau tetap berarti WhatsApp saja.
const badgeStyles: Record<ProductBadge, string> = {
  "best-seller": "bg-amber-400 text-stone-900",
  new: "bg-stone-900 text-white",
};

export default function ProductCard({ product, onOpen }: ProductCardProps) {
  const imageSrc = product.image || "/images/logo.png";
  const featured = product.featured === true;

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

        <button
          type="button"
          onClick={() => onOpen(product)}
          className={`mt-auto w-full rounded-xl bg-rose-700 px-4 py-2.5 text-sm font-semibold text-white transition-[background-color,box-shadow] hover:bg-rose-800 hover:shadow-lg hover:shadow-rose-200/40 ${
            featured ? "sm:mt-0 sm:w-auto sm:self-start sm:px-6" : ""
          }`}
        >
          Lihat Detail
        </button>
      </div>
    </article>
  );
}
