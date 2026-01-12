import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-wider bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              ALLEN.DEV
            </h1>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-muted-foreground">Loading</span>
              <motion.span
                key={Math.floor(progress)}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-xs font-semibold text-purple-400"
              >
                {Math.floor(progress)}%
              </motion.span>
            </div>
            
            <div className="h-1 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
