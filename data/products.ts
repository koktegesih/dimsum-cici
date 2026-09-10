export type ProductBadge = "best-seller" | "new";
export type ProductCategory = "satuan" | "paket" | "birthday";

export interface ProductVariant {
  name: string;
  price: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  image: string;
  pieces?: number;
  price?: number;
  variants?: ProductVariant[];
  badge?: ProductBadge;
  // Tampil sebagai kartu lebar di baris pertama grid menu.
  featured?: boolean;
}

export const badgeLabels: Record<ProductBadge, string> = {
  "best-seller": "Best Seller",
  new: "Baru",
};

export const categoryLabels: Record<ProductCategory, string> = {
  satuan: "Satuan",
  paket: "Paketan",
  birthday: "Birthday",
};

export const products: Product[] = [
  {
    id: "birthday",
    name: "Dimsum Birthday",
    category: "birthday",
    description:
      "Kejutan ulang tahun yang bisa langsung disantap. Sudah termasuk custom nama dari keju tanpa biaya tambahan, tinggal sebutkan namanya saat pesan.",
    image: "/images/products/menu-large-birthday.jpeg",
    badge: "new",
    featured: true,
    variants: [
      {
        name: "Small",
        price: 55000,
        image: "/images/products/menu-small-birthday.jpeg",
      },
      {
        name: "Large",
        price: 150000,
        image: "/images/products/menu-large-birthday.jpeg",
      },
    ],
  },
  {
    id: "dimsum",
    name: "Dimsum Original",
    category: "paket",
    pieces: 6,
    price: 25000,
    description: "Dimsum ayam klasik dengan rasa gurih dan tekstur lembut.",
    image: "/images/products/menu-original.jpeg",
    badge: "best-seller",
  },
  {
    id: "mentai",
    name: "Mentai Original",
    category: "paket",
    pieces: 6,
    price: 33000,
    description: "Dimsum dengan saus mentai gurih khas.",
    image: "/images/products/menu-mentai-original.jpeg",
  },
  {
    id: "cheddar",
    name: "Mentai Cheddar",
    category: "paket",
    pieces: 6,
    price: 35000,
    description: "Dimsum mentai dengan tambahan keju cheddar.",
    image: "/images/products/menu-mentai-cheddar.jpeg",
    badge: "best-seller",
  },
  {
    id: "quick-melt",
    name: "Mentai Quick Melt",
    category: "paket",
    pieces: 6,
    price: 38000,
    description: "Dimsum mentai dengan keju quick melt lumer.",
    image: "/images/products/menu-mentai-quick-melt.jpeg",
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const productPrices = (product: Product): number[] => {
  if (product.variants?.length) return product.variants.map((v) => v.price);
  return product.price != null ? [product.price] : [];
};

export const priceLabel = (product: Product): string => {
  const prices = productPrices(product);
  if (!prices.length) return "Hubungi kami";

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? formatPrice(min) : `Mulai ${formatPrice(min)}`;
};

export const productGallery = (product: Product) => [
  { src: product.image, label: product.name },
  ...(product.variants?.map((v) => ({ src: v.image, label: v.name })) ?? []),
];
