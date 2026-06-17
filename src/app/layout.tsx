import type { Metadata } from "next";
import { Amiri, Tajawal, Cairo } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "مؤسسة المنى الإبداعية | منصة الأدب والإبداع العربي",
    template: "%s | المنى الإبداعية",
  },
  description:
    "منصة أدبية عربية تحتفي بالكلمة الجميلة والفكر المستنير — نصوص، شعر، قصص، ومقالات تلهم الفكر وتلامس الروح",
  keywords: [
    "أدب عربي",
    "شعر",
    "نصوص",
    "ثقافة",
    "إبداع",
    "مقالات",
    "مؤسسة المنى الإبداعية",
  ],
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

// Force dynamic rendering for the entire app to avoid prerender bugs
export const dynamic = "force-dynamic";

// Inline script to set theme before hydration (prevents FOUC)
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('almuna-theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body
        className={`${amiri.variable} ${tajawal.variable} ${cairo.variable} antialiased bg-[var(--color-bg)] text-[var(--color-text-primary)] font-tajawal min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
