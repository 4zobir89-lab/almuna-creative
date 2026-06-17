"use client";

import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    // Redirect to home after showing 404
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1.5rem",
      padding: "1rem",
      textAlign: "center",
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#0a0a0a",
      color: "#FAFAF9",
    }}>
      <div style={{ fontSize: "5rem", fontWeight: 700, color: "#F59E0B" }}>٤٠٤</div>
      <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>الصفحة غير موجودة</div>
      <p style={{ fontSize: "0.875rem", color: "#A8A29E", maxWidth: "28rem" }}>
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر.
      </p>
      <a
        href="/"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#D97706",
          color: "#FFFFFF",
          borderRadius: "9999px",
          textDecoration: "none",
          fontSize: "0.875rem",
          fontWeight: 700,
        }}
      >
        ← العودة إلى الرئيسية
      </a>
    </div>
  );
}
