"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-amiri font-bold">حدث خطأ</h1>
      <p className="text-brand-secondary">عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.</p>
      <button
        onClick={reset}
        className="rounded-lg bg-brand-accent px-6 py-2 text-white hover:bg-brand-accent/90"
      >
        إعادة المحاولة
      </button>
    </div>
  );
}
