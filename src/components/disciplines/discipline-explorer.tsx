"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DAYS, type DayKey } from "@/lib/schedule";
import { disciplines, whatsappLink, type Discipline } from "@/lib/site";
import { cn } from "@/lib/utils";

type DisciplineExplorerProps = {
  /** Giorni in cui ogni disciplina ha lezioni, calcolati dagli orari su Sanity. */
  days: Record<string, DayKey[]>;
};

export function DisciplineExplorer({ days }: DisciplineExplorerProps) {
  const [active, setActive] = useState(0);
  const current = disciplines[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <ul className="border-t">
        {disciplines.map((discipline, i) => {
          const isActive = i === active;
          return (
            <li key={discipline.slug} className="border-b">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                className="group flex w-full items-center gap-5 py-5 text-left sm:py-6"
              >
                <span className="w-8 text-sm font-bold text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "heading-display flex-1 text-4xl transition-[color,translate] duration-500 ease-snappy sm:text-5xl lg:text-6xl",
                    isActive ? "translate-x-2 text-brand-ink" : "group-hover:translate-x-2",
                  )}
                >
                  {discipline.name}
                </span>
                <ArrowUpRight
                  className={cn(
                    "size-7 shrink-0 transition-[rotate,color] duration-500 ease-snappy",
                    isActive ? "rotate-45 text-brand-ink" : "text-muted-foreground",
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    className="overflow-hidden lg:hidden"
                  >
                    <div className="pb-6">
                      <DisciplineCard discipline={discipline} days={days[discipline.slug] ?? []} index={i} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:block">
        <div className="sticky top-28">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <DisciplineCard discipline={current} days={days[current.slug] ?? []} index={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function DisciplineCard({ discipline, days, index }: { discipline: Discipline; days: DayKey[]; index: number }) {
  const Icon = discipline.icon;

  return (
    <div className="grain relative isolate overflow-hidden rounded-4xl bg-ink p-7 text-bone sm:p-10">
      <div aria-hidden className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-brand/30 blur-3xl" />
      <p
        aria-hidden
        className="heading-display txt-stroke absolute -right-3 -bottom-10 -z-10 text-[12rem] leading-none text-white/10"
      >
        {String(index + 1).padStart(2, "0")}
      </p>

      <span className="grid size-14 place-items-center rounded-2xl bg-brand text-ink">
        <Icon className="size-7" />
      </span>
      <h3 className="heading-display mt-7 text-5xl">{discipline.name}</h3>
      <p className="mt-4 leading-relaxed text-bone/75">{discipline.description}</p>

      <div className="mt-7">
        <p className="text-xs font-bold tracking-[0.2em] text-bone/50 uppercase">In settimana</p>
        {days.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {DAYS.map((day) => {
              const on = days.includes(day.key);
              return (
                <li
                  key={day.key}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-bold",
                    on ? "bg-brand text-ink" : "bg-white/5 text-bone/35",
                  )}
                >
                  <span aria-hidden>{day.short}</span>
                  <span className="sr-only">{`${day.label}: ${on ? "sì" : "no"}`}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-2 text-bone/70">Orari su richiesta: scrivici per info.</p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/orari">
            Vedi gli orari <ArrowRight className="transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </Button>
        <Button asChild variant="glass">
          <a
            href={whatsappLink(`Ciao Athena! Vorrei informazioni sul corso di ${discipline.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Chiedi info
          </a>
        </Button>
      </div>
    </div>
  );
}
