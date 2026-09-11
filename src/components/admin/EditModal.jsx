import { useState } from 'react'
import { useContent } from '../../contexts/ContentContext'
import { FieldsEditor, setPath } from './fields'

export default function EditModal({ title, sectionKey, fields, initialData, onClose }) {
  const { saveSection, uploadImage } = useContent()
  const [data, setData] = useState(JSON.parse(JSON.stringify(initialData)))

  function setField(path, value) {
    setData((prev) => setPath(prev, path, value))
  }

  function handleSave() {
    saveSection(sectionKey, data)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col max-h-full">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <p className="font-black text-gray-900 text-sm">{title}</p>
            <p className="text-xs text-gray-400 mt-0.5">Saved to your draft — use "Publish changes" when you're ready to go live</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">
          <FieldsEditor fields={fields} data={data} setField={setField} uploadImage={uploadImage} />
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-5 border-t border-gray-100 shrink-0">
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
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
