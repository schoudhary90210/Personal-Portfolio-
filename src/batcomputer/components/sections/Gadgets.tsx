'use client';

import { motion } from 'framer-motion';
import TextReveal from '@/batcomputer/components/ui/TextReveal';
import { techStack } from '@/batcomputer/data/techStack';
import { sectionContainerVariants, sectionItemVariants } from '@/batcomputer/lib/animations';

export default function Gadgets() {
  return (
    <motion.div
      variants={sectionContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center px-4 py-12"
    >
      <motion.h2
        variants={sectionItemVariants}
        className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-wider text-center mb-10 text-accent red-glow-text"
      >
        <TextReveal text="GADGETS" delay={0.3} />
      </motion.h2>

      <div className="w-full max-w-5xl space-y-8">
        {techStack.map((category) => (
          <motion.div key={category.category} variants={sectionItemVariants}>
            <h3 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wider text-accent mb-4">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.items.map((item) => (
                <motion.div
                  key={item}
                  variants={sectionItemVariants}
                  className="px-4 py-2 border border-border bg-[#080808] font-mono text-xs text-text-secondary hover:border-accent/40 hover:text-foreground transition-all duration-200"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
