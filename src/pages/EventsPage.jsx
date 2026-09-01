import { useEffect, useState } from 'react'

function CalBadge({ date, past }) {
  return (
    <div
      className="shrink-0 flex flex-col items-center justify-center rounded-xl w-14 h-14 text-center"
      style={{ background: past ? '#f3f4f6' : '#7D1426' }}
    >
      <span
        className="text-xl font-black leading-none tabular-nums"
        style={{ color: past ? '#6b7280' : '#fff' }}
      >
        {date.day}
      </span>
      <span
        className="text-[10px] font-bold tracking-widest uppercase mt-0.5"
        style={{ color: past ? '#9ca3af' : 'rgba(255,255,255,0.75)' }}
      >
        {date.month}
      </span>
      <span
        className="text-[9px] font-semibold"
        style={{ color: past ? '#d1d5db' : 'rgba(255,255,255,0.5)' }}
      >
        {date.year}
      </span>
    </div>
  )
}

function UpcomingCard({ e }) {
  const inner = (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4 h-full group">
      <div className="flex items-start gap-4">
        <CalBadge date={e.date} past={false} />
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight leading-snug group-hover:text-[#7D1426] transition-colors">
            {e.title}
          </h3>
          {e.location && (
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {e.location}
            </p>
          )}
        </div>
      </div>
      {e.desc && (
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">{e.desc}</p>
      )}
      {e.url && (
        <span
          className="self-start text-[11px] font-black tracking-widest uppercase px-4 py-2 rounded-full text-white transition-colors"
          style={{ background: '#7D1426' }}
        >
          Register →
        </span>
      )}
    </div>
  )

  return e.url ? (
    <a href={e.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      {inner}
    </a>
  ) : (
    <div className="h-full">{inner}</div>
  )
}

function PastRow({ e }) {
  const inner = (
    <div className="flex gap-4 items-start py-4 px-5 rounded-xl hover:bg-gray-50 transition-colors group">
      <CalBadge date={e.date} past={true} />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-gray-700 leading-snug group-hover:text-gray-900 transition-colors truncate">
          {e.title}
        </h3>
        {e.location && (
          <p className="text-xs text-gray-400 mt-0.5 truncate">{e.location}</p>
        )}
        {e.desc && (
          <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">{e.desc}</p>
        )}
      </div>
      {e.url && (
        <span className="shrink-0 self-center text-gray-300 group-hover:text-[#7D1426] transition-colors text-base">→</span>
      )}
    </div>
  )

  return e.url ? (
    <a href={e.url} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  )
}

export default function EventsPage() {
  const [upcoming, setUpcoming] = useState([])
  const [past, setPast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/events')
      .then((r) => {
        if (!r.ok) throw new Error('API error')
        return r.json()
      })
      .then((data) => {
        setUpcoming(data.upcoming ?? [])
        setPast(data.past ?? [])
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero header */}
      <div className="py-20 px-6 text-center" style={{ background: '#7D1426' }}>
        <p className="text-white/60 text-xs font-bold tracking-[0.3em] uppercase mb-3">
          TiE Austin
        </p>
        <h1
          className="text-white font-black uppercase tracking-tight leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
        >
          Events
        </h1>
        <p className="text-white/60 text-sm mt-3 max-w-md mx-auto leading-relaxed">
          Networking, mentorship, pitch nights, and more — find your next TiE Austin experience.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-16">

        {loading && (
          <div className="text-center text-gray-400 text-sm py-16">Loading events…</div>
        )}

        {error && (
          <div className="text-center text-gray-400 text-sm py-16">
            Unable to load events right now. Check back soon or visit{' '}
            <a href="https://backstage.zoho.com" target="_blank" rel="noopener noreferrer" className="text-[#7D1426] hover:underline">
              our Backstage page
            </a>.
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Upcoming */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xs font-black tracking-[0.25em] uppercase text-[#7D1426]">Upcoming Events</h2>
                <div className="flex-1 h-px bg-gray-200" />
                {upcoming.length > 0 && (
                  <span className="text-xs text-gray-400">{upcoming.length} event{upcoming.length !== 1 ? 's' : ''}</span>
                )}
              </div>

              {upcoming.length === 0 ? (
                <div className="text-center py-12 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-400 text-sm">No upcoming events right now — check back soon.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-5">
                  {upcoming.map((e) => <UpcomingCard key={e.id} e={e} />)}
                </div>
              )}
            </div>

            {/* Past */}
            {past.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-xs font-black tracking-[0.25em] uppercase text-gray-400">Past Events</h2>
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">{past.length} events</span>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
                  {past.map((e) => <PastRow key={e.id} e={e} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
