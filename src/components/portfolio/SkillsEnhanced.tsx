import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { LineReveal } from "./TextReveal";
import { Code, Server, Wrench, Sparkles } from "lucide-react";

import htmlIcon from "@/assets/skills/html.png";
import cssIcon from "@/assets/skills/css.png";
import jsIcon from "@/assets/skills/js.png";
import reactIcon from "@/assets/skills/react.png";
import pythonIcon from "@/assets/skills/python.png";
import gitIcon from "@/assets/skills/git.png";
import angularIcon from "@/assets/skills/angular.png";

const skillCategories = [
  {
    category: "Frontend Development",
    icon: Code,
    color: "#667eea",
    skills: [
      { name: "HTML5", icon: htmlIcon, color: "#E34F26" },
      { name: "CSS3", icon: cssIcon, color: "#1572B6" },
      { name: "JavaScript", icon: jsIcon, color: "#F7DF1E" },
      { name: "React", icon: reactIcon, color: "#61DAFB" },
      { name: "Angular", icon: angularIcon, color: "#DD0031" },
      { name: "TypeScript", icon: jsIcon, color: "#3178C6" },
      { name: "Tailwind CSS", icon: cssIcon, color: "#06B6D4" },
      { name: "Responsive Design", icon: htmlIcon, color: "#FF6B6B" },
    ]
  },
  {
    category: "Backend & APIs",
    icon: Server,
    color: "#1DB954",
    skills: [
      { name: "Python", icon: pythonIcon, color: "#3776AB" },
      { name: "Node.js", icon: jsIcon, color: "#339933" },
      { name: "REST APIs", icon: pythonIcon, color: "#FF6C37" },
      { name: "Flask", icon: pythonIcon, color: "#000000" },
    ]
  },
  {
    category: "Tools & Technologies",
    icon: Wrench,
    color: "#764ba2",
    skills: [
      { name: "Git", icon: gitIcon, color: "#F05032" },
      { name: "GitHub", icon: gitIcon, color: "#181717" },
      { name: "VS Code", icon: gitIcon, color: "#007ACC" },
      { name: "npm", icon: jsIcon, color: "#CB3837" },
    ]
  }
];

const SkillCard = ({ skill, index }: { skill: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ 
        y: -8,
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ backgroundColor: `${skill.color}30` }}
      />
      
      <div className="relative glass rounded-xl p-5 hover:border-primary/40 transition-all duration-300">
        <motion.div
          className="flex flex-col items-center gap-4"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${skill.color}22, ${skill.color}0a)`,
            }}
          >
            <img 
              src={skill.icon} 
              alt={skill.name}
              className="w-10 h-10 object-contain"
            />
          </div>
          
          <div className="text-center">
            <h4 className="font-bold text-base">{skill.name}</h4>
          </div>
        </motion.div>
        
        {/* Minimal, clean card without extra sparkles */}
      </div>
    </motion.div>
  );
};

export const SkillsEnhanced = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const categories = ["All", ...skillCategories.map((c) => c.category)];
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const visibleCategories = activeCategory === "All" ? skillCategories : skillCategories.filter(c => c.category === activeCategory);

  return (
    <section id="skills" className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      
      <motion.div 
        style={{ 
          y: backgroundY,
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.08) 0%, transparent 50%)`
        }}
        className="absolute inset-0 opacity-50"
      />
      
      <div className="container mx-auto px-4 md:px-[8%]" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <LineReveal>
            <h2 className="text-4xl md:text-5xl font-bold">Skills</h2>
          </LineReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mt-4 text-lg"
          >
            Technologies I use — clean, fast, and reliable.
          </motion.p>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-line origin-center" 
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 md:px-5 py-2 rounded-full text-xs md:text-sm border transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-secondary/60 text-muted-foreground border-border/60 hover:border-primary/40"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.span
                  layoutId="skills-active-pill"
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className="space-y-12">
          {visibleCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)`,
                      boxShadow: `0 10px 30px ${category.color}40`
                    }}
                  >
                    <CategoryIcon className="w-6 md:w-7 h-6 md:h-7 text-white" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-lg md:text-xl font-bold">{category.category}</h3>
                    <div className="h-1 w-20 rounded-full mt-2" style={{ backgroundColor: category.color }} />
                  </div>
                </div>

                {/* Responsive grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                  {category.skills.map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Optional: Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Always learning and exploring new technologies</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
