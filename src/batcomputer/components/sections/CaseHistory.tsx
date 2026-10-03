'use client';

import { motion } from 'framer-motion';
import TimelineEntry from './TimelineEntry';
import TextReveal from '@/batcomputer/components/ui/TextReveal';
import MagneticWrap from '@/batcomputer/components/ui/MagneticWrap';
import { experiences } from '@/batcomputer/data/experience';
import { sectionContainerVariants, sectionItemVariants } from '@/batcomputer/lib/animations';

export default function CaseHistory() {
  return (
    <motion.div
      variants={sectionContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center px-4 py-12"
    >
      <motion.h2
        variants={sectionItemVariants}
        className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-wider text-center mb-14 text-accent red-glow-text"
      >
        <TextReveal text="CASE HISTORY" delay={0.3} />
      </motion.h2>

      {/* Timeline container */}
      <div className="relative w-full max-w-4xl">
        {/* Vertical line */}
        <div className="absolute left-1.5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

        <div className="flex flex-col gap-8">
          {experiences.map((exp, i) => (
            <TimelineEntry
              key={exp.id}
              experience={exp}
              index={i}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>

      {/* Download Dossier button */}
      <motion.div variants={sectionItemVariants} className="mt-14">
        <MagneticWrap>
          <a
            href="/resume/Siddhant_Choudhary_Resume.pdf"
            download
            className="inline-block px-8 py-3 border-2 border-accent font-heading text-lg uppercase tracking-[0.15em] text-accent hover:bg-accent/10 transition-all duration-300 red-glow hover:red-glow-intense"
          >
            DOWNLOAD DOSSIER
          </a>
        </MagneticWrap>
      </motion.div>
    </motion.div>
  );
}
