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

export const offlineSpots = storeInfo.offlineSpots.map((spot) => ({
  ...spot,
  schemaDay: DAY_NAMES[spot.dayIndex],
  hoursLabel: `${spot.slots
    .map((slot) => `${slot.open} - ${slot.close}`)
    .join(" & ")} WIT`,
}));

export function isLapakOpen(now: Date): boolean {
  const wit = new Date(now.getTime() + WIT_OFFSET_MINUTES * 60_000);
  const day = wit.getUTCDay();
  const current = wit.getUTCHours() * 60 + wit.getUTCMinutes();

  return offlineSpots.some(
    (spot) =>
      spot.dayIndex === day &&
      spot.slots.some(
        (slot) =>
          current >= toMinutes(slot.open) && current < toMinutes(slot.close),
      ),
  );
}
