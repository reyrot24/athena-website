import { Skeleton } from "@/components/skeletons";

export default function UploadLoading() {
  return (
    <div aria-busy="true" className="space-y-4">
      <span className="sr-only" role="status">
        Caricamento in corso…
      </span>
      <Skeleton className="h-10 w-2/3 rounded-xl" />
      <Skeleton className="h-5 w-1/2 rounded-full" />
      <Skeleton className="mt-6 h-48 rounded-3xl" />
    </div>
  );
}
