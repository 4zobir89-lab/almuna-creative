import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-amiri font-bold text-brand-accent">٤٠٤</h1>
      <p className="text-xl text-brand-secondary">الصفحة غير موجودة</p>
      <Link
        href="/"
        className="rounded-lg bg-brand-accent px-6 py-2 text-white hover:bg-brand-accent/90"
      >
        العودة إلى الرئيسية
      </Link>
    </div>
  );
}
