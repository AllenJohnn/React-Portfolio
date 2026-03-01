import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxSection = ({ children, className = "", speed = 0.5 }: ParallaxSectionProps) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const effectiveSpeed = isMobile ? speed * 0.4 : speed;
  const y = useTransform(scrollYProgress, [0, 1], [100 * effectiveSpeed, -100 * effectiveSpeed]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

interface SectionParallaxTransitionProps {
  children: ReactNode;
  className?: string;
  desktopOffset?: number;
  mobileOffset?: number;
  desktopTilt?: number;
  mobileTilt?: number;
}

export const SectionParallaxTransition = ({
  children,
  className = "",
  desktopOffset = 36,
  mobileOffset = 16,
  desktopTilt = 0.35,
  mobileTilt = 0.15,
}: SectionParallaxTransitionProps) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const offset = isMobile ? mobileOffset : desktopOffset;
  const tilt = isMobile ? mobileTilt : desktopTilt;
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.88, 1, 1, 0.92]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [isMobile ? 0.995 : 0.988, 1, 1, isMobile ? 0.995 : 0.988],
  );
  const rotate = useTransform(scrollYProgress, [0, 1], [tilt, -tilt]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y, opacity, scale, rotate }} className={className}>
      {children}
    </motion.div>
  );
};

interface ParallaxBackgroundProps {
  className?: string;
}

export const ParallaxBackground = ({ className = "" }: ParallaxBackgroundProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 opacity-30 blur-[100px]" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-accent/20 opacity-30 blur-[80px]" />
      <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-primary/10 opacity-30 blur-[60px]" />
    </div>
  );
};
