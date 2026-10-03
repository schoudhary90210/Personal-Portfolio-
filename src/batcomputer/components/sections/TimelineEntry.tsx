'use client';

import { motion } from 'framer-motion';
import CornerBrackets from '../ui/CornerBrackets';
import { renderAnimatedNumbers } from '@/batcomputer/components/ui/AnimatedCounter';
import type { Experience } from '@/batcomputer/data/experience';

interface TimelineEntryProps {
  experience: Experience;
  index: number;
  isLeft: boolean;
}

export default function TimelineEntry({ experience, index, isLeft }: TimelineEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} w-full`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-accent rounded-full border-2 border-[#050505] z-10 top-6" />

      {/* Card */}
      <div className={`ml-6 md:ml-0 w-full md:w-[45%] ${isLeft ? '' : ''}`}>
        <CornerBrackets className="border border-border bg-[#080808] p-5 hover:border-accent/30 transition-colors duration-300">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-heading text-base md:text-lg font-bold uppercase tracking-wider text-accent">
                {experience.company}
              </h3>
              <p className="font-mono text-xs text-accent mt-1">{experience.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] text-text-secondary mb-3">
            <span>{experience.date}</span>
            <span className="text-accent/40">|</span>
            <span>{experience.location}</span>
          </div>
          <ul className="space-y-2">
            {experience.bullets.map((bullet, i) => (
              <li key={i} className="font-mono text-xs text-text-secondary leading-relaxed flex gap-2">
                <span className="text-accent shrink-0 mt-0.5">▸</span>
                <span>{renderAnimatedNumbers(bullet)}</span>
              </li>
            ))}
          </ul>
        </CornerBrackets>
      </div>
    </motion.div>
  );
}
