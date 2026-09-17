import { Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { DisciplineExplorer } from "@/components/disciplines/discipline-explorer";
import { ImageMasonry } from "@/components/gallery/image-masonry";
import { WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { disciplineDays } from "@/lib/discipline-days";
import { disciplines, whatsappLink } from "@/lib/site";
import { riseDelay } from "@/lib/utils";
import { getCoursePosters, getSchedule } from "@/sanity/data";

export const metadata: Metadata = {
  title: "Corsi",
  description:
    "Sala pesi, posturale, pilates, functional, total body, calisthenics, kickboxing, wing chun e danza: tutti i corsi di SSD CAM Athena a Montescaglioso.",
  alternates: { canonical: "/corsi" },
};

export default async function CorsiPage() {
  const [posters, schedule] = await Promise.all([getCoursePosters(), getSchedule()]);

  return (
    <PageTransition>
      <PageHero
        eyebrow="Corsi"
        title={
          <>
            Trova il tuo <span className="txt-gradient">ritmo</span>
          </>
        }
        description={`${disciplines.length} discipline, dalla sala pesi alla danza: scegli quella giusta per te e allenati con i nostri trainer.`}
        background={{ src: "/man-pesi.jpg" }}
      >
        <div className="hero-rise mt-10 flex flex-wrap gap-3" style={riseDelay(0.24)}>
          <Button asChild size="lg">
            <Link href="/orari">
              <Clock /> Orari settimanali
            </Link>
          </Button>
          <Button asChild size="lg" variant="glass">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Chiedi informazioni
            </a>
          </Button>
        </div>
      </PageHero>

      <section className="py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Discipline"
            title={
              <>
                Cosa puoi fare <span className="txt-gradient">da noi</span>
              </>
            }
            description="Scegli una disciplina per leggere di cosa si tratta e in quali giorni si allena."
          />
          <div className="mt-14">
            <DisciplineExplorer days={disciplineDays(schedule)} />
          </div>
        </div>
      </section>

      {posters.length > 0 && (
        <section className="border-t bg-muted/40 py-24 sm:py-32">
          <div className="container-page">
            <SectionHeading
              eyebrow="Locandine"
              title={
                <>
                  Corso per <span className="txt-gradient">corso</span>
                </>
              }
              description="Tutti i dettagli nelle locandine ufficiali dei corsi. Tocca per ingrandire."
            />
            <ImageMasonry
              className="mt-14"
              captions="below"
              items={posters.map((poster) => ({
                id: poster._id,
                image: poster.image,
                alt: `Locandina del corso ${poster.nome ?? ""}`.trim(),
                caption: poster.nome,
              }))}
            />
          </div>
        </section>
      )}
    </PageTransition>
  );
}
