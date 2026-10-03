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
    tagline: 'Quantitative backtesting & portfolio optimization',
    description:
      'Event-driven backtester with walk-forward validation across 15 years of daily data and 12 assets. Implements Black-Litterman, Ledoit-Wolf shrinkage, Kelly Criterion, and a 50k-path Monte Carlo engine.',
    techIcons: ['Python', 'NumPy', 'pandas'],
    metrics: ['0.80 OOS Sharpe ratio', '18.4% CAGR', '92% IS retention'],
    github: 'https://github.com/schoudhary90210/Quant-Backtest-Engine',
  },
  {
    id: 'cadence',
    name: 'Cadence',
    tagline: 'AI-powered speech fluency analysis platform',
    description:
      'Speech fluency training app built at CheeseHacks 2026. Classifies disfluencies with wav2vec2 and transcribes with Whisper in real time.',
    techIcons: ['Python', 'PyTorch', 'Whisper'],
    metrics: ['97.9% F1 score'],
    github: 'https://github.com/schoudhary90210/Cadence',
  },
  {
    id: 'traction',
    name: 'TRACTION',
    tagline: 'Edge AI crop disease detection',
    description:
      'Built at the Qualcomm Edge AI Hackathon. ConvNeXt model on ONNX Runtime hitting 94% accuracy at 12+ FPS. Includes GPS outbreak mapping and an on-device LLM advisor — zero cloud dependency.',
    techIcons: ['Python', 'ONNX', 'Streamlit', 'Llama'],
    metrics: ['94% accuracy', '+14% over MobileNetV2'],
    github: 'https://github.com/schoudhary90210/traction',
  },
  {
    id: 'custom-memalloc',
    name: 'Custom-MemAlloc',
    tagline: 'High-performance thread-safe memory allocator',
    description:
      'Segregated Free List allocator with boundary tagging and immediate coalescing. Pushes 6.0M+ ops/sec across 8 threads at 85%+ utilization.',
    techIcons: ['C', 'POSIX', 'ARM64'],
    metrics: ['6.0M+ ops/sec', '85%+ utilization', 'O(1) allocation'],
    github: 'https://github.com/schoudhary90210/Custom-MemAlloc',
  },
  {
    id: 'bio-intel-agent',
    name: 'Bio-Intel-Agent',
    tagline: 'Serverless health monitoring data pipeline',
    description:
      'FastAPI + GPT-4 pipeline for real-time health data ingestion and AI-driven biomedical analysis.',
    techIcons: ['Python', 'FastAPI', 'OpenAI'],
    github: 'https://github.com/schoudhary90210/Bio-Intel-Agent',
  },
  {
    id: 'netmhcstabpan-docker',
    name: 'netmhcstabpan-docker',
    tagline: 'Containerized peptide-MHC stability prediction',
    description:
      'Dockerized NetMHCstabpan for reproducible cross-architecture deployment (ARM64/AMD64). Automated dependency resolution cut researcher setup time by 90%.',
    techIcons: ['Docker', 'Bash', 'Linux'],
    metrics: ['Setup time reduced from ~2.5 hrs to <15 min'],
    github: 'https://github.com/schoudhary90210/netmhcstabpan-docker',
  },
];
