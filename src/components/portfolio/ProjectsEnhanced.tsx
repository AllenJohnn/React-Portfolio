import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ArrowUpRight, Search, X } from "lucide-react";
import { LineReveal } from "./TextReveal";
import { TiltCard } from "./TiltCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import spotifyImg from "@/assets/projects/spotify.png";
import medicineImg from "@/assets/projects/medicine.png";
import fakenewsImg from "@/assets/projects/fakenews.png";
import speedtestImg from "@/assets/projects/speedtest.png";
import qrImg from "@/assets/projects/qrtools.png";
import tabMemoryImg from "@/assets/projects/browser.png";
import pdftoolImg from "@/assets/projects/pdftool.png";
import resumeImg from "@/assets/projects/resume.png";

const projects = [
  {
    title: "Wrapped Revanced",
    description: "A Spotify Wrapped-style experience powered by React and Python. Visualize your music listening habits with beautiful analytics.",
    fullDescription: "Wrapped Revanced brings the magic of Spotify Wrapped to you anytime! This full-stack application combines React for a stunning, animated frontend with Python for powerful data analysis. Features include: personalized listening statistics, beautiful data visualizations, shareable wrapped cards, and historical trend analysis. Built with modern web technologies and best practices.",
    tech: ["React", "Python", "D3.js", "Flask"],
    category: "Web App",
    github: "https://github.com/AllenJohnn/Wrapped-Revanced",
    image: spotifyImg,
    color: "#1DB954",
  },
  {
    title: "PDF Tools Pro",
    description: "Local-first PDF toolkit with merge, split, compress, convert, and metadata tools—no uploads, no APIs.",
    fullDescription: "A complete PDF workstation built with TypeScript and Node.js. Merge, split by ranges, compress, inspect metadata, convert PDFs to images or text, and turn images back into PDFs—all processed locally for privacy.",
    tech: ["TypeScript", "Node.js", "Express"],
    category: "Tool",
    github: "https://github.com/AllenJohnn/PDF-Tools",
    image: pdftoolImg,
    color: "#f97316",
  },
  {
    title: "QuickBench",
    description: "A modern cognitive performance app featuring real-time aim training, reaction-time benchmarking, and a clean typing speed test.",
    fullDescription: "QuickBench is your ultimate performance testing suite. Train your reflexes with the aim trainer, test your reaction speed with precision timing, and improve your typing with detailed WPM analytics. Features real-time performance tracking, historical data visualization, leaderboards, and personalized improvement suggestions.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    category: "Web App",
    github: "https://github.com/AllenJohnn/Benchmark",
    live: "https://playquickbench.vercel.app/",
    image: speedtestImg,
    color: "#667eea",
  },
  {
    title: "Resume Builder",
    description: "ATS-optimized resume builder with multi-format export and live template preview.",
    fullDescription: "Professional resume builder focused on ATS alignment. Export to PDF, DOCX, HTML, TXT, or JSON, auto-save progress, analyze ATS readiness, and browse responsive, minimalist templates.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    category: "Web App",
    github: "https://github.com/AllenJohnn",
    live: "https://buildresumeee.vercel.app/",
    image: resumeImg,
    color: "#10b981",
  },
  {
    title: "QuickQR Tools",
    description: "A lightweight QR code generator offering live preview, custom colors, TinyURL shortening, and PNG/SVG export support.",
    fullDescription: "Create professional QR codes in seconds with QuickQR Tools! This intuitive web application provides instant QR code generation with live preview, customizable colors and sizes, TinyURL integration for shorter URLs, multiple export formats (PNG, SVG), and bulk QR code generation. Perfect for businesses, events, and personal use.",
    tech: ["HTML", "CSS", "JavaScript", "QR API"],
    category: "Tool",
    github: "https://github.com/AllenJohnn/QuickQR",
    live: "https://quickqr-tools.vercel.app/",
    image: qrImg,
    color: "#667eea",
  },
  {
    title: "Tab Memory Monitor",
    description: "A lightweight browser extension that monitors real-time memory usage of open tabs.",
    fullDescription: "Tab Memory Monitor helps you optimize browser performance by providing real-time insights into memory consumption. Features include: per-tab memory tracking, visual memory usage indicators, one-click tab cleanup, memory usage history, and customizable alerts for high memory usage. Available for Chrome and Firefox.",
    tech: ["JavaScript", "Chrome Extensions", "Firefox Add-ons", "Web APIs"],
    category: "Extension",
    github: "https://github.com/AllenJohnn/Browser-Memory-Extension",
    image: tabMemoryImg,
    color: "#2563eb",
  },
  {
    title: "Personalized Medicine Recommender",
    description: "Intelligent medicine recommendation system that provides personalized suggestions based on symptoms using machine learning.",
    fullDescription: "This ML-powered healthcare assistant analyzes symptoms and provides personalized medicine recommendations. Features include: symptom analysis using NLP, drug-drug interaction checking, alternative medicine suggestions, dosage recommendations, and a comprehensive medical database. Designed to assist healthcare professionals and patients.",
    tech: ["Python", "Flask", "Scikit-learn", "JavaScript"],
    category: "ML",
    github: "https://github.com/AllenJohnn/Personalized-Medicine-Recommending-System",
    image: medicineImg,
    color: "#764ba2",
  },
  {
    title: "Fake News Analysis",
    description: "Machine learning project that analyzes and detects fake news articles using natural language processing techniques.",
    fullDescription: "Combat misinformation with AI! This sophisticated ML model uses advanced NLP techniques to detect fake news with high accuracy. Features include: text analysis using BERT embeddings, credibility scoring, source verification, fact-checking integration, and detailed analysis reports. Trained on thousands of verified news articles.",
    tech: ["Python", "TensorFlow", "NLP", "BERT"],
    category: "ML",
    github: "https://github.com/AllenJohnn/Fake-News-Analysis",
    image: fakenewsImg,
    color: "#ef4444",
  },
];

