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
  const [saving, setSaving] = useState(false)
  const [pendingCommit, setPendingCommit] = useState(null)
  const commitDeferred = useRef(null)

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

  // Opens the password + commit-message confirmation flow. `run(message, token)`
  // performs the actual API call once the user confirms; it should return the
  // resulting full content object (or leave content untouched and update via setContent itself).
  const requestCommit = useCallback(({ description, defaultMessage, run }) => {
    return new Promise((resolve, reject) => {
      commitDeferred.current = { resolve, reject }
      setPendingCommit({ description, defaultMessage, run })
    })
  }, [])

  const confirmCommit = useCallback(async (message, freshToken) => {
    setSaving(true)
    try {
      await pendingCommit.run(message, freshToken)
      commitDeferred.current?.resolve()
      setPendingCommit(null)
    } finally {
      setSaving(false)
    }
  }, [pendingCommit])

  const cancelCommit = useCallback(() => {
    commitDeferred.current?.reject(new Error('cancelled'))
    setPendingCommit(null)
  }, [])

  async function postContent(nextContent, message, tok) {
    const res = await fetch('/api/admin-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tok}`,
      },
      body: JSON.stringify({ content: nextContent, message }),
    })
    if (!res.ok) throw new Error('Save failed')
    return nextContent
  }

  const saveSection = useCallback((section, data) => {
    const next = { ...content, [section]: data }
    return requestCommit({
      description: `Editing the ${section} section`,
      defaultMessage: `Update ${section} section`,
      run: async (message, tok) => {
        await postContent(next, message, tok)
        setContent(next)
      },
    })
  }, [content, requestCommit])

  const addPage = useCallback(({ title, slug }) => {
    const page = { id: makeId(), title, slug, navLabel: title, sections: [] }
    const next = { ...content, pages: [...(content.pages || []), page] }
    return requestCommit({
      description: `Adding a new page`,
      defaultMessage: `Add page "${title}"`,
      run: async (message, tok) => {
        await postContent(next, message, tok)
        setContent(next)
      },
    })
  }, [content, requestCommit])

  const renamePage = useCallback((pageId, { title, slug }) => {
    const page = content.pages.find((p) => p.id === pageId)
    const next = {
      ...content,
      pages: content.pages.map((p) => (p.id === pageId ? { ...p, title, slug, navLabel: title } : p)),
    }
    return requestCommit({
      description: `Editing page settings`,
      defaultMessage: `Edit page "${page?.title}" settings`,
      run: async (message, tok) => {
        await postContent(next, message, tok)
        setContent(next)
      },
    })
  }, [content, requestCommit])

  const deletePage = useCallback((pageId) => {
    const page = content.pages.find((p) => p.id === pageId)
    const next = { ...content, pages: content.pages.filter((p) => p.id !== pageId) }
    return requestCommit({
      description: `Deleting a page`,
      defaultMessage: `Delete page "${page?.title}"`,
      run: async (message, tok) => {
        await postContent(next, message, tok)
        setContent(next)
      },
    })
  }, [content, requestCommit])

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
    return requestCommit({
      description: `Adding a section to "${page.title}"`,
      defaultMessage: `Add ${typeLabel} section to "${page.title}"`,
      run: async (message, tok) => {
        await postContent(next, message, tok)
        setContent(next)
      },
    })
  }, [content, requestCommit])

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
    return requestCommit({
      description: `Editing a section on "${page.title}"`,
      defaultMessage: `Edit section on "${page.title}"`,
      run: async (message, tok) => {
        await postContent(next, message, tok)
        setContent(next)
      },
    })
  }, [content, requestCommit])

  const deleteSection = useCallback((pageId, sectionId) => {
    const page = content.pages.find((p) => p.id === pageId)
    const next = {
      ...content,
      pages: content.pages.map((p) =>
        p.id === pageId ? { ...p, sections: p.sections.filter((s) => s.id !== sectionId) } : p
      ),
    }
    return requestCommit({
      description: `Removing a section from "${page.title}"`,
      defaultMessage: `Remove section from "${page.title}"`,
      run: async (message, tok) => {
        await postContent(next, message, tok)
        setContent(next)
      },
    })
  }, [content, requestCommit])

  const rollback = useCallback((historyId, entryMessage) => {
    return requestCommit({
      description: `Restoring a previous version`,
      defaultMessage: `Revert to "${entryMessage}"`,
      run: async (message, tok) => {
        const res = await fetch('/api/admin-history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tok}`,
          },
          body: JSON.stringify({ id: historyId, message }),
        })
        if (!res.ok) throw new Error('Restore failed')
        const { content: restored } = await res.json()
        setContent(restored)
      },
    })
  }, [requestCommit])

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
        updateSection,
        saveSection,
        saving,
        uploadImage,
        pendingCommit,
        confirmCommit,
        cancelCommit,
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
