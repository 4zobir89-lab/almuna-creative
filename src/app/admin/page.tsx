"use client";

import { useState, useEffect } from "react";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if already authenticated
    const auth = sessionStorage.getItem("almuna-admin-auth");
    const time = sessionStorage.getItem("almuna-admin-time");

    if (auth === "true" && time) {
      // Session expires after 2 hours
      const elapsed = Date.now() - parseInt(time);
      if (elapsed < 2 * 60 * 60 * 1000) {
        setAuthenticated(true);
      } else {
        sessionStorage.removeItem("almuna-admin-auth");
        sessionStorage.removeItem("almuna-admin-time");
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("almuna-admin-auth");
    sessionStorage.removeItem("almuna-admin-time");
    setAuthenticated(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
