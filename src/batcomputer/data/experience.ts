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
      'Building Python workflows for high-dimensional mass-spectrometry data, using clustering and graph analysis to study mitochondrial protein complexes.',
    ],
  },
  {
    id: 'undp',
    company: 'United Nations Development Programme (UNDP)',
    role: 'Independent Research Consultant',
    date: 'Dec 2025 – Jan 2026',
    location: 'Doha, Qatar',
    bullets: [
      'Built Python data pipeline processing $2B+ in OECD development finance across 50+ countries. Developed OLS regression models benchmarking Qatar\'s allocation against GCC and G7 donor profiles.',
      'Produced automated visualization dashboards adopted by senior UNDP leadership.',
    ],
  },
  {
    id: 'md-anderson',
    company: 'MD Anderson Cancer Center',
    role: 'Bioinformatics Engineering Intern',
    date: 'Jun 2025 – Aug 2025',
    location: 'Houston, TX',
    bullets: [
      'Containerized NetMHCstabpan peptide-MHC stability prediction pipeline via Docker. Automated dependency resolution reducing researcher setup time by 90%.',
      'Authored runbooks adopted by 3+ research teams.',
    ],
  },
  {
    id: 'qcri',
    company: 'Qatar Computing Research Institute',
    role: 'Machine Learning Research Intern',
    date: 'May 2023 – Aug 2023',
    location: 'Doha, Qatar',
    bullets: [
      'Developed time-series classification models on astronomical light-curve datasets, improving transient signal detection accuracy by 14%.',
      'Engineered feature extraction pipeline processing 50,000+ observations.',
    ],
  },
];
