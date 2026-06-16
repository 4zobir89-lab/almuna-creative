export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-full border-2 border-brand-gold/20" />
          <div className="absolute inset-0 rounded-full border-2 border-brand-gold border-t-transparent animate-spin" />
        </div>
        <p className="mt-4 text-sm font-tajawal text-[var(--color-text-secondary)]">
          جاري التحميل…
        </p>
      </div>
    </div>
  );
}
