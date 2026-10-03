export interface TechCategory {
  category: string;
  items: string[];
}

export const techStack: TechCategory[] = [
  {
    category: 'Languages',
    items: ['Python', 'SQL', 'Java', 'C', 'C++', 'TypeScript', 'JavaScript', 'Bash'],
  },
  {
    category: 'Quantitative',
    items: [
      'Monte Carlo Simulation',
      'Time-Series Analysis',
      'Dynamic Programming',
      'Graph Algorithms',
      'Optimization',
      'Concurrency',
    ],
  },
  {
    category: 'ML & Data',
    items: [
      'PyTorch',
      'scikit-learn',
      'ONNX Runtime',
      'pandas',
      'NumPy',
      'DuckDB',
      'Parquet',
      'Matplotlib',
    ],
  },
  {
    category: 'Web & Tools',
    items: [
      'React',
      'Next.js',
      'FastAPI',
      'PostgreSQL',
      'Firestore',
      'Git',
      'Linux',
      'Docker',
      'Google Cloud',
      'pytest',
      'Ollama',
      'Claude Code',
    ],
  },
];
