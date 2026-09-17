import { CountUp } from "@/components/ui/count-up";
import { activeDays, findCourse } from "@/lib/schedule";
import { disciplines, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getSchedule, getTrainers } from "@/sanity/data";

// Bordi della griglia: 2×2 su mobile, 4 colonne da lg.
const cellClass = [
  "",
  "border-l pl-6 sm:pl-10",
  "border-t lg:border-t-0 lg:border-l lg:pl-10",
  "border-t border-l pl-6 sm:pl-10 lg:border-t-0",
];

export async function StatsStrip() {
  const [trainers, schedule] = await Promise.all([getTrainers(), getSchedule()]);
  const openDays = activeDays(findCourse(schedule, ["Sala pesi"])).length;

  const stats = [
    { value: disciplines.length, label: "Discipline tra corsi e sala pesi" },
    { value: trainers.length, label: "Professionisti nel nostro team" },
    { value: openDays, suffix: "/7", label: "Giorni di apertura della sala pesi" },
    { value: site.foundedYear, label: "L'anno in cui è nata Athena", static: true },
  ].filter((stat) => stat.value > 0);

  return (
    <section aria-label="Athena in numeri" className="border-b">
      <div className="container-page grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className={cn("py-10 sm:py-14", cellClass[i])}>
            <p className="heading-display text-6xl text-brand-ink sm:text-7xl">
              {stat.static ? stat.value : <CountUp to={stat.value} suffix={stat.suffix} />}
            </p>
            <p className="mt-3 max-w-[18ch] text-sm text-muted-foreground sm:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
