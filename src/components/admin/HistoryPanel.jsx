import { useEffect, useState } from 'react'
import { useAdmin } from '../../contexts/AdminContext'
import { useContent } from '../../contexts/ContentContext'
import { useUI } from '../../contexts/UIContext'

function timeAgo(ts) {
  const diff = Math.max(0, Date.now() - ts)
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function HistoryPanel({ onClose }) {
  const { token } = useAdmin()
  const { rollback, pendingChanges } = useContent()
  const { confirm, notify } = useUI()
  const [entries, setEntries] = useState(null)
  const [error, setError] = useState('')
  const [restoring, setRestoring] = useState(false)

  useEffect(() => {
    fetch('/api/admin-history', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then(setEntries)
      .catch(() => setError('Failed to load history.'))
  }, [token])

  async function handleRestore(entry) {
    const warning = pendingChanges.length > 0
      ? ` This replaces your ${pendingChanges.length} unpublished change${pendingChanges.length === 1 ? '' : 's'} in this session.`
      : ''
    const ok = await confirm({
      title: 'Load this version?',
      message: `Load "${entry.message}" (${timeAgo(entry.timestamp)}) into your draft?${warning} You'll still need to publish to make it live.`,
      confirmLabel: 'Load',
      tone: 'default',
    })
    if (!ok) return
    setRestoring(true)
    try {
      await rollback(entry.id, entry.message)
      onClose()
    } catch (e) {
      notify(e.message || 'Failed to load that version. Please try again.')
    } finally {
      setRestoring(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col max-h-full">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <p className="font-black text-gray-900 text-sm">Change history</p>
            <p className="text-xs text-gray-400 mt-0.5">Loads into your draft — publish afterward to make it live</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-2">
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!entries && !error && <p className="text-sm text-gray-400">Loading…</p>}
          {entries && entries.length === 0 && <p className="text-sm text-gray-400">No saved changes yet.</p>}
          {entries?.map((entry, i) => (
            <div key={entry.id} className="flex items-center justify-between gap-3 px-4 py-3 border border-gray-100 rounded-xl">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{entry.message}</p>
                <p className="text-xs text-gray-400">{timeAgo(entry.timestamp)}</p>
              </div>
              {i === 0 ? (
                <span className="text-[11px] font-semibold text-gray-400 shrink-0">Current</span>
              ) : (
                <button
                  onClick={() => handleRestore(entry)}
                  disabled={restoring}
                  className="text-xs font-semibold shrink-0 hover:underline disabled:opacity-50"
                  style={{ color: '#7D1426' }}
                >
                  Restore
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
