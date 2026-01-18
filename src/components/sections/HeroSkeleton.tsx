import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 pt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge skeleton */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <Skeleton className="h-8 w-48 rounded-full" />
          </div>

          {/* Title skeleton */}
          <div className="space-y-3 mb-4 sm:mb-6">
            <Skeleton className="h-12 sm:h-16 md:h-20 w-3/4 mx-auto" />
            <Skeleton className="h-12 sm:h-16 md:h-20 w-1/2 mx-auto" />
          </div>

          {/* Description skeleton */}
          <div className="space-y-2 mb-8 sm:mb-10 max-w-2xl mx-auto">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5 mx-auto" />
          </div>

          {/* Buttons skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Skeleton className="h-12 w-40 rounded-md" />
            <Skeleton className="h-12 w-40 rounded-md" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
