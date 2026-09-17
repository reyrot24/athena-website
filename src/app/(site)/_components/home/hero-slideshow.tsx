"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SanityImage } from "@/components/ui/sanity-image";
import { cn } from "@/lib/utils";
import type { SanityImg } from "@/sanity/types";

export type HeroSlide = { src: string } | { image: SanityImg };

const INTERVAL = 6500;

export function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  // `highest` = slide più avanzata già mostrata: montiamo solo quella successiva,
  // così le foto si scaricano una alla volta invece che tutte subito.
  const [{ active, highest }, setState] = useState({ active: 0, highest: 0 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || slides.length < 2) return;
    const id = window.setInterval(() => {
      setState((state) => {
        const next = (state.active + 1) % slides.length;
        return { active: next, highest: Math.max(state.highest, next) };
      });
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [reduceMotion, slides.length]);

  return (
    <div aria-hidden className="absolute inset-0 -z-20">
      {slides.map((slide, i) => {
        if (i > highest + 1) return null;
        const isActive = i === active;
        return (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-[opacity,scale] ease-out",
              isActive
                ? "scale-100 opacity-100 [transition-duration:1.6s,9s]"
                : "scale-110 opacity-0 [transition-delay:0s,1.6s] [transition-duration:1.6s,0s]",
              i === 0 && highest === 0 && "hero-zoom",
            )}
          >
            {"src" in slide ? (
              <Image src={slide.src} alt="" fill preload={i === 0} sizes="100vw" className="object-cover" />
            ) : (
              <SanityImage image={slide.image} alt="" fill sizes="100vw" className="object-cover" />
            )}
          </div>
        );
      })}
    </div>
  );
}
