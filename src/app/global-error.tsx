"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "system-ui, -apple-system, 'Segoe UI', Tahoma, sans-serif",
          backgroundColor: "#0a0a0a",
          color: "#FAFAF9",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "32rem",
            padding: "2rem",
            border: "1px solid rgba(217, 119, 6, 0.2)",
            borderRadius: "1rem",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
          }}
        >
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: 700,
              margin: "0 0 1rem 0",
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "#F59E0B",
            }}
          >
            حدث خطأ عام
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#A8A29E",
              lineHeight: 1.7,
              margin: "0 0 1.5rem 0",
            }}
          >
            عذراً، حدث خطأ غير متوقع في التطبيق. يرجى المحاولة مرة أخرى، أو
            تحديث الصفحة إذا استمرت المشكلة.
          </p>
          {error?.digest && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "#57534E",
                margin: "0 0 1.5rem 0",
                direction: "ltr",
                fontFamily: "monospace",
              }}
            >
              Error ID: {error.digest}
            </p>
          )}
          <button
            onClick={() => reset()}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#D97706",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "9999px",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 700,
              transition: "background-color 0.2s",
            }}
          >
            إعادة المحاولة
          </button>
        </div>
      </body>
    </html>
  );
}
