import { describe, expect, it } from "vitest";
import {
  addToCart,
  buildOrderMessage,
  cartLines,
  cartTotal,
  requiresVariant,
  setQty,
} from "@/lib/cart";
import type { Product } from "@/data/products";

// Katalog contoh agar tes tidak ikut berubah saat harga asli disesuaikan.
const katalog: Product[] = [
  {
    id: "original",
    name: "Dimsum Original",
    category: "paket",
    description: "Dimsum ayam klasik.",
    image: "/a.jpg",
    pieces: 6,
    price: 25000,
  },
  {
    id: "birthday",
    name: "Dimsum Birthday",
    category: "birthday",
    description: "Loyang dimsum dengan custom nama.",
    image: "/b.jpg",
    preOrderNote: "Pesan minimal H-1 sebelum hari acara",
    variants: [
      { name: "Small", price: 55000, image: "/s.jpg", pieces: 8 },
      { name: "Large", price: 150000, image: "/l.jpg", pieces: 20 },
    ],
  },
];

// Produk bervarian tanpa harga dasar akan berharga Rp 0 kalau variannya terlewat.
describe("requiresVariant", () => {
  it("menandai produk yang punya varian", () => {
    expect(requiresVariant(katalog[1])).toBe(true);
  });

  it("tidak menandai produk tanpa varian", () => {
    expect(requiresVariant(katalog[0])).toBe(false);
  });
});

describe("cartTotal", () => {
  it("mengalikan harga produk dengan jumlahnya", () => {
    expect(cartTotal([{ productId: "original", qty: 3 }], katalog)).toBe(75000);
  });

  it("memakai harga varian saat varian dipilih", () => {
    expect(
      cartTotal([{ productId: "birthday", variantName: "Large", qty: 2 }], katalog),
    ).toBe(300000);
  });
});

describe("addToCart", () => {
  it("menambah jumlah saat produk yang sama dimasukkan lagi", () => {
    const isi = addToCart([{ productId: "original", qty: 2 }], "original");

    expect(isi).toEqual([{ productId: "original", variantName: undefined, qty: 3 }]);
  });

  it("memisahkan baris untuk varian berbeda dari produk yang sama", () => {
    const isi = addToCart(
      [{ productId: "birthday", variantName: "Small", qty: 1 }],
      "birthday",
      "Large",
    );

    expect(isi).toEqual([
      { productId: "birthday", variantName: "Small", qty: 1 },
      { productId: "birthday", variantName: "Large", qty: 1 },
    ]);
  });
});

describe("setQty", () => {
  it("mengubah jumlah baris yang dituju saja", () => {
    const isi = setQty(
      [
        { productId: "original", qty: 1 },
        { productId: "birthday", variantName: "Small", qty: 1 },
      ],
      "birthday",
      "Small",
      4,
    );

    expect(isi).toEqual([
      { productId: "original", qty: 1 },
      { productId: "birthday", variantName: "Small", qty: 4 },
    ]);
  });

  // Tombol kurang pada jumlah 1 harus mengeluarkan item, bukan menyisakan baris kosong.
  it("menghapus baris saat jumlah turun ke nol", () => {
    const isi = setQty([{ productId: "original", qty: 1 }], "original", undefined, 0);

    expect(isi).toEqual([]);
  });
});

describe("cartLines", () => {
  it("menyusun label, harga satuan, dan subtotal tiap baris", () => {
    const baris = cartLines(
      [
        { productId: "original", qty: 2 },
        { productId: "birthday", variantName: "Large", qty: 1 },
      ],
      katalog,
    );

    expect(baris).toMatchObject([
      { label: "Dimsum Original", unitPrice: 25000, qty: 2, subtotal: 50000 },
      {
        label: "Dimsum Birthday - Large",
        unitPrice: 150000,
        qty: 1,
        subtotal: 150000,
      },
    ]);
  });

  // Varian punya fotonya sendiri, keranjang harus ikut menampilkannya.
  it("memakai gambar varian saat varian dipilih", () => {
    const baris = cartLines(
      [{ productId: "birthday", variantName: "Small", qty: 1 }],
      katalog,
    );

    expect(baris[0].image).toBe("/s.jpg");
  });

  it("mengambil isi porsi dari varian saat varian dipilih", () => {
    const baris = cartLines(
      [{ productId: "birthday", variantName: "Large", qty: 1 }],
      katalog,
    );

    expect(baris[0].pieces).toBe(20);
  });

  it("mengambil isi porsi dari produk saat tidak punya varian", () => {
    const baris = cartLines([{ productId: "original", qty: 1 }], katalog);

    expect(baris[0].pieces).toBe(6);
  });

  // Keranjang perlu mengingatkan tenggat tepat sebelum pesanan dikirim.
  it("membawa catatan tenggat pesan dari produknya", () => {
    const baris = cartLines(
      [
        { productId: "original", qty: 1 },
        { productId: "birthday", variantName: "Small", qty: 1 },
      ],
      katalog,
    );

    expect(baris[0].preOrderNote).toBeUndefined();
    expect(baris[1].preOrderNote).toBe("Pesan minimal H-1 sebelum hari acara");
  });
});

describe("buildOrderMessage", () => {
  const isi = [
    { productId: "original", qty: 2 },
    { productId: "birthday", variantName: "Large", qty: 1 },
  ];

  it("mencantumkan tiap item beserta jumlah dan totalnya", () => {
    const pesan = buildOrderMessage(isi, {}, katalog);

    expect(pesan).toContain("Dimsum Original x2");
    expect(pesan).toContain("Dimsum Birthday - Large x1");
    expect(pesan).toContain("200.000");
  });

  it("mencantumkan data pemesan yang diisi", () => {
    const pesan = buildOrderMessage(
      isi,
      {
        name: "Sari",
        payment: "Transfer",
        address: "Jl. Melati 12",
        note: "jangan pedas",
      },
      katalog,
    );

    expect(pesan).toContain("Atas nama: Sari");
    expect(pesan).toContain("Pembayaran: Transfer");
    expect(pesan).toContain("Alamat: Jl. Melati 12");
    expect(pesan).toContain("Catatan: jangan pedas");
  });

  // Baris kosong bikin pesan terlihat berantakan di chat penjual.
  it("tidak menulis baris untuk isian yang dikosongkan", () => {
    const pesan = buildOrderMessage(isi, { name: "Sari" }, katalog);

    expect(pesan).toContain("Atas nama: Sari");
    expect(pesan).not.toContain("Alamat:");
    expect(pesan).not.toContain("Catatan:");
    expect(pesan).not.toContain("Pembayaran:");
  });
});
