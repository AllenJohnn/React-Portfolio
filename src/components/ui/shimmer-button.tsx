import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerClassName?: string;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ className, shimmerClassName, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-foreground px-6 py-3 font-semibold text-background transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <motion.span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 left-[-30%] w-[40%] -skew-x-12 bg-white/25 blur-sm",
            shimmerClassName
          )}
          animate={{ x: ["-60%", "280%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
