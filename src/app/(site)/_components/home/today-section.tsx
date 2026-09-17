import { TodaySchedule } from "@/components/schedule/today-schedule";
import { getSchedule } from "@/sanity/data";

export async function TodaySection() {
  const schedule = await getSchedule();

  return (
    <section className="border-y bg-muted/40 py-24 sm:py-32">
      <div className="container-page">
        <TodaySchedule schedule={schedule} />
      </div>
    </section>
  );
}
