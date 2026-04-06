import { Navbar } from "@/components/portfolio/Navbar";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { ScrollIndicator } from "@/components/portfolio/ScrollIndicator";
import { ScrollToTopFab } from "@/components/portfolio/ScrollToTopFab";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { SkillsEnhanced } from "@/components/portfolio/SkillsEnhanced";
import { Experience } from "@/components/portfolio/Experience";
import { Footer } from "@/components/portfolio/Footer";
import { SectionDivider } from "@/components/portfolio/SectionDivider";
import { ThemeSwitcher } from "@/components/portfolio/ThemeSwitcher";
import { SEO } from "@/components/SEO";
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { SectionParallaxTransition } from "@/components/portfolio/ParallaxSection";

const ProjectsEnhanced = lazy(() => import("@/components/portfolio/ProjectsEnhanced").then((module) => ({ default: module.ProjectsEnhanced })));
const ContactEnhanced = lazy(() => import("@/components/portfolio/ContactEnhanced").then((module) => ({ default: module.ContactEnhanced })));

const SectionLoader = () => (
  <div className="h-96 bg-gradient-to-b from-background via-background/50 to-background animate-pulse" />
);

const Index = () => {
  return (
    <>
      <SEO />
      <ThemeSwitcher />
      <motion.main
        className="relative min-h-screen overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ScrollProgress />
        <ScrollIndicator />
        <ScrollToTopFab />
        <Navbar />

        <Hero />
        <SectionDivider />
        <SectionParallaxTransition desktopOffset={44} mobileOffset={18} desktopTilt={0.34} mobileTilt={0.13}>
          <About />
        </SectionParallaxTransition>
        <SectionDivider />
        <SectionParallaxTransition desktopOffset={24} mobileOffset={10} desktopTilt={0.18} mobileTilt={0.08}>
          <Experience />
        </SectionParallaxTransition>
        <SectionDivider />
        <SectionParallaxTransition desktopOffset={20} mobileOffset={8} desktopTilt={0.14} mobileTilt={0.06}>
          <SkillsEnhanced />
        </SectionParallaxTransition>
        <SectionDivider />
        <SectionParallaxTransition desktopOffset={56} mobileOffset={22} desktopTilt={0.4} mobileTilt={0.14}>
          <Suspense fallback={<SectionLoader />}>
            <ProjectsEnhanced />
          </Suspense>
        </SectionParallaxTransition>
        <SectionDivider />
        <Suspense fallback={<SectionLoader />}>
          <ContactEnhanced />
        </Suspense>
        <Footer />
      </motion.main>
    </>
  );
};

export default Index;
