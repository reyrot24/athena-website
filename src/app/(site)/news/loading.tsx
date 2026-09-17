import { GridSkeleton, PageSkeleton, Skeleton } from "@/components/skeletons";

export default function NewsLoading() {
  return (
    <PageSkeleton>
      <Skeleton className="h-14 max-w-md rounded-full" />
      <Skeleton className="mt-12 aspect-16/9 rounded-3xl lg:aspect-16/7" />
      <GridSkeleton count={3} className="mt-16" itemClassName="aspect-4/3 rounded-3xl" />
    </PageSkeleton>
  );
}
