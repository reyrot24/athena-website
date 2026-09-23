"use client";

import Link from "next/link";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { setMapsConsent, useMapsConsent } from "@/lib/consent";
import { cn } from "@/lib/utils";

export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger className={className}>Preferenze cookie</DialogTrigger>
      <DialogContent>
        <CookiePreferences />
      </DialogContent>
    </Dialog>
  );
}

/** Pannello delle preferenze: usato nella finestra del footer e nella pagina Cookie policy. */
export function CookiePreferences({ standalone = false }: { standalone?: boolean }) {
  const mapsConsent = useMapsConsent() ?? false;
  const Title = standalone ? "h3" : DialogTitle;
  const Description = standalone ? "p" : DialogDescription;

  return (
    <div className={cn(!standalone && "pr-8")}>
      <Title className={cn("heading-display", standalone ? "text-3xl" : "text-4xl")}>Preferenze cookie</Title>
      <Description className="mt-2 text-muted-foreground">
        Il sito usa solo cookie tecnici. L&apos;unico servizio esterno che puoi attivare è la mappa di Google.
      </Description>

      <ul className="mt-6 divide-y rounded-3xl border">
        <li className="flex items-center justify-between gap-4 p-5">
          <div>
            <p className="font-semibold">Tecnici</p>
            <p className="text-sm text-muted-foreground">Necessari al funzionamento del sito.</p>
          </div>
          <span className="shrink-0 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Sempre attivi
          </span>
        </li>
        <li className="flex items-center justify-between gap-4 p-5">
          <div>
            <p id="consent-maps-label" className="font-semibold">
              Google Maps
            </p>
            <p className="text-sm text-muted-foreground">Mostra la mappa interattiva della palestra.</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={mapsConsent}
            aria-labelledby="consent-maps-label"
            onClick={() => setMapsConsent(!mapsConsent)}
            className={cn(
              "relative h-8 w-14 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand",
              mapsConsent ? "bg-brand" : "bg-foreground/15",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-1 left-1 size-6 rounded-full bg-white shadow transition-transform duration-300 ease-snappy",
                mapsConsent && "translate-x-6",
              )}
            />
          </button>
        </li>
      </ul>

      {!standalone && (
        <p className="mt-5 text-sm text-muted-foreground">
          Maggiori dettagli nella{" "}
          {/* Il footer resta montato durante la navigazione: la finestra va chiusa a mano. */}
          <DialogClose asChild>
            <Link href="/cookie-policy" className="font-semibold text-brand-ink underline-offset-2 hover:underline">
              Cookie policy
            </Link>
          </DialogClose>
          .
        </p>
      )}
    </div>
  );
}
