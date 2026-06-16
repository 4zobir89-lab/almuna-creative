import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
};

export function Pagination({ currentPage, totalPages, basePath, searchParams }: Props) {
  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams();
    if (searchParams) {
      for (const [key, val] of Object.entries(searchParams)) {
        if (val && key !== "page") params.set(key, val);
      }
    }
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const pages: (number | "...")[] = [];
  const delta = 2;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="التصفح">
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-xs text-white/60 transition-colors hover:border-orange-500/30 hover:text-orange-300"
        >
          ←
        </Link>
      )}

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`e${i}`} className="flex h-9 w-9 items-center justify-center text-xs text-white/30">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
              p === currentPage
                ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                : "border border-white/10 text-white/60 hover:border-orange-500/30 hover:text-orange-300"
            }`}
          >
            {p}
          </Link>
        ),
      )}

      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-xs text-white/60 transition-colors hover:border-orange-500/30 hover:text-orange-300"
        >
          →
        </Link>
      )}
    </nav>
  );
}
