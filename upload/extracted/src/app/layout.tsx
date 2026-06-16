import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "مؤسسة المنى الإبداعية | منصة الأدب والإبداع العربي",
    template: "%s | المنى الإبداعية",
  },
  description: "منصة أدبية عربية تحتفي بالكلمة الجميلة والفكر المستنير — نصوص، شعر، قصص، ومقالات تلهم الفكر وتلامس الروح",
  keywords: ["أدب عربي", "شعر", "نصوص", "ثقافة", "إبداع", "مقالات", "مؤسسة المنى الإبداعية"],
  authors: [{ name: "مؤسسة المنى الإبداعية" }],
  openGraph: {
    title: "مؤسسة المنى الإبداعية | منصة الأدب والإبداع العربي",
    description: "منصة أدبية عربية تحتفي بالكلمة الجميلة والفكر المستنير",
    locale: "ar_AR",
    type: "website",
    siteName: "مؤسسة المنى الإبداعية",
  },
  twitter: {
    card: "summary_large_image",
    title: "مؤسسة المنى الإبداعية",
    description: "منصة الأدب والإبداع العربي",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-brand-bg text-brand-primary font-tajawal">
        {children}
      </body>
    </html>
  );
}
