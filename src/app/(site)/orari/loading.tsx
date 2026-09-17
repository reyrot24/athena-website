import { PageSkeleton, Skeleton } from "@/components/skeletons";

export default function OrariLoading() {
  return (
    <PageSkeleton>
      <Skeleton className="h-12 w-64 rounded-full" />
      <div className="mt-8 flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-11 w-32 shrink-0 rounded-full" />
        ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {Array.from({ length: 7 }, (_, i) => (
          <Skeleton key={i} className="h-44 rounded-3xl" />
        ))}
      </div>
    </PageSkeleton>
  );
}
