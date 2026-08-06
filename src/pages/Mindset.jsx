import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CollageBanner } from '../components/CollageBanner'

const BASE = import.meta.env.BASE_URL

// Real gallery photos, picked and hand-positioned (not cropped blind) so the
// actual subject stays visible in a mosaic tile. "Graduation!" gets the
// biggest top-row slot — the milestone photo, thematically on point for a
// page about how I think and what shapes me.
const collageTop = [
  { src: '/images/gallery/Hike in BC.jpeg', alt: 'Balancing on the rocks, Hike in BC', pos: 'center 72%', grow: 1.2 },
  { src: '/images/gallery/Beautiful hike in Victoria, BC.jpeg', alt: 'Hiking above Victoria, BC', pos: 'center 35%', grow: 1 },
]
const collageBottom = [
  { src: '/images/gallery/Middle School In Hong Kong (~2019).jpeg', alt: 'Middle school in Hong Kong', pos: 'center 62%', grow: 0.9 },
  { src: '/images/gallery/Prague during Christmas.jpeg', alt: 'Prague at Christmas', pos: 'center 48%', grow: 1 },
  { src: '/images/gallery/Athens.jpeg', alt: 'Athens at dusk', pos: 'center 62%', grow: 0.9 },
]

const SECTIONS = [
  // ── Row 1 ──────────────────────────────────────────────────────────────────
  {
    id: 'high-agency',
    subtitle: 'High Agency',
    description: 'Taking ownership of who you are and actively choosing to become it.',
    essays: [
      {
        heading: 'Unfamiliar on Purpose',
        paragraphs: [
          'I grew up as an introvert. I felt out of place when there were a large number of people in a room. I always felt that I had to please every person in the room, so I would be too scared to talk to anyone.',
          'Working at RBC as a winter intern opened my eyes to the world of being an extrovert. I was forced to make small talk with managers and directors every single day — and normally I would have had my lunch hour or after-work commute to wind down. But no, I had friends come along every step of the way. Slowly but surely, this mentality of talking to everyone, everywhere, all at once, every single day bled into my other activities. After work I went to the gym, and it was during this period where I met many of my gym friends. Having chats between sets made the gym feel like a hangout instead of an obligation.',
        ],
        photo: `${BASE}images/gallery/hiking-hong-kong.jpeg`,
        photoAlt: 'Hiking trail in Hong Kong — discomfort chosen on purpose',
        imgRight: true,
      },
    ],
  },
  {
    id: 'value-driven',
    subtitle: 'Value Driven',
    description: "Operating from a clear set of principles that don't bend under pressure.",
    essays: [
      {
        heading: 'Hard Mode Only',
        paragraphs: [
          "Say I went to the store and bought an eighty dollar game. I put it on easy mode and completed the campaign in five hours. I would have felt that it was eighty dollars wasted. If only I had put it on hard mode, spent more time on the game — the completion would have felt way more deserved. I see life the same way. If things are too easy, the level of satisfaction is low. We have to sacrifice for success, and that's when you feel like you truly deserve it.",
        ],
        photo: `${BASE}images/gallery/hong-kong-skyline.jpeg`,
        photoAlt: 'Hong Kong skyline — a city that earns it',
        imgRight: false,
      },
    ],
    placeholder: 'More on what drives my decisions — coming.',
  },
  {
    id: 'delusional-optimism',
    subtitle: 'Delusional Optimism',
    description: "Betting on yourself even when the odds aren't obvious.",
    essays: [
      {
        heading: 'The Art of Being Unbothered',
        paragraphs: [
          'Whenever someone laughs at or criticises me — if it is something I have worked hard on and am confident in — I take their opinion, work on it in the background, but don\'t retaliate in front of them.',
          "Say if you love vanilla ice cream. You love it to death and there's nothing better in the world. Even if the entire world tells you that it's bad, you would just laugh in their face — because people's opinions don't matter for what they are. Same logic.",
        ],
        photo: `${BASE}images/gallery/santorini-sunset.jpeg`,
        photoAlt: 'Santorini sunset — golden hour, no worries',
        imgRight: true,
      },
    ],
  },
  {
    id: 'curiosity',
    subtitle: 'Curiosity',
    description: 'The engine underneath everything. The reason we keep moving forward.',
    essays: [
      {
        heading: 'Stories from Strangers',
        paragraphs: [
          'I have seen first hand the benefits of being outspoken, extroverted, and curious. Whenever I travel, I seek out stories from people with different backgrounds, beliefs, and environments.',
          "I remember one time I was in Athens alone at 11am after visiting the Parthenon, and stumbled across this old coffee shop. As I sat down with a pint, I saw a well-dressed gentleman next to me smoking a cigar. I said hi to him and we basically had a chat about his childhood, his beliefs changing with his age, and a lot of weirdly specific and interesting things that I wouldn't have known had I decided to sit by myself.",
        ],
        photo: `${BASE}images/gallery/Parthenon in Athens.jpeg`,
        photoAlt: 'The Parthenon, Athens — where that conversation happened',
        imgRight: false,
      },
      {
        heading: 'The Chain',
        paragraphs: [
          "Curiosity is what makes the world move. It is what caused B.F. Skinner to develop pigeon-guided missiles in 1944, then turn that curiosity into his famous theory of operant conditioning — the idea that behaviour is shaped by its consequences. It is what made Richard Sutton and Andrew Barto take Skinner's ideas and formalize them into reinforcement learning: a framework that taught machines to learn from reward and punishment the same way Skinner's pigeons had. And it is what led Paul Christiano to take reinforcement learning and apply it to human feedback — RLHF — the technique that gave us the large language models we interact with today.",
          'And it is the same curiosity that made me start a website and write down these oddly boring stories, in the hope that one day it will be a documentation of my life and my beliefs.',
          "Curiosity is the strongest medicine we have. It is the reason we have advancements in our society. It is the reason we don't sit in caves, eating berries for breakfast, lunch, and dinner. It is the reason why ideologies and political views develop. It is human nature — one that we have to discover within ourselves.",
        ],
        photo: `${BASE}images/gallery/madrid-royal-palace.jpeg`,
        photoAlt: 'Royal Palace of Madrid — centuries of accumulated curiosity',
        imgRight: true,
      },
    ],
  },

  // ── Row 2 — placeholders ───────────────────────────────────────────────────
  {
    id: 'placeholder-5',
    subtitle: 'Coming Soon',
    description: 'More to follow.',
    isPlaceholder: true,
    essays: [],
  },
  {
    id: 'placeholder-6',
    subtitle: 'Coming Soon',
    description: 'More to follow.',
    isPlaceholder: true,
    essays: [],
  },
  {
    id: 'placeholder-7',
    subtitle: 'Coming Soon',
    description: 'More to follow.',
    isPlaceholder: true,
    essays: [],
  },
  {
    id: 'placeholder-8',
    subtitle: 'Coming Soon',
    description: 'More to follow.',
    isPlaceholder: true,
    essays: [],
  },
]

