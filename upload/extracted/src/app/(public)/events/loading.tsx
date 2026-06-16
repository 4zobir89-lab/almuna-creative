import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      <Skeleton className="h-9 w-48" />
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="rounded-lg border border-brand-border bg-brand-card p-5 space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
