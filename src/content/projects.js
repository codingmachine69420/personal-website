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
//   P&L Tracker for Rideshare Drivers — advanced to Developing per Anson's
//     direct instruction (2026-08-13), same grey-row fix as Compersion and
//     Solace: the collapsed-row grey-out in PipelineTable.jsx is driven
//     purely by stageIndex === 0. Its description below still reads "Still
//     in early planning; nothing built yet" — that text hasn't been
//     updated to match, flagged here pending Anson's rewrite.
//   AI Newsletter — live automated agent that compiles and emails a daily
//     AI intelligence brief (retries the send before falling back to a
//     draft; skips weekends) -> Live, per Anson's direct instruction
//     (2026-08-15).
//   Daily Gap Ups — live automated agent that emails a pre-market gap
//     report every morning -> Live, per Anson's direct instruction
//     (2026-08-15).
// `pipelineSummary` is a one-line paraphrase of each project's own
// description for the pipeline row — not new information.
// All descriptions below are now first person, per Anson's direct
// instruction (2026-08-15) — SignalFeed, Algo Trading Bot, and Earnings
// Signal Agent were converted from third person on that date; pronoun/voice
// only, no content changes.
export const projects = [
  {
    name: 'SignalFeed',
    stageIndex: 3,
    pipelineSummary: 'Sentiment AI agent for semiconductor & AI stocks',
    description:
      'I built a sentiment-driven agent that feeds me information through a dashboard for mobile. Instead of charts and indicators, it tracks the signals that actually move stocks first — breaking news, government announcements, earnings calls, and SEC filings — scoring them in real time using AI. It covers 14+ semiconductor and AI stocks across the full supply chain (GPU, CPU, memory, equipment, energy/nuclear), with each stock getting a live sentiment score from 0–100. High-strength signals surface as ranked cards telling me exactly what moved, why it matters, and which stock it hits.',
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
      'I built a late-day momentum strategy on Nasdaq-100 futures (NQ/MNQ), backtested over ten years on QuantConnect. Right now it’s purely in testing — I don’t call a strategy real until it clears a fixed set of criteria, not just a good-looking equity curve.',
    // The bar a version has to clear before it's treated as a real edge
    // rather than a curve-fit result. Rendered as a compact list under
    // description — see PipelineTable.jsx. `why` is a short summary, not
    // a full explanation for every row.
    testingCriteria: {
      label: 'Testing Criteria:',
      items: [
        { criterion: 'T-statistic',       threshold: '≥ 2.0 (out-of-sample)', why: 'Below this, the result could plausibly be noise.' },
        { criterion: 'Trade count',       threshold: '≥ 30 (out-of-sample)',  why: 'Too few trades and variance swamps the signal.' },
        { criterion: 'Net return',        threshold: 'Positive after 2pt friction', why: 'A gross edge that dies to costs isn’t tradeable.' },
        { criterion: 'Year stability',    threshold: 'Consistent across all years', why: 'One strong year and two flat ones is luck, not a pattern.' },
        { criterion: 'Permutation test',  threshold: 'p < 0.05, where applicable', why: 'A shuffled target shouldn’t produce a similar result.' },
      ],
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
      "I'm currently building an LLM agent that reads through earnings reports and call transcripts to surface what usually gets buried in the wall of text — new customer wins, margin inflections, and forward-looking catalysts management flags but a quick skim would miss.",
    stack: [],
    images: ['/images/projects/placeholder-3.svg'],
    demoUrl: '',
    repoUrl: '',
  },
  {
    name: 'P&L Tracker for Rideshare Drivers — In Progress',
    stageIndex: 1,
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
    name: 'AI Newsletter',
    stageIndex: 3,
    pipelineSummary: 'Automated daily AI intelligence brief, delivered by email',
    description:
      "Every morning around 10am, I get an automated AI intelligence brief in my inbox. It rounds up the day's real developments across AI news, new research and benchmarks, a dedicated China AI section, and financial and earnings moves — plus a short read on social sentiment — built from primary sources rather than aggregators. It fact-checks itself before sending: dates get re-verified against the article, unconfirmed or stale claims get dropped and noted as such, and a section with nothing worth reporting just gets skipped rather than padded with filler.",
    stack: [],
    // Real screenshots of the actual email — swapped 2026-08-16 for a
    // newer, sharper pair (replaces the old single 'AI Newsleter.png').
    images: [
      '/images/projects/AI Newsletter NEW (1).png',
      '/images/projects/AI Newsletter NEW (2).png',
    ],
    demoUrl: '',
    repoUrl: '',
  },
  {
    name: 'Daily Gap Ups',
    stageIndex: 3,
    pipelineSummary: 'Automated pre-market gap report, delivered by email every morning',
    description:
      "Last summer, while I was working at Odysseus, my boss Joseph wanted a gap-up report every morning when the market opened — a list of stocks that had jumped overnight, so he could read overnight sentiment and see which clusters of stocks might move during the day. He pushed us to automate it instead of typing it out by hand each morning, but we couldn't get it working at the time. This summer, I finally built the same gap-up report he wanted, fully automated and delivered to my inbox every morning. It scans US-listed stocks that gapped at the open, ranks them by size of the move, and for each one reports market cap, sector, and whether the move extended, faded, or held in the first twenty minutes after the open — plus a same-day catalyst with a source link, or an honest \"no catalyst identified\" instead of a guess. It closes with a \"faders\" section calling out any stock that gapped one way and then reversed, since those are usually worth a second look. Prices come from Alpaca's free IEX feed, so it's directional, not exact.",
    stack: ['GitHub Actions', 'Alpaca API', 'Gmail API'],
    // Real screenshot of the actual email.
    images: ['/images/projects/Gap Ups.png'],
    demoUrl: '',
    repoUrl: '',
  },
]