const ROW_SIZE = 4

function chunk(arr, size) {
  const rows = []
  for (let i = 0; i < arr.length; i += size) rows.push(arr.slice(i, i + size))
  return rows
}

function SectionCard({ section, isActive, dimmed, onClick }) {
  const coverPhoto = section.essays[0]?.photo

  return (
    <button
      onClick={section.isPlaceholder ? undefined : onClick}
      disabled={section.isPlaceholder}
      aria-expanded={section.isPlaceholder ? undefined : isActive}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-ink)',
        border: 'none',
        cursor: section.isPlaceholder ? 'default' : 'pointer',
        textAlign: 'left',
        padding: 0,
        width: '100%',
        opacity: dimmed ? 0.35 : 1,
        outline: isActive ? '3px solid var(--color-accent)' : '3px solid transparent',
        outlineOffset: -3,
        transition: 'opacity 0.3s, outline 0.15s',
        position: 'relative',
      }}
    >
      {/* Cover photo */}
      <div style={{ height: 200, overflow: 'hidden', background: '#111', flexShrink: 0 }}>
        {coverPhoto ? (
          <img
            src={coverPhoto}
            alt=""
            aria-hidden="true"
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              filter: isActive ? 'brightness(1)' : 'brightness(0.75)',
              transition: 'filter 0.25s',
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'repeating-linear-gradient(45deg, #1a1a1a 0, #1a1a1a 10px, #1c1c1c 10px, #1c1c1c 20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="label-caps" style={{ color: 'rgba(255,255,255,0.12)', fontSize: '0.7rem' }}>
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div style={{ padding: '20px 20px 26px', flex: 1 }}>
        <h2
          className="font-editorial"
          style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', color: '#fff', marginBottom: 10 }}
        >
          {section.subtitle}
        </h2>
        <p style={{
          color: 'var(--color-body-dark)', fontSize: '0.875rem',
          lineHeight: 1.6, fontFamily: 'var(--font-reading)',
        }}>
          {section.description}
        </p>
        {!section.isPlaceholder && (
          <p className="label-caps" style={{
            color: isActive ? 'var(--color-accent)' : 'rgba(217,162,27,0.5)',
            fontSize: '0.7rem', marginTop: 18,
            transition: 'color 0.2s',
          }}>
            {isActive ? 'Collapse ↑' : 'Read →'}
          </p>
        )}
      </div>
    </button>
  )
}

