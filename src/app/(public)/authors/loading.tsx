import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      <Skeleton className="h-9 w-48" />
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="rounded-lg border border-brand-border bg-brand-card p-5">
            <div className="flex items-start gap-4">
              <Skeleton className="h-14 w-14 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
