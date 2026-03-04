import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSmoothScroll } from "@/components/ui/smooth-scroll-provider";
import { useIsMobile } from "@/hooks/use-mobile";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const ScrollIndicator = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const shouldRender = !isMobile;
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 300);

        const sectionElements = sections.map(section => ({
          id: section.id,
          element: document.getElementById(section.id),
        }));

        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (section.element) {
            const rect = section.element.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
              setActiveSection(section.id);
              break;
            }
          }
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldRender]);

  const scrollToSection = (sectionId: string) => {
    window.history.pushState(null, "", `#${sectionId}`);
    scrollTo(`#${sectionId}`);
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="relative group cursor-pointer"
              onClick={() => scrollToSection(section.id)}
              whileHover={!prefersReducedMotion ? { scale: 1.2 } : undefined}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-primary border-primary scale-125"
                    : "bg-transparent border-muted-foreground/40 hover:border-primary/60"
                }`}
                animate={
                  activeSection === section.id && !prefersReducedMotion
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(255, 255, 255, 0.3)",
                          "0 0 0 8px rgba(255, 255, 255, 0)",
                        ],
                      }
                    : {}
                }
                transition={{
                  boxShadow: {
                    duration: 1.5,
                    repeat: Infinity,
                  },
                }}
              />

              {/* Label tooltip */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute left-8 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
              >
                <span className="text-xs font-medium">{section.label}</span>
              </motion.div>

              {activeSection === section.id && (
                <motion.div
                  layoutId="activeLine"
                  className="absolute left-1/2 -translate-x-1/2 w-0.5 h-12 -top-8 bg-gradient-to-b from-transparent via-primary to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
