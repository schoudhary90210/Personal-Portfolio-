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
    role: 'Full-stack, ML integration, cloud deployment',
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
      'Browser recording and upload, waveform-based feedback, practice exercises, learning flows and session history in a Next.js and TypeScript front end.',
      'An analysis path combining Whisper transcription with a Wav2Vec2 and Random Forest classifier for disfluencies, plus Google Speech-to-Text as a second transcription input.',
      'A FastAPI backend with Firestore and cloud storage for sessions and recordings.',
      'Docker images deployed to Google Cloud Run.',
    ],
    credit:
      'Built with a team. I worked across the full-stack app, the machine-learning integration and the cloud deployment; teammates led backend signal processing, frontend/UI and accessibility.',
    decision: {
      title: 'Feedback tied to the audio, not just a score',
      body: 'Instead of returning a single fluency number, Cadence anchors feedback to the audio timeline so a user can see and replay the moment a disfluency happened. The interface also offers adjustable text, contrast and motion settings and full keyboard access, because the people most likely to use it should not have to fight the UI.',
    },
    results: [
      '97.9% F1 on the team’s disfluency-classification evaluation.',
      'Feedback from 15 student testers shaped the practice flow.',
    ],
    limits: [
      'A practice and analysis prototype, not a clinically validated treatment tool.',
      'A model metric on its own does not show improved speech outcomes.',
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
    summary:
      'An offline crop-disease app that pairs on-device image classification with a field-oriented interface and a local language-model assistant.',
    stack: ['PyTorch', 'ONNX Runtime', 'Streamlit', 'Ollama', 'Python'],
    problem:
      'Farmers checking crops in the field often have unreliable connectivity, so a disease detector that depends on the cloud fails exactly where it is needed. Traction runs classification and its assistant on the device itself.',
    work: [
      'An image classifier trained in PyTorch and exported to ONNX for local inference, with hardware-provider selection, taking the model past notebook evaluation.',
      'A Streamlit interface with live camera input, detection logs and latency and utilization readouts.',
      'A local assistant served through Ollama, a map view of detections and persistent session records.',
      'Workflow refinements based on feedback from Wisconsin farmers.',
    ],
    credit: 'Built with a team at the Qualcomm Edge AI Hackathon.',
    decision: {
      title: 'Local by default',
      body: 'Every step a field visit depends on runs on the device: classification and the assistant need no cloud round-trip. Temporal smoothing across camera frames keeps a single noisy frame from flipping the result, and the app shows latency and utilization so the tradeoffs of the chosen hardware provider stay visible.',
    },
    results: [
      'Classification and the assistant run fully on-device, with no cloud dependency for inference.',
      'Farmer feedback informed changes to the field workflow.',
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
    date: '2026',
    team: 'Personal project',
    role: 'Design and implementation',
    summary:
      'A Python research engine for comparing portfolio strategies with transaction costs, risk and out-of-sample validation built in.',
    stack: ['Python', 'NumPy', 'pandas'],
    problem:
      'A backtest that looks great is easy to produce and easy to be fooled by. I built this engine to see how sensitive an appealing result is to its assumptions (costs, risk, and whether a strategy holds up on data it was not tuned on) and to make that analysis reproducible.',
    work: [
      'A modular design that separates data, simulation, optimization, risk and reporting.',
      'Seven strategies compared across twelve assets, with transaction costs included.',
      'Walk-forward analysis and Monte Carlo simulation for out-of-sample testing, plus statistical checks on the differences between strategies.',
      'A test suite documented at 470 tests across 28 modules.',
    ],
    decision: {
      title: 'Letting the validation win',
      body: 'Under stricter out-of-sample testing, the best-looking strategy did not statistically dominate a simple equal-weight portfolio at 95% confidence. The engine reports that result plainly instead of tuning until it disappears, which is exactly the kind of finding it was built to surface.',
    },
    results: [
      'Seven strategies and twelve assets evaluated under one cost-aware framework.',
      '470 tests across 28 modules, as documented in the repository.',
    ],
    limits: [
      'Results are historical simulations, not live trading performance.',
      'No strategy statistically dominated equal-weight at 95% confidence.',
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
      'About 6.08M operations per second in an eight-thread stress test, as reported in the README.',
      'Over 85% memory utilization in the README benchmarks.',
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
