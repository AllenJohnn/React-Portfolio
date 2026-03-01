import { motion, useAnimate, useInView } from "framer-motion";
import { MouseEvent, useRef } from "react";
import { Sparkles } from "lucide-react";
import { SiGmail, SiLinkedin, SiGithub, SiSpotify, SiWhatsapp, SiInstagram } from "react-icons/si";
import { IconType } from "react-icons";
import { LineReveal } from "./TextReveal";
import { TextAnimate } from "@/components/ui/text-animate";

type Side = "top" | "left" | "bottom" | "right";
type KeyframeMap = {
  [key in Side]: string[];
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES: KeyframeMap = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES: KeyframeMap = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href, label }: { Icon: IconType; href: string; label: string }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: MouseEvent<HTMLAnchorElement>): Side => {
    const box = e.currentTarget.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left" as Side,
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right" as Side,
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top" as Side,
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom" as Side,
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    }, {
      duration: 0.3,
      ease: "easeOut",
    });
  };

  const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    }, {
      duration: 0.26,
      ease: "easeInOut",
    });
  };

  const handleFocus = () => {
    animate(scope.current, {
      clipPath: NO_CLIP,
    }, {
      duration: 0.24,
      ease: "easeOut",
    });
  };

  const handleBlur = () => {
    animate(scope.current, {
      clipPath: BOTTOM_RIGHT_CLIP,
    }, {
      duration: 0.2,
      ease: "easeInOut",
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={(e) => {
        handleMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave(e);
      }}
      className="relative grid h-24 w-full place-content-center sm:h-28 md:h-36 lg:h-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <Icon className="text-2xl sm:text-3xl md:text-4xl" />

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 grid place-content-center bg-foreground text-background"
      >
        <Icon className="text-2xl sm:text-3xl md:text-4xl" />
      </div>
    </a>
  );
};

const ClipPathLinks = () => {
  return (
    <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-border/80 bg-card/80 backdrop-blur-md shadow-2xl">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/80">
        <div className="bg-card/80"><LinkBox Icon={SiGmail} href="mailto:allenjohnjoy2004@gmail.com" label="Gmail" /></div>
        <div className="bg-card/80"><LinkBox Icon={SiSpotify} href="https://open.spotify.com/user/zcp0xorpnvycc1fao18w9z4du" label="Spotify" /></div>
        <div className="bg-card/80"><LinkBox Icon={SiLinkedin} href="https://www.linkedin.com/in/allenjohnjoy/" label="LinkedIn" /></div>
        <div className="bg-card/80"><LinkBox Icon={SiGithub} href="https://github.com/AllenJohnn" label="GitHub" /></div>
        <div className="bg-card/80"><LinkBox Icon={SiWhatsapp} href="https://wa.me/916282091469" label="WhatsApp" /></div>
        <div className="bg-card/80"><LinkBox Icon={SiInstagram} href="https://www.instagram.com/_allen.john_/" label="Instagram" /></div>
      </div>
    </div>
  );
};

export const ContactEnhanced = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <section id="contact" className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-40 h-40 md:w-64 md:h-64 bg-accent/10 rounded-full blur-3xl"
        />
        
        <div className="container mx-auto px-4 md:px-[8%]" ref={ref}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              <Sparkles size={14} />
              Let's work together
            </motion.div>
            
            <LineReveal>
              <h2 className="text-4xl md:text-5xl font-bold">
                <TextAnimate animation="blurInUp" by="character" once>
                  Get In Touch
                </TextAnimate>
              </h2>
            </LineReveal>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="section-line origin-center" 
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mt-4 max-w-md mx-auto"
            >
              Have a project in mind? Let's create something amazing together.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-6">
              <p className="text-sm sm:text-base text-muted-foreground">Choose your preferred platform to connect</p>
            </div>
            <ClipPathLinks />
          </motion.div>

        </div>
      </section>
    </>
  );
};
