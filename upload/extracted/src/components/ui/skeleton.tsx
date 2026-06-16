export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-brand-hover/50 ${className}`} />;
}

export function PostCardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-7 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex justify-between pt-4 border-t border-white/5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export function PostGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <Skeleton className="h-9 w-48" />
      <PostGridSkeleton />
    </div>
  );
}
