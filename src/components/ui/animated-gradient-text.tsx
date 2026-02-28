import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedGradientText = ({ children, className }: AnimatedGradientTextProps) => {
  return (
    <motion.span
      className={cn(
        "inline-block bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-[length:200%_200%] bg-clip-text text-transparent",
        className
      )}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
};
