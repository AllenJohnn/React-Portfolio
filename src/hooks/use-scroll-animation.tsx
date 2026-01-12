import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  animationClass?: string;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.4,
    triggerOnce = true,
    delay = 0,
    animationClass = 'animate__fadeInUp'
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  useEffect(() => {
    if (inView) {
      if (delay > 0) {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
      } else {
        setIsVisible(true);
      }
    }
  }, [inView, delay]);

  return {
    ref,
    isVisible,
    animationClass: isVisible ? `animate__animated ${animationClass}` : 'opacity-0',
    inView
  };
};

// Predefined animation configurations
export const fadeInUp = (delay = 0) => useScrollAnimation({
  threshold: 0.4,
  triggerOnce: true,
  delay,
  animationClass: 'animate__fadeInUp'
});

export const fadeInLeft = (delay = 0) => useScrollAnimation({
  threshold: 0.4,
  triggerOnce: true,
  delay,
  animationClass: 'animate__fadeInLeft'
});

export const fadeInRight = (delay = 0) => useScrollAnimation({
  threshold: 0.4,
  triggerOnce: true,
  delay,
  animationClass: 'animate__fadeInRight'
});

export const zoomIn = (delay = 0) => useScrollAnimation({
  threshold: 0.4,
  triggerOnce: true,
  delay,
  animationClass: 'animate__zoomIn'
});

export const bounceIn = (delay = 0) => useScrollAnimation({
  threshold: 0.4,
  triggerOnce: true,
  delay,
  animationClass: 'animate__bounceIn'
});
