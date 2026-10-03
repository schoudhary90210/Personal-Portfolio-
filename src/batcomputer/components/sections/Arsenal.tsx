'use client';

import { motion } from 'framer-motion';
import ArsenalCard from './ArsenalCard';
import TextReveal from '@/batcomputer/components/ui/TextReveal';
import { projects } from '@/batcomputer/data/projects';
import { sectionContainerVariants, sectionItemVariants } from '@/batcomputer/lib/animations';

export default function Arsenal() {
  return (
    <motion.div
      variants={sectionContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center px-4 md:px-8 lg:px-12 py-12"
    >
      <motion.h2
        variants={sectionItemVariants}
        className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-wider text-center mb-10 text-accent red-glow-text"
      >
        <TextReveal text="ARSENAL" delay={0.3} />
      </motion.h2>

      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ maxWidth: '960px' }}>
        {projects.map((project) => (
          <motion.div key={project.id} variants={sectionItemVariants}>
            <ArsenalCard project={project} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
