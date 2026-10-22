"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CalendarClock, Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/data/products";
import { storeInfo } from "@/data/store";
import {
  CartItem,
  OrderDetails,
  buildOrderMessage,
  cartLines,
  cartTotal,
} from "@/lib/cart";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface CartDialogProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onChangeQty: (
    productId: string,
    variantName: string | undefined,
    qty: number,
  ) => void;
  onClear: () => void;
}

const paymentOptions = ["Tunai", "Transfer", "QRIS"];

export default function CartDialog({
  open,
  items,
  onClose,
  onChangeQty,
  onClear,
}: CartDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [details, setDetails] = useState<OrderDetails>({});
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  const lines = cartLines(items);
  const total = cartTotal(items);
  const isEmpty = lines.length === 0;
  const preOrderNotes = [
    ...new Set(
      lines.flatMap((line) => (line.preOrderNote ? [line.preOrderNote] : [])),
    ),
  ];

  const setField = (field: keyof OrderDetails) => (value: string) =>
    setDetails((current) => ({ ...current, [field]: value }));

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
      aria-labelledby="judul-keranjang"
      className="m-auto w-[min(32rem,calc(100vw-2rem))] overflow-hidden rounded-3xl p-0 backdrop:bg-stone-900/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex max-h-[85vh] flex-col">
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-5">
          <h2 id="judul-keranjang" className="text-lg font-bold text-stone-800">
            Pesanan Anda
          </h2>
          <p className="text-sm text-stone-500">{lines.length} item</p>
        </div>

        <div className="min-h-0 grow overflow-y-auto overscroll-contain px-6 py-5">
          {isEmpty ? (
            <p className="py-8 text-center text-sm text-stone-500">
              Belum ada menu yang dipilih.
            </p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li
                  key={`${line.productId}-${line.variantName ?? ""}`}
                  className="flex gap-3"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                    <Image
                      src={line.image}
                      alt=""
                      fill
                      quality={65}
                      sizes="4rem"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 grow">
                    <p className="truncate text-sm font-semibold text-stone-800">
                      {line.label}
                    </p>
                    <p className="text-xs text-stone-500 tabular-nums">
                      {formatPrice(line.unitPrice)}
                      {line.pieces != null ? ` · isi ${line.pieces} pcs` : ""}
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-stone-200">
                        <button
                          type="button"
                          onClick={() =>
                            onChangeQty(
                              line.productId,
                              line.variantName,
                              line.qty - 1,
                            )
                          }
                          aria-label={`Kurangi ${line.label}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-50 hover:text-rose-700"
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-stone-800">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onChangeQty(
                              line.productId,
                              line.variantName,
                              line.qty + 1,
                            )
                          }
                          aria-label={`Tambah ${line.label}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-50 hover:text-rose-700"
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>

                      <p className="ml-auto text-sm font-bold text-rose-700 tabular-nums">
                        {formatPrice(line.subtotal)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {isEmpty ? null : (
            <div className="mt-6 space-y-3 border-t border-stone-100 pt-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-stone-700">
                    Atas nama
                  </span>
                  <input
                    type="text"
                    name="nama"
                    autoComplete="name"
                    value={details.name ?? ""}
                    onChange={(event) => setField("name")(event.target.value)}
                    placeholder="Misalnya Sari…"
                    className="w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm text-stone-800 placeholder:text-stone-400"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-stone-700">
                    Pembayaran
                  </span>
                  <select
                    name="pembayaran"
                    value={details.payment ?? ""}
                    onChange={(event) =>
                      setField("payment")(event.target.value)
                    }
                    className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-800"
                  >
                    <option value="">Pilih</option>
                    {paymentOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-stone-700">
                  Alamat pengantaran
                </span>
                <input
                  type="text"
                  name="alamat"
                  autoComplete="street-address"
                  value={details.address ?? ""}
                  onChange={(event) => setField("address")(event.target.value)}
                  placeholder="Misalnya Jl. Melati 12, pagar hijau…"
                  className="w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm text-stone-800 placeholder:text-stone-400"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-stone-700">
                  Catatan
                </span>
                <input
                  type="text"
                  name="catatan"
                  autoComplete="off"
                  value={details.note ?? ""}
                  onChange={(event) => setField("note")(event.target.value)}
                  placeholder="Misalnya saus dipisah…"
                  className="w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm text-stone-800 placeholder:text-stone-400"
                />
              </label>
            </div>
          )}
        </div>

        <div className="border-t border-stone-100 px-6 py-5">
          {preOrderNotes.length > 0 ? (
            <div className="mb-4 space-y-1">
              {preOrderNotes.map((note) => (
                <p
                  key={note}
                  className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900"
                >
                  <CalendarClock
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {note}
                </p>
              ))}
            </div>
          ) : null}

          <div className="mb-1 flex items-center justify-between">
            <p className="text-sm text-stone-500">Total</p>
            <p className="text-xl font-bold text-rose-700 tabular-nums">
              {formatPrice(total)}
            </p>
          </div>
          <p className="mb-4 text-xs text-stone-500">{storeInfo.delivery}</p>

          <div className="flex flex-col gap-3">
            {isEmpty ? (
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-rose-700 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-rose-800"
              >
                Pilih Menu
              </button>
            ) : (
              <a
                href={buildWhatsAppUrl(buildOrderMessage(items, details))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3.5 font-semibold text-white transition-[background-color,box-shadow,transform] hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-200/50 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Kirim Pesanan ke WhatsApp
              </a>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="grow rounded-full border border-stone-200 bg-white px-6 py-3 font-semibold text-stone-700 transition-colors hover:bg-stone-50"
              >
                Lanjut Pilih
              </button>

              {isEmpty ? null : (
                <button
                  type="button"
                  onClick={() => {
                    if (!confirmClear) {
                      setConfirmClear(true);
                      return;
                    }
                    setConfirmClear(false);
                    onClear();
                  }}
                  aria-label={
                    confirmClear
                      ? "Konfirmasi kosongkan pesanan"
                      : "Kosongkan pesanan"
                  }
                  className={`flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                    confirmClear
                      ? "border-rose-700 bg-rose-700 text-white"
                      : "w-12 border-stone-200 px-0 text-stone-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                  }`}
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                  {confirmClear ? "Yakin?" : null}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
