import type { ScheduleDoc } from "@/sanity/types";
import { normalizeText } from "./utils";

export const DAYS = [
  { key: "lunedi", label: "Lunedì", short: "Lun" },
  { key: "martedi", label: "Martedì", short: "Mar" },
  { key: "mercoledi", label: "Mercoledì", short: "Mer" },
  { key: "giovedi", label: "Giovedì", short: "Gio" },
  { key: "venerdi", label: "Venerdì", short: "Ven" },
  { key: "sabato", label: "Sabato", short: "Sab" },
  { key: "domenica", label: "Domenica", short: "Dom" },
] as const;

export type DayKey = (typeof DAYS)[number]["key"];

export type Slot = {
  label: string | null;
  start: string | null;
  end: string | null;
  startMin: number | null;
  endMin: number | null;
  raw: string;
};

export type Session = { course: string; slot: Slot };

// Gli orari su Sanity sono testo libero ("Bambini: 17:30-18:30",
// "Posturale 10:00-11-00", "9:30-10:30"): estraiamo la fascia oraria e
// consideriamo il resto come etichetta.
const TIME_RANGE = /(\d{1,2})[:.](\d{2})\s*[-–—]\s*(\d{1,2})[:.-](\d{2})/;

export function parseSlot(raw: string | null | undefined): Slot | null {
  const text = (raw ?? "").replace(/\s+/g, " ").trim();
  if (!text) return null;

  const match = text.match(TIME_RANGE);
  if (!match) {
    return { label: text, start: null, end: null, startMin: null, endMin: null, raw: text };
  }

  const [whole, h1, m1, h2, m2] = match;
  const label = text
    .replace(whole, "")
    .replace(/^[\s:–—-]+|[\s:–—-]+$/g, "")
    .trim();

  return {
    label: label || null,
    start: `${h1.padStart(2, "0")}:${m1}`,
    end: `${h2.padStart(2, "0")}:${m2}`,
    startMin: Number(h1) * 60 + Number(m1),
    endMin: Number(h2) * 60 + Number(m2),
    raw: text,
  };
}

const byStart = (a: Slot, b: Slot) => (a.startMin ?? 1e4) - (b.startMin ?? 1e4);

export function slotsFor(doc: ScheduleDoc, day: DayKey): Slot[] {
  return (doc[day] ?? [])
    .map((value) => parseSlot(value))
    .filter((slot): slot is Slot => slot !== null)
    .sort(byStart);
}

export function sessionsForDay(schedule: ScheduleDoc[], day: DayKey): Session[] {
  return schedule
    .flatMap((doc) => slotsFor(doc, day).map((slot) => ({ course: doc.corso, slot })))
    .sort((a, b) => byStart(a.slot, b.slot));
}

const compact = (value: string) => normalizeText(value).replace(/[^a-z0-9]/g, "");

export function findCourse(schedule: ScheduleDoc[], aliases: readonly string[]) {
  const wanted = aliases.map(compact);
  return schedule.find((doc) => wanted.includes(compact(doc.corso)));
}

export function activeDays(doc: ScheduleDoc | undefined): DayKey[] {
  if (!doc) return [];
  return DAYS.filter((day) => slotsFor(doc, day.key).length > 0).map((day) => day.key);
}

export type SlotStatus = "live" | "done" | "upcoming";

export function slotStatus(slot: Slot, nowMinutes: number): SlotStatus {
  if (slot.startMin === null || slot.endMin === null) return "upcoming";
  if (nowMinutes >= slot.endMin) return "done";
  if (nowMinutes >= slot.startMin) return "live";
  return "upcoming";
}

const WEEKDAY_TO_KEY: Record<string, DayKey> = {
  Mon: "lunedi",
  Tue: "martedi",
  Wed: "mercoledi",
  Thu: "giovedi",
  Fri: "venerdi",
  Sat: "sabato",
  Sun: "domenica",
};

const romeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Rome",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Giorno e minuti correnti a Montescaglioso, a prescindere dal fuso del visitatore. */
export function romeClock(date: Date) {
  const parts = romeFormatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  const hour = get("hour");
  const minute = get("minute");
  return {
    day: WEEKDAY_TO_KEY[get("weekday")] ?? "lunedi",
    minutes: Number(hour) * 60 + Number(minute),
    time: `${hour}:${minute}`,
  };
}

export function dayLabel(key: DayKey) {
  return DAYS.find((day) => day.key === key)?.label ?? key;
}
