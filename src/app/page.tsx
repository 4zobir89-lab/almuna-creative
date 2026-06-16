import { Navbar } from "@/components/photographer/navbar";
import { Hero } from "@/components/photographer/hero";
import { About } from "@/components/photographer/about";
import { Portfolio } from "@/components/photographer/portfolio";
import { FeaturedProjects } from "@/components/photographer/featured-projects";
import { Services } from "@/components/photographer/services";
import { Testimonials } from "@/components/photographer/testimonials";
import { Contact } from "@/components/photographer/contact";
import { Footer } from "@/components/photographer/footer";
import { Marquee } from "@/components/photographer/marquee";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#08070a] film-grain">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Marquee />
        <Portfolio />
        <FeaturedProjects />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
