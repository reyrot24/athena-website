"use client";

import { Dumbbell, Handshake, PartyPopper, Share2, Sparkles, Workflow } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn, formatDate } from "@/lib/utils";

export type Milestone = { date: string; title: string; description: string | null };

const icons = [PartyPopper, Dumbbell, Workflow, Share2, Handshake, Sparkles];

export function Timeline({ items }: { items: Milestone[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative mx-auto max-w-5xl">
      <span aria-hidden className="absolute top-2 bottom-2 left-5 w-px bg-border md:left-1/2" />
      <motion.span
        aria-hidden
        style={{ scaleY: progress }}
        className="absolute top-2 bottom-2 left-5 w-px origin-top bg-brand md:left-1/2"
      />

      {items.map((item, i) => {
        const Icon = icons[i % icons.length];
        const right = i % 2 === 1;
        return (
          <li key={`${item.date}-${item.title}`} className="relative pb-14 pl-16 last:pb-0 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
            <span className="absolute top-0 left-5 z-10 grid size-11 -translate-x-1/2 place-items-center rounded-full border-2 border-brand bg-background text-brand-ink md:left-1/2">
              <Icon className="size-5" />
            </span>
            <Reveal
              delay={0.05}
              className={cn(right ? "md:col-start-2" : "md:col-start-1 md:text-right")}
            >
              <time dateTime={item.date} className="text-sm font-bold tracking-[0.2em] text-brand-ink uppercase">
                {formatDate(item.date)}
              </time>
              <h3 className="heading-display mt-2 text-3xl sm:text-4xl">{item.title}</h3>
              {item.description && <p className="mt-3 text-muted-foreground">{item.description}</p>}
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
