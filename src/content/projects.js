// Projects — things built and in progress.
// Add a real screenshot under /public/images/projects/ and update `image` when ready.
export const projects = [
  {
    name: 'SignalFeed',
    description:
      'A sentiment-driven Agent that feeds me information through a dashboard for mobile. Instead of charts and indicators, it tracks the signals that actually move stocks first — breaking news, government announcements, earnings calls, and SEC filings — scoring them in real time using AI. Covers 14+ semiconductor and AI stocks across the full supply chain (GPU, CPU, memory, equipment, energy/nuclear), with each stock getting a live sentiment score from 0–100. High-strength signals surface as ranked cards telling you exactly what moved, why it matters, and which stock it hits.',
    stack: ['React Native', 'AI', 'SEC EDGAR', 'Reuters', 'Reddit', 'Congress'],
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
    name: 'Bobby',
    description:
      'An intraday MNQ (Micro Nasdaq-100 futures) trading bot running on an Interactive Brokers paper account. Built around an Opening Range Breakout framework — each morning it defines the 9:30–10:00 AM range, then waits for a confirmed breakout with VWAP and EMA20 trend alignment. Entries use retest confirmation to filter fakeouts. Stops are ATR-adaptive, targets are set at 1× and 2× the range extension, and all positions flatten by 3:50 PM ET. Risk fixed at $100 per trade on a $10,000 account, with a $1,000 weekly loss limit as a circuit breaker.',
    stack: ['Python', 'IB TWS API', 'MNQ Futures', 'ORB Strategy', 'ATR', 'VWAP'],
    images: ['/images/projects/placeholder-2.svg'],
    demoUrl: '',
    repoUrl: '',
  },
  {
    name: 'Work in Progress',
    description: 'Something in the pipeline — details to follow.',
    stack: [],
    images: ['/images/projects/placeholder-3.svg'],
    demoUrl: '',
    repoUrl: '',
  },
]
