import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

type ThemeMode = "dark" | "light";

interface ViewTransitionLike {
  ready: Promise<void>;
}

interface DocumentWithTransition extends Document {
  startViewTransition?: (callback: () => void) => ViewTransitionLike;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateTheme = () => {
      const root = document.documentElement;
      const prefersDark = root.classList.contains("dark") || !root.classList.contains("light");
      setIsDark(prefersDark);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const applyTheme = (nextTheme: ThemeMode) => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) {
      return;
    }

    const nextTheme: ThemeMode = isDark ? "light" : "dark";
    const documentWithTransition = document as DocumentWithTransition;
    const canUseTransition = typeof documentWithTransition.startViewTransition === "function";

    if (canUseTransition && documentWithTransition.startViewTransition) {
      const transition = documentWithTransition.startViewTransition(() => {
        flushSync(() => {
          setIsDark(nextTheme === "dark");
          applyTheme(nextTheme);
        });
      });

      await transition.ready;

      const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top)
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${centerX}px ${centerY}px)`,
            `circle(${maxRadius}px at ${centerX}px ${centerY}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );

      return;
    }

    setIsDark(nextTheme === "dark");
    applyTheme(nextTheme);
  }, [duration, isDark]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      className={cn("inline-flex items-center justify-center leading-none", className)}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="inline-flex"
          >
            <Sun className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="inline-flex"
          >
            <Moon className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
