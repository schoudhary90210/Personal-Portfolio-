'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, X } from 'lucide-react';
import MagneticWrap from '@/batcomputer/components/ui/MagneticWrap';
import { renderAnimatedNumbers } from '@/batcomputer/components/ui/AnimatedCounter';
import type { Project } from '@/batcomputer/data/projects';

interface ArsenalCardProps {
  project: Project;
}

export default function ArsenalCard({ project }: ArsenalCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  const tiltEnabled = !reducedMotion && !isMobile;
  const maxTilt = isFlipped ? 8 : 10;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tiltEnabled) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -maxTilt * 2;
      const rotateY = (x - 0.5) * maxTilt * 2;

      setTilt({ rotateX, rotateY, x, y });
    },
    [tiltEnabled, maxTilt],
  );

  const handleMouseEnter = useCallback(() => {
    if (tiltEnabled) setIsHovering(true);
  }, [tiltEnabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0, x: 0.5, y: 0.5 });
  }, []);

  const handleFlipToBack = useCallback(() => {
    setIsFlipped(true);
    setTilt({ rotateX: 0, rotateY: 0, x: 0.5, y: 0.5 });
  }, []);

  const handleFlipToFront = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
  }, []);

  // Parallax offsets for inner content (opposite direction of tilt)
  const parallaxX = isHovering ? -(tilt.x - 0.5) * 5 : 0;
  const parallaxY = isHovering ? -(tilt.y - 0.5) * 5 : 0;
  const parallaxSecondaryX = isHovering ? -(tilt.x - 0.5) * 3 : 0;
  const parallaxSecondaryY = isHovering ? -(tilt.y - 0.5) * 3 : 0;

  // Dynamic edge glow
  const edgeShadow = isHovering
    ? `${-tilt.rotateY * 0.5}px ${tilt.rotateX * 0.5}px 20px rgba(220, 38, 38, 0.3)`
    : undefined;

  // ══════════ MOBILE: fade transition (no 3D) ══════════
  if (isMobile) {
    return (
      <div className="relative h-72 md:h-80">
        {/* Front face */}
        <div
          className="absolute inset-0 border border-border bg-[#080808] p-5 flex flex-col justify-between wireframe-pulse cursor-pointer"
          style={{
            opacity: isFlipped ? 0 : 1,
            pointerEvents: isFlipped ? 'none' : 'auto',
            transition: 'opacity 0.3s ease-out',
          }}
          onClick={handleFlipToBack}
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/30" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent/30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent/30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/30" />

          <div>
            <h3 className="font-heading text-xl font-bold uppercase tracking-wider text-accent">
              {project.name}
            </h3>
            <p className="font-mono text-xs text-text-secondary mt-2">
              {project.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techIcons.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] px-2 py-1 border border-border/50 text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 border border-accent/30 bg-[#080808] p-5 flex flex-col overflow-y-auto"
          style={{
            opacity: isFlipped ? 1 : 0,
            pointerEvents: isFlipped ? 'auto' : 'none',
            transition: 'opacity 0.3s ease-out',
          }}
        >
          {/* Scan line overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
            }}
          />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-accent">
                {project.name}
              </h3>
              <button
                onClick={handleFlipToFront}
                className="relative z-10 text-text-secondary hover:text-accent transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>

            <p className="font-mono text-xs text-text-secondary leading-relaxed flex-1">
              {project.description}
            </p>

            {project.metrics && (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="font-mono text-[10px] px-2 py-1 bg-accent/10 border border-accent/20 text-accent"
                  >
                    {/Top \d|O\(/.test(metric) ? metric : renderAnimatedNumbers(metric)}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-accent transition-colors"
              >
                <Github size={14} />
                Source
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-10 flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-accent transition-colors"
                >
                  <ExternalLink size={14} />
                  Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ══════════ DESKTOP: 3D flip with tilt ══════════
  return (
    <div
      ref={cardRef}
      className="relative h-72 md:h-80"
      style={{ perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          willChange: isHovering ? 'transform' : undefined,
          transform: tiltEnabled && isHovering
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
            : undefined,
          transition: isHovering
            ? 'transform 0.15s ease-out'
            : 'transform 0.4s ease-out',
          boxShadow: edgeShadow,
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* ══════════ Front face ══════════ */}
        <div
          className="absolute inset-0 border border-border bg-[#080808] p-5 md:p-6 flex flex-col justify-between wireframe-pulse hover:border-accent/40 transition-colors duration-300 group cursor-pointer"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            pointerEvents: isFlipped ? 'none' : 'auto',
          }}
          onClick={handleFlipToBack}
        >
          {/* Holographic shimmer overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 holographic pointer-events-none" />

          {/* Dynamic light-glare overlay */}
          {isHovering && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${tilt.x * 100}% ${tilt.y * 100}%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`,
                zIndex: 5,
              }}
            />
          )}

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/30" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent/30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent/30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/30" />

          {/* Primary content — deeper parallax */}
          <div
            className="relative z-10"
            style={{
              transform: isHovering
                ? `translateZ(30px) translateX(${parallaxX}px) translateY(${parallaxY}px)`
                : undefined,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wider text-accent">
              {project.name}
            </h3>
            <p className="font-mono text-xs text-text-secondary mt-2">
              {project.tagline}
            </p>
          </div>

          {/* Secondary content — shallower parallax */}
          <div
            className="relative z-10 flex flex-wrap gap-2"
            style={{
              transform: isHovering
                ? `translateZ(15px) translateX(${parallaxSecondaryX}px) translateY(${parallaxSecondaryY}px)`
                : undefined,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {project.techIcons.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] px-2 py-1 border border-border/50 text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ══════════ Back face ══════════ */}
        <div
          className="absolute inset-0 border border-accent/30 bg-[#080808] p-5 md:p-6 flex flex-col overflow-y-auto"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Scan line overlay on back */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
            }}
          />

          {/* Dynamic light-glare overlay (back face) */}
          {isHovering && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${(1 - tilt.x) * 100}% ${tilt.y * 100}%, rgba(255, 255, 255, 0.06) 0%, transparent 60%)`,
                zIndex: 5,
              }}
            />
          )}

          <div
            className="relative z-10 flex flex-col h-full"
            style={{
              transform: isHovering
                ? `translateZ(20px) translateX(${parallaxX * 0.6}px) translateY(${parallaxY * 0.6}px)`
                : undefined,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-accent">
                {project.name}
              </h3>
              <button
                onClick={handleFlipToFront}
                className="relative z-10 text-text-secondary hover:text-accent transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <p className="font-mono text-xs text-text-secondary leading-relaxed flex-1">
              {project.description}
            </p>

            {project.metrics && (
              <div
                className="mt-3 flex flex-wrap gap-2"
                style={{
                  transform: isHovering
                    ? `translateZ(10px) translateX(${parallaxSecondaryX * 0.5}px) translateY(${parallaxSecondaryY * 0.5}px)`
                    : undefined,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                {project.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="font-mono text-[10px] px-2 py-1 bg-accent/10 border border-accent/20 text-accent"
                  >
                    {/Top \d|O\(/.test(metric) ? metric : renderAnimatedNumbers(metric)}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex gap-3">
              <MagneticWrap radius={50} strength={0.2}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-10 flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-accent transition-colors"
                >
                  <Github size={14} />
                  Source
                </a>
              </MagneticWrap>
              {project.demo && (
                <MagneticWrap radius={50} strength={0.2}>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-10 flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-accent transition-colors"
                  >
                    <ExternalLink size={14} />
                    Demo
                  </a>
                </MagneticWrap>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
