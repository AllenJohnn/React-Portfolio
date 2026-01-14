import { Navbar } from "@/components/portfolio/Navbar";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { ScrollToTop } from "@/components/portfolio/ScrollToTop";
import { ScrollIndicator } from "@/components/portfolio/ScrollIndicator";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { SkillsEnhanced } from "@/components/portfolio/SkillsEnhanced";
import { ProjectsEnhanced } from "@/components/portfolio/ProjectsEnhanced";
import { Experience } from "@/components/portfolio/Experience";
import { ContactEnhanced } from "@/components/portfolio/ContactEnhanced";
import { Footer } from "@/components/portfolio/Footer";
import { SectionDivider } from "@/components/portfolio/SectionDivider";
import { Preloader } from "@/components/portfolio/Preloader";
import { CursorEffect } from "@/components/portfolio/CursorEffect";
import { ThemeSwitcher } from "@/components/portfolio/ThemeSwitcher";
import { SEO } from "@/components/SEO";
import { Suspense } from "react";

const SectionLoader = () => (
  <div className="h-96 bg-gradient-to-b from-background via-background/50 to-background animate-pulse" />
);

const Index = () => {
  return (
    <>
      <SEO />
      <Preloader />
      <CursorEffect />
      <ThemeSwitcher />
      <main className="relative min-h-screen overflow-x-hidden">
        <ScrollProgress />
        <ScrollIndicator />
        <Navbar />
        <ScrollToTop />
        
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <SkillsEnhanced />
        <SectionDivider />
        <Suspense fallback={<SectionLoader />}>
          <ProjectsEnhanced />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionLoader />}>
          <ContactEnhanced />
        </Suspense>
        <Footer />
      </main>
    </>
  );
};

export default Index;
