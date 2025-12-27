import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const particleId = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle position updates (smoother)
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          rafRef.current = null;
        });
      }

      setIsVisible(true);

      setParticles((prev) => [
        ...prev.slice(-10),
        {
          id: particleId.current++,
          x: e.clientX,
          y: e.clientY,
        },
      ]);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Cleanup particles naturally
  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles((prev) => prev.slice(1));
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  // Disable on touch devices
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Glow */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-md"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
          />
        )}
      </AnimatePresence>

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle, index) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.015,
              ease: "easeOut",
            }}
            className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/60"
            style={{
              left: particle.x,
              top: particle.y,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Ring */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 26,
            }}
            className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
