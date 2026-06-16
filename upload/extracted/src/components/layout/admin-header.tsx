"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = { onToggleSidebar: () => void };

export function AdminHeader({ onToggleSidebar }: Props) {
  const { data: session } = useSession();

  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-brand-border bg-brand-card px-4 md:px-6">
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-secondary hover:bg-brand-hover md:hidden"
          aria-label="فتح القائمة"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-sm font-bold text-white">
            ن
          </div>
          <span className="text-base font-amiri font-bold text-brand-accent md:text-xl">
            المنى — إدارة
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-sm text-brand-secondary hover:text-brand-accent transition-colors"
        >
          العودة إلى الموقع
        </Link>

        {session && (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-brand-secondary sm:inline">
              {session.user.name || session.user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
              تسجيل خروج
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
