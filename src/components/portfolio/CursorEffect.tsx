import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CursorEffect = () => {
  const dot = useRef({ x: 0, y: 0 });
  const outline = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const animate = () => {
      outline.current.x += (dot.current.x - outline.current.x) * 0.18;
      outline.current.y += (dot.current.y - outline.current.y) * 0.18;

      setPos({ ...dot.current });
      setRing({ ...outline.current });

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      dot.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      setIdle(false);

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIdle(true), 1500);
    };

    const onHover = (e: Event) => {
      const el = e.target as HTMLElement;
      setActive(!!el.closest("a, button, [data-cursor]"));
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onHover);
    document.addEventListener("mouseleave", () => setVisible(false));

    return () => {
      cancelAnimationFrame(raf.current!);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onHover);
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
      {/* DOT */}
      <AnimatePresence>
        {visible && !idle && (
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-primary"
            style={{ left: pos.x, top: pos.y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* OUTLINE */}
      <AnimatePresence>
        {visible && !idle && (
          <motion.div
            className="absolute w-8 h-8 rounded-full border border-primary/40"
            style={{ left: ring.x, top: ring.y }}
            animate={{
              scale: active ? 1.6 : 1,
              opacity: 0.9,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 22,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
