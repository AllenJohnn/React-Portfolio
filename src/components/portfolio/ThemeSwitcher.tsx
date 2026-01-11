import { motion } from "framer-motion";
import { Sun, Moon, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = "dark" | "light";
type ColorScheme = "purple" | "blue" | "green" | "orange" | "pink";

const colorSchemes = {
  purple: {
    primary: "239 84% 67%",
    accent: "280 68% 47%",
    name: "Purple Dream"
  },
  blue: {
    primary: "217 91% 60%",
    accent: "199 89% 48%",
    name: "Ocean Blue"
  },
  green: {
    primary: "142 76% 36%",
    accent: "158 64% 52%",
    name: "Forest Green"
  },
  orange: {
    primary: "24 95% 53%",
    accent: "43 96% 56%",
    name: "Sunset Orange"
  },
  pink: {
    primary: "330 81% 60%",
    accent: "291 64% 42%",
    name: "Rose Pink"
  }
};

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("purple");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedColorScheme = localStorage.getItem("colorScheme") as ColorScheme;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedColorScheme) setColorScheme(savedColorScheme);
    
    applyTheme(savedTheme || "dark", savedColorScheme || "purple");
  }, []);

  const applyTheme = (newTheme: Theme, newColorScheme: ColorScheme) => {
    const root = document.documentElement;
    
    // Apply theme
    if (newTheme === "light") {
      root.style.setProperty("--background", "0 0% 98%");
      root.style.setProperty("--foreground", "0 0% 10%");
      root.style.setProperty("--card", "0 0% 100%");
      root.style.setProperty("--muted", "0 0% 96%");
      root.style.setProperty("--muted-foreground", "0 0% 40%");
      root.style.setProperty("--border", "0 0% 90%");
    } else {
      root.style.setProperty("--background", "0 0% 4%");
      root.style.setProperty("--foreground", "0 0% 100%");
      root.style.setProperty("--card", "0 0% 6%");
      root.style.setProperty("--muted", "0 0% 12%");
      root.style.setProperty("--muted-foreground", "0 0% 60%");
      root.style.setProperty("--border", "0 0% 15%");
    }
    
    // Apply color scheme
    const scheme = colorSchemes[newColorScheme];
    root.style.setProperty("--primary", scheme.primary);
    root.style.setProperty("--accent", scheme.accent);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme, colorScheme);
  };

  const changeColorScheme = (newScheme: ColorScheme) => {
    setColorScheme(newScheme);
    localStorage.setItem("colorScheme", newScheme);
    applyTheme(theme, newScheme);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={toggleTheme}
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-indigo-600 border border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-110 transition-all text-white"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === "dark" ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </motion.div>
        </Button>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-indigo-600 border border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-110 transition-all text-white"
            >
              <Palette className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {Object.entries(colorSchemes).map(([key, scheme]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => changeColorScheme(key as ColorScheme)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ background: `hsl(${scheme.primary})` }}
                />
                <span>{scheme.name}</span>
                {colorScheme === key && (
                  <motion.div
                    layoutId="activeScheme"
                    className="ml-auto w-2 h-2 rounded-full bg-primary"
                  />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </div>
  );
};
