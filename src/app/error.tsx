"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      <div style={{ fontSize: "3rem", fontWeight: 700 }}>حدث خطأ</div>
      <p style={{ fontSize: "0.875rem", color: "#A8A29E", maxWidth: "28rem" }}>
        عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
      </p>
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
        }}
      >
        إعادة المحاولة
      </button>
    </div>
  );
}
