import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { BackgroundEffects } from "@/components/public/background-effects";
import { AnimationProvider } from "@/components/public/animation-provider";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AnimationProvider>
      <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden flex flex-col font-tajawal">
        <BackgroundEffects />
        <div className="relative z-10 flex flex-col flex-grow">
          <Navbar />
          <main className="flex-grow pt-24">{children}</main>
          <Footer />
        </div>
      </div>
    </AnimationProvider>
  );
}
