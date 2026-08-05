// Backing data for the resume/work history. Kept in sync with
// PakYinAnsonChan_August4th_Resume.pdf. Not rendered as a listed timeline
// anywhere on the site by design — the PDF is the single source for detailed
// role bullets; the site only surfaces employer names next to the resume CTA
// (see ProjectsExperiences.jsx). Don't reintroduce a bullet-point experience
// listing on-page without checking with Anson first.
export const resumeUrl = '/resume.pdf'

export const bio =
  "Finance student at UofT who's spent the last few years bouncing between big banks, boutique firms, and an accounting practice — picking up something different at each stop. I like markets, I like building things that make data easier to read, and I care a lot about doing the work properly. Based between Toronto and Hong Kong."

export const experience = [
  {
    role: 'FP&A – Performance Management Co-op',
    org: 'Royal Bank of Canada (RBC)',
    period: 'Jan 2026 – Apr 2026',
    location: 'Toronto',
    summary: 'Financial planning and analysis for the Auto and HEF business lines.',
    bullets: [
      'Built automated Excel financial models with dynamic controls to cut down manual reporting time',
      'Served as the primary financial support for the strategy team — built data visualizations for exec decks',
      'Assisted in constructing regression models pulling from multiple macro economic indicators',
      'Designed the early framework for a centralized Commercial Banking reporting system, consolidating data sources across the division',
    ],
  },
  {
    role: 'Investment Banking / Hedge Fund Intern',
    org: 'Odysseus Capital Asia Limited',
    period: 'May 2025 – Aug 2025',
    location: 'Hong Kong',
    summary: 'Generalist role across IB advisory and fund investment work.',
    bullets: [
      'Ran due diligence, fee structuring, and pre-acquisition valuation for an LP stake in a $2.5B USD fund',
      'Supported a Series C fundraise end-to-end — built the investor deck and presented materials directly to the CEO',
      'Screened 30+ pre-IPO stocks, hedge funds, and crypto funds to inform investment decisions',
    ],
  },
  {
    role: 'Accounting Practice Intern',
    org: 'Allay LLP',
    period: 'Jan 2025 – May 2025',
    location: 'Toronto',
    summary: 'Full-cycle accounting work across bookkeeping, tax, and compliance.',
    bullets: [
      'Managed end-to-end preparation and filing for 25+ T1 and T2 tax returns',
      'Handled bookkeeping, file management, and reconciliation in CaseWare',
    ],
  },
  {
    role: 'Assurance Intern',
    org: 'PricewaterhouseCoopers (PwC)',
    period: 'May 2024 – Jun 2024',
    location: 'Toronto',
    summary: 'Audit and financial statement testing across multiple client subsidiaries.',
    bullets: [
      'Audited and tested financial statements for 10+ subsidiaries with GAAP/IFRS compliance focus',
      'Identified $100K in financial discrepancies through reconciliation analysis',
      'Collaborated with senior staff on due diligence processes',
    ],
  },
]

export const education = [
  {
    school: 'University of Toronto',
    program: 'BBA Co-Op, Specialist in Finance',
    period: '2023 – 2027',
    notes: 'GPA 3.82 / 4.00 · Dean\'s List 2023–24 & 2024–25 · Leadership Fellows Program (LFP) · Capital Market Prep Program (CMPP)',
  },
]

export const leadership = [
  {
    role: 'VP of Finance',
    org: 'The Management Consulting Group (MCG)',
    period: 'Jun 2025 – Apr 2026',
    bullets: [
      'Oversee budgeting, financial planning, and internal tracking across all club initiatives',
      'Coordinating event planning and cross-functional execution with the broader team',
    ],
  },
  {
    role: 'Public Relations Director',
    org: 'UofT Hong Kong Student Club',
    period: 'Sep 2023 – Apr 2025',
    bullets: [
      'Secured 20+ sponsorship partnerships through direct digital outreach',
      'Led a team of 7 to execute cross-club cultural events with 150+ attendees',
    ],
  },
]

export const competitions = [
  'STRIVE Junior Tier Case Competition 2024 — Champion (200+ Ontario students)',
  'Rotman Commerce FinTech Summit 2025 — Finalist (in partnership with Sage Group PLC)',
  'UofT Investment Society M&A Case Competition — 3rd Place',
]
