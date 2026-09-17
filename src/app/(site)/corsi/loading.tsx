import { PageSkeleton, Skeleton } from "@/components/skeletons";

export default function CorsiLoading() {
  return (
    <PageSkeleton>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="space-y-5">
          {Array.from({ length: 7 }, (_, i) => (
            <Skeleton key={i} className="h-14" />
          ))}
        </div>
        <Skeleton className="hidden h-[30rem] rounded-4xl lg:block" />
      </div>
    </PageSkeleton>
  );
}
