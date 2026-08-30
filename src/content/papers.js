// Research Papers — its own main page (promoted out of Interests on
// 2026-08-30, per Anson's direct instruction; previously lived in
// content/interests.js as the second article on the /interests hub).
//
// Each entry: { title, link, abstract, cover }.
//   - link: URL to the paper (arXiv, journal, PDF, etc.) — or a local path
//     under /public if the paper has no canonical external URL yet;
//     ResearchPapers.jsx tells the two apart and prefixes local paths
//     with BASE_URL automatically.
//   - abstract: the paper's own abstract, verbatim from Anson.
//   - cover: path under /public/images/papers/ to a cover image — the
//     PDF's own title page, rendered to PNG (browser-side, via pdf.js) and
//     saved alongside the PDF — or null if no cover exists yet, same
//     convention as cinema's poster: null. ResearchPapers.jsx makes the
//     cover a link to the PDF itself, same href as the "Read the Full
//     Paper" button.
export const papers = {
  list: [
    {
      title: 'Timing the Market: A Skewed Perspective',
      // Local PDF (no canonical external URL) — see /public/images/papers.
      link: '/images/papers/Timing the Market -  A Skewed Perspective.pdf',
      abstract: `"Time in the market beats timing the market" is among the most widely repeated maxims in investing, yet the investors who popularised it are almost all American and describe the American market. This paper asks whether the claim travels. Using MSCI country indices for six developed markets over 2000–2025, it measures how much an investor's final wealth depended on when their money entered, through two tests: the dispersion of outcomes across ten thousand randomly-timed passive investors, and the performance of two mechanical timing rules (a dip buyer and a hype chaser) against dollar-cost averaging.

Both tests point to the same variable. Entry timing mattered far less than commonly assumed, and where it did matter it tracked a market's drift rather than its volatility: the US and Japan, with near-identical volatility, showed markedly different sensitivity to entry date. For deliberate timing the pattern reverses across markets — waiting for a 20% drawdown beat staying invested in Japan, the UK and Germany, but lost heavily in the high-drift US, where the dip buyer finished below all ten thousand randomly-timed investors. The correlation between a market's return and the penalty for timing it is strongly negative at −0.82. The mechanism is that time spent out of a rising market is a cost that scales with drift; the proverb is therefore best read not as a universal law but as a description of the exceptional US market that produced it.`,
      cover: '/images/papers/Timing the Market - A Skewed Perspective (cover).png',
    },
  ],
}
