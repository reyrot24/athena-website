import { clsx, type ClassValue } from "clsx";
import type { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Ritardo per le animazioni `.hero-rise` (vedi globals.css). */
export function riseDelay(seconds: number): CSSProperties {
  return { "--d": `${seconds}s` } as CSSProperties;
}

const longDate = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Rome",
});

const shortDate = new Intl.DateTimeFormat("it-IT", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Europe/Rome",
});

export function formatDate(value: string | null | undefined, style: "long" | "short" = "long") {
  if (!value) return null;
  // Le date di Sanity sono "YYYY-MM-DD": fissandole a mezzogiorno UTC evitiamo
  // che il fuso orario le sposti al giorno prima.
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00Z` : value);
  if (Number.isNaN(date.getTime())) return null;
  return (style === "long" ? longDate : shortDate).format(date);
}

/** Minuscolo e senza accenti: per confronti e ricerche tolleranti. */
export function normalizeText(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}
