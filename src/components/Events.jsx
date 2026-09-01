import { useEffect, useState } from 'react'

const FALLBACK_EVENTS = [
  {
    id: 'f1',
    date: { day: '—', month: '—' },
    title: 'Events loading…',
    location: '',
    desc: 'Check back soon for upcoming TiE Austin events.',
    url: null,
  },
]

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/events')
      .then((r) => {
        if (!r.ok) throw new Error('API error')
        return r.json()
      })
      .then((data) => {
        const upcoming = data.upcoming ?? data
        setEvents(upcoming.length ? upcoming.slice(0, 3) : FALLBACK_EVENTS)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const displayed = loading ? FALLBACK_EVENTS : error ? FALLBACK_EVENTS : events

  return (
    <section id="events" className="bg-gray-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-tie-red text-xs font-bold tracking-[0.3em] uppercase mb-3">What's Coming</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight leading-tight">
              Upcoming Events
            </h2>
          </div>
          <a
            href="/events"
            className="hidden sm:block text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors"
          >
            All events →
          </a>
        </div>

        <div className="space-y-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
          {displayed.map((e) => {
            const inner = (
              <div className="bg-white px-8 py-7 flex gap-8 items-start group hover:bg-gray-50 transition-colors">
                {/* Date */}
                <div className="shrink-0 text-center w-10">
                  <div className="text-2xl font-black text-gray-900 leading-none">{e.date.day}</div>
                  <div className="text-[11px] font-bold tracking-widest uppercase text-tie-red mt-0.5">{e.date.month}</div>
                </div>

                <div className="w-px self-stretch bg-gray-100 shrink-0" />

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-1 group-hover:text-tie-red transition-colors">
                    {e.title}
                  </h3>
                  {e.location && <p className="text-xs text-gray-400 mb-2">{e.location}</p>}
                  <p className="text-sm text-gray-500 leading-relaxed">{e.desc}</p>
                </div>

                {e.url && (
                  <div className="shrink-0 self-center text-gray-300 group-hover:text-tie-red transition-colors text-lg">→</div>
                )}
              </div>
            )

            return e.url ? (
              <a key={e.id} href={e.url} target="_blank" rel="noopener noreferrer" className="block">
                {inner}
              </a>
            ) : (
              <div key={e.id}>{inner}</div>
            )
          })}
        </div>

        <div className="sm:hidden text-center mt-8">
          <a
            href="https://backstage.zoho.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors"
          >
            View all events →
          </a>
        </div>
      </div>
    </section>
  )
}
