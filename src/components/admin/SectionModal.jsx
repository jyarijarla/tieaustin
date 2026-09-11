import { useState } from 'react'
import { useContent } from '../../contexts/ContentContext'
import { SECTION_TYPES, getSectionType } from '../../content/sectionTypes'
import { FieldsEditor, setPath } from './fields'

export default function SectionModal({ mode, page, section, index, onClose }) {
  const { addSection, updateSectionData, uploadImage } = useContent()
  const [type, setType] = useState(mode === 'edit' ? section.type : SECTION_TYPES[0].type)
  const [data, setData] = useState(() =>
    JSON.parse(JSON.stringify(mode === 'edit' ? section.data : getSectionType(type).defaultData))
  )
  const [activeTab, setActiveTab] = useState(0)

  const typeConfig = getSectionType(type)

  function handleTypeChange(newType) {
    setType(newType)
    setData(JSON.parse(JSON.stringify(getSectionType(newType).defaultData)))
    setActiveTab(0)
  }

  function setField(path, value) {
    setData((prev) => setPath(prev, path, value))
  }

  function handleSave() {
    onClose()
    const action = mode === 'add'
      ? addSection(page.id, index, type, data)
      : updateSectionData(page.id, section.id, data)
    action.catch((err) => {
      if (err.message !== 'cancelled') alert('Failed to save. Please try again.')
    })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col max-h-full">

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <p className="font-black text-gray-900 text-sm">{mode === 'add' ? 'Add section' : 'Edit section'}</p>
            <p className="text-xs text-gray-400 mt-0.5">You'll confirm your password and describe the change before it goes live</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          {mode === 'add' && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Section type</label>
              <select
                value={type}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-[#7D1426] transition-colors"
              >
                {SECTION_TYPES.map((t) => (
                  <option key={t.type} value={t.type}>{t.label}</option>
                ))}
              </select>
            </div>
          )}
          <FieldsEditor
            fields={typeConfig.fields}
            data={data}
            setField={setField}
            uploadImage={uploadImage}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

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
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
