import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";

type LegalPageProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  updatedAt: string;
  children: React.ReactNode;
};

/** Impaginazione comune a Privacy policy e Cookie policy: testo lungo, colonna leggibile. */
export function LegalPage({ eyebrow, title, description, updatedAt, children }: LegalPageProps) {
  return (
    <PageTransition>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground">Ultimo aggiornamento: {updatedAt}</p>
            <div className="mt-10 space-y-14">{children}</div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="heading-display text-3xl sm:text-4xl">{title}</h2>
      <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground [&_a]:font-semibold [&_a]:text-brand-ink [&_a]:underline-offset-2 [&_a:hover]:underline [&_strong]:text-foreground [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&>ul>li]:pl-1">
        {children}
      </div>
    </section>
  );
}
