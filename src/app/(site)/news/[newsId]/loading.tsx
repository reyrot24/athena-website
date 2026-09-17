import { Skeleton } from "@/components/skeletons";

export default function ArticleLoading() {
  return (
    <div aria-busy="true">
      <span className="sr-only" role="status">
        Caricamento in corso…
      </span>
      <section className="bg-ink pt-32 pb-14 sm:pt-40 sm:pb-20">
        <div className="container-page space-y-6">
          <div className="skeleton-dark h-4 w-28 rounded-full" />
          <div className="skeleton-dark h-7 w-40 rounded-full" />
          <div className="skeleton-dark h-24 w-full max-w-4xl rounded-2xl sm:h-32" />
        </div>
      </section>
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 lg:py-20">
        <div className="max-w-3xl space-y-4">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-5 rounded-full" />
          ))}
        </div>
        <Skeleton className="aspect-4/5 rounded-3xl" />
      </div>
    </div>
  );
}
