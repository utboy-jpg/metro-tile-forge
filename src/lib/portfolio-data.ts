export const links = {
  github: "https://github.com/UtkarshJoshiNtl",
  githubUser: "UtkarshJoshiNtl",
  linkedin: "https://linkedin.com/in/utkarsh-joshi",
  email: "joshiutkarshntl@gmail.com",
  codeforces: "https://codeforces.com/profile/BakedRajma",
  codeforcesHandle: "BakedRajma",
  resume: "/resume.pdf",
};

export const timeline = [
  { year: "2025", text: "entered college" },
  { year: "2026", text: "contributing to open source" },
];

export const techStack = [
  "C",
  "C++",
  "CUDA",
  "Python",
  "OpenGL",
  "NumPy",
  "PyGame",
  "POSIX",
  "Bash",
  "Linux",
  "OpenMP",
  "Git",
];

export const astrosisCycle = [
  "Astrosis — Orbital Mechanics Engine",
  "507× batch propagation speedup (C++ vs Python)",
  "83× conjunction detection speedup (CUDA vs Python)",
  "RK4 + J2/J3/J4 harmonics + atmospheric drag",
];

export const projectsCycle = ["cjit", "Quip", "CuFloda", "OwlEchoSense", "LANParty"];
export const roadmapCycle = ["May → October 2026", "7-phase technical plan"];
export const hobbyCycle = ["3D Art", "Music"];
export const aboutCycle = ["First-year CS undergraduate", "Building from first principles"];

// Small project tiles in Work section
export const smallProjects = [
  {
    key: "cjit",
    name: "cjit",
    tags: ["C", "VCS"],
    accent: "bg-tile",
  },
  {
    key: "quip",
    name: "Quip",
    tags: ["C", "POSIX"],
    accent: "bg-tile-alt",
  },
  {
    key: "cufloda",
    name: "CuFloda",
    tags: ["Python", "LBM"],
    accent: "bg-tile",
  },
] as const;

export const benchmarks = [
  ["Operation", "Python", "C++", "CUDA"],
  ["Single propagation (50k steps)", "395ms", "21.9ms (18×)", "—"],
  ["Batch (1k sats × 24h)", "7034ms", "13.9ms (507×)", "46.9ms (150×)"],
  ["Conjunction (400×400 pairs)", "46718ms", "5159ms (9×)", "564ms (83×)"],
];

export const astrosisHighlights = [
  "SoA memory layout for 100% cache utilisation vs 17% for AoS",
  "alignas(64) StateVector to eliminate false sharing between OpenMP threads",
  "Brent's method for TCA refinement to sub-second accuracy",
  "Chan's method probability of collision",
  "Validated: energy conservation < 1e-7 relative drift over 24h, RK4 4th-order convergence verified",
];

export const projects = [
  {
    name: "cjit",
    tech: ["C", "Content-Addressed Storage", "Version Control"],
    description:
      "Version control system implemented in C. Uses content-addressed storage for integrity and deduplication. Supports branch creation, checkout, and commit operations without external dependencies. Honest systems code — no wrappers, no shortcuts.",
    github: "https://github.com/UtkarshJoshiNtl/cjit",
  },
  {
    name: "Quip",
    tech: ["C", "Terminal Raw Mode", "Job Control", "Signal Handling", "POSIX"],
    description:
      "Fully-featured Unix shell in C99. Supports command pipelines, I/O redirection, background job management, signal handling (SIGINT, SIGTERM, SIGCHLD), command history with arrow key navigation, tab completion, and ANSI-colored prompts. Implemented raw terminal mode from scratch using termios.",
    github: "https://github.com/UtkarshJoshiNtl/quip",
  },
  {
    name: "CuFloda",
    tech: ["Python", "NumPy", "PyGame", "CUDA (planned)", "Lattice Boltzmann Method"],
    description:
      "Fluid dynamics simulation using the D2Q9 Lattice Boltzmann Method. CPU prototype with real-time PyGame visualization, complex boundary conditions (inflow, outflow, walls, obstacles), and interactive obstacle drawing. CUDA acceleration planned as the next phase.",
    github: "https://github.com/UtkarshJoshiNtl/CuFloda",
  },
  {
    name: "OwlEchoSense",
    tech: ["ESP32", "AODV Mesh", "BirdNET ML", "LoRa"],
    description:
      "Field ecology monitoring system for bird species identification. ESP32 microcontrollers with AODV mesh networking for decentralized communication, BirdNET machine learning for species identification, and LoRa for long-range data transmission in areas without connectivity.",
    github: "https://github.com/UtkarshJoshiNtl/OwlEchoSense",
  },
  {
    name: "LANParty",
    tech: ["Flutter", "WebSocket", "Dart", "Real-time Multiplayer"],
    description:
      "Cross-platform LAN gaming application. Real-time multiplayer using WebSocket communication with automatic game discovery and lobby management. Supports chess, ludo, and monopoly with no internet dependency.",
    github: "https://github.com/UtkarshJoshiNtl/LANParty",
  },
];

