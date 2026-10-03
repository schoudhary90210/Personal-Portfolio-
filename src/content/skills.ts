export interface SkillGroup {
  name: string;
  note?: string;
  items: string[];
}

// Grouped by evidence, strongest first. No self-rated percentages.
export const skills: SkillGroup[] = [
  {
    name: 'Languages',
    items: ['Python', 'C', 'C++', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'Bash'],
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
      'PyArrow',
      'Parquet',
      'Whisper',
      'Wav2Vec2',
      'OpenCV',
    ],
  },
  {
    name: 'Web & APIs',
    items: ['React', 'Next.js', 'FastAPI', 'REST', 'Firestore', 'PostgreSQL'],
  },
  {
    name: 'Infrastructure',
    items: ['Linux', 'Docker', 'Google Cloud Run', 'Git & GitHub', 'Testing & CI'],
  },
  {
    name: 'Distributed systems',
    note: 'CS 544 coursework',
    items: ['Spark', 'Kafka', 'Cassandra', 'HDFS'],
  },
];

export const aiPractice =
  'I use Claude Code for brainstorming, debugging, testing and documentation, and I integrate locally hosted LLMs (Ollama) into application workflows. The goal is always software I can understand, test and maintain.';
