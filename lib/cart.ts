import { formatPrice, Product, products } from "@/data/products";

export interface CartItem {
  productId: string;
  variantName?: string;
  qty: number;
}

const sameLine = (item: CartItem, productId: string, variantName?: string) =>
  item.productId === productId && item.variantName === variantName;

export const requiresVariant = (product: Product): boolean =>
  Boolean(product.variants?.length);

export function addToCart(
  items: CartItem[],
  productId: string,
  variantName?: string,
  qty = 1,
): CartItem[] {
  const existing = items.find((item) => sameLine(item, productId, variantName));

  if (existing) {
    return items.map((item) =>
      sameLine(item, productId, variantName)
        ? { ...item, qty: item.qty + qty }
        : item,
    );
  }

  return [...items, { productId, variantName, qty }];
}

export function setQty(
  items: CartItem[],
  productId: string,
  variantName: string | undefined,
  qty: number,
): CartItem[] {
  if (qty <= 0) {
    return items.filter((item) => !sameLine(item, productId, variantName));
  }

  return items.map((item) =>
    sameLine(item, productId, variantName) ? { ...item, qty } : item,
  );
}

export function unitPrice(
  item: CartItem,
  catalog: Product[] = products,
): number {
  const product = catalog.find((entry) => entry.id === item.productId);
  if (!product) return 0;

  if (item.variantName) {
    const variant = product.variants?.find(
      (entry) => entry.name === item.variantName,
    );
    return variant?.price ?? 0;
  }

  return product.price ?? 0;
}

export interface CartLine extends CartItem {
  name: string;
  label: string;
  image: string;
  pieces?: number;
  preOrderNote?: string;
  unitPrice: number;
  subtotal: number;
}

export function cartLines(
  items: CartItem[],
  catalog: Product[] = products,
): CartLine[] {
  return items.flatMap((item) => {
    const product = catalog.find((entry) => entry.id === item.productId);
    if (!product) return [];

    const variant = item.variantName
      ? product.variants?.find((entry) => entry.name === item.variantName)
      : undefined;
    const price = unitPrice(item, catalog);

    return [
      {
        ...item,
        name: product.name,
        label: variant ? `${product.name} - ${variant.name}` : product.name,
        image: variant?.image ?? product.image,
        pieces: variant?.pieces ?? product.pieces,
        preOrderNote: product.preOrderNote,
        unitPrice: price,
        subtotal: price * item.qty,
      },
    ];
  });
}

export function cartTotal(
  items: CartItem[],
  catalog: Product[] = products,
): number {
  return items.reduce(
    (sum, item) => sum + unitPrice(item, catalog) * item.qty,
    0,
  );
}

export interface OrderDetails {
  name?: string;
  payment?: string;
  address?: string;
  note?: string;
}

export function buildOrderMessage(
  items: CartItem[],
  details: OrderDetails,
  catalog: Product[] = products,
): string {
  const lines = cartLines(items, catalog);

  const daftar = lines
    .map(
      (line) => `- ${line.label} x${line.qty} = ${formatPrice(line.subtotal)}`,
    )
    .join("\n");

  const isian = (
    [
      ["Atas nama", details.name],
      ["Pembayaran", details.payment],
      ["Alamat", details.address],
      ["Catatan", details.note],
    ] as const
  )
    .filter(([, value]) => value?.trim())
    .map(([label, value]) => `${label}: ${value!.trim()}`)
    .join("\n");

  return [
    "Halo Kak, saya mau pesan:",
    daftar,
    `Total: ${formatPrice(cartTotal(items, catalog))}`,
    isian,
    "Mohon dikonfirmasi ketersediaan dan ongkirnya. Terima kasih!",
  ]
    .filter(Boolean)
    .join("\n\n");
}
