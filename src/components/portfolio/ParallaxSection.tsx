import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxSection = ({ children, className = "", speed = 0.5 }: ParallaxSectionProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

interface ParallaxBackgroundProps {
  className?: string;
}

export const ParallaxBackground = ({ className = "" }: ParallaxBackgroundProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.1, 0]);

  return (
    <div ref={ref} className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Layer 1 - Slow */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[100px]"
      />
      {/* Layer 2 - Medium */}
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-accent/20 blur-[80px]"
      />
      {/* Layer 3 - Fast */}
      <motion.div
        style={{ y: y3, opacity }}
        className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-primary/10 blur-[60px]"
      />
    </div>
  );
};
