export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  techIcons: string[];
  metrics?: string[];
  github: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: 'quant-backtest-engine',
    name: 'Quant-Backtest-Engine',
    tagline: 'Quantitative backtesting & strategy evaluation',
    description:
      'Python backtesting engine comparing 7 portfolio strategies across 12 assets, with Parquet data caching, transaction-cost modeling, walk-forward evaluation and pytest coverage for look-ahead bias.',
    techIcons: ['Python', 'pandas', 'NumPy', 'pytest'],
    metrics: ['7 strategies × 12 assets', 'Walk-forward evaluation', 'Look-ahead bias tests'],
    github: 'https://github.com/schoudhary90210/Quant-Backtest-Engine',
  },
  {
    id: 'cadence',
    name: 'Cadence',
    tagline: 'Speech-fluency practice app',
    description:
      'Built with a team at CheeseHacks 2026. Combines Whisper transcription with Wav2Vec2 embeddings and classification to flag disfluencies, served by a Dockerized FastAPI backend on Google Cloud Run.',
    techIcons: ['TypeScript', 'Next.js', 'FastAPI', 'GCP'],
    metrics: ['Whisper + Wav2Vec2', 'Deployed on Cloud Run'],
    github: 'https://github.com/schoudhary90210/Cadence',
  },
  {
    id: 'traction',
    name: 'TRACTION',
    tagline: 'Edge AI crop disease detection',
    description:
      'Built with a team at the Qualcomm Edge AI Hackathon. A PyTorch-trained MobileNetV2 runs through ONNX Runtime for local camera inference, with detection logs and a local Ollama assistant shaped by Wisconsin farmer feedback.',
    techIcons: ['PyTorch', 'ONNX', 'Streamlit', 'Ollama'],
    metrics: ['MobileNetV2 on ONNX Runtime', 'Local inference'],
    github: 'https://github.com/schoudhary90210/traction',
  },
  {
    id: 'custom-memalloc',
    name: 'Custom-MemAlloc',
    tagline: 'Thread-safe memory allocator in C',
    description:
      'Segregated free-list allocator with boundary tags, coalescing, mutex-protected shared state and 16-byte alignment, stress-tested across eight threads.',
    techIcons: ['C', 'POSIX', 'ARM64'],
    metrics: ['Segregated free lists', 'Boundary-tag coalescing', '8-thread stress test'],
    github: 'https://github.com/schoudhary90210/Custom-MemAlloc',
  },
  {
    id: 'bio-intel-agent',
    name: 'Bio-Intel-Agent',
    tagline: 'Biomedical literature-monitoring pipeline',
    description:
      'FastAPI pipeline that pulls recent PubMed abstracts for a topic, summarizes them with a local Ollama model or an extractive fallback, and posts updates to Slack, with Redis caching.',
    techIcons: ['Python', 'FastAPI', 'Ollama', 'Redis'],
    github: 'https://github.com/schoudhary90210/Bio-Intel-Agent',
  },
  {
    id: 'netmhcstabpan-docker',
    name: 'netmhcstabpan-docker',
    tagline: 'Containerized peptide-MHC stability prediction',
    description:
      'Containerized NetMHCstabpan with Docker, packaging legacy Linux dependencies for reproducible deployment and documenting AMD64 emulation on Apple Silicon.',
    techIcons: ['Docker', 'Bash', 'Linux'],
    metrics: ['Setup time reduced from ~2.5 hrs to <15 min'],
    github: 'https://github.com/schoudhary90210/netmhcstabpan-docker',
  },
];
