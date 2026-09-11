import { useState } from 'react'
import { useAdmin } from '../../contexts/AdminContext'
import { useContent } from '../../contexts/ContentContext'
import NewPageModal from './NewPageModal'
import HistoryPanel from './HistoryPanel'

export default function AdminBar() {
  const { logout } = useAdmin()
  const { saving } = useContent()
  const [newPageOpen, setNewPageOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] flex items-center justify-between px-6 py-3 text-white text-xs font-semibold shadow-lg"
      style={{ background: '#7D1426' }}
    >
      <div className="flex items-center gap-2">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        <span>Admin Mode</span>
        {saving && <span className="text-white/60 ml-2">Saving…</span>}
      </div>
      <div className="flex items-center gap-5">
        <button onClick={() => setNewPageOpen(true)} className="text-white/70 hover:text-white transition-colors">
          New page
        </button>
        <button onClick={() => setHistoryOpen(true)} className="text-white/70 hover:text-white transition-colors">
          History
        </button>
        <button onClick={logout} className="text-white/70 hover:text-white transition-colors">
          Sign out
        </button>
      </div>
      {newPageOpen && <NewPageModal onClose={() => setNewPageOpen(false)} />}
      {historyOpen && <HistoryPanel onClose={() => setHistoryOpen(false)} />}
    </div>
  )
}
