"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  retry?: () => void;
  reset: () => void;
};

export default function SiteError({ error, retry, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="grain relative isolate grid min-h-[80dvh] place-items-center overflow-hidden bg-ink px-5 pt-28 pb-16 text-center text-bone">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_35%,rgb(246_161_76/0.2),transparent_70%)]"
      />
      <div className="max-w-xl">
        <p className="text-xs font-bold tracking-[0.28em] text-brand uppercase">Ops</p>
        <h1 className="heading-display mt-4 text-6xl sm:text-7xl">Qualcosa è andato storto</h1>
        <p className="mt-6 text-lg text-bone/75">
          Non siamo riusciti a caricare questa pagina. Riprova tra qualche istante.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={() => (retry ?? reset)()}>
            <RotateCcw /> Riprova
          </Button>
          <Button asChild size="lg" variant="glass">
            <Link href="/">Torna alla home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
