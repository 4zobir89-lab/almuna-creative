"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Admin password — change this to your preferred password
const ADMIN_PASSWORD = "almuna2026";

type Props = {
  onLogin: () => void;
};

export function AdminLogin({ onLogin }: Props) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (attempts >= 5) {
      setError("تم تجاوز عدد المحاولات المسموح. حاول لاحقاً.");
      return;
    }

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("almuna-admin-auth", "true");
      sessionStorage.setItem("almuna-admin-time", Date.now().toString());
      onLogin();
    } else {
      setAttempts((prev) => prev + 1);
      setError(`كلمة المرور غير صحيحة. المحاولات المتبقية: ${5 - attempts - 1}`);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--color-bg)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-[var(--hero-bg-via)] to-[var(--color-bg)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back to site */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--accent)] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 rotate-180" />
          العودة للموقع
        </Link>

        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-8 shadow-lg">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-4">
              <Lock className="w-7 h-7 text-[var(--accent)]" />
            </div>
            <h1 className="font-ruqaa text-2xl font-bold text-[var(--color-text-primary)] mb-1">
              لوحة التحكم
            </h1>
            <p className="text-sm text-[var(--color-text-tertiary)]">
              مؤسسة المنى الإبداعية
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2 tracking-wider">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••"
                  autoFocus
                  className="w-full px-4 py-3 pr-12 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                  style={{ outline: "2px solid transparent", outlineOffset: "2px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--accent)] transition-colors"
                  aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="px-4 py-2.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={attempts >= 5}
              className="w-full py-3 bg-[var(--accent)] text-white font-medium text-sm rounded-md hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              دخول
            </button>
          </form>

          {/* Hint */}
          <p className="mt-6 text-center text-[10px] text-[var(--color-text-tertiary)] tracking-wider">
            كلمة المرور الافتراضية: almuna2026
          </p>
        </div>
      </motion.div>
    </div>
  );
}
