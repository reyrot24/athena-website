import { useMemo, useSyncExternalStore } from "react";
import { romeClock } from "@/lib/schedule";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 20_000);
  return () => window.clearInterval(id);
}

const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

/**
 * Giorno e ora di Montescaglioso, aggiornati ogni minuto.
 * Vale `null` sul server e durante l'idratazione: l'ora del prerender non
 * sarebbe quella del visitatore.
 */
export function useRomeNow() {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  return useMemo(() => (minute === null ? null : romeClock(new Date(minute * 60_000))), [minute]);
}
