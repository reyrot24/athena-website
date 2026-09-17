import { PageSkeleton, Skeleton } from "@/components/skeletons";

const heights = ["h-64", "h-96", "h-80", "h-72", "h-64", "h-96"];

export default function GalleriaLoading() {
  return (
    <PageSkeleton>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {heights.map((height, i) => (
          <Skeleton key={i} className={`mb-5 break-inside-avoid rounded-3xl ${height}`} />
        ))}
      </div>
    </PageSkeleton>
  );
}
