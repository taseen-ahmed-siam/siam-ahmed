import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Clock, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development in 2024",
    excerpt: "Exploring the latest trends and technologies shaping the web development landscape.",
    content: "Web development is evolving at an unprecedented pace. From AI-powered development tools to new frameworks that promise better performance and developer experience, 2024 is shaping up to be an exciting year for web developers everywhere. In this article, we explore the key trends that are defining the future of our industry, including the rise of edge computing, the maturation of WebAssembly, and the growing importance of web accessibility.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    category: "Development",
  },
  {
    id: 2,
    title: "Designing for Accessibility: A Complete Guide",
    excerpt: "How to create inclusive digital experiences that work for everyone.",
    content: "Accessibility isn't just a nice-to-have—it's essential for creating truly inclusive digital experiences. In this comprehensive guide, we cover everything from understanding WCAG guidelines to implementing accessible components in your designs. Learn about color contrast, keyboard navigation, screen reader optimization, and how to audit your existing projects for accessibility issues.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop",
    date: "Jan 10, 2024",
    readTime: "8 min read",
    category: "Design",
  },
  {
    id: 3,
    title: "Building Scalable React Applications",
    excerpt: "Best practices for architecting large-scale React projects.",
    content: "As React applications grow, maintaining code quality and performance becomes increasingly challenging. This article dives deep into architectural patterns that help you build maintainable, scalable React applications. We'll explore folder structures, state management strategies, code splitting techniques, and testing approaches that scale with your team and codebase.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    date: "Jan 5, 2024",
    readTime: "10 min read",
    category: "Development",
  },
];

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  return (
    <section id="blog" className="py-24 bg-card relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest font-medium">Blog</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Latest <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Thoughts, tutorials, and insights from my journey in design and development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedPost(post)}
              className="bg-background rounded-xl overflow-hidden border border-border cursor-pointer group card-hover"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>
                
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {post.category}
                </span>
                
                <h3 className="text-xl font-display font-semibold mt-3 mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-2 mt-4 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                  Read More <ArrowRight size={16} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedPost(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {selectedPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {selectedPost.readTime}
                </span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  {selectedPost.category}
                </span>
              </div>
              
              <h2 className="text-3xl font-display font-bold mb-4">
                {selectedPost.title}
              </h2>
              
              <p className="text-muted-foreground leading-relaxed">
                {selectedPost.content}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default BlogSection;
