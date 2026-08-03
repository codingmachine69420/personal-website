const BASE = import.meta.env.BASE_URL

const SECTIONS = [
  {
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
    subtitle: 'Value Driven',
    description: 'Operating from a clear set of principles that don\'t bend under pressure.',
    essays: [
      {
        heading: 'Hard Mode Only',
        paragraphs: [
          'Say I went to the store and bought an eighty dollar game. I put it on easy mode and completed the campaign in five hours. I would have felt that it was eighty dollars wasted. If only I had put it on hard mode, spent more time on the game — the completion would have felt way more deserved. I see life the same way. If things are too easy, the level of satisfaction is low. We have to sacrifice for success, and that\'s when you feel like you truly deserve it.',
        ],
        photo: `${BASE}images/gallery/hong-kong-skyline.jpeg`,
        photoAlt: 'Hong Kong skyline — a city that earns it',
        imgRight: false,
      },
    ],
    placeholder: 'More on what drives my decisions — coming.',
  },
  {
    subtitle: 'Delusional Optimism',
    description: 'Betting on yourself even when the odds aren\'t obvious.',
    essays: [
      {
        heading: 'The Art of Being Unbothered',
        paragraphs: [
          'Whenever someone laughs at or criticises me — if it is something I have worked hard on and am confident in — I take their opinion, work on it in the background, but don\'t retaliate in front of them.',
          'Say if you love vanilla ice cream. You love it to death and there\'s nothing better in the world. Even if the entire world tells you that it\'s bad, you would just laugh in their face — because people\'s opinions don\'t matter for what they are. Same logic.',
        ],
        photo: `${BASE}images/gallery/santorini-sunset.jpeg`,
        photoAlt: 'Santorini sunset — golden hour, no worries',
        imgRight: true,
      },
    ],
  },
  {
    subtitle: 'Curiosity',
    description: 'The engine underneath everything. The reason we keep moving forward.',
    essays: [
      {
        heading: 'Stories from Strangers',
        paragraphs: [
          'I have seen first hand the benefits of being outspoken, extroverted, and curious. Whenever I travel, I seek out stories from people with different backgrounds, beliefs, and environments.',
          'I remember one time I was in Athens alone at 11am after visiting the Parthenon, and stumbled across this old coffee shop. As I sat down with a pint, I saw a well-dressed gentleman next to me smoking a cigar. I said hi to him and we basically had a chat about his childhood, his beliefs changing with his age, and a lot of weirdly specific and interesting things that I wouldn\'t have known had I decided to sit by myself.',
        ],
        photo: `${BASE}images/gallery/Parthenon in Athens.jpeg`,
        photoAlt: 'The Parthenon, Athens — where that conversation happened',
        imgRight: false,
      },
      {
        heading: 'The Chain',
        paragraphs: [
          'Curiosity is what makes the world move. It is what caused B.F. Skinner to develop pigeon-guided missiles in 1944, then turn that curiosity into his famous theory of operant conditioning — the idea that behaviour is shaped by its consequences. It is what made Richard Sutton and Andrew Barto take Skinner\'s ideas and formalize them into reinforcement learning: a framework that taught machines to learn from reward and punishment the same way Skinner\'s pigeons had. And it is what led Paul Christiano to take reinforcement learning and apply it to human feedback — RLHF — the technique that gave us the large language models we interact with today.',
          'And it is the same curiosity that made me start a website and write down these oddly boring stories, in the hope that one day it will be a documentation of my life and my beliefs.',
          'Curiosity is the strongest medicine we have. It is the reason we have advancements in our society. It is the reason we don\'t sit in caves, eating berries for breakfast, lunch, and dinner. It is the reason why ideologies and political views develop. It is human nature — one that we have to discover within ourselves.',
        ],
        photo: `${BASE}images/gallery/madrid-royal-palace.jpeg`,
        photoAlt: 'Royal Palace of Madrid — centuries of accumulated curiosity',
        imgRight: true,
      },
    ],
  },
]

function Essay({ essay, sectionIndex, essayIndex }) {
  const isRight = essay.imgRight

  return (
    <div style={{ marginBottom: 72 }}>
      <h3
        className="font-editorial"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--color-ink)', marginBottom: 28 }}
      >
        {essay.heading}
      </h3>

      <div style={{
        display: 'flex',
        flexDirection: isRight ? 'row' : 'row-reverse',
        gap: 'clamp(24px, 4vw, 56px)',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
        {/* Text */}
        <div style={{ flex: '1 1 300px' }}>
          {essay.paragraphs.map((p, i) => (
            <p key={i} style={{
              color: 'var(--color-body-light)',
              fontSize: '1.0625rem',
              lineHeight: 1.8,
              fontFamily: 'var(--font-reading)',
              marginBottom: i < essay.paragraphs.length - 1 ? 20 : 0,
            }}>
              {p}
            </p>
          ))}
        </div>

        {/* Photo */}
        <div style={{
          flex: '0 0 clamp(200px, 30vw, 340px)',
          height: 'clamp(240px, 35vw, 420px)',
          overflow: 'hidden',
          border: '1px solid rgba(28,28,28,0.1)',
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

export function Mindset() {
  return (
    <div>
      {/* ── Placeholder banner ── */}
      <div style={{ background: 'var(--color-ink)' }}>
        <div style={{
          height: 'clamp(200px, 28vw, 340px)',
          background: 'repeating-linear-gradient(45deg, #1a1a1a 0px, #1a1a1a 10px, #1c1c1c 10px, #1c1c1c 20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <p className="label-caps" style={{ color: 'rgba(255,255,255,0.15)' }}>Photo banner — coming</p>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(36px, 5vw, 64px) clamp(20px, 5vw, 48px)' }}>
          <div style={{ width: 44, height: 4, background: 'var(--color-accent)', marginBottom: 20 }} />
          <h1 className="font-editorial" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#fff', marginBottom: 16 }}>
            Mindset
          </h1>
          <p style={{ color: 'var(--color-body-dark)', fontSize: '1.125rem', lineHeight: 1.7, maxWidth: '52ch' }}>
            The ideas I keep coming back to. How I think about work, curiosity, and how to carry myself.
          </p>
        </div>
      </div>

      {/* ── Sections ── */}
      {SECTIONS.map((section, si) => (
        <div
          key={section.subtitle}
          style={{
            background: si % 2 === 0 ? 'var(--color-paper)' : '#fff',
            borderTop: '3px solid var(--color-accent)',
          }}
        >
          <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 48px) clamp(36px, 5vw, 64px)' }}>

            {/* Subtitle heading */}
            <div style={{ marginBottom: 48 }}>
              <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 12 }}>
                0{si + 1}
              </p>
              <h2
                className="font-editorial"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--color-ink)', marginBottom: 12 }}
              >
                {section.subtitle}
              </h2>
              <p style={{ color: 'var(--color-body-light)', fontSize: '1rem', maxWidth: '48ch', fontFamily: 'var(--font-reading)' }}>
                {section.description}
              </p>
            </div>

            {/* Essays */}
            {section.essays.map((essay, ei) => (
              <Essay key={essay.heading} essay={essay} sectionIndex={si} essayIndex={ei} />
            ))}

            {/* Placeholder if more content to come */}
            {section.placeholder && (
              <p className="label-caps" style={{ color: 'rgba(28,28,28,0.3)', marginTop: 8 }}>
                {section.placeholder}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
