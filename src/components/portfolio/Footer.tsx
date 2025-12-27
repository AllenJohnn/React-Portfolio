import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Heart, ArrowUp } from "lucide-react";

export const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="py-16 border-t border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent" />
      
      <div className="container mx-auto px-[8%] relative z-10">
        <div className="flex flex-col items-center gap-8">
          <motion.a
            href="#home"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-black text-gradient"
          >
            ALLEN.DEV
          </motion.a>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-center max-w-md"
          >
            Crafting frontend experiences with code & creativity
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4"
          >
            <motion.a
              href="https://github.com/AllenJohnn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/allenjohnjoy/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all"
            >
              <Linkedin size={20} />
            </motion.a>
          </motion.div>

          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, type: "spring" }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white glow-primary"
          >
            <ArrowUp size={20} />
          </motion.button>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-muted-foreground pt-4 flex items-center gap-2"
          >
            © 2025 Allen John. Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={14} className="text-red-500 fill-red-500" />
            </motion.span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
};
