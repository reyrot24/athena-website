"use client";

import { ArrowRight, CalendarDays } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Skeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { DAYS, dayLabel, sessionsForDay, slotStatus, type DayKey } from "@/lib/schedule";
import { cn } from "@/lib/utils";
import type { ScheduleDoc } from "@/sanity/types";
import { useRomeNow } from "./use-rome-now";

export function TodaySchedule({ schedule }: { schedule: ScheduleDoc[] }) {
  const now = useRomeNow();
  const [picked, setPicked] = useState<DayKey | null>(null);
  const day = picked ?? now?.day ?? null;
  const isToday = day !== null && day === now?.day;

  const sessions = useMemo(() => (day ? sessionsForDay(schedule, day) : []), [schedule, day]);
  const nextIndex =
    isToday && now ? sessions.findIndex((s) => slotStatus(s.slot, now.minutes) === "upcoming") : -1;

  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div>
        <SectionHeading
          eyebrow="In tempo reale"
          title={
            <>
              Oggi in <span className="txt-gradient">palestra</span>
            </>
          }
          description="Il programma della giornata, preso direttamente dagli orari aggiornati dallo staff."
        />

        <div className="mt-8 flex h-6 items-center gap-3 text-sm font-semibold" aria-live="polite">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
          </span>
          {now ? (
            <span>
              {dayLabel(now.day)}, ore {now.time}
            </span>
          ) : (
            <Skeleton className="h-4 w-36 rounded-full" />
          )}
        </div>

        <div
          role="tablist"
          aria-label="Giorno della settimana"
          className="mt-6 grid grid-cols-7 gap-1 rounded-2xl border bg-card p-1.5"
        >
          {DAYS.map((d) => {
            const selected = d.key === day;
            return (
              <button
                key={d.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setPicked(d.key)}
                className={cn(
                  "relative rounded-xl py-3 text-sm font-bold transition-colors",
                  selected ? "text-ink" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="today-day-pill"
                    className="absolute inset-0 rounded-xl bg-brand"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{d.short}</span>
                {now?.day === d.key && (
                  <span
                    aria-label="oggi"
                    className={cn(
                      "absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full",
                      selected ? "bg-ink" : "bg-brand",
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        <Button asChild variant="outline" className="mt-8">
          <Link href="/orari">
            Orario completo <ArrowRight className="transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </Button>
      </div>

      <div className="min-h-[24rem] rounded-4xl border bg-card p-2 sm:p-3">
        {day === null ? (
          <div className="space-y-2 p-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {sessions.length === 0 ? (
                <div className="grid min-h-[22rem] place-items-center p-8 text-center">
                  <div>
                    <CalendarDays className="mx-auto size-10 text-brand-ink" />
                    <p className="mt-4 font-display text-3xl uppercase">Giorno di riposo</p>
                    <p className="mt-2 text-muted-foreground">
                      Nessun corso in programma per {dayLabel(day).toLowerCase()}.
                    </p>
                  </div>
                </div>
              ) : (
                // Con mouse/trackpad la pagina non riparte a scorrere quando la lista arriva in fondo;
                // sul touch no, altrimenti chi scorre la pagina col dito resterebbe bloccato sulla lista.
                <ol className="scrollbar-thin max-h-[34rem] divide-y overflow-y-auto pr-1 pointer-fine:overscroll-contain">
                  {sessions.map((session, i) => {
                    const status = isToday && now ? slotStatus(session.slot, now.minutes) : "upcoming";
                    return (
                      <li
                        key={`${session.course}-${session.slot.raw}-${i}`}
                        className={cn(
                          "flex items-center gap-4 rounded-2xl px-3 py-4 sm:px-4",
                          status === "done" && "opacity-45",
                          status === "live" && "bg-brand/10",
                        )}
                      >
                        <div className="w-24 shrink-0 sm:w-28">
                          <p className="font-display text-2xl leading-none tabular-nums">
                            {session.slot.start ?? "—"}
                          </p>
                          {session.slot.end && (
                            <p className="mt-1 text-xs text-muted-foreground tabular-nums">
                              fino alle {session.slot.end}
                            </p>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold">{session.course}</p>
                          {session.slot.label && (
                            <p className="text-sm text-muted-foreground">{session.slot.label}</p>
                          )}
                        </div>
                        {status === "live" && (
                          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-2.5 py-1 text-[0.65rem] font-bold tracking-wider text-ink uppercase">
                            <span className="size-1.5 animate-pulse rounded-full bg-ink" /> In corso
                          </span>
                        )}
                        {i === nextIndex && (
                          <span className="shrink-0 rounded-full border border-brand/50 px-2.5 py-1 text-[0.65rem] font-bold tracking-wider text-brand-ink uppercase">
                            Prossimo
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
