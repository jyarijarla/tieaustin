import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { defaults } from '../content/defaults'
import { useAdmin } from './AdminContext'

const ContentContext = createContext(null)

function merge(base, overrides) {
  if (!overrides) return base
  return { ...base, ...overrides }
}

export function ContentProvider({ children }) {
  const { token } = useAdmin()
  const [content, setContent] = useState(defaults)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin-content')
      .then((r) => r.json())
      .then((remote) => {
        if (remote) setContent(merge(defaults, remote))
      })
      .catch(() => {})
  }, [])

  const updateSection = useCallback((section, data) => {
    setContent((prev) => ({ ...prev, [section]: data }))
  }, [])

  const saveSection = useCallback(async (section, data) => {
    setSaving(true)
    const next = { ...content, [section]: data }
    setContent(next)
    try {
      const res = await fetch('/api/admin-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(next),
      })
      if (!res.ok) throw new Error('Save failed')
    } finally {
      setSaving(false)
    }
  }, [content, token])

  async function uploadImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const res = await fetch('/api/admin-upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ filename: file.name, dataUrl: e.target.result }),
          })
          const { url } = await res.json()
          resolve(url)
        } catch (err) {
          reject(err)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <ContentContext.Provider value={{ content, updateSection, saveSection, saving, uploadImage }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
