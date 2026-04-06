import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Github, Download } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { TypeWriter } from "./TypeWriter";
import { MagneticButton } from "./MagneticButton";
import { ParallaxBackground } from "./ParallaxSection";
import { SparklesText } from "@/components/ui/sparkles-text";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { useIsMobile } from "@/hooks/use-mobile";
import { BubbleText } from "./BubbleText";

const roles = ["Frontend Developer", "MCA Student", "React Enthusiast", "UI Designer"];
type Gtag = (command: "event", eventName: string, params?: Record<string, string>) => void;

export const Hero = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const disableHeavyEffects = isMobile || prefersReducedMotion;
  const { scrollY } = useScroll();
  const yDistance = prefersReducedMotion ? 0 : isMobile ? 24 : 80;
  const y = useTransform(scrollY, [0, 500], [0, yDistance]);
  const smoothY = useSpring(y, { stiffness: 85, damping: 24, mass: 0.45 });
  const heroOpacity = useTransform(scrollY, [0, 300], [1, prefersReducedMotion ? 1 : 0.93]);
  const heroScale = useTransform(scrollY, [0, 350], [1, prefersReducedMotion ? 1 : isMobile ? 0.995 : 0.985]);

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden">
      <ParallaxBackground />

      <div className="bg-float fixed inset-0 z-0 opacity-[0.02] pointer-events-none hidden md:block">
        <span></span><span></span><span></span>
      </div>

      <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-primary/[0.08] via-accent/[0.05] to-transparent rounded-bl-[50%] z-0 hidden md:block" />
      
      <motion.div style={{ y: disableHeavyEffects ? 0 : smoothY, opacity: heroOpacity, scale: heroScale }} className="relative z-10 container mx-auto px-4 sm:px-6 md:px-[8%] pt-24 md:pt-32 pb-20 md:pb-24 will-change-transform">
        <div className="flex flex-col lg:flex-row flex-wrap justify-between items-center gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 min-w-0 w-full max-w-[600px]"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-primary font-medium mb-4 tracking-wider"
            >
              <SparklesText>
                <AnimatedGradientText>Hello, my name is</AnimatedGradientText>
              </SparklesText>
            </motion.p>

            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider letter-spacing-animate"
              >
                <span className="inline-block text-foreground">Allen John</span>
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-6">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground"
              >
                I'm a <TypeWriter words={roles} />
              </motion.div>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground mb-5 max-w-[520px] leading-relaxed"
            >
              Developing sleek, responsive web experiences driven by clean code and smart engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.58 }}
              className="mb-8"
            >
              <BubbleText text="Crafting interfaces that feel alive." />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <MagneticButton>
                <motion.a
                  href="https://github.com/AllenJohnn"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={!disableHeavyEffects ? { scale: 1.02 } : undefined}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </motion.a>
              </MagneticButton>
              
              <MagneticButton>
                <motion.a
                  href="/Allen-John-Joy-CV.pdf"
                  download
                  onClick={() => {
                    const gtag = (window as Window & { gtag?: Gtag }).gtag;
                    if (gtag) {
                      gtag("event", "resume_download", {
                        event_category: "engagement",
                        event_label: "CV Download from Hero"
                      });
                    }
                  }}
                  whileHover={!disableHeavyEffects ? { scale: 1.02 } : undefined}
                  whileTap={{ scale: 0.98 }}
                  className="btn-outline w-full sm:w-auto flex items-center justify-center gap-3"
                >
                  <Download size={18} />
                  <span>Download CV</span>
                </motion.a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="flex-1 min-w-0 w-full flex justify-center perspective-1000"
          >
            <div className="relative group">
              <motion.div 
                animate={!disableHeavyEffects ? {
                  rotate: [0, 5, 0],
                  scale: [1, 1.02, 1],
                } : { rotate: 0, scale: 1 }}
                transition={!disableHeavyEffects ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                className="absolute -top-5 -left-5 right-5 bottom-5 border-2 border-primary/30 rounded-2xl z-0 hidden md:block will-change-transform" 
              />
              <motion.div 
                animate={!disableHeavyEffects ? {
                  rotate: [0, -3, 0],
                  scale: [1, 1.01, 1],
                } : { rotate: 0, scale: 1 }}
                transition={!disableHeavyEffects ? { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 } : { duration: 0.2 }}
                className="absolute -top-8 -left-8 right-8 bottom-8 border border-accent/20 rounded-2xl z-0 hidden md:block will-change-transform" 
              />
              
              
              <motion.img
                src={profileImg}
                alt="Allen John"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 350px, 400px"
                whileHover={!disableHeavyEffects ? { scale: 1.03 } : undefined}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] object-cover rounded-2xl"
                style={{ boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6)" }}
              />

            </div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};
