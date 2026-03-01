import { storeInfo } from "@/data/store";

export const generateWhatsAppUrl = (productName?: string): string => {
  const baseUrl = `https://wa.me/${storeInfo.whatsapp}`;

  let message: string;

  if (productName) {
    message = `Halo Kak, saya ingin memesan *${productName}*.\nMohon info ketersediaan dan cara pemesanannya. Terima kasih!`;
  } else {
    message = `Halo Kak, saya ingin memesan dimsum.\nMohon info menu dan cara pemesanannya. Terima kasih!`;
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
};
