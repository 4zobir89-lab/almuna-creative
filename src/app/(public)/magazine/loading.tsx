import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      <Skeleton className="h-9 w-48" />
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="rounded-lg border border-brand-border bg-brand-card p-6 text-center space-y-3">
            <Skeleton className="h-8 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-20 mx-auto" />
            <Skeleton className="h-4 w-24 mx-auto" />
            <Skeleton className="h-10 w-32 mx-auto rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
