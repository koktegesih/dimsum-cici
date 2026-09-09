import { storeInfo } from "@/data/store";

// Papua Tengah memakai WIT (UTC+9); status dihitung dari UTC agar tidak ikut zona waktu pengunjung.
const WIT_OFFSET_MINUTES = 9 * 60;

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const offlineDayName = DAY_NAMES[storeInfo.offlineDayIndex];

export const offlineHoursLabel = `${storeInfo.offlineSlots
  .map((slot) => `${slot.open} - ${slot.close}`)
  .join(" & ")} WIT`;

export function isLapakOpen(now: Date): boolean {
  const wit = new Date(now.getTime() + WIT_OFFSET_MINUTES * 60_000);

  if (wit.getUTCDay() !== storeInfo.offlineDayIndex) return false;

  const current = wit.getUTCHours() * 60 + wit.getUTCMinutes();

  return storeInfo.offlineSlots.some(
    (slot) =>
      current >= toMinutes(slot.open) && current < toMinutes(slot.close),
  );
}
