import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContent } from '../contexts/ContentContext'
import { useAdmin } from '../contexts/AdminContext'
import SectionRenderer from '../components/dynamic/SectionRenderer'
import SectionModal from '../components/admin/SectionModal'
import PageSettingsModal from '../components/admin/PageSettingsModal'

function PlusDivider({ onClick }) {
  return (
    <div className="relative flex items-center justify-center h-10 group/plus">
      <div className="absolute left-0 right-0 h-px bg-gray-100" />
      <button
        onClick={onClick}
        title="Add section"
        className="relative z-10 w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-white hover:bg-[#7D1426] hover:border-[#7D1426] flex items-center justify-center transition-colors shadow-sm opacity-0 group-hover/plus:opacity-100 focus:opacity-100"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>
  )
}

export default function DynamicPage() {
  const { slug } = useParams()
  const { content, deleteSection } = useContent()
  const { isAdmin } = useAdmin()
  const [addAt, setAddAt] = useState(null)
  const [editingSection, setEditingSection] = useState(null)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const page = content.pages?.find((p) => p.slug === slug)

  if (!page) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="text-2xl font-black text-gray-900">Page not found</p>
      </div>
    )
  }

  function handleDelete(section) {
    if (!window.confirm('Remove this section?')) return
    deleteSection(page.id, section.id)
  }

  return (
    <div className="pb-16">
      <div className="max-w-3xl mx-auto px-6 pt-14 pb-2 flex items-center justify-between gap-4">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{page.title}</h1>
        {isAdmin && (
          <button
            onClick={() => setSettingsOpen(true)}
            className="shrink-0 text-xs font-semibold text-gray-400 hover:text-[#7D1426] border border-gray-200 hover:border-[#7D1426]/40 rounded-full px-3 py-1.5 transition-colors"
          >
            Page settings
          </button>
        )}
      </div>

      {isAdmin && <PlusDivider onClick={() => setAddAt(0)} />}

      {page.sections.map((section, i) => (
        <div key={section.id}>
          <div className="relative group/section">
            <SectionRenderer section={section} />
            {isAdmin && (
              <div className="absolute top-2 right-4 z-30 flex gap-2 opacity-0 group-hover/section:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditingSection(section)}
                  className="bg-white border border-gray-200 shadow-md text-gray-600 hover:text-[#7D1426] hover:border-[#7D1426]/40 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(section)}
                  className="bg-white border border-gray-200 shadow-md text-gray-600 hover:text-red-600 hover:border-red-200 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          {isAdmin && <PlusDivider onClick={() => setAddAt(i + 1)} />}
        </div>
      ))}

      {page.sections.length === 0 && (
        <p className="max-w-2xl mx-auto px-6 py-16 text-center text-sm text-gray-400">
          {isAdmin ? 'No sections yet — use the + button above to add one.' : 'Nothing here yet.'}
        </p>
      )}

      {addAt !== null && (
        <SectionModal mode="add" page={page} index={addAt} onClose={() => setAddAt(null)} />
      )}
      {editingSection && (
        <SectionModal mode="edit" page={page} section={editingSection} onClose={() => setEditingSection(null)} />
      )}
      {settingsOpen && (
        <PageSettingsModal page={page} onClose={() => setSettingsOpen(false)} />
      )}
    </div>
  )
}
