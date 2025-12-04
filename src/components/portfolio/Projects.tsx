import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import { LineReveal } from "./TextReveal";
import { TiltCard } from "./TiltCard";

// Import project images
import spotifyImg from "@/assets/projects/spotify.png";
import medicineImg from "@/assets/projects/medicine.png";
import fakenewsImg from "@/assets/projects/fakenews.png";
import speedtestImg from "@/assets/projects/speedtest.png";

const projects = [
  {
    title: "Wrapped Revanced",
    description: "A Spotify Wrapped-style experience powered by React and Python. Visualize your music listening habits with beautiful analytics.",
    tech: ["React", "Python"],
    github: "https://github.com/AllenJohnn/Wrapped-Revanced",
    image: spotifyImg,
    color: "#1DB954",
  },
  {
    title: "Type Speed Test",
    description: "A modern typing speed test app with real-time WPM tracking, accuracy measurement, and a clean benchmark-style interface inspired by Monkeytype.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/AllenJohnn/SpeedTest",
    image: speedtestImg,
    color: "#667eea",
  },
  {
    title: "Personalized Medicine Recommending System",
    description: "Intelligent medicine recommendation system that provides personalized suggestions based on symptoms using machine learning.",
    tech: ["HTML", "CSS", "JS", "Python"],
    github: "https://github.com/AllenJohnn/Personalized-Medicine-Recommending-System",
    image: medicineImg,
    color: "#764ba2",
  },
  {
    title: "Fake News Analysis",
    description: "Machine learning project that analyzes and detects fake news articles using natural language processing techniques.",
    tech: ["Python", "ML", "NLP"],
    github: "https://github.com/AllenJohnn/Fake-News-Analysis",
    image: fakenewsImg,
    color: "#ef4444",
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [100, -100]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0])
        }}
        className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-[8%]" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <LineReveal>
            <h2 className="text-4xl md:text-5xl font-bold">My Projects</h2>
          </LineReveal>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-line origin-center" 
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 80, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
            >
              <TiltCard intensity={8}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="project-card group h-full"
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Colored overlay on hover */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to top, ${project.color}90, transparent)` }}
                    />
                    
                    {/* Overlay with GitHub button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                      >
                        <Github size={22} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 relative z-10">
                    <motion.h3 
                      className="text-xl font-bold mb-2 flex items-center gap-2 group-hover:text-gradient transition-all duration-300"
                    >
                      {project.title}
                      <motion.span
                        initial={{ x: 0, y: 0 }}
                        whileHover={{ x: 3, y: -3 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowUpRight size={18} className="text-primary" />
                      </motion.span>
                    </motion.h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    {/* Tech tags with stagger animation */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.6 + index * 0.1 + techIndex * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary/80 font-medium cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* View Project Link */}
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline group/link"
                    >
                      View Project 
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowUpRight size={14} />
                      </motion.span>
                    </motion.a>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};