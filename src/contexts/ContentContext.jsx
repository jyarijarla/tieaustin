import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { defaults } from '../content/defaults'
import { getSectionType } from '../content/sectionTypes'
import { useAdmin } from './AdminContext'

const ContentContext = createContext(null)

function merge(base, overrides) {
  if (!overrides) return base
  return { ...base, ...overrides }
}

function makeId() {
  return crypto.randomUUID()
}

export function ContentProvider({ children }) {
  const { token } = useAdmin()
  const [content, setContent] = useState(defaults)
  const savedContentRef = useRef(defaults)
  const [pendingChanges, setPendingChanges] = useState([])
  const [saving, setSaving] = useState(false)
  const [publishOpen, setPublishOpen] = useState(false)

  useEffect(() => {
    fetch('/api/admin-content')
      .then((r) => r.json())
      .then((remote) => {
        if (remote) {
          const merged = merge(defaults, remote)
          setContent(merged)
          savedContentRef.current = merged
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (pendingChanges.length === 0) return
    function handleBeforeUnload(e) {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [pendingChanges.length])

  // Stages an edit locally (no network call). It only becomes live once
  // the admin reviews everything staged this session and hits Publish.
  function stage(next, description) {
    setContent(next)
    setPendingChanges((prev) => [...prev, description])
  }

  const saveSection = useCallback((section, data) => {
    stage({ ...content, [section]: data }, `Update ${section} section`)
  }, [content])

  const addPage = useCallback(({ title, slug }) => {
    const page = { id: makeId(), title, slug, navLabel: title, sections: [] }
    stage({ ...content, pages: [...(content.pages || []), page] }, `Add page "${title}"`)
  }, [content])

  const renamePage = useCallback((pageId, { title, slug }) => {
    const page = content.pages.find((p) => p.id === pageId)
    const next = {
      ...content,
      pages: content.pages.map((p) => (p.id === pageId ? { ...p, title, slug, navLabel: title } : p)),
    }
    stage(next, `Edit page "${page?.title}" settings`)
  }, [content])

  const deletePage = useCallback((pageId) => {
    const page = content.pages.find((p) => p.id === pageId)
    const next = { ...content, pages: content.pages.filter((p) => p.id !== pageId) }
    stage(next, `Delete page "${page?.title}"`)
  }, [content])

  const addSection = useCallback((pageId, index, type, data) => {
    const page = content.pages.find((p) => p.id === pageId)
    const section = { id: makeId(), type, data }
    const sections = [...page.sections]
    sections.splice(index, 0, section)
    const next = {
      ...content,
      pages: content.pages.map((p) => (p.id === pageId ? { ...p, sections } : p)),
    }
    const typeLabel = getSectionType(type)?.label || type
    stage(next, `Add ${typeLabel} section to "${page.title}"`)
  }, [content])

  const updateSectionData = useCallback((pageId, sectionId, data) => {
    const page = content.pages.find((p) => p.id === pageId)
    const next = {
      ...content,
      pages: content.pages.map((p) =>
        p.id === pageId
          ? { ...p, sections: p.sections.map((s) => (s.id === sectionId ? { ...s, data } : s)) }
          : p
      ),
    }
    stage(next, `Edit section on "${page.title}"`)
  }, [content])

  const deleteSection = useCallback((pageId, sectionId) => {
    const page = content.pages.find((p) => p.id === pageId)
    const next = {
      ...content,
      pages: content.pages.map((p) =>
        p.id === pageId ? { ...p, sections: p.sections.filter((s) => s.id !== sectionId) } : p
      ),
    }
    stage(next, `Remove section from "${page.title}"`)
  }, [content])

  // Loads a past snapshot into the local draft. Nothing is written until Publish.
  const rollback = useCallback(async (historyId, entryMessage) => {
    const res = await fetch(`/api/admin-history?id=${historyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error('Failed to load that version')
    const entry = await res.json()
    stage(entry.content, `Revert to "${entryMessage}"`)
  }, [token])

  const discardChanges = useCallback(() => {
    setContent(savedContentRef.current)
    setPendingChanges([])
  }, [])

  const openPublish = useCallback(() => setPublishOpen(true), [])
  const closePublish = useCallback(() => setPublishOpen(false), [])

  const publish = useCallback(async (message, freshToken) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${freshToken}`,
        },
        body: JSON.stringify({ content, message }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Save failed')
      }
      savedContentRef.current = content
      setPendingChanges([])
      setPublishOpen(false)
    } finally {
      setSaving(false)
    }
  }, [content])

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
    <ContentContext.Provider
      value={{
        content,
        saveSection,
        pendingChanges,
        saving,
        uploadImage,
        publishOpen,
        openPublish,
        closePublish,
        publish,
        discardChanges,
        addPage,
        renamePage,
        deletePage,
        addSection,
        updateSectionData,
        deleteSection,
        rollback,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
