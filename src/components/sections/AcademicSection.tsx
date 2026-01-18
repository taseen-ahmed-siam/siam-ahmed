import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

const educationData = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Southeast University",
    location: "Dhaka, Bangladesh",
    period: "2022 - Present",
    description: "Pursuing a comprehensive curriculum in computer science fundamentals, software engineering, and modern development practices.",
    achievements: ["Active Member - Research Cell", "Active Member - SSSC Club"],
    current: true,
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Birshreshtha Munshi Abdur Rouf Public College",
    location: "Dhaka, Bangladesh",
    period: "2019 - 2021",
    description: "Completed higher secondary education with focus on Science group, building strong foundation in mathematics and physics.",
    achievements: ["Science Group", "GPA: 5.00"],
    current: false,
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Shamsul Hoque Khan School & College",
    location: "Dhaka, Bangladesh",
    period: "2017 - 2019",
    description: "Completed secondary education with excellent academic performance and active participation in extracurricular activities.",
    achievements: ["Science Group", "GPA: 5.00"],
    current: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const AcademicSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="academic" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4" />
            Education Journey
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Academic <span className="text-gradient">Background</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My educational journey that shaped my skills and passion for technology
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent transform md:-translate-x-1/2" />

          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 transform -translate-x-1/2 z-10">
                <div className={`w-4 h-4 rounded-full border-4 ${
                  edu.current 
                    ? "bg-primary border-primary animate-pulse" 
                    : "bg-background border-primary/60"
                }`} />
                {edu.current && (
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/30 animate-ping" />
                )}
              </div>

              {/* Content card */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12" : "md:pl-12"
              }`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={`relative p-6 rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 ${
                    edu.current ? "ring-2 ring-primary/20" : ""
                  }`}
                >
                  {edu.current && (
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      Currently Pursuing
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-display font-bold text-foreground mb-1 leading-tight">
                        {edu.degree}
                      </h3>
                      <p className="text-primary font-medium mb-2">{edu.institution}</p>
                      
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {edu.period}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {edu.location}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {edu.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((achievement, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-accent/50 text-accent-foreground"
                          >
                            <Award className="w-3 h-3" />
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AcademicSection;
