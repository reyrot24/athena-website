import { GridSkeleton, PageSkeleton, Skeleton } from "@/components/skeletons";

export default function ChiSiamoLoading() {
  return (
    <PageSkeleton>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <Skeleton className="h-48" />
        <div className="space-y-4">
          <Skeleton className="h-6 rounded-full" />
          <Skeleton className="h-6 w-11/12 rounded-full" />
          <Skeleton className="h-6 w-4/5 rounded-full" />
          <Skeleton className="mt-8 h-40" />
        </div>
      </div>
      <GridSkeleton count={8} className="mt-24 grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
    </PageSkeleton>
  );
}
