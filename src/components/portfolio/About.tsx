import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Linkedin, Github, Music, Plane, Film, Trophy } from "lucide-react";
import allenPic from "@/assets/allen-pic.jpg";
import { TextReveal, LineReveal } from "./TextReveal";
import { TiltCard } from "./TiltCard";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const interests = [
  { icon: Music, label: "Music" },
  { icon: Plane, label: "Travel" },
  { icon: Film, label: "Movies" },
  { icon: Trophy, label: "Sports" },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const imageAnimation = useScrollAnimation({ delay: 200, animationClass: 'animate__fadeInLeft' });
  const textAnimation = useScrollAnimation({ delay: 400, animationClass: 'animate__fadeInRight' });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute top-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-4 md:px-[8%]" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div ref={imageAnimation.ref} className={imageAnimation.animationClass}>
            <motion.div
              className="relative flex justify-center lg:justify-start"
            >
              <TiltCard intensity={10}>
                <motion.div style={{ y: imageY }} className="relative">
                  <motion.div 
                    animate={{ rotate: [0, 1, 0, -1, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-4 border border-primary/15 rounded-2xl" 
                  />
                  
                  <motion.img
                    src={allenPic}
                    alt="Allen John Joy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-[400px] aspect-square object-cover rounded-2xl"
                    style={{ boxShadow: "0 25px 70px rgba(0, 0, 0, 0.5)" }}
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="absolute -bottom-6 -right-6 w-28 h-28 rounded-xl bg-foreground flex flex-col items-center justify-center shadow-2xl cursor-default"
                  >
                    <span className="text-2xl font-bold text-background">MCA</span>
                    <span className="text-xs text-background/80">Student</span>
                  </motion.div>
                </motion.div>
              </TiltCard>
            </motion.div>
          </div>

          <div ref={textAnimation.ref} className={textAnimation.animationClass}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
            <motion.div variants={itemVariants}>
              <p className="text-primary font-medium text-sm mb-2 tracking-wider letter-spacing-animate">MY INTRODUCTION</p>
              <LineReveal>
                <h2 className="text-4xl md:text-5xl font-bold tracking-wider letter-spacing-animate">About Me</h2>
              </LineReveal>
              <div className="section-line !mx-0 mt-4" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-muted-foreground leading-relaxed text-lg">
                <TextReveal 
                  text="Frontend developer and MCA student skilled in React, Python, HTML, CSS, and JavaScript. Focused on building responsive, clean, and user-friendly interfaces with strong attention to detail. Enthusiastic about PC building and computer hardware."
                  delay={0.3}
                />
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3 py-4">
              <p><strong className="text-foreground">Name:</strong> <span className="text-muted-foreground">Allen John Joy</span></p>
              
              <motion.p 
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 cursor-default"
              >
                <Mail size={16} className="text-primary" />
                <span className="text-muted-foreground">allenjohnjoy2004@gmail.com</span>
              </motion.p>
              
              <motion.p 
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 cursor-default"
              >
                <Phone size={16} className="text-primary" />
                <span className="text-muted-foreground">+91-62820-91469</span>
              </motion.p>
              
              <div className="flex gap-4 pt-2">
                <motion.a 
                  href="https://www.linkedin.com/in/allenjohnjoy/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.05, x: 3 }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin size={18} /> LinkedIn
                </motion.a>
                <motion.a 
                  href="https://github.com/AllenJohnn" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.05, x: 3 }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={18} /> GitHub
                </motion.a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <p className="text-sm font-medium text-muted-foreground mb-3">INTERESTS & HOBBIES</p>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.label}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ 
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -3,
                      transition: { duration: 0.2 }
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all cursor-default"
                  >
                    <interest.icon size={14} />
                    {interest.label}
                  </motion.div>
                ))}
              </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
