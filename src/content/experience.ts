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
      'Working where computation meets mitochondrial biology, helping turn research questions into reproducible data-processing and analysis workflows.',
      'Building Python workflows for high-dimensional mass-spectrometry data, using clustering and graph analysis to study mitochondrial protein complexes.',
    ],
    tags: ['Python', 'Mass spectrometry', 'Clustering', 'Graph analysis'],
  },
  {
    id: 'undp',
    org: 'United Nations Development Programme (UNDP)',
    role: 'Independent Research Consultant',
    location: 'Doha, Qatar',
    period: 'Dec 2025 – Jan 2026',
    highlights: [
      'Built reusable Python cleaning and analysis steps for OECD development-finance records, making comparisons across Qatar and neighboring GCC donors consistent.',
      'Summarized donor-allocation patterns in charts and dashboards for internal strategy discussions.',
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
      'Containerized the NetMHCstabpan peptide–MHC stability prediction tool with Docker so researchers no longer had to rebuild a fragile environment.',
      'Resolved compatibility issues and automated the Linux/HPC installation workflow, cutting setup from roughly 2.5 hours to under 15 minutes.',
      'Wrote usage documentation covering peptide and FASTA inputs, HLA allele selection, thresholds and spreadsheet output.',
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
      'Coordinate club programming, manage event logistics and keep members informed, bringing together students interested in finance and technology.',
    ],
    tags: ['Operations', 'Events', 'Leadership'],
  },
];
