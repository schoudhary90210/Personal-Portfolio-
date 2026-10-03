import { ContactSection } from '@/components/sections/ContactSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { Hero } from '@/components/sections/Hero';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExperienceSection tone="tinted" />
      <ProjectsSection tone="base" />
      <EducationSection tone="tinted" />
      <SkillsSection tone="base" />
      <ContactSection tone="tinted" />
    </>
  );
}
