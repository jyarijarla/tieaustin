const pillars = [
  {
    label: 'Education',
    sub: 'Build knowledge. Fuel your future.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
        <path d="M6 12v5c3 1.5 9 1.5 12 0v-5"/>
      </svg>
    ),
  },
  {
    label: 'Networking',
    sub: 'Connect with entrepreneurs, investors & experts.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
        <circle cx="12" cy="5" r="2"/>
        <circle cx="4.5" cy="18.5" r="2"/>
        <circle cx="19.5" cy="18.5" r="2"/>
        <path d="M12 7v3.5M12 10.5l-5.8 6.2M12 10.5l5.8 6.2"/>
      </svg>
    ),
  },
  {
    label: 'Mentorship',
    sub: 'Learn from experienced leaders.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
        <path d="M9 18h6"/>
        <path d="M12 2a7 7 0 0 1 7 7c0 2.6-1.4 4.9-3.5 6.2L15 18H9l-.5-2.8A7.02 7.02 0 0 1 5 9a7 7 0 0 1 7-7z"/>
      </svg>
    ),
  },
  {
    label: 'Investment',
    sub: 'Access capital. Accelerate your growth.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
        <path d="M3 20h18M5 20V14M9 20V10M13 20V7M17 20V3"/>
      </svg>
    ),
  },
  {
    label: 'Global Connections',
    sub: 'Leverage a worldwide community of opportunity.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.4 15.4 0 0 1 4 10 15.4 15.4 0 0 1-4 10 15.4 15.4 0 0 1-4-10 15.4 15.4 0 0 1 4-10z"/>
      </svg>
    ),
  },
]

export default function Pillars() {
  return (
    <section className="bg-tie-red px-6 py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {pillars.map((p) => (
          <div key={p.label} className="flex flex-col items-center text-center gap-3 last:col-span-2 sm:last:col-span-1">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{ border: '1.5px solid rgba(255,255,255,0.38)' }}>
              {p.icon}
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-white leading-tight mb-1">
                {p.label}
              </div>
              <div className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
                {p.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
