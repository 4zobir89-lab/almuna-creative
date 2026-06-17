import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { BackgroundEffects } from "@/components/public/background-effects";
import { AnimationProvider } from "@/components/public/animation-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AnimationProvider>
        <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] overflow-x-hidden flex flex-col font-tajawal">
          <BackgroundEffects />
          <div className="relative z-10 flex flex-col flex-grow">
            <Navbar />
            <main className="flex-grow pt-20 sm:pt-24 md:pt-28">{children}</main>
            <Footer />
          </div>
        </div>
        <Toaster />
      </AnimationProvider>
    </ThemeProvider>
  );
}
