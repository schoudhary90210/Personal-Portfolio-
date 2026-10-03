export interface TechCategory {
  category: string;
  items: string[];
}

export const techStack: TechCategory[] = [
  {
    category: 'Languages',
    items: ['Python', 'C', 'C++', 'Java', 'SQL', 'Bash'],
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
      'Scikit-Learn',
      'NumPy',
      'pandas',
      'OpenCV',
      'ONNX Runtime',
      'Matplotlib',
    ],
  },
  {
    category: 'Infrastructure & Tools',
    items: [
      'Docker',
      'pthreads',
      'FastAPI',
      'PostgreSQL',
      'REST APIs',
      'AWS',
      'Linux',
      'Git',
      'GitHub Actions',
      'Ollama',
      'OpenAI API',
    ],
  },
];
