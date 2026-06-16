export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-accent border-t-transparent mx-auto" />
        <p className="mt-4 text-brand-secondary">جاري التحميل…</p>
      </div>
    </div>
  );
}
