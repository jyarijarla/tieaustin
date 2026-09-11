import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContent } from '../../contexts/ContentContext'
import { slugify, validateSlug } from './pageValidation'

export default function PageSettingsModal({ page, onClose }) {
  const { content, renamePage, deletePage } = useContent()
  const navigate = useNavigate()
  const [title, setTitle] = useState(page.title)
  const [slug, setSlug] = useState(page.slug)
  const [error, setError] = useState('')

  function handleSave() {
    if (!title.trim()) {
      setError('Give the page a title.')
      return
    }
    const err = validateSlug(slug, content.pages || [], page.id)
    if (err) {
      setError(err)
      return
    }
    onClose()
    renamePage(page.id, { title: title.trim(), slug }).catch((e) => {
      if (e.message !== 'cancelled') alert('Failed to save. Please try again.')
    })
  }

  function handleDelete() {
    if (!window.confirm(`Delete the page "${page.title}"? You can restore it later from History.`)) return
    onClose()
    deletePage(page.id)
      .then(() => navigate('/'))
      .catch((e) => {
        if (e.message !== 'cancelled') alert('Failed to delete. Please try again.')
      })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        <div className="mb-6">
          <p className="font-black text-gray-900 text-sm">Page settings</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Page title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-xl outline-none focus:border-[#7D1426] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">URL</label>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-400">/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                className="flex-1 px-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-xl outline-none focus:border-[#7D1426] transition-colors"
              />
            </div>
            {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
          </div>
        </div>

        <div className="flex gap-3 pt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors"
            style={{ background: '#7D1426' }}
          >
            Continue
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="w-full mt-3 py-2.5 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
        >
          Delete this page
        </button>
      </div>
    </div>
  )
}
