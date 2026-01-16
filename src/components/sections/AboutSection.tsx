import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Lightbulb, Zap } from "lucide-react";

const skills = [
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
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Turning Ideas Into
            <br />
            <span className="text-gradient">Reality</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            With over 5 years of experience in web development and design, I specialize in 
            creating digital experiences that are both visually stunning and highly functional.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-background rounded-xl p-6 border border-border card-hover group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4"
              >
                <skill.icon size={24} className="text-primary-foreground" />
              </motion.div>
              <h3 className="text-xl font-display font-semibold mb-2">{skill.title}</h3>
              <p className="text-muted-foreground text-sm">{skill.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid md:grid-cols-3 gap-8 text-center"
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
              className="p-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1, type: "spring", stiffness: 100 }}
                className="text-5xl md:text-6xl font-display font-bold text-gradient mb-2"
              >
                {stat.value}
              </motion.div>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
