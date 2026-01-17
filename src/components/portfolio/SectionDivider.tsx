import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "wave" | "gradient" | "dots";
}

export const SectionDivider = ({ variant = "gradient" }: SectionDividerProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  if (variant === "wave") {
    return (
      <div ref={ref} className="relative h-24 overflow-hidden">
        <motion.svg
          style={{ opacity }}
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
            d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1440,50 L1440,100 L0,100 Z"
            fill="url(#gradient)"
            className="opacity-20"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" className="text-foreground" />
              <stop offset="100%" stopColor="currentColor" className="text-muted-foreground" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div ref={ref} className="py-12 flex justify-center gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="w-2 h-2 rounded-full bg-gradient-primary"
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="py-12 flex justify-center">
      <motion.div
        style={{ scaleX, opacity }}
        className="h-px w-1/3 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
    </div>
  );
};
