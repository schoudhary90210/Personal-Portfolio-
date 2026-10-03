export interface Experience {
  id: string;
  company: string;
  role: string;
  date: string;
  location: string;
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    id: 'morgridge',
    company: 'Morgridge Institute for Research — Stefely Lab',
    role: 'Student Researcher, Computational Biology',
    date: 'Sep 2026 – Present',
    location: 'Madison, WI',
    bullets: [
      'Scoping Python data-processing and analysis workflows with researchers to study mitochondrial protein complexes using mass-spectrometry data.',
    ],
  },
  {
    id: 'undp',
    company: 'United Nations Development Programme (UNDP)',
    role: 'Independent Research Consultant',
    date: 'Dec 2025 – Jan 2026',
    location: 'Doha, Qatar',
    bullets: [
      'Built a reusable Python/pandas pipeline to clean and standardize OECD aid-flow records, enabling comparisons of donor allocations across Qatar and GCC peers.',
      'Created Matplotlib charts and dashboards to summarize allocation patterns for internal strategy discussions.',
    ],
  },
  {
    id: 'md-anderson',
    company: 'MD Anderson Cancer Center',
    role: 'Bioinformatics Engineering Intern',
    date: 'Jun 2025 – Aug 2025',
    location: 'Houston, TX',
    bullets: [
      'Reduced Linux HPC setup from about 2.5 hours to under 15 minutes by automating installation with Bash and documenting a repeatable setup procedure.',
      'Containerized NetMHCstabpan with Docker, packaging legacy Linux dependencies for reproducible deployment and documenting AMD64 emulation on Apple Silicon.',
    ],
  },
  {
    id: 'qcri',
    company: 'Qatar Computing Research Institute',
    role: 'Machine Learning Research Intern',
    date: 'May 2023 – Aug 2023',
    location: 'Doha, Qatar',
    bullets: [
      'Cleaned astronomical observations, extracted time-series features and trained detection models to rank candidates for follow-up.',
    ],
  },
];
