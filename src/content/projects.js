// Projects — things built and in progress.
// Add a real screenshot under /public/images/projects/ and update `image` when ready.
export const projects = [
  {
    name: 'SignalFeed',
    description:
      'A sentiment-driven Agent that feeds me information through a dashboard for mobile. Instead of charts and indicators, it tracks the signals that actually move stocks first — breaking news, government announcements, earnings calls, and SEC filings — scoring them in real time using AI. Covers 14+ semiconductor and AI stocks across the full supply chain (GPU, CPU, memory, equipment, energy/nuclear), with each stock getting a live sentiment score from 0–100. High-strength signals surface as ranked cards telling you exactly what moved, why it matters, and which stock it hits.',
    stack: ['Python', 'React Native', 'AI', 'SEC EDGAR', 'Reuters', 'Reddit', 'Congress'],
    layout: 'side',
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
    status: 'Still in development — backtested on historical data only, not yet traded live.',
    description:
      'A late-day momentum strategy on Nasdaq-100 futures (NQ/MNQ), backtested over ten years on QuantConnect LEAN. At 2:45 PM ET it measures the day\'s move from the session open in ATR units — taking only moves between 0.25× and 1.20× daily ATR, ignoring days too quiet to signal anything and days already too extended to chase. Direction must be confirmed by the price sitting on the correct side of VWAP, and a distance filter rejects entries hugging VWAP too closely, since forensics on an earlier version showed those trades were coin flips. Positions are held to 3:58 PM with only a catastrophic 0.50 ATR backstop; an earlier VWAP-recross exit was tested and falsified. FOMC days are skipped outright and contract-roll days are guarded against. Built as a research instrument rather than a black box: every skipped day is counted by reason and reconciled against total decision days, and the short side was put on a pre-registered accept/reject test — t-stat above 1.5, positive P&L in 60% of calendar years, no more than 5 points of added drawdown — written down before the backtest was run.',
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
    status: 'In progress — idea stage, description is a draft for Anson to refine.',
    description:
      'A profit-and-loss tracker built for taxi and rideshare (Uber/Lyft-style) drivers. Most driver-facing apps only show gross fares — this would pull trip income together with the real costs of driving (fuel, maintenance, insurance, platform commissions) to show actual per-hour and per-mile profitability, plus a running mileage log for tax purposes. Still in early planning; nothing built yet.',
    stack: [],
    images: ['/images/projects/placeholder-1.svg'],
    demoUrl: '',
    repoUrl: '',
  },
]
