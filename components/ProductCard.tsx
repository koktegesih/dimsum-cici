import Image from "next/image";
import {
  Product,
  ProductBadge,
  badgeLabels,
  formatPrice,
} from "@/data/products";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface ProductCardProps {
  product: Product;
}

// Amber khusus menandai produk unggulan; netral dipakai untuk label faktual agar
// hijau tetap berarti WhatsApp saja.
const badgeStyles: Record<ProductBadge, string> = {
  "best-seller": "bg-amber-400 text-stone-900",
  new: "bg-stone-900 text-white",
};

export default function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.image || "/images/logo.png";

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-[box-shadow,transform] duration-500 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 bg-stone-100 overflow-hidden">
        <Image
          src={imageSrc}
          alt={`Gambar produk ${product.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-stone-100 rounded-full px-3 py-1">
          <span className="text-rose-700 font-bold text-sm">
            {formatPrice(product.price)}
          </span>
        </div>

        {product.badge && (
          <span
            className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${badgeStyles[product.badge]}`}
          >
            {badgeLabels[product.badge]}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-stone-800 mb-1.5 group-hover:text-rose-700 transition-colors">
          {product.name}
        </h3>

        <p className="text-stone-500 text-sm mb-5 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <a
          href={generateWhatsAppUrl(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Pesan produk ${product.name} melalui WhatsApp`}
          className="w-full flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-[background-color,box-shadow] hover:shadow-lg hover:shadow-rose-200/40"
        >
          <WhatsAppIcon className="w-4 h-4" />
          Pesan via WhatsApp
        </a>
      </div>
    </article>
  );
}
