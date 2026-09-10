import { useState } from 'react'
import { useAdmin } from '../../contexts/AdminContext'
import { useContent } from '../../contexts/ContentContext'
import EditModal from './EditModal'

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )
}

export default function EditWrapper({ sectionKey, title, fields, children }) {
  const { isAdmin } = useAdmin()
  const { content } = useContent()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative group/edit">
      {children}
      {isAdmin && (
        <>
          <button
            onClick={() => setOpen(true)}
            title={`Edit ${title}`}
            className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-white border border-gray-200 shadow-md text-gray-600 hover:text-[#7D1426] hover:border-[#7D1426]/40 rounded-full px-3 py-2 text-xs font-semibold transition-all opacity-0 group-hover/edit:opacity-100"
          >
            <PencilIcon />
            Edit
          </button>
          {open && (
            <EditModal
              title={`Edit — ${title}`}
              sectionKey={sectionKey}
              fields={fields}
              initialData={content[sectionKey]}
              onClose={() => setOpen(false)}
            />
          )}
        </>
      )}
    </div>
  )
}
