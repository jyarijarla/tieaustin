import { useState } from 'react'
import { useAdmin } from '../../contexts/AdminContext'
import { useContent } from '../../contexts/ContentContext'

function summarize(changes) {
  if (changes.length === 0) return ''
  if (changes.length === 1) return changes[0]
  return changes.join('; ')
}

export default function CommitModal() {
  const { login } = useAdmin()
  const { pendingChanges, publish, closePublish } = useContent()
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(() => summarize(pendingChanges))
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!message.trim()) {
      setError('Enter a short description of these changes.')
      return
    }
    setError('')
    setBusy(true)
    try {
      const freshToken = await login(password)
      await publish(message.trim(), freshToken)
    } catch (err) {
      setError(err.message === 'Invalid password' ? 'Incorrect password.' : (err.message || 'Failed to save changes.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#7D1426' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div>
            <p className="font-black text-gray-900 text-sm">Publish changes</p>
            <p className="text-xs text-gray-400">{pendingChanges.length} change{pendingChanges.length === 1 ? '' : 's'} from this session</p>
          </div>
        </div>

        <ul className="max-h-28 overflow-y-auto mb-5 space-y-1 text-xs text-gray-500 list-disc list-inside bg-gray-50 rounded-lg p-3">
          {pendingChanges.map((c, i) => <li key={i}>{c}</li>)}
        </ul>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Describe these changes</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus
              className="w-full px-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-xl outline-none focus:border-[#7D1426] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Admin password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-xl outline-none focus:border-[#7D1426] transition-colors"
            />
            {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
          </div>
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={closePublish}
              className="flex-1 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
            >
              Keep editing
            </button>
            <button
              type="submit"
              disabled={busy || !password || !message.trim()}
              className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors disabled:opacity-50"
              style={{ background: '#7D1426' }}
            >
              {busy ? 'Publishing…' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
