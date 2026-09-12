import { describe, expect, it } from "vitest";
import { isLapakOpen, offlineSpots } from "@/lib/schedule";

// 2026-09-11 Jumat, 09-12 Sabtu, 09-13 Minggu, 09-14 Senin; WIT = UTC+9.
const wit = (day: number, hour: number, minute = 0) =>
  new Date(Date.UTC(2026, 8, day, hour - 9, minute));

describe("isLapakOpen", () => {
  it("buka saat CFD Sabtu pagi", () => {
    expect(isLapakOpen(wit(12, 6))).toBe(true);
    expect(isLapakOpen(wit(12, 8, 30))).toBe(true);
    expect(isLapakOpen(wit(12, 9, 59))).toBe(true);
  });

  it("tutup di luar jam CFD Sabtu", () => {
    expect(isLapakOpen(wit(12, 5, 59))).toBe(false);
    expect(isLapakOpen(wit(12, 12))).toBe(false);
  });

  // Sesi sore hanya milik hari Minggu, jangan sampai bocor ke Sabtu.
  it("tidak ikut buka sore di hari Sabtu", () => {
    expect(isLapakOpen(wit(12, 17))).toBe(false);
  });

  it("buka di dua sesi hari Minggu", () => {
    expect(isLapakOpen(wit(13, 7))).toBe(true);
    expect(isLapakOpen(wit(13, 8, 30))).toBe(true);
    expect(isLapakOpen(wit(13, 16))).toBe(true);
    expect(isLapakOpen(wit(13, 17, 59))).toBe(true);
  });

  it("tutup di jeda antar sesi Minggu", () => {
    expect(isLapakOpen(wit(13, 12))).toBe(false);
  });

  // Jam buka Sabtu lebih pagi, jangan sampai berlaku juga di Minggu.
  it("tutup pukul 06:30 di hari Minggu", () => {
    expect(isLapakOpen(wit(13, 6, 30))).toBe(false);
  });

  it("menutup tepat di jam berakhir, bukan setelahnya", () => {
    expect(isLapakOpen(wit(12, 10))).toBe(false);
    expect(isLapakOpen(wit(13, 9))).toBe(false);
    expect(isLapakOpen(wit(13, 18))).toBe(false);
  });

  it("tutup di hari kerja", () => {
    expect(isLapakOpen(wit(11, 8))).toBe(false);
    expect(isLapakOpen(wit(14, 8))).toBe(false);
  });

  // Menjaga agar status tidak dihitung dari zona waktu pengunjung.
  it("tetap buka meski di UTC saat itu masih hari sebelumnya", () => {
    expect(isLapakOpen(new Date("2026-09-11T23:00:00Z"))).toBe(true);
    expect(isLapakOpen(new Date("2026-09-12T23:00:00Z"))).toBe(true);
  });
});

describe("nilai turunan jadwal", () => {
  it("memetakan hari ke nama schema.org", () => {
    expect(offlineSpots.map((spot) => spot.schemaDay)).toEqual([
      "Saturday",
      "Sunday",
    ]);
  });

  it("merangkai label jam dari data slot", () => {
    expect(offlineSpots[0].hoursLabel).toBe("06:00 - 10:00 WIT");
    expect(offlineSpots[1].hoursLabel).toBe(
      "07:00 - 09:00 & 16:00 - 18:00 WIT",
    );
  });
});
