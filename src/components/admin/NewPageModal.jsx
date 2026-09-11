import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContent } from '../../contexts/ContentContext'
import { slugify, validateSlug } from './pageValidation'

export default function NewPageModal({ onClose }) {
  const { content, addPage } = useContent()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [error, setError] = useState('')

  function handleTitleChange(v) {
    setTitle(v)
    if (!slugTouched) setSlug(slugify(v))
  }

  function handleSave() {
    const finalSlug = slug || slugify(title)
    const err = validateSlug(finalSlug, content.pages || [])
    if (!title.trim()) {
      setError('Give the page a title.')
      return
    }
    if (err) {
      setError(err)
      return
    }
    addPage({ title: title.trim(), slug: finalSlug })
    onClose()
    navigate(`/${finalSlug}`)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        <div className="mb-6">
          <p className="font-black text-gray-900 text-sm">New page</p>
          <p className="text-xs text-gray-400 mt-0.5">Added to your draft — publish when you're ready to go live</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Page title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Sponsors"
              autoFocus
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
                onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true) }}
                placeholder="sponsors"
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
            Create page
          </button>
        </div>
      </div>
    </div>
  )
}
