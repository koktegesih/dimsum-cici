import { describe, expect, it } from "vitest";
import { isLapakOpen, offlineDayName, offlineHoursLabel } from "@/lib/schedule";

// 2026-09-13 adalah hari Minggu; WIT = UTC+9.
const wit = (day: number, hour: number, minute = 0) =>
  new Date(Date.UTC(2026, 8, day, hour - 9, minute));

describe("isLapakOpen", () => {
  it("buka di sesi pagi", () => {
    expect(isLapakOpen(wit(13, 7))).toBe(true);
    expect(isLapakOpen(wit(13, 8, 30))).toBe(true);
  });

  it("buka di sesi sore", () => {
    expect(isLapakOpen(wit(13, 16))).toBe(true);
    expect(isLapakOpen(wit(13, 17, 59))).toBe(true);
  });

  it("tutup di jeda antar sesi", () => {
    expect(isLapakOpen(wit(13, 12))).toBe(false);
  });

  it("tutup sebelum sesi pertama dimulai", () => {
    expect(isLapakOpen(wit(13, 6, 59))).toBe(false);
  });

  it("menutup tepat di jam berakhir, bukan setelahnya", () => {
    expect(isLapakOpen(wit(13, 9))).toBe(false);
    expect(isLapakOpen(wit(13, 18))).toBe(false);
  });

  it("tutup di hari selain Minggu", () => {
    expect(isLapakOpen(wit(12, 8))).toBe(false); // Sabtu
    expect(isLapakOpen(wit(14, 8))).toBe(false); // Senin
  });

  // Menjaga agar status tidak dihitung dari zona waktu pengunjung.
  it("tetap buka meski di UTC saat itu masih hari Sabtu", () => {
    expect(isLapakOpen(new Date("2026-09-12T23:00:00Z"))).toBe(true);
  });
});

describe("nilai turunan jadwal", () => {
  it("menghasilkan nama hari untuk schema.org", () => {
    expect(offlineDayName).toBe("Sunday");
  });

  it("merangkai label jam dari data slot", () => {
    expect(offlineHoursLabel).toBe("07:00 - 09:00 & 16:00 - 18:00 WIT");
  });
});
