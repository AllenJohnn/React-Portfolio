import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Trophy, Star, Target } from "lucide-react";
import { LineReveal } from "./TextReveal";
import { AnimatedCounter } from "./AnimatedCounter";

const achievements = [
  {
    icon: Trophy,
    title: "Projects Completed",
    count: 15,
    suffix: "+",
    color: "#FFD700"
  },
  {
    icon: Star,
    title: "GitHub Stars",
    count: 100,
    suffix: "+",
    color: "#667eea"
  },
  {
    icon: Target,
    title: "Technologies Mastered",
    count: 10,
    suffix: "+",
    color: "#1DB954"
  },
  {
    icon: Award,
    title: "Certifications",
    count: 5,
    suffix: "+",
    color: "#ef4444"
  }
];

const certifications = [
  {
    title: "React - The Complete Guide",
    issuer: "Udemy",
    year: "2023",
    icon: "🎓"
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    year: "2022",
    icon: "📜"
  },
  {
    title: "Python for Data Science",
    issuer: "Coursera",
    year: "2023",
    icon: "🐍"
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2022",
    icon: "💻"
  }
];

export const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-[8%]" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <LineReveal>
            <h2 className="text-4xl md:text-5xl font-bold">Achievements</h2>
          </LineReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mt-4 text-lg"
          >
            Milestones and accomplishments along my journey
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-line origin-center"
          />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}10)`,
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8" style={{ color: achievement.color }} />
                  </motion.div>
                  
                  <motion.div className="text-4xl font-bold mb-2">
                    <AnimatedCounter value={achievement.count} duration={2} suffix={achievement.suffix} />
                  </motion.div>
                  
                  <p className="text-sm text-muted-foreground font-medium">
                    {achievement.title}
                  </p>
                </div>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                  style={{ backgroundColor: `${achievement.color}30` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Certifications & Courses
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{cert.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-1">{cert.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary font-medium">{cert.issuer}</span>
                      <span>•</span>
                      <span>{cert.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
