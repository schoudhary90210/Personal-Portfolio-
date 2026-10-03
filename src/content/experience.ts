export interface ExperienceItem {
  id: string;
  org: string;
  team?: string;
  role: string;
  location: string;
  /** Omitted until confirmed by the resume. */
  period?: string;
  highlights: string[];
  tags: string[];
  link?: { label: string; href: string };
}

// Reverse chronological. Figures appear only where a resume states them.
export const experience: ExperienceItem[] = [
  {
    id: 'morgridge',
    org: 'Morgridge Institute for Research',
    team: 'Stefely Lab',
    role: 'Student Researcher, Computational Biology',
    location: 'Madison, WI',
    period: 'Sep 2026 – Present',
    highlights: [
      'Scoping Python data-processing and analysis workflows with researchers to study mitochondrial protein complexes using mass-spectrometry data.',
    ],
    tags: ['Python', 'Mass spectrometry', 'Research workflows'],
  },
  {
    id: 'undp',
    org: 'United Nations Development Programme (UNDP)',
    role: 'Independent Research Consultant',
    location: 'Doha, Qatar',
    period: 'Dec 2025 – Jan 2026',
    highlights: [
      'Built a reusable Python/pandas pipeline to clean and standardize OECD aid-flow records, enabling comparisons of donor allocations across Qatar and GCC peers.',
      'Created Matplotlib charts and dashboards to summarize allocation patterns for internal strategy discussions.',
    ],
    tags: ['Python', 'pandas', 'Matplotlib'],
  },
  {
    id: 'md-anderson',
    org: 'MD Anderson Cancer Center',
    role: 'Bioinformatics Engineering Intern',
    location: 'Houston, TX',
    period: 'Jun – Aug 2025',
    highlights: [
      'Reduced Linux HPC setup from about 2.5 hours to under 15 minutes by automating installation with Bash and documenting a repeatable setup procedure.',
      'Containerized the NetMHCstabpan peptide–MHC stability prediction tool with Docker, packaging legacy Linux dependencies for reproducible deployment and documenting AMD64 emulation on Apple Silicon.',
    ],
    tags: ['Docker', 'Bash', 'Linux / HPC'],
    link: {
      label: 'netmhcstabpan-docker',
      href: 'https://github.com/schoudhary90210/netmhcstabpan-docker',
    },
  },
];

export const earlierExperience: ExperienceItem[] = [
  {
    id: 'qcri',
    org: 'Qatar Computing Research Institute',
    role: 'Machine Learning Research Intern',
    location: 'Doha, Qatar',
    period: 'May – Aug 2023',
    highlights: [
      'Early research experience applying machine learning to astronomical observations: cleaning the data, extracting time-series features, training detection models and ranking candidates for follow-up.',
    ],
    tags: ['Python', 'Machine learning', 'Time series'],
  },
];

export const leadership: ExperienceItem[] = [
  {
    id: 'fintech-uw',
    org: 'FinTech@UW',
    role: 'Chair of Operations',
    location: 'UW–Madison',
    highlights: [
      'Coordinate programming, logistics and member communication for a club that brings together students interested in finance and technology.',
    ],
    tags: ['Operations', 'Events', 'Leadership'],
  },
];
