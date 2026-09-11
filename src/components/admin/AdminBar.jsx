import { useState } from 'react'
import { Plus, History, LogOut } from 'lucide-react'
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
      className="fixed bottom-0 left-0 right-0 z-[90] flex items-center justify-between px-6 py-2.5 text-white text-xs font-semibold shadow-lg"
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
      <div className="flex items-center gap-3">
        <button
          onClick={() => setNewPageOpen(true)}
          className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white rounded-full pl-2.5 pr-3.5 py-1.5 transition-colors"
        >
          <Plus size={14} strokeWidth={2.5} />
          New page
        </button>
        <button
          onClick={() => setHistoryOpen(true)}
          className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white rounded-full pl-2.5 pr-3.5 py-1.5 transition-colors"
        >
          <History size={14} strokeWidth={2.5} />
          History
        </button>
        <div className="w-px h-4 bg-white/25 mx-1" />
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
        >
          <LogOut size={14} strokeWidth={2.5} />
          Sign out
        </button>
      </div>
      {newPageOpen && <NewPageModal onClose={() => setNewPageOpen(false)} />}
      {historyOpen && <HistoryPanel onClose={() => setHistoryOpen(false)} />}
    </div>
  )
}
