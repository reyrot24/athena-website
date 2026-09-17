import { Handshake, HeartPulse, Sparkles, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { Timeline, type Milestone } from "@/components/timeline/timeline";
import { TrainerGrid } from "@/components/trainers/trainer-grid";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { fallbackMilestones } from "@/lib/site";
import { getStory, getTrainers } from "@/sanity/data";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "La storia di SSD CAM Athena, i nostri valori e il team di trainer e istruttori della palestra di Montescaglioso.",
  alternates: { canonical: "/chisiamo" },
};

const values = [
  { icon: Users, title: "Inclusione", text: "Un ambiente aperto a tutti, dai più piccoli agli adulti, a ogni livello di preparazione." },
  { icon: Handshake, title: "Comunità", text: "Lo sport come mezzo per costruire relazioni e far crescere il nostro paese." },
  { icon: HeartPulse, title: "Benessere", text: "Attività fisica al servizio della salute del corpo e della mente." },
  { icon: Sparkles, title: "Innovazione", text: "Metodologie moderne e approcci personalizzati per coinvolgere e motivare." },
];

// Le frasi dipinte sulle pareti della palestra (le foto sono in /public).
const wallQuotes = [
  { src: "/Athena_Palestra_2.jpg", text: "Migliorarsi ogni giorno è una questione di scelte.", author: null },
  {
    src: "/Athena_Palestra_3.jpg",
    text: "La motivazione è ciò che ti permette di iniziare. L'abitudine è ciò che ti permette di andare avanti.",
    author: "Jim Rohn",
  },
  { src: "/Athena_Palestra_4.jpg", text: "Se non credi in te stesso, nessuno lo farà per te!", author: "Kobe Bryant" },
];

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-brand-ink">{children}</span>;
}

export default async function ChiSiamoPage() {
  const [trainers, story] = await Promise.all([getTrainers(), getStory()]);
  const milestones: Milestone[] = story.length
    ? story.map((item) => ({ date: item.data, title: item.titolo, description: item.descrizione }))
    : fallbackMilestones;

  return (
    <PageTransition>
      <PageHero
        eyebrow="Chi siamo"
        title={
          <>
            We are <span className="txt-gradient">Athena</span>
          </>
        }
        description="Un team di giovani professionisti che ha scelto di tornare a casa per far crescere lo sport e l'attività fisica a Montescaglioso."
        background={{ src: "/Athena_Palestra_1.jpg" }}
      />

      <section className="py-24 sm:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>La nostra storia</Eyebrow>
            <blockquote className="heading-display mt-6 text-5xl sm:text-6xl">
              &ldquo;Migliorarsi ogni giorno è una questione di <span className="txt-gradient">scelte</span>.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground">— Scritto su una parete della nostra palestra</p>
          </div>

          <div>
            <p className="text-xl leading-relaxed text-foreground/90 sm:text-2xl">
              Siamo un <Highlight>team di giovani professionisti</Highlight> che, dopo aver acquisito
              competenze ed esperienze significative fuori regione, ha scelto di tornare nel proprio paese
              per contribuire alla <Highlight>crescita dello sport</Highlight> e dell&apos;attività fisica.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Il nostro obiettivo è andare oltre le semplici pratiche sportive, creando un ambiente inclusivo
              e stimolante. Promuoviamo uno stile di vita attivo e sano, valorizzando lo sport non solo come
              attività fisica ma come mezzo per costruire comunità, sviluppare competenze e favorire il
              benessere mentale.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Siamo aperti a collaborazioni con associazioni e istituzioni per ampliare la nostra offerta e
              puntiamo sull&apos;innovazione, con metodologie moderne e approcci personalizzati. Non vediamo
              l&apos;ora di coinvolgere sempre più persone nel nostro progetto!
            </p>

            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {values.map(({ icon: Icon, title, text }, i) => (
                <Reveal as="li" key={title} delay={i * 0.08} className="rounded-[1.75rem] border bg-card p-6">
                  <Icon className="size-7 text-brand-ink" />
                  <h3 className="heading-display mt-5 text-3xl">{title}</h3>
                  <p className="mt-2 text-muted-foreground">{text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/40 py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Le tappe"
            title={
              <>
                Il nostro <span className="txt-gradient">percorso</span>
              </>
            }
          />
          <div className="mt-16">
            <Timeline items={milestones} />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Il team"
            title={
              <>
                I nostri <span className="txt-gradient">trainer</span>
              </>
            }
            description="Chinesiologi, personal trainer, fisioterapisti, maestri e istruttori. Tocca un profilo per conoscerli meglio."
          />
          <div className="mt-14">
            {trainers.length > 0 ? (
              <TrainerGrid trainers={trainers} />
            ) : (
              <p className="text-muted-foreground">Presto qui i profili del nostro team.</p>
            )}
          </div>
        </div>
      </section>

      <section className="dark bg-background py-24 text-foreground sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Sui nostri muri"
            title={
              <>
                Parole che <span className="txt-gradient">allenano</span>
              </>
            }
            description="Le frasi che accompagnano ogni allenamento, direttamente dalle pareti di Athena."
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {wallQuotes.map((quote, i) => (
              <Reveal as="li" key={quote.src} delay={i * 0.1}>
                <figure className="group">
                  <div className="relative aspect-square overflow-hidden rounded-4xl border">
                    <Image
                      src={quote.src}
                      alt={`Frase sulla parete: «${quote.text}»`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-1000 ease-snappy group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-5">
                    <p className="text-lg leading-snug">&ldquo;{quote.text}&rdquo;</p>
                    {quote.author && (
                      <p className="mt-2 text-xs font-bold tracking-[0.2em] text-brand-ink uppercase">
                        {quote.author}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </PageTransition>
  );
}
