export interface SkillGroup {
  name: string;
  note?: string;
  items: string[];
}

// Grouped by evidence, strongest first. No self-rated percentages.
export const skills: SkillGroup[] = [
  {
    name: 'Languages',
    items: ['Python', 'SQL', 'Java', 'C', 'C++', 'TypeScript', 'JavaScript', 'Bash'],
  },
  {
    name: 'ML & data',
    items: [
      'PyTorch',
      'scikit-learn',
      'ONNX Runtime',
      'pandas',
      'NumPy',
      'DuckDB',
      'Parquet',
      'PyArrow',
      'Matplotlib',
      'Whisper',
      'Wav2Vec2',
    ],
  },
  {
    name: 'Web & databases',
    items: ['React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Firestore'],
  },
  {
    name: 'Tools',
    items: ['Git', 'Linux', 'Docker', 'Google Cloud', 'pytest', 'Ollama'],
  },
  {
    name: 'Distributed systems',
    note: 'CS 544 coursework',
    items: ['Spark', 'Kafka', 'Cassandra', 'HDFS'],
  },
];

export const aiPractice =
  'I’m comfortable using Claude and Codex for AI-assisted development, including brainstorming, debugging, testing and documentation. I also love integrating locally hosted LLMs into application workflows. The goal is always software I can understand, test and maintain.';
