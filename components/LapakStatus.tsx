"use client";

import { useEffect, useState } from "react";
import { isLapakOpen } from "@/lib/schedule";

export default function LapakStatus() {
  // Selalu mulai dari status online agar render server dan klien cocok saat hydration.
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const update = () => setIsOpen(isLapakOpen(new Date()));
    update();

    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-rose-100 rounded-full px-4 py-1.5 mb-8 shadow-sm">
      <span
        className={`w-2 h-2 rounded-full animate-pulse ${
          isOpen ? "bg-emerald-600" : "bg-stone-500"
        }`}
      />
      <span className="text-sm font-medium text-stone-600">
        {isOpen
          ? "Lapak Buka Sekarang, Yuk Mampir!"
          : "Terima Pesanan Setiap Hari, Order Sekarang!"}
      </span>
    </div>
  );
}
