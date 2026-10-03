export interface ProjectLink {
  label: string;
  href: string;
  kind: 'code' | 'demo';
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  /** Short context shown on cards, e.g. the event a project was built at. */
  context: string;
  /** Hackathon the project was built at, if any. */
  event?: string;
  date: string;
  /** "Team project" or "Personal project". */
  team: string;
  role?: string;
  /** Card description and detail-page lead. */
  summary: string;
  stack: string[];
  problem: string;
  /** "What we built" for team projects, "What I built" for personal ones. */
  work: string[];
  credit?: string;
  decision: { title: string; body: string };
  /** Optional data-flow diagram, drawn as connected steps. */
  pipeline?: string[];
  results: string[];
  limits: string[];
  links: ProjectLink[];
  /** Shown instead of a code link when there is no public repository. */
  linkNote?: string;
  related?: { label: string; href: string; text: string };
  featured?: boolean;
}

const GITHUB = 'https://github.com/schoudhary90210';

export const projects: Project[] = [
  {
    slug: 'cadence',
    name: 'Cadence',
    category: 'Machine learning · Full-stack',
    context: 'Built at CheeseHacks 2026',
    event: 'CheeseHacks 2026',
    date: 'March 2026',
    team: 'Team project',
    role: 'Cloud deployment, full-stack integration',
    summary:
      'A speech-fluency practice app for people with speech impediments. Record or upload audio, review feedback on disfluencies, and practice over time.',
    stack: [
      'Next.js',
      'TypeScript',
      'FastAPI',
      'Whisper',
      'Wav2Vec2',
      'Random Forest',
      'Firestore',
      'Docker',
      'Google Cloud Run',
    ],
    problem:
      'Speech practice is most useful when feedback is specific and repeatable. Cadence gives people a place to record themselves, see where disfluencies happen on the audio timeline, and return to structured exercises and their session history instead of starting from scratch.',
    work: [
      'Browser recording and upload, practice exercises, learning flows and session history in a TypeScript/Next.js interface, with feedback tied to the audio timeline.',
      'An analysis path combining Whisper transcription with Wav2Vec2 embeddings and a classifier to identify disfluencies, plus Google Speech-to-Text as a second transcription input.',
      'A FastAPI backend with Firestore session storage and cloud storage for recordings.',
      'The backend packaged with Docker and deployed to Google Cloud Run.',
    ],
    credit:
      'Co-developed with a team. I deployed the Dockerized FastAPI backend to Google Cloud Run and connected the TypeScript/Next.js interface with Firestore session storage and audio-timeline feedback; teammates led backend signal processing, frontend/UI and accessibility.',
    decision: {
      title: 'Feedback tied to the audio, not just a score',
      body: 'Instead of returning a single fluency number, Cadence anchors feedback to the audio timeline so a user can see and replay the moment a disfluency happened. The interface also offers adjustable text, contrast and motion settings and full keyboard access, because the people most likely to use it should not have to fight the UI.',
    },
    results: [
      'A working record-to-feedback flow: Whisper transcription and Wav2Vec2-based classification, surfaced on the audio timeline.',
      'The FastAPI backend runs as a Docker container on Google Cloud Run with Firestore session storage.',
    ],
    limits: [
      'A practice and analysis prototype, not a clinically validated treatment tool.',
      'Detection flags likely disfluencies to practice on; it is not a diagnosis.',
    ],
    links: [{ label: 'See the code', href: `${GITHUB}/Cadence`, kind: 'code' }],
    featured: true,
  },
  {
    slug: 'traction',
    name: 'Traction',
    category: 'Edge AI · Computer vision',
    context: 'Built at the Qualcomm Edge AI Hackathon',
    event: 'Qualcomm Edge AI Hackathon',
    date: 'February 2026',
    team: 'Team project',
    role: 'Streamlit workflow, detection logs, local assistant',
    summary:
      'An offline crop-disease app that pairs on-device image classification with a field-oriented interface and a local language-model assistant.',
    stack: ['PyTorch', 'MobileNetV2', 'ONNX Runtime', 'Streamlit', 'Ollama', 'Python'],
    problem:
      'Farmers checking crops in the field often have unreliable connectivity, so a disease detector that depends on the cloud fails exactly where it is needed. Traction runs classification and its assistant on the device itself.',
    work: [
      'A MobileNetV2 crop-disease model trained in PyTorch and deployed through ONNX Runtime for local camera inference, taking it past notebook evaluation.',
      'A Streamlit workflow with live camera input, detection logs and latency and utilization readouts.',
      'A local Ollama assistant that analyzes recorded crop-disease observations, plus a map view of detections and persistent session records.',
      'Workflow changes driven by feedback from Wisconsin farmers.',
    ],
    credit:
      'Built with a team at the Qualcomm Edge AI Hackathon. My part: folding Wisconsin farmer feedback into the Streamlit workflow, and adding the detection logs and the local Ollama assistant.',
    decision: {
      title: 'Local by default',
      body: 'Every step a field visit depends on runs on the device: classification and the assistant need no cloud round-trip. Temporal smoothing across camera frames keeps a single noisy frame from flipping the result, and the app shows latency and utilization so the tradeoffs of the chosen hardware provider stay visible.',
    },
    results: [
      'MobileNetV2 inference runs locally through ONNX Runtime on live camera input, with no cloud round-trip.',
      'Feedback from Wisconsin farmers shaped the Streamlit workflow.',
    ],
    limits: [
      'The map uses a simulated tractor position rather than live GPS.',
      'Generated treatment suggestions are not validated agronomic advice.',
    ],
    links: [{ label: 'See the code', href: `${GITHUB}/traction`, kind: 'code' }],
    featured: true,
  },
  {
    slug: 'quant-backtest-engine',
    name: 'Quant Backtest Engine',
    category: 'Quantitative finance',
    context: 'Research tool',
    date: 'February 2026',
    team: 'Personal project',
    role: 'Design and implementation',
    summary:
      'A Python backtesting engine that compares portfolio strategies with transaction-cost modeling, walk-forward evaluation and tests that guard against look-ahead bias.',
    stack: ['Python', 'pandas', 'NumPy', 'pytest', 'Parquet'],
    problem:
      'A backtest that looks great is easy to produce and easy to be fooled by. I built this engine to see how sensitive an appealing result is to its assumptions (costs, risk, and whether a strategy holds up on data it was not tuned on) and to make that analysis reproducible.',
    work: [
      'Seven portfolio strategies compared across twelve assets behind reusable strategy interfaces.',
      'Transaction-cost modeling, with Parquet caching so market data is not refetched on every run.',
      'Walk-forward evaluation, so each strategy is judged on data it was not tuned on.',
      'pytest coverage for portfolio accounting, missing-data handling and look-ahead bias.',
    ],
    decision: {
      title: 'Testing for look-ahead bias',
      body: 'The easiest way to fool yourself with a backtest is to let it peek at the future. Alongside portfolio accounting and missing-data handling, the tests check that every historical decision uses only data available at that point. With walk-forward evaluation on top, an honest, less flattering result beats an impressive one that cannot be trusted.',
    },
    results: [
      'Seven strategies and twelve assets evaluated under one cost-aware framework.',
      'Walk-forward evaluation and look-ahead-bias tests built into the workflow.',
    ],
    limits: [
      'Results are historical simulations, not live trading performance.',
    ],
    links: [{ label: 'See the code', href: `${GITHUB}/Quant-Backtest-Engine`, kind: 'code' }],
    related: {
      label: 'Kelly-Quant-Optimizer',
      href: `${GITHUB}/Kelly-Quant-Optimizer`,
      text: 'A smaller, earlier experiment with Kelly-criterion position sizing, Ledoit–Wolf covariance shrinkage and Monte Carlo simulation.',
    },
  },
  {
    slug: 'custom-memalloc',
    name: 'Custom MemAlloc',
    category: 'Systems · C',
    context: 'Informed by CS 354',
    date: 'January 2026',
    team: 'Personal project',
    role: 'Design, implementation, benchmarking',
    summary:
      'A thread-safe memory allocator in C, built to understand what happens beneath malloc and free: segregated free lists, boundary tags and locking for concurrent access.',
    stack: ['C', 'pthreads', 'POSIX', 'mmap', 'ARM64'],
    problem:
      'Allocation calls are easy to take for granted. Writing an allocator brings every hidden decision into the open: how a request finds a block, how freed memory is reused instead of fragmenting, and what happens when several threads ask at once.',
    work: [
      'Segregated free lists that map each request to a size class, then find a fitting block or extend the heap with mmap.',
      'Boundary tags that record each block’s size and state so neighboring free blocks can be merged.',
      'Mutexes protecting shared allocator state for concurrent use across threads.',
      '16-byte alignment throughout, with ARM64 as the primary target.',
    ],
    decision: {
      title: 'Correctness before throughput',
      body: 'Debugging alignment problems, realloc corruption and deadlocks became as important as improving throughput. A fast allocator that occasionally corrupts memory is not useful, so the stress tests that exposed those bugs are part of the project.',
    },
    results: [
      'Benchmarked under an eight-thread stress test; the repository README documents the throughput and utilization results.',
    ],
    limits: [
      'Benchmark numbers depend on the machine, compiler flags and allocation-size mix; they are not a head-to-head comparison with the system malloc.',
    ],
    links: [{ label: 'See the code', href: `${GITHUB}/Custom-MemAlloc`, kind: 'code' }],
    featured: true,
  },
  {
    slug: 'trace-bond-pipeline',
    name: 'TRACE Bond Pipeline',
    category: 'Data engineering · Finance',
    context: '94.7M bond trades',
    date: '2026',
    team: 'Personal project',
    role: 'Design and implementation',
    summary:
      'A pipeline that turns 94.7 million TRACE corporate-bond trades (about 12.3 GB) into clean, partitioned Parquet for SQL analysis, without loading everything into memory.',
    stack: ['Python', 'SQL', 'DuckDB', 'PyArrow', 'Parquet'],
    problem:
      'The raw trade records were too large to load at once and too inconsistent to analyze directly. Before any analysis could happen, the data needed consistent formatting and a repeatable processing path.',
    work: [
      'Chunked ingestion that processes the raw extract in batches, keeping memory bounded.',
      'Python and SQL transformations that standardize bond identifiers, trade timestamps, prices and trade sizes.',
      'Validation steps that check the standardized output before it is stored.',
      'Partitioned Parquet output that DuckDB can query without scanning irrelevant partitions.',
    ],
    decision: {
      title: 'Store it for the questions you will ask',
      body: 'Columnar, partitioned Parquet lets DuckDB skip data a query does not touch, and chunked processing keeps memory bounded however large the extract grows. Together they make a 12 GB dataset workable on a single machine.',
    },
    pipeline: [
      'Raw TRACE extract',
      'Chunked batches',
      'Normalize',
      'Validate',
      'Partitioned Parquet',
      'DuckDB queries',
    ],
    results: ['94.7M trades (about 12.3 GB) processed into a queryable Parquet dataset.'],
    limits: ['TRACE data is licensed, so neither the source data nor the pipeline is public.'],
    links: [],
    linkNote: 'No public repository: the source data is licensed. Code walkthrough available on request.',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
