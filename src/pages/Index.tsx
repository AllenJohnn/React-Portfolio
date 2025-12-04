import { Navbar } from "@/components/portfolio/Navbar";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { ScrollToTop } from "@/components/portfolio/ScrollToTop";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { SectionDivider } from "@/components/portfolio/SectionDivider";
import { Preloader } from "@/components/portfolio/Preloader";
import { CursorEffect } from "@/components/portfolio/CursorEffect";

const Index = () => {
  return (
    <>
      <Preloader />
      <CursorEffect />
      <main className="relative min-h-screen overflow-x-hidden">
        <ScrollProgress />
        <Navbar />
        <ScrollToTop />
        
        <Hero />
        <SectionDivider variant="dots" />
        <About />
        <SectionDivider variant="gradient" />
        <Skills />
        <SectionDivider variant="wave" />
        <Projects />
        <SectionDivider variant="dots" />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
