import { Navbar } from "@/components/portfolio/Navbar";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { ScrollIndicator } from "@/components/portfolio/ScrollIndicator";
import { ScrollToTopFab } from "@/components/portfolio/ScrollToTopFab";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { SkillsEnhanced } from "@/components/portfolio/SkillsEnhanced";
import { ProjectsEnhanced } from "@/components/portfolio/ProjectsEnhanced";
import { Experience } from "@/components/portfolio/Experience";
import { ContactEnhanced } from "@/components/portfolio/ContactEnhanced";
import { Footer } from "@/components/portfolio/Footer";
import { SectionDivider } from "@/components/portfolio/SectionDivider";
import { ThemeSwitcher } from "@/components/portfolio/ThemeSwitcher";
import { SEO } from "@/components/SEO";
import { ReactNode, Suspense } from "react";
import { motion } from "framer-motion";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

const SectionLoader = () => (
  <div className="h-96 bg-gradient-to-b from-background via-background/50 to-background animate-pulse" />
);

const sectionVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const SectionReveal = ({ children }: { children: ReactNode }) => (
  <motion.div
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
  >
    {children}
  </motion.div>
);

const Index = () => {
  return (
    <>
      <SEO />
      <SmoothCursor />
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

        <SectionReveal>
          <Hero />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal>
          <About />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal>
          <Experience />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal>
          <SkillsEnhanced />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal>
          <Suspense fallback={<SectionLoader />}>
            <ProjectsEnhanced />
          </Suspense>
        </SectionReveal>
        <SectionDivider />
        <SectionReveal>
          <Suspense fallback={<SectionLoader />}>
            <ContactEnhanced />
          </Suspense>
        </SectionReveal>
        <SectionReveal>
          <Footer />
        </SectionReveal>
      </motion.main>
    </>
  );
};

export default Index;
