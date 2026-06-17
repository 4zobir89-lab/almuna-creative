import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { AnimationProvider } from "@/components/public/animation-provider";
import { SmoothScroll } from "@/components/public/smooth-scroll";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <AnimationProvider>
        <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] flex flex-col">
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </div>
      </AnimationProvider>
    </SmoothScroll>
  );
}
