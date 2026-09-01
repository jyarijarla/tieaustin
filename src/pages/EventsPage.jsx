import { useEffect, useState, useMemo } from 'react'

const PAGE_SIZE = 10

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function EventCard({ e }) {
  const inner = (
    <div className="group bg-white border border-gray-200 rounded-xl p-5 flex gap-5 items-start hover:border-gray-300 hover:shadow-sm transition-all">
      {/* Date block */}
      <div className="shrink-0 flex flex-col items-center justify-center rounded-lg border border-gray-200 w-12 h-14 text-center bg-gray-50">
        <span className="text-lg font-black text-gray-900 leading-none tabular-nums">{e.date.day}</span>
        <span className="text-[9px] font-bold tracking-widest uppercase text-[#7D1426] mt-0.5">{e.date.month}</span>
        <span className="text-[8px] text-gray-400 mt-px">{e.date.year}</span>
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-[#7D1426] transition-colors mb-1">
          {e.title}
        </h3>
        {e.location && (
          <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
            <PinIcon />{e.location}
          </p>
        )}
        {e.desc && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{e.desc}</p>
        )}
      </div>

      {/* CTA */}
      {e.url && !e.isPast && (
        <div className="shrink-0 self-center">
          <span className="text-[11px] font-semibold text-[#7D1426] border border-[#7D1426]/40 rounded-full px-3 py-1.5 group-hover:bg-[#7D1426] group-hover:text-white group-hover:border-[#7D1426] transition-all whitespace-nowrap">
            Register
          </span>
        </div>
      )}
      {e.url && e.isPast && (
        <div className="shrink-0 self-center text-gray-300 group-hover:text-gray-500 transition-colors text-sm">
          →
        </div>
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

function Pagination({ page, total, onPage }) {
  const pages = Math.ceil(total / PAGE_SIZE)
  if (pages <= 1) return null

  const nums = []
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - page) <= 1) nums.push(i)
    else if (nums[nums.length - 1] !== '…') nums.push('…')
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        className="px-3 py-1.5 text-xs font-medium text-gray-500 rounded-lg border border-gray-200 hover:border-gray-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
      >
        ← Prev
      </button>
      {nums.map((n, i) =>
        n === '…' ? (
          <span key={`dots-${i}`} className="px-2 text-xs text-gray-400">…</span>
        ) : (
          <button
            key={n}
            onClick={() => onPage(n)}
            className={`w-8 h-8 text-xs font-medium rounded-lg border transition-colors ${
              page === n
                ? 'bg-[#7D1426] border-[#7D1426] text-white'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            {n}
          </button>
        )
      )}
      <button
        onClick={() => onPage(page + 1)}
        disabled={page === pages}
        className="px-3 py-1.5 text-xs font-medium text-gray-500 rounded-lg border border-gray-200 hover:border-gray-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
      >
        Next →
      </button>
    </div>
  )
}

export default function EventsPage() {
  const [upcoming, setUpcoming] = useState([])
  const [past, setPast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [filter, setFilter] = useState('upcoming')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('/api/events')
      .then((r) => { if (!r.ok) throw new Error(); return r.json() })
      .then((data) => {
        setUpcoming(data.upcoming ?? [])
        setPast(data.past ?? [])
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  const pool = filter === 'upcoming' ? upcoming : past

  const filtered = useMemo(() => {
    if (!query.trim()) return pool
    const q = query.toLowerCase()
    return pool.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.location?.toLowerCase().includes(q) ||
        e.desc?.toLowerCase().includes(q)
    )
  }, [pool, query])

  // Reset page when filter or search changes
  useEffect(() => { setPage(1) }, [filter, query])

  const pageEvents = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Page header */}
        <div className="mb-10">
          <p className="text-[#7D1426] text-[11px] font-bold tracking-[0.25em] uppercase mb-2">TiE Austin</p>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Events</h1>
          <p className="text-gray-500 text-sm mt-2">
            Networking, mentorship, pitch nights, and community gatherings.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search events…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-[#7D1426] transition-colors placeholder-gray-400"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex shrink-0 bg-white border border-gray-200 rounded-lg p-1 gap-1">
            {['upcoming', 'past'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors ${
                  filter === f
                    ? 'bg-[#7D1426] text-white'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {f}
                {!loading && (
                  <span className={`ml-1.5 text-[10px] ${filter === f ? 'text-white/70' : 'text-gray-400'}`}>
                    {f === 'upcoming' ? upcoming.length : past.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="text-center text-gray-400 text-sm py-20">Loading events…</div>
        )}

        {error && (
          <div className="text-center text-gray-400 text-sm py-20">
            Unable to load events.{' '}
            <a href="https://backstage.zoho.com" target="_blank" rel="noopener noreferrer" className="text-[#7D1426] hover:underline">
              Visit Backstage
            </a>{' '}to see what's coming up.
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Result count */}
            {query && (
              <p className="text-xs text-gray-400 mb-4">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{query}"
              </p>
            )}

            {/* Empty */}
            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400 text-sm">
                {query ? `No events match "${query}"` : filter === 'upcoming' ? 'No upcoming events right now — check back soon.' : 'No past events found.'}
              </div>
            )}

            {/* Event list */}
            {filtered.length > 0 && (
              <div className="space-y-3">
                {pageEvents.map((e) => <EventCard key={e.id} e={e} />)}
              </div>
            )}

            {/* Pagination */}
            <Pagination page={page} total={filtered.length} onPage={setPage} />
          </>
        )}
      </div>
    </div>
  )
}
