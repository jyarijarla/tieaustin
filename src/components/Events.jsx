import { useEffect, useState } from 'react'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/events')
      .then((r) => {
        if (!r.ok) throw new Error('API error')
        return r.json()
      })
      .then((data) => setEvents((data.upcoming ?? data).slice(0, 3)))
      // a failed load reads the same as an empty schedule to visitors
      .catch(() => setEvents([]))
      .finally(() => setLoaded(true))
  }, [])

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

        {/* nothing renders until loaded, so visitors never see a loading state */}
        {loaded && (
        <div className="space-y-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          {events.length === 0 && (
            <div className="bg-white px-8 py-12 text-center">
              <p className="text-sm font-bold text-gray-900">No upcoming events scheduled yet</p>
              <p className="text-sm text-gray-500 mt-1.5">
                New events are added regularly.{' '}
                <a href="/events" className="font-semibold text-tie-red hover:underline">Browse past events</a>
                {' '}to see what we do.
              </p>
            </div>
          )}

          {events.map((e) => {
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
        )}

        <div className="sm:hidden text-center mt-8">
          <a
            href="/events"
            className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors"
          >
            View all events →
          </a>
        </div>
      </div>
    </section>
  )
}
