import { createContext, useContext, useState, useCallback, useRef } from 'react'

const UIContext = createContext(null)

let toastId = 0

export function UIProvider({ children }) {
  const [confirmState, setConfirmState] = useState(null)
  const [toasts, setToasts] = useState([])
  const confirmResolver = useRef(null)

  const confirm = useCallback(({ title, message, confirmLabel = 'Confirm', tone = 'danger' }) => {
    return new Promise((resolve) => {
      confirmResolver.current = resolve
      setConfirmState({ title, message, confirmLabel, tone })
    })
  }, [])

  const resolveConfirm = useCallback((result) => {
    confirmResolver.current?.(result)
    confirmResolver.current = null
    setConfirmState(null)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback((message, type = 'error') => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => dismissToast(id), 5000)
  }, [dismissToast])

  return (
    <UIContext.Provider value={{ confirm, confirmState, resolveConfirm, toasts, notify, dismissToast }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  return useContext(UIContext)
}
