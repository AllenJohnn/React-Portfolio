import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MessageCircle, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { LineReveal } from "./TextReveal";
import { MagneticButton } from "./MagneticButton";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendWhatsApp = () => {
    if (!formData.name || !formData.message) {
      toast({ title: "Please fill in your name and message", variant: "destructive" });
      return;
    }
    const text = `Hello! I'm ${formData.name}.%0A%0A${formData.message}%0A%0AEmail: ${formData.email || "Not provided"}`;
    window.open(`https://wa.me/916282091469?text=${text}`, "_blank");
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
    window.location.href = `mailto:allenjohnjoy2004@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 10]),
        }}
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, -50]),
        }}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-[8%]" ref={ref}>
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
            <h2 className="text-4xl md:text-5xl font-bold">Get In Touch</h2>
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

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={sendEmail}
          className="max-w-2xl mx-auto"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <motion.label
                animate={{ 
                  color: focusedField === "name" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                  y: focusedField === "name" || formData.name ? -24 : 0,
                  scale: focusedField === "name" || formData.name ? 0.85 : 1,
                }}
                className="absolute left-4 top-4 text-sm font-medium pointer-events-none origin-left transition-all"
              >
                Your Name
              </motion.label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className="bg-secondary/30 border-border/50 focus:border-primary h-14 rounded-xl text-base pt-4"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <motion.label
                animate={{ 
                  color: focusedField === "email" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                  y: focusedField === "email" || formData.email ? -24 : 0,
                  scale: focusedField === "email" || formData.email ? 0.85 : 1,
                }}
                className="absolute left-4 top-4 text-sm font-medium pointer-events-none origin-left transition-all"
              >
                Your Email
              </motion.label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="bg-secondary/30 border-border/50 focus:border-primary h-14 rounded-xl text-base pt-4"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <motion.label
                animate={{ 
                  color: focusedField === "message" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                  y: focusedField === "message" || formData.message ? -24 : 0,
                  scale: focusedField === "message" || formData.message ? 0.85 : 1,
                }}
                className="absolute left-4 top-4 text-sm font-medium pointer-events-none origin-left transition-all"
              >
                Your Message
              </motion.label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                rows={6}
                className="bg-secondary/30 border-border/50 focus:border-primary resize-none rounded-xl text-base pt-6"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-8"
          >
            <MagneticButton className="flex-1">
              <motion.button
                type="button"
                onClick={sendWhatsApp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-3"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
              >
                <MessageCircle size={18} />
                <span>Send via WhatsApp</span>
              </motion.button>
            </MagneticButton>
            
            <MagneticButton className="flex-1">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-outline flex items-center justify-center gap-3"
              >
                <Send size={18} />
                <span>Send Email</span>
              </motion.button>
            </MagneticButton>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
};
