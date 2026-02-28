import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useSmoothScroll } from "@/components/ui/smooth-scroll-provider";

export const ScrollToTopFab = () => {
  const { scrollTo } = useSmoothScroll();
  const { scrollYProgress } = useScroll();

  const circumference = 2 * Math.PI * 16;
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 32,
    mass: 0.25,
  });
  const dashOffset = useTransform(smoothProgress, (value) => circumference * (1 - value));

  return (
    <motion.button
      type="button"
      onClick={() => scrollTo(0)}
      aria-label="Scroll to top"
      initial={{ opacity: 0, y: 18, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 md:bottom-8 right-5 z-[80] h-12 w-12 rounded-full border border-border/70 bg-card/85 shadow-lg backdrop-blur-xl"
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 40 40"
        aria-hidden
      >
        <circle cx="20" cy="20" r="16" stroke="hsl(var(--muted))" strokeWidth="2.5" fill="none" />
        <motion.circle
          cx="20"
          cy="20"
          r="16"
          stroke="hsl(var(--foreground))"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>

      <span className="relative z-10 inline-flex items-center justify-center">
        <ArrowUp className="h-4 w-4" />
      </span>
    </motion.button>
  );
};
