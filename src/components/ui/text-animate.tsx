import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextAnimateProps {
  children: string;
  className?: string;
  animation?: "blurInUp";
  by?: "character" | "word";
  once?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const TextAnimate = ({
  children,
  className,
  by = "character",
  once = true,
}: TextAnimateProps) => {
  const units = by === "word" ? children.split(" ") : children.split("");

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.45 }}
      aria-label={children}
    >
      {units.map((unit, index) => {
        const spacing: ReactNode = by === "word" && index < units.length - 1 ? "\u00A0" : null;

        return (
          <motion.span key={`${unit}-${index}`} variants={itemVariants} className="inline-block">
            {unit}
            {spacing}
          </motion.span>
        );
      })}
    </motion.span>
  );
};
