import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Award, Calendar } from "lucide-react";
import { LineReveal } from "./TextReveal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const experiences = [
  {
    type: "education",
    title: "Master of Computer Applications (MCA)",
    organization: "Federal Institute of Science And Technology (FISAT)",
    location: "Angamaly, Kerala",
    period: "2025 - Present",
    description: "Pursuing advanced studies in computer applications with focus on web technologies, machine learning, and software engineering.",
    icon: GraduationCap,
    color: "#667eea"
  },
  {
    type: "education",
    title: "Bachelor of Computer Applications (BCA)",
    organization: "Sahrdaya College of Advanced Studies Kodakara",
    location: "Kodakara, Kerala",
    period: "2022 - 2025",
    description: "Completed undergraduate degree with specialization in software development and data structures.",
    icon: GraduationCap,
    color: "#764ba2"
  }
];

const TimelineItem = ({ experience, index }: { experience: typeof experiences[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  const Icon = experience.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} text-left`}
      >
        <motion.div
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
        >
          <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : "md:justify-start"} justify-start`}>
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground font-medium">{experience.period}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
          <div className="flex items-center gap-2 mb-3 text-primary">
            <span className="font-medium">{experience.organization}</span>
            <span className="text-muted-foreground">• {experience.location}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
        </motion.div>
      </motion.div>

      <div className="relative flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="w-16 h-16 rounded-full flex items-center justify-center relative z-10 bg-foreground shadow-2xl"
        >
          <Icon className="w-8 h-8 text-background" />
        </motion.div>
        
        {index < experiences.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-primary to-transparent origin-top"
          />
        )}
      </div>

      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const headerAnimation = useScrollAnimation({ delay: 100, animationClass: 'animate__fadeInUp' });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ],
    appendDots: (dots: any) => (
      <div style={{ bottom: "-40px" }}>
        <ul className="flex items-center justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-muted-foreground/30 hover:bg-primary transition-all duration-300 cursor-pointer" />
    ),
  };

  return (
    <section id="experience" className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-[8%]" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div ref={headerAnimation.ref} className={headerAnimation.animationClass}>
            <LineReveal>
              <h2 className="text-4xl md:text-5xl font-bold">Experience & Education</h2>
            </LineReveal>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mt-4 text-lg"
          >
            My journey through education and professional development
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-line origin-center"
          />
        </motion.div>

        {/* big screen timeline layout */}
        <div className="hidden md:block space-y-8 md:space-y-16">
          {experiences.map((experience, index) => (
            <TimelineItem key={index} experience={experience} index={index} />
          ))}
        </div>

        {/* mobile carousel view yooo */}
        <div className="md:hidden pb-12">
          <Slider {...sliderSettings}>
            {experiences.map((experience, index) => {
              const Icon = experience.icon;
              return (
                <div key={index} className="px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex items-center justify-center mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-20 h-20 rounded-full flex items-center justify-center bg-foreground shadow-2xl"
                      >
                        <Icon className="w-10 h-10 text-background" />
                      </motion.div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground font-medium">{experience.period}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
                      <div className="flex flex-col items-center gap-1 mb-3 text-primary">
                        <span className="font-medium">{experience.organization}</span>
                        <span className="text-muted-foreground text-sm">{experience.location}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};