const categories = ["All", "Web App", "Tool", "Extension", "ML"];

const ProjectCard = ({ project, onClick }: { project: typeof projects[0], onClick: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TiltCard intensity={8}>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-2xl h-full flex flex-col cursor-pointer relative"
          style={{ 
            boxShadow: isHovered ? `0 25px 50px ${project.color}30` : undefined,
            transition: 'box-shadow 0.5s ease, transform 0.3s ease'
          }}
          onClick={onClick}
        >
          <div className="relative overflow-hidden group">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-56 object-cover"
              animate={{ 
                scale: isHovered ? 1.15 : 1,
                filter: isHovered ? 'brightness(0.7) blur(2px)' : 'brightness(1) blur(0px)'
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${project.color}40, transparent 70%)`
              }}
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
            />
            
            {/* glass effect overlay thing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute inset-0 backdrop-blur-[2px] flex items-center justify-center gap-4"
            >
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                >
                  <Github size={24} className="text-white" />
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                >
                  <ArrowUpRight size={24} className="text-white" />
                </motion.a>
              )}
            </motion.div>
          </div>

          <div className="p-6 flex flex-col h-full">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
                style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)` }}
              >
                {project.category}
              </motion.div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons - Always at bottom */}
            <div className="mt-auto pt-4 border-t border-border">
              {project.live ? (
                <div className="grid grid-cols-2 gap-3">
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                    }}
                  >
                    <ArrowUpRight size={16} />
                    <span className="text-sm">Live Demo</span>
                  </motion.a>
                  
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-border hover:border-primary font-medium transition-all duration-300"
                  >
                    <Github size={16} />
                    <span className="text-sm">GitHub</span>
                  </motion.a>
                </div>
              ) : (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-border hover:border-primary font-medium transition-all duration-300"
                >
                  <Github size={16} />
                  <span className="text-sm">GitHub</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
};

export const ProjectsEnhanced = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-[8%]" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <LineReveal>
            <h2 className="text-4xl md:text-5xl font-bold">Featured Projects</h2>
          </LineReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mt-4 text-lg"
          >
            A showcase of my best work and personal projects
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-line origin-center"
          />
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search projects by name, tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-12 bg-card border-border"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card border border-border hover:border-primary/50"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-muted-foreground">No projects found matching your criteria</p>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                <DialogDescription>
                  <Badge variant="secondary" className="mt-2">{selectedProject.category}</Badge>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div>
                  <h4 className="font-bold text-lg mb-2">About this project</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      <Github size={18} />
                      View on GitHub
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-secondary flex items-center justify-center gap-2"
                    >
                      <ArrowUpRight size={18} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
