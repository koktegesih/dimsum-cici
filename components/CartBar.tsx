"use client";

import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/data/products";

interface CartBarProps {
  count: number;
  total: number;
  onOpen: () => void;
}

export default function CartBar({ count, total, onOpen }: CartBarProps) {
  if (count === 0) return null;

  return (
    // Dibatasi di kanan agar tidak menimpa tombol chat mengambang.
    <div className="fixed bottom-6 left-4 right-24 z-40 sm:left-1/2 sm:right-auto sm:w-80 sm:-translate-x-1/2">
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center gap-3 rounded-full bg-rose-700 px-5 py-3.5 text-white shadow-xl shadow-rose-900/20 transition-[background-color,transform] hover:bg-rose-800 hover:-translate-y-0.5"
      >
        <span className="relative shrink-0">
          <ShoppingBag className="h-5 w-5" aria-hidden="true" />
          <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-xs font-bold text-stone-900">
            {count}
          </span>
        </span>

        <span className="truncate text-sm font-semibold">Lihat Pesanan</span>

        <span className="ml-auto shrink-0 text-sm font-bold tabular-nums">
          {formatPrice(total)}
        </span>
      </button>

      <p className="sr-only" aria-live="polite">
        {count} item dalam pesanan, total {formatPrice(total)}
      </p>
    </div>
  );
}
