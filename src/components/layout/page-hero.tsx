import Image from "next/image";
import { SanityImage } from "@/components/ui/sanity-image";
import { riseDelay } from "@/lib/utils";
import type { SanityImg } from "@/sanity/types";

type Background = { src: string } | { image: SanityImg };

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  background?: Background | null;
  children?: React.ReactNode;
};

/** Testata scura comune a tutte le pagine interne (l'header vi si appoggia trasparente). */
export function PageHero({ eyebrow, title, description, background, children }: PageHeroProps) {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink pt-36 pb-16 text-bone sm:pt-44 sm:pb-24">
      {background && (
        <div aria-hidden className="absolute inset-0 -z-20 opacity-45">
          {"src" in background ? (
            <Image src={background.src} alt="" fill preload sizes="100vw" className="object-cover" />
          ) : (
            <SanityImage image={background.image} alt="" fill preload sizes="100vw" className="object-cover" />
          )}
        </div>
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_75%_at_90%_0%,rgb(246_161_76/0.32),transparent_65%),linear-gradient(180deg,rgb(11_11_12/0.55)_0%,rgb(11_11_12/0.8)_65%,#0b0b0c_100%)]"
      />

      <div className="container-page">
        <p
          className="hero-rise inline-flex items-center gap-3 text-xs font-bold tracking-[0.28em] text-brand uppercase"
          style={riseDelay(0)}
        >
          <span aria-hidden className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
        <h1
          className="hero-rise heading-display mt-5 max-w-5xl text-[clamp(3.5rem,11vw,9.5rem)]"
          style={riseDelay(0.08)}
        >
          {title}
        </h1>
        {description && (
          <p className="hero-rise mt-6 max-w-2xl text-lg text-bone/75 sm:text-xl" style={riseDelay(0.16)}>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
