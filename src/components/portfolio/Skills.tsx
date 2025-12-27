import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LineReveal } from "./TextReveal";

import htmlIcon from "@/assets/skills/html.png";
import cssIcon from "@/assets/skills/css.png";
import jsIcon from "@/assets/skills/js.png";
import reactIcon from "@/assets/skills/react.png";
import pythonIcon from "@/assets/skills/python.png";
import gitIcon from "@/assets/skills/git.png";
import angularIcon from "@/assets/skills/angular.png";

const skills = [
  { name: "HTML", icon: htmlIcon, color: "#E34F26" },
  { name: "CSS", icon: cssIcon, color: "#1572B6" },
  { name: "JavaScript", icon: jsIcon, color: "#F7DF1E" },
  { name: "React", icon: reactIcon, color: "#61DAFB" },
  { name: "Python", icon: pythonIcon, color: "#3776AB" },
  { name: "GitHub", icon: gitIcon, color: "#F05032" },
  { name: "Angular", icon: angularIcon, color: "#DD0031" },
];

const allSkills = [...skills, ...skills, ...skills];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-primary/[0.03]" 
      />
      <div className="absolute inset-0 border-y border-border/30" />
      
      <div className="container mx-auto px-[8%]" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <LineReveal>
            <h2 className="text-4xl md:text-5xl font-bold">My Skills</h2>
          </LineReveal>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-line origin-center" 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden py-8"
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="skills-track flex gap-8">
            {allSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                whileHover={{ 
                  scale: 1.15, 
                  y: -12,
                  transition: { duration: 0.3, type: "spring" }
                }}
                className="skill-card flex-shrink-0 min-w-[140px] group relative"
              >
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ backgroundColor: `${skill.color}20` }}
                />
                
                <motion.img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="w-16 h-16 object-contain relative z-10"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                />
                <span className="text-sm font-medium text-muted-foreground mt-2 group-hover:text-foreground transition-colors relative z-10">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
