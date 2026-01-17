import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const SkeletonBase = ({ className }: SkeletonProps) => (
  <div className={cn("relative overflow-hidden rounded-lg bg-muted/50", className)}>
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: "linear"
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent"
    />
  </div>
);

// Hero Section Skeleton
export const HeroSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
    <div className="container mx-auto px-6 pt-20 relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center max-w-4xl mx-auto space-y-6"
      >
        {/* Subtitle badge */}
        <div className="flex justify-center">
          <SkeletonBase className="h-10 w-56 rounded-full" />
        </div>
        
        {/* Title */}
        <div className="space-y-3">
          <SkeletonBase className="h-12 sm:h-16 md:h-20 w-3/4 mx-auto" />
          <SkeletonBase className="h-12 sm:h-16 md:h-20 w-1/2 mx-auto" />
        </div>
        
        {/* Description */}
        <div className="max-w-2xl mx-auto space-y-2 px-4">
          <SkeletonBase className="h-5 w-full" />
          <SkeletonBase className="h-5 w-5/6 mx-auto" />
          <SkeletonBase className="h-5 w-4/6 mx-auto" />
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <SkeletonBase className="h-12 w-40 rounded-lg" />
          <SkeletonBase className="h-12 w-40 rounded-lg" />
        </div>
      </motion.div>
    </div>
  </div>
);

// About Section Skeleton
export const AboutSkeleton = () => (
  <section className="py-24 bg-card relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <SkeletonBase className="h-4 w-24 mx-auto" />
          <SkeletonBase className="h-10 sm:h-14 w-64 mx-auto" />
          <SkeletonBase className="h-10 sm:h-14 w-32 mx-auto" />
          
          {/* Profile image */}
          <div className="flex justify-center py-4">
            <SkeletonBase className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full" />
          </div>
          
          <div className="max-w-2xl mx-auto space-y-2">
            <SkeletonBase className="h-5 w-full" />
            <SkeletonBase className="h-5 w-5/6 mx-auto" />
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-background rounded-xl p-4 sm:p-6 border border-border space-y-4">
              <SkeletonBase className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg" />
              <SkeletonBase className="h-6 w-3/4" />
              <div className="space-y-2">
                <SkeletonBase className="h-3 w-full" />
                <SkeletonBase className="h-3 w-5/6" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center pt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <SkeletonBase className="h-12 sm:h-16 w-24 mx-auto" />
              <SkeletonBase className="h-4 w-28 mx-auto" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

// Blog Section Skeleton
export const BlogSkeleton = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
        className="bg-background rounded-xl overflow-hidden border border-border"
      >
        {/* Image */}
        <SkeletonBase className="aspect-[16/10] rounded-none" />
        
        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Meta info */}
          <div className="flex items-center gap-4">
            <SkeletonBase className="h-4 w-20" />
            <SkeletonBase className="h-4 w-16" />
          </div>
          
          {/* Category */}
          <SkeletonBase className="h-6 w-16 rounded-full" />
          
          {/* Title */}
          <div className="space-y-2">
            <SkeletonBase className="h-6 w-full" />
            <SkeletonBase className="h-6 w-3/4" />
          </div>
          
          {/* Excerpt */}
          <div className="space-y-2">
            <SkeletonBase className="h-4 w-full" />
            <SkeletonBase className="h-4 w-5/6" />
          </div>
          
          {/* Read more */}
          <SkeletonBase className="h-5 w-24 mt-4" />
        </div>
      </motion.div>
    ))}
  </div>
);

// Contact Section Skeleton  
export const ContactSkeleton = () => (
  <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
    {/* Contact info */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-4">
          <SkeletonBase className="w-12 h-12 rounded-lg flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <SkeletonBase className="h-5 w-20" />
            <SkeletonBase className="h-4 w-40" />
          </div>
        </div>
      ))}
    </motion.div>

    {/* Form skeleton */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-background rounded-xl p-8 border border-border space-y-6"
    >
      {/* Form fields */}
      {[1, 2].map((i) => (
        <div key={i} className="space-y-2">
          <SkeletonBase className="h-4 w-16" />
          <SkeletonBase className="h-10 w-full rounded-md" />
        </div>
      ))}
      
      {/* Textarea */}
      <div className="space-y-2">
        <SkeletonBase className="h-4 w-20" />
        <SkeletonBase className="h-32 w-full rounded-md" />
      </div>
      
      {/* Button */}
      <SkeletonBase className="h-12 w-full rounded-lg" />
    </motion.div>
  </div>
);

// Generic card skeleton
export const CardSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
        className="bg-card rounded-xl p-6 border border-border space-y-4"
      >
        <SkeletonBase className="h-40 w-full rounded-lg" />
        <SkeletonBase className="h-6 w-3/4" />
        <div className="space-y-2">
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-5/6" />
        </div>
      </motion.div>
    ))}
  </div>
);
