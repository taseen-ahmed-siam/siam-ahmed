import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Lightbulb, Zap } from "lucide-react";
import { useSiteSettings, AboutSettings } from "@/hooks/useSiteSettings";

const defaultSkills = [
  { icon: Code2, title: "Development", description: "Clean, efficient code using modern frameworks and best practices" },
  { icon: Palette, title: "Design", description: "Beautiful interfaces with attention to detail and user experience" },
  { icon: Lightbulb, title: "Strategy", description: "Thoughtful solutions that align with your business goals" },
  { icon: Zap, title: "Performance", description: "Fast, optimized applications that scale with your needs" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: aboutSettings } = useSiteSettings<AboutSettings>('about');

  const title = aboutSettings?.title || "About Me";
  const description = aboutSettings?.description || "With over 3 years of experience in web development and design, I specialize in creating digital experiences that are both visually stunning and highly functional.";
  const skills = aboutSettings?.skills || [];
  const imageUrl = aboutSettings?.imageUrl;

  return (
    <section id="about" className="py-24 bg-card relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-primary text-sm uppercase tracking-widest font-medium"
          >
            {title}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-4 mb-4 sm:mb-6 px-2">
            Turning Ideas Into
            <br />
            <span className="text-gradient">Reality</span>
          </h2>
          
          {/* Profile Image */}
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                  <img 
                    src={imageUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          )}
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg px-4">
            {description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {defaultSkills.map((skill) => (
            <motion.div
              key={skill.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-background rounded-xl p-4 sm:p-6 border border-border card-hover group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-3 sm:mb-4"
              >
                <skill.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-display font-semibold mb-1 sm:mb-2">{skill.title}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">{skill.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills badges from database */}
        {skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 text-center"
        >
          {[
            { value: "50+", label: "Projects Completed" },
            { value: "30+", label: "Happy Clients" },
            { value: "5+", label: "Years Experience" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={statVariants}
              whileHover={{ scale: 1.05 }}
              className="p-3 sm:p-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1, type: "spring", stiffness: 100 }}
                className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-gradient mb-1 sm:mb-2"
              >
                {stat.value}
              </motion.div>
              <p className="text-muted-foreground text-xs sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
