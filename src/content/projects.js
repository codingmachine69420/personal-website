// Projects — things built and in progress.
// Add a real screenshot under /public/images/projects/ and update `image` when ready.
//
// `stageIndex` places each project on the Projects & Experiences pipeline
// (see PipelineTable.jsx): 0 Idea Generation, 1 Developing, 2 Testing,
// 3 Live. Set from what's actually written below, not guessed:
//   SignalFeed — no in-progress flag anywhere, described as a working live
//     agent+dashboard -> Live.
//   Algo Trading Bot — status explicitly says "backtested... not yet traded
//     live" -> Testing (backtesting IS a form of testing) but not Live.
//   Earnings Signal Agent — status says "early development, not yet
//     functional end-to-end" -> Developing.
//   Compersion and Solace — a demo/prototype exists (see imagesAreDemo on
//     its entry) even though the real site isn't built -> Developing, not
//     Idea Generation. Its `status` text below still says "nothing built
//     yet" — that's about the real site, not the demo; left as-is pending
//     Anson's rewrite of this entry's copy (flagged inline below).
//   P&L Tracker, AI News Dashboard — nothing built, idea stage only ->
//     Idea Generation.
// `pipelineSummary` is a one-line paraphrase of each project's own
// description for the pipeline row — not new information.
export const projects = [
  {
    name: 'SignalFeed',
    stageIndex: 3,
    pipelineSummary: 'Sentiment AI agent for semiconductor & AI stocks',
    description:
      'A sentiment-driven Agent that feeds me information through a dashboard for mobile. Instead of charts and indicators, it tracks the signals that actually move stocks first — breaking news, government announcements, earnings calls, and SEC filings — scoring them in real time using AI. Covers 14+ semiconductor and AI stocks across the full supply chain (GPU, CPU, memory, equipment, energy/nuclear), with each stock getting a live sentiment score from 0–100. High-strength signals surface as ranked cards telling you exactly what moved, why it matters, and which stock it hits.',
    stack: ['Python', 'React Native', 'AI', 'SEC EDGAR', 'Reuters', 'Reddit', 'Congress'],
    images: [
      '/images/projects/Sentiment Dashboard  (1).png',
      '/images/projects/Sentiment Dashboard  (2).png',
      '/images/projects/Sentiment Dashboard  (3).png',
    ],
    demoUrl: '',
    repoUrl: '',
  },
  {
    name: 'Algo Trading Bot',
    stageIndex: 2,
    pipelineSummary: 'Late-day momentum strategy on Nasdaq futures',
    status: 'Still in development — backtested on historical data only, not yet traded live.',
    description:
      'A late-day momentum strategy on Nasdaq-100 futures (NQ/MNQ), backtested over ten years on QuantConnect.',
    // Rendered as its own labeled paragraph under `description` — see
    // PipelineTable.jsx. Replaces the older, longer writeup (exit rules,
    // FOMC handling, pre-registered accept/reject test) per Anson's edit;
    // that fuller version is meant to live in the PDF `detailsPdf` will
    // eventually point to, not here.
    strategyNote: {
      label: 'Current Strategy:',
      text: "At 2:45 PM ET it measures the day's move from the session open in ATR units — taking only moves between 0.25× and 1.20× daily ATR, ignoring days too quiet to signal anything and days already too extended to chase. Direction must be confirmed by the price sitting on the correct side of VWAP, and a distance filter rejects entries hugging VWAP too closely, since forensics on an earlier version showed those trades were coin flips.",
    },
    // No file yet — Anson plans a PDF walking through different bot
    // versions. Renders as a visible-but-disabled "coming soon" button
    // (PipelineTable.jsx) until this is a real URL.
    detailsPdf: null,
    stack: ['Python', 'QuantConnect LEAN', 'NQ / MNQ Futures', 'VWAP', 'ATR', 'Backtesting'],
    images: [
      '/images/projects/Trading Bot  (1).png',
      '/images/projects/Trading Bot  (2).png',
      '/images/projects/Trading Bot  (3).png',
      '/images/projects/Trading Bot  (4).png',
    ],
    demoUrl: '',
    repoUrl: '',
  },
  {
    name: 'Earnings Signal Agent — In Progress',
    stageIndex: 1,
    pipelineSummary: 'LLM agent for earnings calls & filings',
    status: 'In progress — early development, not yet functional end-to-end.',
    description:
      'An LLM agent, currently in development, that reads through earnings reports and call transcripts to surface what usually gets buried in the wall of text — new customer wins, margin inflections, and forward-looking catalysts management flags but a quick skim would miss.',
    stack: [],
    images: ['/images/projects/placeholder-3.svg'],
    demoUrl: '',
    repoUrl: '',
  },
  {
    name: 'P&L Tracker for Rideshare Drivers — In Progress',
    stageIndex: 0,
    pipelineSummary: 'Profitability tracker for rideshare drivers',
    description:
      "I wanted a way for rideshare drivers to easily track their income, instead of counting receipts or adding up invoices. Most driver-facing apps only show gross fares — I want this to pull trip income together with the real costs of driving (fuel, maintenance, insurance, platform commissions) to show actual per-hour and per-mile profitability, plus a running mileage log for tax purposes. Still in early planning; nothing built yet.",
    stack: [],
    images: ['/images/projects/placeholder-1.svg'],
    demoUrl: '',
    repoUrl: '',
  },
  {
    // Claude-drafted description from Anson's spoken notes, not his own
    // written words — flagged per CLAUDE.md content rules, same treatment
    // as the P&L Tracker above. Anson should rewrite this in his own voice
    // before treating it as real copy anywhere else on the site.
    name: 'Compersion and Solace',
    stageIndex: 1,
    pipelineSummary: "Mental health support site, focused on men's wellbeing",
    status: 'Idea stage — hobby project, nothing built yet.',
    description:
      "I believe mental health — men's and women's both — deserves more attention than it currently gets, which is why I want to build this as a hobby project: a mental health support website modeled loosely on how Reframe supports people cutting back on drinking, but aimed at emotional support through both happiness and heartbreak, with a particular focus on men's mental health.",
    stack: [],
    // These 4 screenshots are from a standalone demo/prototype Anson built,
    // not the real site (status above is still accurate: idea stage, nothing
    // built at compersionandsolace's actual domain yet). imagesAreDemo drives
    // the "Demo" badge Carousel renders over these — see PipelineTable.jsx.
    images: [
      '/images/projects/Compersion and Solace (1).png',
      '/images/projects/Compersion and Solace (2).png',
      '/images/projects/Compersion and Solace (3).png',
      '/images/projects/Compersion and Solace (4).png',
    ],
    imagesAreDemo: true,
    demoUrl: '',
    repoUrl: '',
  },
  {
    name: 'AI News Dashboard',
    stageIndex: 0,
    pipelineSummary: 'Personal dashboard for the newest AI news',
    status: 'Idea stage — personal use only for now.',
    description:
      "I want a dashboard that feeds me the newest AI news in one place — for now just for my own use, but with a possible future path to a public newsletter built on top of it.",
    stack: [],
    images: ['/images/projects/placeholder-4.svg'],
    demoUrl: '',
    repoUrl: '',
  },
]
