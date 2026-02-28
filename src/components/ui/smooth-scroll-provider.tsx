import { ReactNode, createContext, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

type ScrollTarget = number | string | HTMLElement;

interface SmoothScrollContextValue {
  scrollTo: (target: ScrollTarget) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);

  return {
    scrollTo: (target: ScrollTarget) => {
      if (context) {
        context.scrollTo(target);
        return;
      }

      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
        return;
      }

      if (typeof target === "string") {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    },
  };
};

export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  const nativeScrollTo = (target: ScrollTarget) => {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
      return;
    }

    if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const contextValue = useMemo<SmoothScrollContextValue>(() => {
    return {
      scrollTo: (target) => {
        const lenis = lenisRef.current;

        if (!lenis) {
          nativeScrollTo(target);
          return;
        }

        try {
          lenis.scrollTo(target, {
            duration: 1.05,
            easing: (value) => 1 - Math.pow(1 - value, 3),
            offset: -8,
          });
        } catch {
          nativeScrollTo(target);
        }
      },
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return;
    }

    const unlockScroll = () => {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.classList.remove("lenis-stopped");
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
    };

    unlockScroll();

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      smoothWheel: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    const resumeLenis = () => {
      unlockScroll();
      lenis.start();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        resumeLenis();
      }
    };

    window.addEventListener("pageshow", resumeLenis);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pageshow", resumeLenis);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      lenis.destroy();
      lenisRef.current = null;
      unlockScroll();
    };
  }, []);

  return <SmoothScrollContext.Provider value={contextValue}>{children}</SmoothScrollContext.Provider>;
};
