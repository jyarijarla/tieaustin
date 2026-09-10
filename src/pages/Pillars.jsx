import { useContent } from '../contexts/ContentContext'
import EditWrapper from '../components/admin/EditWrapper'

const pillarIcons = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
    <circle cx="12" cy="5" r="2"/>
    <circle cx="5" cy="19" r="2"/>
    <circle cx="19" cy="19" r="2"/>
    <path d="M12 7v4M8.5 17.5l3-4.5M15.5 17.5l-3-4.5"/>
    <path d="M7 19h10"/>
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
    <path d="M6 12v5c3 1.5 9 1.5 12 0v-5"/>
  </svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
    <path d="M12 2a7 7 0 0 1 7 7c0 4-3 6-4 8H9c-1-2-4-4-4-8a7 7 0 0 1 7-7z"/>
    <path d="M9 17h6"/>
    <path d="M9 21h6"/>
  </svg>,
]

const altBgs = [
  { bgStyle: '#7D1426', icon: 'text-white',   num: 'text-white/20', light: false },
  { bgStyle: null,      icon: 'text-tie-red', num: 'text-gray-200', light: true  },
  { bgStyle: '#7D1426', icon: 'text-white',   num: 'text-white/20', light: false },
  { bgStyle: null,      icon: 'text-tie-red', num: 'text-gray-200', light: true  },
  { bgStyle: '#7D1426', icon: 'text-white',   num: 'text-white/20', light: false },
]

const fields = [
  {
    type: 'array',
    labelKey: 'label',
    fields: [
      { key: 'label',  label: 'Pillar Name',        type: 'text'     },
      { key: 'desc',   label: 'Short description',  type: 'textarea' },
      { key: 'detail', label: 'Long detail',         type: 'textarea' },
    ],
  },
]

export default function PillarsPage() {
  const { content } = useContent()
  const pillars = content.pillars

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
      <EditWrapper sectionKey="pillars" title="Pillars of TiE" fields={fields}>
        <div>
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
                  <div className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 shrink-0 sm:w-20 sm:pt-1">
                    <span className={`text-5xl font-black leading-none tabular-nums ${theme.num}`}>
                      {p.number}
                    </span>
                    <div className={theme.icon}>{pillarIcons[i]}</div>
                  </div>
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
      </EditWrapper>
    </div>
  )
}
