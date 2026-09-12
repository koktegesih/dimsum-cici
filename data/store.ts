export const storeInfo = {
  name: "Dimsum Cici",
  url: "https://dimsumcici.web.id",
  tagline: "Dimsum Segar & Lezat, Siap Antar ke Pintu Anda!",
  description:
    "Dimsum Cici hadir sejak 2024 dengan komitmen menghadirkan dimsum berkualitas bercita rasa autentik. Setiap dimsum diproduksi secara fresh setiap hari menggunakan bahan-bahan pilihan untuk menjaga rasa dan kualitas.",
  whatsapp: "6281545727225",
  address:
    "Jl. Jend. Ahmad Yani (Bandara Lama), Kwamki, Kec. Mimika Baru, Kabupaten Mimika, Papua Tengah",
  onlineOrder: "Terima pesanan setiap hari",
  // dayIndex mengikuti Date.getDay(): 0 Minggu, 6 Sabtu.
  offlineSpots: [
    {
      dayIndex: 6,
      dayLabel: "Sabtu",
      place: "CFD Depan Sekolah YPPK",
      slots: [{ open: "06:00", close: "10:00" }],
    },
    {
      dayIndex: 0,
      dayLabel: "Minggu",
      place: "Jl. Jend. Ahmad Yani (Bandara Lama), Kwamki",
      slots: [
        { open: "07:00", close: "09:00" },
        { open: "16:00", close: "18:00" },
      ],
    },
  ],
  instagram: "@dimci_",
  tiktok: "@dimsummentaicici",
};
