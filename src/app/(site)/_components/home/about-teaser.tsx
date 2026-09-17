import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Parallax } from "@/components/ui/parallax";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/lib/site";

const values = ["Inclusione", "Comunità", "Benessere", "Innovazione"];

export function AboutTeaser() {
  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="container-page grid items-center gap-20 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-lg pb-[12%] lg:max-w-none">
          <Parallax offset={24} className="z-10 w-[78%] overflow-hidden rounded-4xl border shadow-2xl">
            <Image
              src="/Athena_Palestra_1.jpg"
              alt="La reception di Athena Club"
              width={1080}
              height={1080}
              sizes="(min-width: 1024px) 38vw, 80vw"
              className="aspect-4/5 object-cover"
            />
          </Parallax>
          <Parallax
            offset={-36}
            className="absolute right-0 bottom-0 z-20 w-[52%] overflow-hidden rounded-4xl border-4 border-background shadow-2xl"
          >
            <Image
              src="/Athena_Palestra_2.jpg"
              alt="Sulla parete: «Migliorarsi ogni giorno è una questione di scelte»"
              width={1080}
              height={1080}
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="aspect-square object-cover"
            />
          </Parallax>
          <div className="absolute top-8 right-2 z-30 rotate-6 rounded-2xl bg-brand px-5 py-4 text-ink shadow-xl sm:right-6">
            <p className="font-display text-4xl leading-none uppercase">Dal {site.foundedYear}</p>
            <p className="mt-1 text-[0.65rem] font-bold tracking-[0.2em] uppercase">a Montescaglioso</p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Chi siamo"
            title={
              <>
                Giovani professionisti, <span className="txt-gradient">una sola passione</span>
              </>
            }
          />
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Dopo esperienze importanti fuori regione abbiamo scelto di tornare a casa, per far crescere lo
            sport e l&apos;attività fisica nel nostro paese. Vogliamo andare oltre il semplice allenamento:
            un luogo inclusivo e stimolante dove costruire comunità, competenze e benessere.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {values.map((value) => (
              <li key={value} className="rounded-full border px-4 py-2 text-sm font-semibold">
                {value}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-10">
            <Link href="/chisiamo">
              La nostra storia <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
