"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  DAYS,
  dayLabel,
  sessionsForDay,
  slotStatus,
  slotsFor,
  type DayKey,
  type Slot,
} from "@/lib/schedule";
import { cn } from "@/lib/utils";
import type { ScheduleDoc } from "@/sanity/types";
import { useRomeNow } from "./use-rome-now";

type View = "corso" | "giorno";

export function ScheduleBoard({ schedule }: { schedule: ScheduleDoc[] }) {
  const courses = useMemo(
    () =>
      schedule
        .map((doc) => ({
          id: doc._id,
          name: doc.corso,
          days: DAYS.map((day) => ({ ...day, slots: slotsFor(doc, day.key) })),
        }))
        .filter((course) => course.days.some((day) => day.slots.length > 0)),
    [schedule],
  );

  const now = useRomeNow();
  const [view, setView] = useState<View>("corso");
  const [courseId, setCourseId] = useState(courses[0]?.id);
  const [pickedDay, setPickedDay] = useState<DayKey | null>(null);

  const course = courses.find((c) => c.id === courseId) ?? courses[0];
  const activeDay = pickedDay ?? now?.day ?? "lunedi";
  const daySessions = useMemo(() => sessionsForDay(schedule, activeDay), [schedule, activeDay]);
  const liveMinutes = now && activeDay === now.day ? now.minutes : null;

  if (!course) {
    return <p className="text-center text-muted-foreground">Gli orari saranno pubblicati a breve.</p>;
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-fit rounded-full border bg-card p-1" role="tablist" aria-label="Vista">
          {(
            [
              ["corso", "Per corso"],
              ["giorno", "Per giorno"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={view === value}
              onClick={() => setView(value)}
              className={cn(
                "relative rounded-full px-5 py-2.5 text-sm font-bold transition-colors",
                view === value ? "text-ink" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {view === value && (
                <motion.span
                  layoutId="schedule-view-pill"
                  className="absolute inset-0 rounded-full bg-brand"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {now ? (
            <>
              Oggi è <strong className="text-foreground">{dayLabel(now.day).toLowerCase()}</strong>, ore{" "}
              {now.time}
            </>
          ) : (
            " "
          )}
        </p>
      </div>

      {view === "corso" ? (
        <div className="mt-8">
          <div
            role="tablist"
            aria-label="Corsi"
            className="no-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {courses.map((c) => {
              const selected = c.id === course.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setCourseId(c.id)}
                  className={cn(
                    "relative shrink-0 snap-start rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                    selected
                      ? "border-transparent text-bone dark:text-ink"
                      : "hover:border-brand hover:text-brand-ink",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="schedule-course-pill"
                      className="absolute inset-0 rounded-full bg-ink dark:bg-brand"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{c.name}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
            >
              {course.days.map((day) => {
                const isToday = now?.day === day.key;
                return (
                  <section
                    key={day.key}
                    aria-label={day.label}
                    className={cn(
                      "flex flex-col rounded-3xl border bg-card p-4 transition",
                      isToday && "border-brand ring-4 ring-brand/15",
                      day.slots.length === 0 && "opacity-55 max-sm:hidden",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-2xl uppercase">{day.label}</h3>
                      {isToday && (
                        <span className="rounded-full bg-brand px-2 py-0.5 text-[0.62rem] font-bold tracking-wider text-ink uppercase">
                          Oggi
                        </span>
                      )}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {day.slots.length ? (
                        day.slots.map((slot, i) => (
                          <li key={`${slot.raw}-${i}`}>
                            <SlotChip slot={slot} live={isToday && now ? slotStatus(slot, now.minutes) : null} />
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground">Nessun corso</li>
                      )}
                    </ul>
                  </section>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="mt-8">
          <div role="tablist" aria-label="Giorni" className="grid grid-cols-7 gap-1 rounded-2xl border bg-card p-1.5">
            {DAYS.map((day) => {
              const selected = day.key === activeDay;
              return (
                <button
                  key={day.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setPickedDay(day.key)}
                  className={cn(
                    "relative rounded-xl py-3 text-sm font-bold transition-colors",
                    selected ? "text-ink" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="schedule-day-pill"
                      className="absolute inset-0 rounded-xl bg-brand"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">
                    <span className="sm:hidden">{day.short}</span>
                    <span className="hidden sm:inline">{day.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.ol
              key={activeDay}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6 grid gap-3 md:grid-cols-2"
            >
              {daySessions.length === 0 ? (
                <li className="rounded-3xl border bg-card p-10 text-center text-muted-foreground md:col-span-2">
                  Nessun corso in programma per {dayLabel(activeDay).toLowerCase()}.
                </li>
              ) : (
                daySessions.map((session, i) => {
                  const status = liveMinutes === null ? null : slotStatus(session.slot, liveMinutes);
                  return (
                    <li
                      key={`${session.course}-${session.slot.raw}-${i}`}
                      className={cn(
                        "flex items-center gap-5 rounded-3xl border bg-card p-5",
                        status === "done" && "opacity-50",
                        status === "live" && "border-brand ring-4 ring-brand/15",
                      )}
                    >
                      <div className="w-24 shrink-0">
                        <p className="font-display text-3xl leading-none tabular-nums">
                          {session.slot.start ?? "—"}
                        </p>
                        {session.slot.end && (
                          <p className="mt-1 text-xs text-muted-foreground tabular-nums">
                            → {session.slot.end}
                          </p>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-lg font-semibold">{session.course}</p>
                        {session.slot.label && <p className="text-sm text-muted-foreground">{session.slot.label}</p>}
                      </div>
                      {status === "live" && (
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-2.5 py-1 text-[0.65rem] font-bold tracking-wider text-ink uppercase">
                          <span className="size-1.5 animate-pulse rounded-full bg-ink" /> In corso
                        </span>
                      )}
                    </li>
                  );
                })
              )}
            </motion.ol>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function SlotChip({ slot, live }: { slot: Slot; live: ReturnType<typeof slotStatus> | null }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-muted/70 px-3 py-2.5",
        live === "live" && "bg-brand text-ink",
        live === "done" && "opacity-50",
      )}
    >
      {slot.start ? (
        <p className="text-sm font-bold tabular-nums">
          {slot.start} – {slot.end}
        </p>
      ) : null}
      {slot.label && (
        <p className={cn("text-xs leading-snug", live === "live" ? "text-ink/75" : "text-muted-foreground")}>
          {slot.label}
        </p>
      )}
    </div>
  );
}
