import type { ScheduleDoc } from "@/sanity/types";
import { activeDays, findCourse, type DayKey } from "./schedule";
import { disciplines } from "./site";

/** Per ogni disciplina, i giorni in cui ha lezioni secondo gli "Orari corsi" su Sanity. */
export function disciplineDays(schedule: ScheduleDoc[]): Record<string, DayKey[]> {
  return Object.fromEntries(
    disciplines.map((discipline) => [discipline.slug, activeDays(findCourse(schedule, discipline.aliases))]),
  );
}
