"use client";

import { useSyncExternalStore } from "react";

/*
 * Il sito usa solo cookie tecnici: l'unico contenuto di terze parti è Google Maps,
 * che viene caricato solo dopo un clic esplicito sulla mappa (niente banner).
 * La scelta resta nel browser e si può ritirare da "Preferenze cookie" nel footer.
 */
const STORAGE_KEY = "athena-consent-maps";
const CHANGE_EVENT = "athena-consent-change";

// Ripiego se lo storage è bloccato (navigazione privata): la scelta vale solo per questa visita.
let memoryConsent = false;

function read(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "granted";
  } catch {
    return memoryConsent;
  }
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function setMapsConsent(granted: boolean) {
  memoryConsent = granted;
  try {
    if (granted) localStorage.setItem(STORAGE_KEY, "granted");
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Resta valido `memoryConsent`.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** `null` durante il rendering sul server: non si sa ancora cosa ha scelto l'utente. */
export function useMapsConsent(): boolean | null {
  return useSyncExternalStore(subscribe, read, () => null);
}
