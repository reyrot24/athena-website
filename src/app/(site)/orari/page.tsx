import { CircleAlert } from "lucide-react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { ScheduleBoard } from "@/components/schedule/schedule-board";
import { whatsappLink } from "@/lib/site";
import { getSchedule } from "@/sanity/data";

export const metadata: Metadata = {
  title: "Orari",
  description: "Gli orari settimanali di tutti i corsi e della sala pesi di SSD CAM Athena a Montescaglioso.",
  alternates: { canonical: "/orari" },
};

export default async function OrariPage() {
  const schedule = await getSchedule();

  return (
    <PageTransition>
      <PageHero
        eyebrow="Orari"
        title={
          <>
            Orari <span className="txt-gradient">settimanali</span>
          </>
        }
        description="Filtra per corso o per giorno: trovi sempre gli orari aggiornati dallo staff."
        background={{ src: "/man-runs.jpg" }}
      />

      <section className="py-16 sm:py-24">
        <div className="container-page">
          <ScheduleBoard schedule={schedule} />
          <p className="mt-12 flex items-start gap-3 rounded-2xl border bg-card p-5 text-sm text-muted-foreground">
            <CircleAlert className="mt-0.5 size-5 shrink-0 text-brand-ink" />
            <span>
              Gli orari possono subire variazioni durante festività ed eventi. Per conferme{" "}
              <a
                href={whatsappLink("Ciao Athena! Vorrei una conferma sugli orari dei corsi.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-ink underline underline-offset-4"
              >
                scrivici su WhatsApp
              </a>
              .
            </span>
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
