import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";

const navLinks = [
  { href: "home", label: "Home" },
  { href: "about", label: "About" },
  { href: "experience", label: "Experience" },
  { href: "skills", label: "Skills" },
  { href: "projects", label: "Projects" },
  { href: "contact", label: "Contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          
          const sections = navLinks.map(link => link.href);
          for (const section of sections.reverse()) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 150) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-[8%] py-6 transition-all duration-300 ${
        isScrolled ? "py-3 md:py-4 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <Link
          to="home"
          spy={true}
          smooth={true}
          offset={-70}
          duration={1200}
          className="text-xl md:text-2xl font-black tracking-tight relative group overflow-hidden cursor-pointer"
        >
        <motion.div whileHover="hover">
          <motion.span
            className="inline-block"
            variants={{
              hover: {
                y: [0, -30, 0],
                transition: { duration: 0.4 }
              }
            }}
          >
            ALLEN
          </motion.span>
          <motion.span
            className="inline-block text-primary"
            variants={{
              hover: {
                rotate: [0, -10, 10, 0],
                scale: [1, 1.2, 1],
                transition: { duration: 0.4 }
              }
            }}
          >
            .
          </motion.span>
          <motion.span
            className="inline-block"
            variants={{
              hover: {
                y: [0, 30, 0],
                transition: { duration: 0.4 }
              }
            }}
          >
            DEV
          </motion.span>
          <motion.span 
            className="absolute -bottom-1 left-0 h-[3px] bg-gradient-primary"
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        </Link>

        <div className="hidden md:flex items-center">
          <ul className="flex items-center gap-10">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href;
              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Link
                    to={link.href}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={1200}
                    className={`text-[15px] font-medium transition-colors relative py-2 group cursor-pointer ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -inset-2 rounded-lg bg-primary/10 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    <motion.span 
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-primary"
                      initial={{ width: isActive ? "100%" : "0%" }}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <motion.button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-foreground p-2 relative"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isMobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden mt-6 glass rounded-xl overflow-hidden backdrop-blur-smooth"
          >
            <ul className="py-6 px-6 space-y-1">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={1200}
                      onClick={() => setIsMobileOpen(false)}
                      className={`block py-3 px-4 rounded-lg transition-all font-medium cursor-pointer ${
                        isActive 
                          ? "text-primary bg-primary/10" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
