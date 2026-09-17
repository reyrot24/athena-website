import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DisciplineExplorer } from "@/components/disciplines/discipline-explorer";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { disciplineDays } from "@/lib/discipline-days";
import { getSchedule } from "@/sanity/data";

export async function DisciplinesSection() {
  const schedule = await getSchedule();

  return (
    <section className="py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Discipline"
            title={
              <>
                Trova la tua <span className="txt-gradient">disciplina</span>
              </>
            }
            description="Scegli una disciplina per scoprire cosa ti aspetta e in quali giorni si allena."
          />
          <Button asChild variant="outline" className="w-fit">
            <Link href="/corsi">
              Tutti i corsi <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-14">
          <DisciplineExplorer days={disciplineDays(schedule)} />
        </div>
      </div>
    </section>
  );
}
