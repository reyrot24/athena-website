import { ArrowUpRight, Download } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section-heading";
import { fesrProject } from "@/lib/site";

export const metadata: Metadata = {
  title: "Progetti finanziati",
  description:
    "Innovazione tecnologica e potenziamento dei servizi di SSD CAM Athena: progetto cofinanziato dall'Unione europea nell'ambito del PR Basilicata FESR FSE+ 2021-2027.",
  alternates: { canonical: "/progetti-finanziati" },
};

// Dati del progetto e testi presi dal poster ufficiale del bando (public/fesr).
const details = [
  { label: "Programma", value: fesrProject.programme },
  { label: "Beneficiario", value: "S.S.D. CAM Athena S.R.L." },
  { label: "CUP", value: fesrProject.cup },
];

export default function ProgettiFinanziatiPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Progetti finanziati"
        title={
          <>
            Cofinanziato dall&apos;<span className="txt-gradient">Unione europea</span>
          </>
        }
        description="Questo intervento è stato realizzato con il contributo dell'Unione europea."
      />

      <section className="py-24 sm:py-32">
        <div className="container-page">
          <div className="rounded-[1.75rem] border bg-white p-6 sm:p-10">
            <Image
              src={fesrProject.logos}
              alt="Coesione Italia 21-27 Basilicata, Cofinanziato dall'Unione europea, Repubblica Italiana, Regione Basilicata"
              width={1600}
              height={242}
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="h-auto w-full"
            />
          </div>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Il progetto</Eyebrow>
              <h2 className="heading-display mt-4 text-4xl sm:text-5xl lg:text-6xl">{fesrProject.title}</h2>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Il progetto ha previsto l&apos;acquisto di attrezzature sportive di ultima generazione ad alto
                valore innovativo. L&apos;intervento mira a migliorare la qualità dei servizi offerti,
                ottimizzare le sessioni di allenamento attraverso tecnologie all&apos;avanguardia e promuovere
                il benessere psico-fisico della comunità locale.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={fesrProject.poster} download>
                    <Download /> Scarica il poster (PDF)
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="https://europa.regione.basilicata.it" target="_blank" rel="noopener noreferrer">
                    europa.regione.basilicata.it <ArrowUpRight />
                  </a>
                </Button>
              </div>
            </div>

            <dl className="self-start rounded-[1.75rem] border bg-card p-6 sm:p-8">
              {details.map((item) => (
                <div key={item.label} className="border-b py-4 first:pt-0 last:border-b-0 last:pb-0">
                  <dt className="text-xs font-bold tracking-[0.28em] text-brand-ink uppercase">{item.label}</dt>
                  <dd className="mt-2 text-lg font-semibold tabular-nums">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
