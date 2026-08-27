const pillars = [
  {
    label: 'Mentoring',
    desc: 'Connect with seasoned entrepreneurs and Charter Members who have built and scaled ventures across industries. TiE Austin\'s mentorship matches founders with the right guidance at every stage—from ideation to exit.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Networking',
    desc: 'Tap into a curated network of 15,000+ entrepreneurs, investors, and professionals across Austin and 61 global TiE chapters. Relationships built here open doors to capital, partnerships, and lifelong community.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" aria-hidden="true">
        <circle cx="12" cy="5" r="2"/>
        <circle cx="5" cy="19" r="2"/>
        <circle cx="19" cy="19" r="2"/>
        <path d="M12 7v4M8.5 17.5l3-4.5M15.5 17.5l-3-4.5"/>
        <path d="M7 19h10"/>
      </svg>
    ),
  },
  {
    label: 'Education',
    desc: 'Learn from world-class founders, operators, and investors through curated workshops, panel discussions, and TiE Institute programs. Stay sharp with practical insights on fundraising, growth, product, and leadership.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
        <path d="M6 12v5c3 1.5 9 1.5 12 0v-5"/>
      </svg>
    ),
  },
  {
    label: 'Investing',
    desc: 'Access a robust network of angel investors, venture capitalists, and family offices actively looking to back the next generation of founders. TiE Austin bridges the gap between great ideas and the capital to build them.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Incubating',
    desc: 'Early-stage ventures get hands-on support through TiE Austin\'s incubation initiatives—structured programs that help founders validate ideas, build teams, and position their startups for sustainable growth and investment.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" aria-hidden="true">
        <path d="M12 2a7 7 0 0 1 7 7c0 4-3 6-4 8H9c-1-2-4-4-4-8a7 7 0 0 1 7-7z"/>
        <path d="M9 17h6"/>
        <path d="M9 21h6"/>
      </svg>
    ),
  },
]

export default function WhyJoin() {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-tie-red text-xs font-bold tracking-[0.3em] uppercase mb-4 text-center">
          The Five Pillars of TiE
        </p>
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 700,
            color: '#111',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          }}
        >
          Why Join TiE Austin
        </h2>
        <p className="text-gray-500 text-base max-w-xl mx-auto text-center leading-relaxed mb-14">
          TiE is built on five pillars that connect, grow, and sustain the entrepreneurial community in Central Texas and beyond.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.label}
              className={`bg-white rounded-2xl p-8 border border-gray-100 flex flex-col gap-4 ${
                i === 3 ? 'lg:col-start-1' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-tie-red/8 flex items-center justify-center text-tie-red shrink-0">
                {p.icon}
              </div>
              <div>
                <p className="text-[11px] font-black tracking-[0.22em] uppercase text-tie-red mb-2">
                  {p.label}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
