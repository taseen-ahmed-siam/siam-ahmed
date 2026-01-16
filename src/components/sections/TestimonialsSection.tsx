import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content: "Working with this developer was an absolute pleasure. They delivered a stunning website that exceeded our expectations and drove real results for our business.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, DesignHub",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "Incredible attention to detail and a deep understanding of user experience. Our conversion rates improved by 40% after the redesign.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director, GrowthCo",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content: "Professional, responsive, and incredibly talented. They took our vision and transformed it into a beautiful, functional website that our customers love.",
    rating: 5,
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + testimonials.length) % testimonials.length;
    setCurrentIndex([newIndex, newDirection]);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-primary text-sm uppercase tracking-widest font-medium"
          >
            Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            What Clients <span className="text-gradient">Say</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-card rounded-2xl p-8 md:p-12 border border-border shadow-card overflow-hidden">
            <Quote className="absolute top-8 left-8 text-primary/20" size={60} />
            
            <div className="relative z-10 min-h-[200px]">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star size={20} className="fill-primary text-primary" />
                  </motion.div>
                ))}
              </div>
              
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <p className="text-xl md:text-2xl font-display leading-relaxed mb-8">
                    "{testimonials[currentIndex].content}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                      <p className="text-muted-foreground text-sm">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="p-3 rounded-full bg-card border border-border hover:bg-secondary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentIndex([index, index > currentIndex ? 1 : -1])}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30 w-2"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="p-3 rounded-full bg-card border border-border hover:bg-secondary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
