import { useState, useRef } from 'react'

// field types: text | textarea | image | array-of-objects

export function ImageField({ label, value, onChange, uploadImage }) {
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

export function TextField({ label, value, onChange, multiline }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-[#7D1426] transition-colors resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-[#7D1426] transition-colors"
        />
      )}
    </div>
  )
}

// Renders a set of fields against `data`. Supports flat fields (data is an object)
// and a single array-of-objects field with tabs (data is an array).
export function FieldsEditor({ fields, data, setField, uploadImage, activeTab, onTabChange }) {
  const arrayField = fields.find((f) => f.type === 'array')
  const [internalTab, setInternalTab] = useState(0)
  const tab = activeTab ?? internalTab
  const setTab = onTabChange ?? setInternalTab

  if (arrayField) {
    return (
      <>
        <div className="flex gap-1 mb-6 flex-wrap">
          {data.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setTab(i)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                tab === i ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={tab === i ? { background: '#7D1426' } : {}}
            >
              {data[i][arrayField.labelKey] || `Item ${i + 1}`}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {arrayField.fields.map((f) =>
            f.type === 'image' ? (
              <ImageField
                key={f.key}
                label={f.label}
                value={data[tab][f.key]}
                onChange={(v) => setField(`${tab}.${f.key}`, v)}
                uploadImage={uploadImage}
              />
            ) : (
              <TextField
                key={f.key}
                label={f.label}
                value={data[tab][f.key] ?? ''}
                onChange={(v) => setField(`${tab}.${f.key}`, v)}
                multiline={f.type === 'textarea'}
              />
            )
          )}
        </div>
      </>
    )
  }

  return (
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
  )
}

// Generic deep-set helper used by modals that edit a `data` object/array via dotted paths.
export function setPath(data, path, value) {
  const next = JSON.parse(JSON.stringify(data))
  const parts = path.split('.')
  let obj = next
  for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]]
  obj[parts[parts.length - 1]] = value
  return next
}
