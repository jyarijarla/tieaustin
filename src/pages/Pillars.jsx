const pillars = [
  {
    number: '01',
    label: 'Mentoring',
    desc: 'Connect with seasoned entrepreneurs and Charter Members who have built and scaled ventures across industries.',
    detail: "TiE Austin's mentorship matches founders with the right guidance at every stage—from ideation to exit. Our mentors bring decades of real-world experience across technology, healthcare, finance, and consumer markets. Whether you're refining a pitch, navigating a fundraise, or scaling a team, TiE connects you with someone who has been there.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    number: '02',
    label: 'Networking',
    desc: 'Tap into a curated network of 15,000+ entrepreneurs, investors, and professionals across Austin and 61 global TiE chapters.',
    detail: "TiE Austin hosts regular mixers, dinners, and structured networking events designed to make meaningful connections—not just collect business cards. Relationships built here open doors to capital, partnerships, and lifelong community. Our global chapter network extends those relationships worldwide.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
        <circle cx="12" cy="5" r="2"/>
        <circle cx="5" cy="19" r="2"/>
        <circle cx="19" cy="19" r="2"/>
        <path d="M12 7v4M8.5 17.5l3-4.5M15.5 17.5l-3-4.5"/>
        <path d="M7 19h10"/>
      </svg>
    ),
  },
  {
    number: '03',
    label: 'Education',
    desc: 'Learn from world-class founders, operators, and investors through curated workshops, panel discussions, and TiE Institute programs.',
    detail: "From founder bootcamps to C-suite roundtables, TiE Austin's educational programming meets you where you are. Content is practitioner-led—real experience, real frameworks, real outcomes. Stay sharp with practical insights on fundraising, growth, product, and leadership.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
        <path d="M6 12v5c3 1.5 9 1.5 12 0v-5"/>
      </svg>
    ),
  },
  {
    number: '04',
    label: 'Investing',
    desc: 'Access a robust network of angel investors, venture capitalists, and family offices actively looking to back the next generation of founders.',
    detail: "TiE members gain warm introductions to investors who understand the entrepreneurial journey firsthand. Many of our Charter Members are active investors themselves, creating a uniquely aligned capital community. TiE Austin bridges the gap between great ideas and the capital to build them.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    number: '05',
    label: 'Incubating',
    desc: "Early-stage ventures get hands-on support through TiE Austin's incubation initiatives—structured programs that help founders validate ideas, build teams, and position their startups for sustainable growth.",
    detail: "Our incubation programming pairs cohorts of early-stage founders with mentors, resources, and a structured curriculum. Graduates emerge with clearer go-to-market strategies, investor-ready decks, and a lasting peer cohort.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
        <path d="M12 2a7 7 0 0 1 7 7c0 4-3 6-4 8H9c-1-2-4-4-4-8a7 7 0 0 1 7-7z"/>
        <path d="M9 17h6"/>
        <path d="M9 21h6"/>
      </svg>
    ),
  },
]

const altBgs = [
  { bgStyle: '#7D1426', icon: 'text-white',   num: 'text-white/20', light: false },
  { bgStyle: null,      icon: 'text-tie-red', num: 'text-gray-200', light: true  },
  { bgStyle: '#7D1426', icon: 'text-white',   num: 'text-white/20', light: false },
  { bgStyle: null,      icon: 'text-tie-red', num: 'text-gray-200', light: true  },
  { bgStyle: '#7D1426', icon: 'text-white',   num: 'text-white/20', light: false },
]

export default function PillarsPage() {
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-tie-red text-xs font-bold tracking-[0.3em] uppercase mb-4">
            What We Stand For
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 700,
              color: '#111',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            The Five Pillars of TiE
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed mt-4">
            Since 1992, TiE has operated on five founding pillars that define how we serve entrepreneurs at every stage of their journey.
          </p>
        </div>
      </div>

      {/* Pillars — alternating backgrounds */}
      {pillars.map((p, i) => {
        const theme = altBgs[i]
        const dark = !theme.light

        return (
          <div
            key={p.label}
            className="px-6 py-16"
            style={{ background: theme.bgStyle ?? '#ffffff' }}
          >
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-8 sm:gap-14 items-start">
              {/* Number + icon */}
              <div className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 shrink-0 sm:w-20 sm:pt-1">
                <span className={`text-5xl font-black leading-none tabular-nums ${theme.num}`}>
                  {p.number}
                </span>
                <div className={theme.icon}>{p.icon}</div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className={`text-[11px] font-black tracking-[0.25em] uppercase mb-3 ${dark ? 'text-white/60' : 'text-tie-red'}`}>
                  {p.label}
                </h2>
                <p className={`text-xl font-semibold leading-snug mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
                  {p.desc}
                </p>
                <p className={`text-sm leading-relaxed ${dark ? 'text-white/70' : 'text-gray-500'}`}>
                  {p.detail}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
