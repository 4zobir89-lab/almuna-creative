import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <Skeleton className="h-9 w-48 mx-auto" />
        <Skeleton className="h-5 w-64 mx-auto" />
      </div>
      <div className="rounded-lg border border-brand-border p-6 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
