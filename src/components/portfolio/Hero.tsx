import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Download, ChevronDown } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { TypeWriter } from "./TypeWriter";
import { MagneticButton } from "./MagneticButton";
import { ParallaxBackground } from "./ParallaxSection";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const roles = ["Frontend Developer", "MCA Student", "React Enthusiast", "UI Designer"];

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <ParallaxBackground />

      <div className="bg-float fixed inset-0 z-0 opacity-[0.02] pointer-events-none">
        <span></span><span></span><span></span>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-primary/[0.08] via-accent/[0.05] to-transparent rounded-bl-[50%] z-0" 
      />
      
      <motion.div style={{ y, opacity, scale }} className="relative z-10 container mx-auto px-4 md:px-[8%] pt-24 md:pt-32 pb-20 md:pb-24">
        <div className="flex flex-col lg:flex-row flex-wrap justify-between items-center gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 min-w-[320px] max-w-[600px]"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-primary font-medium mb-4 tracking-wider"
            >
              Hello, my name is
            </motion.p>

            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider letter-spacing-animate"
              >
                <span className="text-gradient">Allen John</span>
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
              className="text-lg text-muted-foreground mb-8 max-w-[520px] leading-relaxed"
            >
              Developing sleek, responsive web experiences driven by clean code and smart engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton>
                <motion.a
                  href="https://github.com/AllenJohnn"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex items-center gap-3"
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
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'resume_download', {
                        event_category: 'engagement',
                        event_label: 'CV Download from Hero'
                      });
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-outline flex items-center gap-3"
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
            className="flex-1 min-w-[300px] flex justify-center perspective-1000"
          >
            <div className="relative group">
              <motion.div 
                animate={{ 
                  rotate: [0, 5, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -left-5 right-5 bottom-5 border-2 border-primary/30 rounded-2xl z-0" 
              />
              <motion.div 
                animate={{ 
                  rotate: [0, -3, 0],
                  scale: [1, 1.01, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-8 -left-8 right-8 bottom-8 border border-accent/20 rounded-2xl z-0" 
              />
              
              
              <motion.img
                src={profileImg}
                alt="Allen John"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] object-cover rounded-2xl"
                style={{ boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6)" }}
              />

            </div>
          </motion.div>
        </div>

        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
        >
          <span className="text-sm font-medium animate__animated animate__fadeIn animate__delay-2s">Scroll Down</span>
          <motion.div
            className="relative scroll-wheel-indicator"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div 
              className="absolute inset-0 rounded-full bg-primary/30 blur-md"
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              animate={{ 
                y: [0, 5, 0],
                rotate: [0, 10, 0, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={28} className="relative drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};
