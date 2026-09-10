import { useState, useRef } from 'react'
import { useContent } from '../../contexts/ContentContext'

// field types: text | textarea | image | array-of-objects

function ImageField({ label, value, onChange, uploadImage }) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      onChange(url)
    } catch {
      alert('Image upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      <div className="flex gap-3 items-center">
        {value && (
          <img
            src={value}
            alt=""
            className="w-16 h-16 object-cover rounded-lg border border-gray-200 shrink-0"
          />
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 text-xs font-semibold border border-gray-200 rounded-lg hover:border-gray-400 transition-colors disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : 'Choose image'}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  )
}

function TextField({ label, value, onChange, multiline }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#7D1426] transition-colors resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#7D1426] transition-colors"
        />
      )}
    </div>
  )
}

export default function EditModal({ title, sectionKey, fields, initialData, onClose }) {
  const { saveSection, uploadImage } = useContent()
  const [data, setData] = useState(JSON.parse(JSON.stringify(initialData)))
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  function setField(path, value) {
    setData((prev) => {
      const next = JSON.parse(JSON.stringify(prev))
      const parts = path.split('.')
      let obj = next
      for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]]
      obj[parts[parts.length - 1]] = value
      return next
    })
  }

  async function handleSave() {
    setSaving(true)
    try {
      await saveSection(sectionKey, data)
      onClose()
    } catch {
      alert('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // Render fields — supports flat fields and array-of-objects with tabs
  const arrayField = fields.find((f) => f.type === 'array')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col max-h-full">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <p className="font-black text-gray-900 text-sm">{title}</p>
            <p className="text-xs text-gray-400 mt-0.5">Changes save immediately for all visitors</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {arrayField ? (
            <>
              {/* Tab strip for array items */}
              <div className="flex gap-1 mb-6 flex-wrap">
                {data.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeTab === i ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    style={activeTab === i ? { background: '#7D1426' } : {}}
                  >
                    {data[i][arrayField.labelKey] || `Item ${i + 1}`}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                {arrayField.fields.map((f) => (
                  f.type === 'image' ? (
                    <ImageField
                      key={f.key}
                      label={f.label}
                      value={data[activeTab][f.key]}
                      onChange={(v) => setField(`${activeTab}.${f.key}`, v)}
                      uploadImage={uploadImage}
                    />
                  ) : (
                    <TextField
                      key={f.key}
                      label={f.label}
                      value={data[activeTab][f.key] ?? ''}
                      onChange={(v) => setField(`${activeTab}.${f.key}`, v)}
                      multiline={f.type === 'textarea'}
                    />
                  )
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {fields.map((f) =>
                f.type === 'image' ? (
                  <ImageField
                    key={f.key}
                    label={f.label}
                    value={data[f.key]}
                    onChange={(v) => setField(f.key, v)}
                    uploadImage={uploadImage}
                  />
                ) : (
                  <TextField
                    key={f.key}
                    label={f.label}
                    value={data[f.key] ?? ''}
                    onChange={(v) => setField(f.key, v)}
                    multiline={f.type === 'textarea'}
                  />
                )
              )}
            </div>
          )}
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
            disabled={saving}
            className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors disabled:opacity-60"
            style={{ background: '#7D1426' }}
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
