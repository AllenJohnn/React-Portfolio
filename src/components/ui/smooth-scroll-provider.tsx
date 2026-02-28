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

    const isDialogOpen = () => Boolean(document.querySelector('[role="dialog"][data-state="open"]'));

    const canPageScroll = () => document.documentElement.scrollHeight > window.innerHeight + 2;

    const unlockScroll = (force = false) => {
      if (!force && isDialogOpen()) {
        return;
      }

      const html = document.documentElement;
      const body = document.body;

      html.classList.remove("lenis-stopped");
      body.classList.remove("lenis-stopped");

      const htmlOverflow = html.style.overflow;
      const bodyOverflow = body.style.overflow;

      if (htmlOverflow === "hidden" || htmlOverflow === "clip") {
        html.style.removeProperty("overflow");
      }

      if (bodyOverflow === "hidden" || bodyOverflow === "clip") {
        body.style.removeProperty("overflow");
      }
    };

    const healScrollLocks = () => {
      if (isDialogOpen()) {
        return;
      }

      if (!canPageScroll()) {
        return;
      }

      unlockScroll(true);
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
      healScrollLocks();
      lenis.start();
    };

    const recoverOnInput = () => {
      if (isDialogOpen()) {
        return;
      }

      healScrollLocks();
      resumeLenis();
    };

    const handleScrollKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      if (isEditable) {
        return;
      }

      const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
      if (scrollKeys.includes(event.key)) {
        recoverOnInput();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        resumeLenis();
      }
    };

    const lockWatchdogId = window.setInterval(() => {
      healScrollLocks();
      lenis.start();
    }, 1200);

    window.addEventListener("pageshow", resumeLenis);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("wheel", recoverOnInput, { passive: true });
    window.addEventListener("touchmove", recoverOnInput, { passive: true });
    window.addEventListener("touchstart", recoverOnInput, { passive: true });
    window.addEventListener("keydown", handleScrollKey, { passive: true });
    window.addEventListener("resize", healScrollLocks);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearInterval(lockWatchdogId);
      window.removeEventListener("pageshow", resumeLenis);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("wheel", recoverOnInput);
      window.removeEventListener("touchmove", recoverOnInput);
      window.removeEventListener("touchstart", recoverOnInput);
      window.removeEventListener("keydown", handleScrollKey);
      window.removeEventListener("resize", healScrollLocks);
      lenis.destroy();
      lenisRef.current = null;
      unlockScroll(true);
    };
  }, []);

  return <SmoothScrollContext.Provider value={contextValue}>{children}</SmoothScrollContext.Provider>;
};
