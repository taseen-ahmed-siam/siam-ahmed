import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Kitter is a fully responsive petshop ecommerce website, Responsive for all devices, build using HTML, CSS, and JavaScript.",
    image: "https://repository-images.githubusercontent.com/532541152/f5707594-fb80-431d-9988-81a54e9455fe",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 2,
    title: "Brand Identity System",
    category: "Design",
    description: "Complete brand overhaul for a tech startup",
    image: "https://annenbergdl.org/wp-content/uploads/2025/01/ui-ux-design-figma-series.png",
    tags: ["Branding", "UI/UX", "Figma"],
  },
  {
    id: 3,
    title: "Mobile Banking App",
    category: "App Development",
    description: "Secure and intuitive banking application",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
    tags: ["React Native", "TypeScript", "Firebase"],
  },
  {
    id: 4,
    title: "Coffee Shop System Management",
    category: "Web Development",
    description: "Analytics dashboard with real-time data visualization",
    image: "https://user-images.githubusercontent.com/83401742/225241643-a2d01358-c8a1-476d-9cbf-509751499887.png",
    tags: ["Java", "CSS"],
  },
  
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-primary text-sm uppercase tracking-widest font-medium"
          >
            Portfolio
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-4 mb-4 sm:mb-6">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg px-4">
            A selection of projects I'm proud of, showcasing my skills in design and development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          style={{ perspective: "1000px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" } 
              }}
              className="group relative bg-card rounded-xl overflow-hidden border border-border card-hover"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-primary text-xs uppercase tracking-wider">{project.category}</span>
                <h3 className="text-lg sm:text-xl font-display font-semibold mt-1 mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  <a href="#" className="text-primary hover:text-accent transition-colors" aria-label="View live">
                    <ExternalLink size={18} />
                  </a>
                  <a href="#" className="text-primary hover:text-accent transition-colors" aria-label="View code">
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