export const roadmapRules = [
  {
    title: "No new directions",
    body: "Everything stays inside systems · simulation · visualization · GPU · C++/Python",
  },
  {
    title: "Projects must be readable",
    body: "A reviewer spends 90 seconds on a repo. Make it count.",
  },
  {
    title: "Consistency beats intensity",
    body: "5-6 hours daily beats one heroic week followed by nothing",
  },
  {
    title: "One rest day per week",
    body: "Non-optional. This is what keeps the plan sustainable.",
  },
];

export const dailyStructure = [
  { hours: "3h", title: "Core build", body: "Main project work: Astrosis, CuFloda, or active OSS contribution" },
  { hours: "1.5h", title: "Structured learning", body: "OpenGL / CUDA / C++ via specific resources, not random tutorials" },
  { hours: "1.5h", title: "Codeforces", body: "2 contests/week minimum, upsolve everything" },
  { hours: "After Aug", title: "Drop to 4-5h total", body: "Protect build time first" },
];

export const phases = [
  {
    n: "Phase 1",
    when: "May 16 – May 31",
    title: "GitHub cleanup",
    body: "Make existing repos readable. Architecture diagrams, terminal GIFs, issue trackers, roadmap sections for each repo. Linux tooling: gdb, tmux, Makefiles.",
    tags: ["readable GitHub", "diagrams on 2+ repos", "issue trackers active", "shell comfort"],
  },
  {
    n: "Phase 2",
    when: "Jun 1 – Jun 20",
    title: "OpenGL foundations",
    body: "Learn rendering pipeline, shaders, VAOs/VBOs, transformation matrices, camera movement. Build a particle/starfield renderer. Wire it into Astrosis so orbital bodies are visible dots.",
    tags: ["working renderer", "Astrosis has visuals", "shader literacy"],
  },
  {
    n: "Phase 3",
    when: "Jun 21 – Jun 30",
    title: "CUDA entry + C++ deepening",
    body: "First CUDA kernel: vector addition with verified correctness. Host/device memory model. Modern C++: RAII, smart pointers, move semantics, STL.",
    tags: ["CUDA kernel working", "host/device model understood", "cleaner C++"],
  },
  {
    n: "Phase 4",
    when: "Jul 1 – Jul 31",
    title: "Project depth + OSS entry",
    body: "Astrosis gets orbital rendering with real data, camera controls, trajectory trails, time scaling, and a README GIF. CuFloda gets a CUDA lattice update kernel with CPU vs GPU benchmark numbers. First OSS PR to a real project — docs, test, or build fix only.",
    tags: ["Astrosis GIF", "CuFloda CUDA kernel", "benchmark numbers", "first OSS PR"],
  },
  {
    n: "Phase 5",
    when: "Aug 1 – Aug 31",
    title: "External credibility",
    body: "Hours drop to 4-5/day. Astrosis polish: UI overlays, profiling notes, clean install instructions. Second OSS contribution. Apply to Outreachy December cohort.",
    tags: ["polished README", "2 OSS PRs", "benchmarks visible", "Outreachy applied"],
  },
  {
    n: "Phase 6",
    when: "Sep 1 – Sep 30",
    title: "Depth, not breadth",
    body: "CUDA deeper: shared memory, memory coalescing, kernel profiling with Nsight. Flamegraph experience. Data-oriented design basics. Third OSS contribution in same ecosystem.",
    tags: ["faster kernel with proof", "flamegraph experience", "3+ OSS contributions"],
  },
  {
    n: "Phase 7",
    when: "Oct 1 – Oct 31",
    title: "Hacktoberfest + writing",
    body: "4 meaningful OSS contributions (no typo fixes). Publish one technical post about something actually learned — not a tutorial. Dev.to or GitHub Pages.",
    tags: ["5+ OSS contributions", "1 published post", "Astrosis with GIF + benchmarks", "stable CF routine"],
  },
];
