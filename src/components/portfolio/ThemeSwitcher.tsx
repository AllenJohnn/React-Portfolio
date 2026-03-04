import { motion, useReducedMotion } from "framer-motion";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useIsMobile } from "@/hooks/use-mobile";

export const ThemeSwitcher = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = isMobile || prefersReducedMotion;

  return (
    <div className="fixed top-5 right-5 z-[85]">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0.92, opacity: 0, y: -8 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.35, ease: "easeOut" }}
        className="flex items-center justify-center rounded-2xl border border-border/70 bg-card/80 p-1.5 shadow-xl backdrop-blur-xl"
      >
        <AnimatedThemeToggler
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-background p-0 text-foreground transition-all duration-300 hover:bg-accent"
        />
      </motion.div>
    </div>
  );
};

