import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0, x: 100 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-8 right-8 z-50"
        >
          {/* Progress circle */}
          <svg className="absolute inset-0 w-14 h-14 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-border opacity-30"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-primary"
              style={{
                pathLength,
                strokeDasharray: "283",
              }}
            />
          </svg>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="relative w-14 h-14 rounded-full bg-background border-2 border-primary/20 backdrop-blur-sm text-primary shadow-xl hover:shadow-2xl hover:shadow-primary/20 flex items-center justify-center group transition-all"
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              <ArrowUp size={20} className="group-hover:text-primary transition-colors" />
            </motion.div>
            
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 blur transition-opacity"
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
