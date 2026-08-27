import { useEffect, useState } from 'react'

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/events')
      .then((r) => {
        if (!r.ok) throw new Error('API error')
        return r.json()
      })
      .then((data) => { setEvents(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return (
    <section className="bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-tie-red text-xs font-bold tracking-[0.3em] uppercase mb-4 text-center">
          What's Coming
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight text-center mb-14 leading-tight">
          Upcoming Events
        </h1>

        {loading && (
          <div className="text-center text-gray-400 text-sm py-16">Loading events…</div>
        )}

        {error && (
          <div className="text-center text-gray-400 text-sm py-16">
            Unable to load events right now. Check back soon or visit{' '}
            <a href="https://backstage.zoho.com" target="_blank" rel="noopener noreferrer" className="text-tie-red hover:underline">
              our Backstage page
            </a>.
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📅</p>
            <p className="text-gray-900 font-black uppercase tracking-tight text-lg mb-2">No Upcoming Events</p>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              Check back soon — TiE Austin events are added regularly. You can also follow us to get notified.
            </p>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="space-y-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
            {events.map((e) => {
              const inner = (
                <div className="bg-white px-8 py-7 flex gap-8 items-start group hover:bg-gray-50 transition-colors">
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
        )}
      </div>
    </section>
  )
}
