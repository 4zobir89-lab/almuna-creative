"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { AdminHeader } from "./admin-header";
import { AdminSidebar } from "./admin-sidebar";
import { ToastProvider } from "@/components/ui/toast";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-accent border-t-transparent mx-auto" />
          <p className="mt-4 text-brand-secondary">جاري التحميل…</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-brand-bg">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="pt-16 md:mr-64">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}
