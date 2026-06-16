import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cairo, Tajawal, Amiri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "كريم منصور | مصور فوتوغرافي سينمائي",
  description: "موقع شخصي للمصور الفوتوغرافي كريم منصور. صور سينمائية تحكي قصصاً لا تُنسى - بورتريهات، أعراس، طبيعة، وفن تجريدي.",
  keywords: ["مصور فوتوغرافي", "تصوير سينمائي", "بورتريه", "تصوير أعراس", "فن التصوير", "كريم منصور"],
  authors: [{ name: "Karim Mansour" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "كريم منصور | مصور فوتوغرافي سينمائي",
    description: "صور سينمائية تحكي قصصاً لا تُنسى",
    siteName: "Karim Mansour Photography",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} ${tajawal.variable} ${amiri.variable} antialiased bg-background text-foreground font-tajawal`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
