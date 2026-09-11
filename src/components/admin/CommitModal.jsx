import { useState, useEffect } from 'react'
import { useAdmin } from '../../contexts/AdminContext'
import { useContent } from '../../contexts/ContentContext'

export default function CommitModal() {
  const { login } = useAdmin()
  const { pendingCommit, confirmCommit, cancelCommit } = useContent()
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(pendingCommit?.defaultMessage || '')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setMessage(pendingCommit?.defaultMessage || '')
  }, [pendingCommit])

  if (!pendingCommit) return null

  async function handleSubmit(e) {
    e.preventDefault()
    if (!message.trim()) {
      setError('Enter a short description of this change.')
      return
    }
    setError('')
    setBusy(true)
    try {
      const freshToken = await login(password)
      await confirmCommit(message.trim(), freshToken)
    } catch (err) {
      setError(err.message === 'Invalid password' ? 'Incorrect password.' : (err.message || 'Failed to save changes.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#7D1426' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div>
            <p className="font-black text-gray-900 text-sm">Confirm & save</p>
            <p className="text-xs text-gray-400">{pendingCommit.description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Describe this change</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Update hero image"
              autoFocus
              className="w-full px-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-xl outline-none focus:border-[#7D1426] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Re-enter admin password</label>
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
              onClick={cancelCommit}
              className="flex-1 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy || !password || !message.trim()}
              className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors disabled:opacity-50"
              style={{ background: '#7D1426' }}
            >
              {busy ? 'Saving…' : 'Confirm & save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
