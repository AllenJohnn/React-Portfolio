import { Children, cloneElement, isValidElement, ReactNode, useRef } from "react";
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface DockProps {
  children: ReactNode;
  className?: string;
  direction?: "middle" | "left" | "right";
}

interface DockIconProps {
  children: ReactNode;
  className?: string;
  mouseX?: MotionValue<number>;
}

export const Dock = ({ children, className, direction = "middle" }: DockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(event) => mouseX.set(event.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex items-end gap-2 rounded-2xl border border-border/70 bg-card/80 px-3 py-2 backdrop-blur-xl shadow-2xl",
        direction === "middle" && "justify-center",
        direction === "left" && "justify-start",
        direction === "right" && "justify-end",
        className
      )}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return child;
        }

        if (child.type === DockIcon) {
          return cloneElement(child, {
            mouseX,
          });
        }

        return child;
      })}
    </motion.div>
  );
};

export const DockIcon = ({ children, className, mouseX }: DockIconProps) => {
  const fallbackMouseX = useMotionValue(Infinity);
  const activeMouseX = mouseX ?? fallbackMouseX;
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(activeMouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) {
      return Number.POSITIVE_INFINITY;
    }

    return value - (bounds.x + bounds.width / 2);
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [44, 56, 44]);
  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.08, 1]);

  const width = useSpring(widthSync, {
    mass: 0.12,
    stiffness: 160,
    damping: 14,
  });
  const scale = useSpring(scaleSync, {
    mass: 0.12,
    stiffness: 180,
    damping: 15,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, scale }}
      className={cn(
        "aspect-square rounded-full bg-muted/40 border border-border/70 flex items-center justify-center transition-colors",
        "hover:bg-accent",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