function Essay({ essay, essayIndex }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <h3 className="font-editorial" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#fff', marginBottom: 24 }}>
        {essay.heading}
      </h3>
      <div style={{
        display: 'flex',
        flexDirection: essay.imgRight ? 'row' : 'row-reverse',
        gap: 'clamp(24px, 4vw, 48px)',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: '1 1 280px' }}>
          {essay.paragraphs.map((p, i) => (
            <p key={i} style={{
              color: 'var(--color-body-dark)',
              fontSize: '1.0625rem',
              lineHeight: 1.8,
              fontFamily: 'var(--font-reading)',
              marginBottom: i < essay.paragraphs.length - 1 ? 20 : 0,
            }}>
              {p}
            </p>
          ))}
        </div>
        <div style={{
          flex: '0 0 clamp(180px, 26vw, 300px)',
          height: 'clamp(200px, 30vw, 360px)',
          overflow: 'hidden',
          alignSelf: essayIndex % 2 === 0 ? 'flex-start' : 'flex-end',
        }}>
          <img
            src={essay.photo}
            alt={essay.photoAlt}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>
    </div>
  )
}

function ExpandedPanel({ section, onClose }) {
  return (
    <motion.div
      key={section.id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      style={{ overflow: 'hidden', background: 'var(--color-ink)', borderTop: '3px solid var(--color-accent)' }}
    >
      <div style={{
        maxWidth: 900, margin: '0 auto',
        padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 48px) clamp(48px, 6vw, 80px)',
      }}>
        {/* Panel header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 52, gap: 24 }}>
          <div>
            <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 10 }}>
              {section.subtitle}
            </p>
            <p style={{ color: 'var(--color-body-dark)', fontSize: '1rem', fontFamily: 'var(--font-reading)', maxWidth: '52ch' }}>
              {section.description}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="panel-close"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.8)',
              cursor: 'pointer',
              padding: '10px 20px',
              minHeight: 44,
              minWidth: 88,
              fontFamily: 'var(--font-meta)',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕ Close
          </button>
        </div>

        {section.essays.map((essay, i) => (
          <Essay key={essay.heading} essay={essay} essayIndex={i} />
        ))}

        {section.placeholder && (
          <p className="label-caps" style={{ color: 'rgba(255,255,255,0.25)', marginTop: 8 }}>
            {section.placeholder}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export function Mindset() {
  const [activeId, setActiveId] = useState(null)
  const rows = chunk(SECTIONS, ROW_SIZE)

  const toggle = (id) => setActiveId((prev) => (prev === id ? null : id))

  return (
    <div>
      {/* ── Photo collage banner ── */}
      <div style={{ background: 'var(--color-ink)' }}>
        <CollageBanner title="Mindset" topPhotos={collageTop} bottomPhotos={collageBottom} />

        <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(36px, 5vw, 64px) clamp(20px, 5vw, 48px)' }}>
          <div style={{ width: 44, height: 4, background: 'var(--color-accent)', marginBottom: 20 }} />
          <p style={{ color: 'var(--color-body-dark)', fontSize: '1.125rem', fontFamily: 'var(--font-meta)', fontWeight: 500 }}>
            How I think
          </p>
          <p style={{ color: 'var(--color-body-dark)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '52ch', fontFamily: 'var(--font-reading)', marginTop: 10 }}>
            The values and philosophy that shape who I am.
          </p>
        </div>
      </div>

      {/* ── Card grid ── */}
      <div style={{ background: '#000' }}>
        {rows.map((row, rowIndex) => {
          const activeSection = row.find((s) => s.id === activeId)
          return (
            <div key={rowIndex}>
              {/* Row of 4 cards */}
              <div style={{
                borderTop: rowIndex === 0 ? '3px solid var(--color-accent)' : 'none',
                padding: 'clamp(20px, 3vw, 36px) clamp(16px, 3vw, 36px)',
              }}>
                <div
                  className="grid grid-cols-2 md:grid-cols-4"
                  style={{ gap: 'clamp(14px, 2vw, 26px)' }}
                >
                  {row.map((section) => (
                    <SectionCard
                      key={section.id}
                      section={section}
                      isActive={section.id === activeId}
                      dimmed={!!activeSection && section.id !== activeId}
                      onClick={() => toggle(section.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Expanded panel — only for the row that contains the active card */}
              <AnimatePresence>
                {activeSection && (
                  <ExpandedPanel
                    section={activeSection}
                    onClose={() => setActiveId(null)}
                  />
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
