import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  duration?: number;
  size?: number;
  className?: string;
}

export const BorderBeam = ({
  duration = 8,
  size = 120,
  className,
}: BorderBeamProps) => {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit] p-px", className)}
      style={{
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    >
      <motion.div
        className="h-full w-full rounded-[inherit]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, hsl(var(--foreground) / 0.6) ${size / 2}deg, transparent ${size}deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
