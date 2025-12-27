import { useEffect, useState } from "react";
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

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
      };

      setParticles((prev) => [...prev.slice(-12), newParticle]);
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
    };
  }, []);

  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles((prev) => prev.slice(1));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-md"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {particles.map((particle, index) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/60"
            style={{
              left: particle.x,
              top: particle.y,
            }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
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
