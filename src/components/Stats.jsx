import { useContent } from '../contexts/ContentContext'
import EditWrapper from './admin/EditWrapper'

const icons = [
  <svg key="globe" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.4 15.4 0 0 1 4 10 15.4 15.4 0 0 1-4 10 15.4 15.4 0 0 1-4-10 15.4 15.4 0 0 1 4-10z"/>
  </svg>,
  <svg key="users" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
  <svg key="members" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" aria-hidden="true">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3z"/>
    <path d="M8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3z"/>
    <path d="M12 14c-3.86 0-7 1.79-7 4v1h14v-1c0-2.21-3.14-4-7-4z"/>
    <path d="M20 17c0-2.21-2.24-4-5-4"/>
    <path d="M4 17c0-2.21 2.24-4 5-4"/>
  </svg>,
  <svg key="pin" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>,
]

const fields = [
  {
    type: 'array',
    labelKey: 'label',
    fields: [
      { key: 'value', label: 'Value (e.g. 10,000+)', type: 'text' },
      { key: 'label', label: 'Label (e.g. Startups)',  type: 'text' },
    ],
  },
]

export default function Stats() {
  const { content } = useContent()
  const stats = content.stats

  return (
    <EditWrapper sectionKey="stats" title="Statistics" fields={fields}>
      <section className="py-12 px-6" style={{ background: '#7D1426' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-3">
              <div className="opacity-80">{icons[i]}</div>
              <div>
                <div className="text-white font-black text-3xl sm:text-4xl leading-none tracking-tight mb-1">
                  {s.value}
                </div>
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/60">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </EditWrapper>
  )
}
