import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export const CursorEffect = () => {
  const cursorRef = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const particleId = useRef(0);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      setPosition({ ...cursorRef.current });
      frame.current = null;
    };

    const onMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      if (!frame.current) {
        frame.current = requestAnimationFrame(updatePosition);
      }

      setParticles((prev) => [
        ...prev.slice(-10),
        {
          id: particleId.current++,
          x: e.clientX,
          y: e.clientY,
        },
      ]);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Soft glow */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.25 }}
            className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-xl"
            style={{ left: position.x, top: position.y }}
          />
        )}
      </AnimatePresence>

      {/* Particle trail */}
      <AnimatePresence>
        {particles.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.015,
              ease: "easeOut",
            }}
            className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/70"
            style={{ left: p.x, top: p.y }}
          />
        ))}
      </AnimatePresence>

      {/* Elastic ring */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 30,
            }}
            className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
            style={{ left: position.x, top: position.y }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
