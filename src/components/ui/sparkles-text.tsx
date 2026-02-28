import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparklesTextProps {
  children: ReactNode;
  className?: string;
}

export const SparklesText = ({ children, className }: SparklesTextProps) => {
  return (
    <span className={cn("relative inline-flex items-center gap-2", className)}>
      <motion.span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span>{children}</span>
      <motion.span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
      />
    </span>
  );
};
