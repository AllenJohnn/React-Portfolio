import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LineReveal } from "./TextReveal";
import htmlIcon from "@/assets/skills/html.png";
import jsIcon from "@/assets/skills/js.png";
import gitIcon from "@/assets/skills/git.png";
import vscodeIcon from "@/assets/skills/vscode.png";

type SkillItem = {
  name: string;
  icon: string;
};

type SkillGroup = {
  title: string;
  items: SkillItem[];
};

const groups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "HTML", icon: htmlIcon },
      { name: "JavaScript", icon: jsIcon },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "Flask", icon: "https://cdn.simpleicons.org/flask/ffffff" },
      { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
    ],
  },
  {
    title: "Others",
    items: [
      { name: "Git", icon: gitIcon },
      { name: "VS Code", icon: vscodeIcon },
    ],
  },
];

export const SkillsEnhanced = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-[8%]" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <LineReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Tech Stack</h2>
          </LineReveal>
        </motion.div>

        <div className="grid gap-10 md:gap-14 lg:gap-16 md:grid-cols-3">
          {groups.map((group, groupIdx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-extrabold text-center text-foreground">{group.title}</h3>

              <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 justify-items-center">
                {group.items.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    className="flex flex-col items-center gap-2 sm:gap-3"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-muted/40 border border-border/40 flex items-center justify-center shadow-lg shadow-black/10 dark:shadow-black/30">
                      <img src={item.icon} alt={item.name} className="w-12 h-12 sm:w-14 sm:h-14 object-contain" loading="lazy" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-foreground text-center">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
