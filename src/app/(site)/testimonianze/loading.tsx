import { GridSkeleton, PageSkeleton } from "@/components/skeletons";

export default function TestimonianzeLoading() {
  return (
    <PageSkeleton>
      <GridSkeleton count={6} itemClassName="aspect-4/3 rounded-[1.75rem]" />
    </PageSkeleton>
  );
}
