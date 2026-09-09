export type ProductBadge = "best-seller" | "new";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  badge?: ProductBadge;
}

export const badgeLabels: Record<ProductBadge, string> = {
  "best-seller": "Best Seller",
  new: "Baru",
};

export const products: Product[] = [
  {
    id: "dimsum",
    name: "Dimsum Original",
    price: 25000,
    description: "Dimsum ayam klasik dengan rasa gurih dan tekstur lembut.",
    image: "/images/products/dimsum-original.jpeg",
  },
  {
    id: "mentai",
    name: "Mentai Original",
    price: 33000,
    description: "Dimsum dengan saus mentai gurih khas.",
    image: "/images/products/mentai-original.jpeg",
  },
  {
    id: "cheddar",
    name: "Mentai Cheddar",
    price: 35000,
    description: "Dimsum mentai dengan tambahan keju cheddar.",
    image: "/images/products/mentai-cheddar.jpeg",
  },
  {
    id: "quick-melt",
    name: "Mentai Quick Melt",
    price: 38000,
    description: "Dimsum mentai dengan keju quick melt lumer.",
    image: "/images/products/mentai-quick-melt.jpeg",
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
