import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { disciplines } from "@/lib/site";
import { riseDelay } from "@/lib/utils";
import { getGallery } from "@/sanity/data";
import { HeroSlideshow, type HeroSlide } from "./hero-slideshow";

export async function Hero() {
  const gallery = await getGallery();
  // Foto orizzontali della galleria Sanity (la palestra vera) tra due immagini d'atmosfera.
  const photos = gallery.filter((item) => item.image.width / item.image.height >= 1.25).slice(0, 3);
  const slides: HeroSlide[] = [
    { src: "/man-pesi.jpg" },
    ...photos.map((item) => ({ image: item.image })),
    { src: "/man-runs.jpg" },
  ];

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-bone">
      <HeroSlideshow slides={slides} />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_11_12/0.7)_0%,rgb(11_11_12/0.3)_35%,rgb(11_11_12/0.85)_78%,#0b0b0c_100%)]"
      />
      <div aria-hidden className="absolute -bottom-48 -left-40 -z-10 size-[38rem] rounded-full bg-brand/25 blur-3xl" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />

      <div className="container-page relative flex flex-1 flex-col justify-end pt-32 pb-12 sm:pb-16">
        <p
          className="hero-rise inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.68rem] font-bold tracking-[0.22em] uppercase backdrop-blur-md sm:text-xs"
          style={riseDelay(0)}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
          <span className="max-sm:hidden">Centro Attività Motoria ·</span>
          <span className="sm:hidden">Palestra ·</span> Montescaglioso
        </p>

        <h1 className="heading-display mt-6 text-[clamp(4.75rem,21vw,17rem)] leading-[0.82]">
          <span className="hero-rise txt-stroke block text-bone/85" style={riseDelay(0.1)}>
            We are
          </span>
          <span className="hero-rise txt-gradient block" style={riseDelay(0.2)}>
            Athena
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="hero-rise max-w-xl text-lg text-bone/80 sm:text-xl" style={riseDelay(0.3)}>
            Sala pesi, corsi e discipline per tutte le età. Un team di giovani professionisti e un
            ambiente inclusivo e stimolante, nel cuore di Montescaglioso.
          </p>
          <div className="hero-rise flex flex-wrap gap-3" style={riseDelay(0.4)}>
            <Button asChild size="lg">
              <Link href="/corsi">
                Scopri i corsi <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link href="/orari">
                <Clock /> Orari
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative -mx-[5%] mb-8 -rotate-[1.5deg] bg-brand py-4 text-ink shadow-[0_-20px_60px_-20px_rgb(246_161_76/0.5)]">
        <Marquee duration={34}>
          {disciplines.map((discipline) => (
            <span
              key={discipline.slug}
              className="flex items-center gap-8 pr-8 font-display text-2xl whitespace-nowrap uppercase sm:text-3xl"
            >
              {discipline.name}
              <span aria-hidden className="text-base">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
