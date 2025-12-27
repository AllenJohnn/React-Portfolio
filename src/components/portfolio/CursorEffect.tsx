import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export const CursorEffect = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();
  const particleId = useRef(0);

  const [renderPos, setRenderPos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;

      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.15);

      setSpeed(Math.min(Math.sqrt(dx * dx + dy * dy), 40));
      setRenderPos({ ...pos.current });

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      setParticles((p) => [
        ...p.slice(-8),
        { id: particleId.current++, x: e.clientX, y: e.clientY },
      ]);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onHover = (e: Event) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button"));
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onHover);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onHover);
    };
  }, []);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  const scale = hovering ? 1.8 : 1 + speed / 60;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Outer glow */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute w-14 h-14 rounded-full bg-primary/20 blur-2xl"
            style={{ left: renderPos.x, top: renderPos.y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Inner glow */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute w-8 h-8 rounded-full bg-primary/40 blur-lg"
            style={{ left: renderPos.x, top: renderPos.y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Particle trail */}
      <AnimatePresence>
        {particles.map((p, i) => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 rounded-full bg-primary/70"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.02,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Cursor ring */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute w-12 h-12 rounded-full border border-primary/50"
            style={{ left: renderPos.x, top: renderPos.y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
