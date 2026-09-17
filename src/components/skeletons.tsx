import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("skeleton rounded-2xl", className)} />;
}

/** Stessa altezza e colore di <PageHero>: la navigazione non "salta". */
export function PageHeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-ink pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div className="container-page space-y-6">
        <div className="skeleton-dark h-3 w-36 rounded-full" />
        <div className="skeleton-dark h-20 w-4/5 max-w-3xl rounded-2xl sm:h-32" />
        <div className="skeleton-dark h-5 w-full max-w-xl rounded-full" />
      </div>
    </section>
  );
}

export function PageSkeleton({ children }: { children?: React.ReactNode }) {
  return (
    <div aria-busy="true">
      <span className="sr-only" role="status">
        Caricamento in corso…
      </span>
      <PageHeroSkeleton />
      <div className="container-page py-16 sm:py-24">{children}</div>
    </div>
  );
}

export function GridSkeleton({
  count = 6,
  className,
  itemClassName,
}: {
  count?: number;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className={cn("aspect-square", itemClassName)} />
      ))}
    </div>
  );
}
