import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useSiteSettings, HeroSettings } from "@/hooks/useSiteSettings";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const { data: heroSettings, isLoading } = useSiteSettings<HeroSettings>('hero');

  // Parallax transforms - different speeds for depth
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Default values while loading
  const title = heroSettings?.title || "Crafting Digital Experiences";
  const subtitle = heroSettings?.subtitle || "Creative Developer & Designer";
  const description = heroSettings?.description || "I'm a creative developer and designer passionate about building beautiful, functional websites and applications that make a lasting impression.";
  const ctaPrimary = heroSettings?.ctaPrimary || "View My Work";
  const ctaSecondary = heroSettings?.ctaSecondary || "Get In Touch";

  // Split title for gradient effect (last word gets gradient)
  const titleWords = title.split(' ');
  const lastWord = titleWords.pop();
  const firstPart = titleWords.join(' ');

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient orbs with parallax + floating animation */}
      <motion.div
        style={{ y: y1, scale }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        />
      </motion.div>
      <motion.div
        style={{ y: y2, scale }}
        className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-full h-full"
        />
      </motion.div>
      <motion.div
        style={{ y: y3, scale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-6 pt-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-secondary border border-border mb-6 sm:mb-8"
          >
            <Sparkles size={14} className="text-primary sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm text-muted-foreground">{subtitle}</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-4 sm:mb-6 px-2"
          >
            {firstPart && <>{firstPart}<br /></>}
            <span className="text-gradient">{lastWord}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 px-4"
          >
            {description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
          >
            <Button 
              variant="hero" 
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {ctaPrimary}
            </Button>
            <Button 
              variant="heroOutline" 
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
