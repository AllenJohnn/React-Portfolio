import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MessageCircle, Sparkles, CheckCircle2, Loader2, Mail, Linkedin, Github, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LineReveal } from "./TextReveal";
import { MagneticButton } from "./MagneticButton";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactEnhanced = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
        break;
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors({ ...errors, [name]: error });
    }
    setFocusedField(null);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "allenjohnjoy2004@gmail.com",
      href: "mailto:allenjohnjoy2004@gmail.com",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+91-62820-91469",
      href: "https://wa.me/916282091469",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "allenjohnjoy",
      href: "https://www.linkedin.com/in/allenjohnjoy/",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "AllenJohnn",
      href: "https://github.com/AllenJohnn",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
  ];

  const sendWhatsApp = async () => {
    if (!validateForm()) {
      toast.error("Please fix all errors before sending");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const text = `Hello! I'm ${formData.name}.%0A%0A${formData.message}%0A%0AEmail: ${formData.email}`;
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_contact', {
        event_category: 'engagement',
        event_label: 'WhatsApp Contact'
      });
    }
    
    window.open(`https://wa.me/916282091469?text=${text}`, "_blank");
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Opening WhatsApp...");
    
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix all errors before sending");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
    window.location.href = `mailto:allenjohnjoy2004@gmail.com?subject=${subject}&body=${body}`;
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'contact_form_submit', {
        event_category: 'engagement',
        event_label: 'Email Contact'
      });
    }
    
    toast.success("Message sent successfully!", {
      duration: 4000,
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        fontWeight: '600',
      },
    });
    
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Toaster position="bottom-center" />
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
            transition={{ duration: 0.6, delay: 0.5 }}
            onSubmit={sendEmail}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-xl">
              <div className="space-y-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium mb-2">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={handleBlur}
                    placeholder="Your name"
                    className={`h-12 transition-all duration-300 ${
                      focusedField === "name" ? "ring-2 ring-primary" : ""
                    } ${errors.name ? "border-destructive" : ""}`}
                    disabled={isSubmitting || isSubmitted}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={handleBlur}
                    placeholder="your.email@example.com"
                    className={`h-12 transition-all duration-300 ${
                      focusedField === "email" ? "ring-2 ring-primary" : ""
                    } ${errors.email ? "border-destructive" : ""}`}
                    disabled={isSubmitting || isSubmitted}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-medium mb-2">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={handleBlur}
                    placeholder="Tell me about your project..."
                    rows={6}
                    className={`transition-all duration-300 resize-none ${
                      focusedField === "message" ? "ring-2 ring-primary" : ""
                    } ${errors.message ? "border-destructive" : ""}`}
                    disabled={isSubmitting || isSubmitted}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4 pt-2"
                >
                  <MagneticButton>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting || isSubmitted}
                      className="btn-primary flex items-center justify-center gap-3 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : isSubmitted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      <span>
                        {isSubmitting ? "Sending..." : isSubmitted ? "Sent!" : "Send Email"}
                      </span>
                    </motion.button>
                  </MagneticButton>

                  <MagneticButton>
                    <motion.button
                      type="button"
                      onClick={sendWhatsApp}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting || isSubmitted}
                      className="btn-secondary flex items-center justify-center gap-3 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>WhatsApp</span>
                    </motion.button>
                  </MagneticButton>
                </motion.div>
              </div>
            </div>
          </motion.form>

                  {/* Contact Methods */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-5xl mx-auto"
                  >
                    {contactMethods.map((method, index) => (
                      <motion.a
                        key={method.label}
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={`group p-6 rounded-xl ${method.bgColor} border ${method.borderColor} hover:shadow-lg transition-all cursor-pointer`}
                      >
                        <div className="flex flex-col items-center text-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`w-12 h-12 rounded-full ${method.bgColor} border ${method.borderColor} flex items-center justify-center ${method.color}`}
                          >
                            <method.icon size={24} />
                          </motion.div>
                          <div>
                            <p className="font-semibold text-foreground mb-1">{method.label}</p>
                            <p className="text-sm text-muted-foreground break-all">{method.value}</p>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </motion.div>
        </div>
      </section>
    </>
  );
};
