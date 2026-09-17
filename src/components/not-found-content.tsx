import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NotFoundContent() {
  return (
    <section className="grain relative isolate grid min-h-[88dvh] place-items-center overflow-hidden bg-ink px-5 pt-28 pb-16 text-center text-bone">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_35%,rgb(246_161_76/0.25),transparent_70%)]"
      />
      <p
        aria-hidden
        className="heading-display txt-stroke pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-[42vw] leading-none text-white/10 select-none"
      >
        404
      </p>
      <div className="max-w-xl">
        <p className="text-xs font-bold tracking-[0.28em] text-brand uppercase">Errore 404</p>
        <h1 className="heading-display mt-4 text-6xl sm:text-8xl">
          Fuori <span className="txt-gradient">allenamento</span>
        </h1>
        <p className="mt-6 text-lg text-bone/75">
          La pagina che cerchi non esiste o è stata spostata. Riparti da qui:
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">Torna alla home</Link>
          </Button>
          <Button asChild size="lg" variant="glass">
            <Link href="/corsi">Scopri i corsi</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
