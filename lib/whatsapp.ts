import { storeInfo } from "@/data/store";

export const buildWhatsAppUrl = (message: string): string =>
  `https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(message)}`;

export const generateWhatsAppUrl = (productName?: string): string => {
  const message = productName
    ? `Halo Kak, saya ingin memesan *${productName}*.\nMohon info ketersediaan dan cara pemesanannya. Terima kasih!`
    : `Halo Kak, saya ingin memesan dimsum.\nMohon info menu dan cara pemesanannya. Terima kasih!`;

  return buildWhatsAppUrl(message);
};
