import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext(null)

const TOKEN_KEY = 'tie_admin_token'

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY)
    if (stored) { setToken(stored); setIsAdmin(true) }
  }, [])

  async function login(password) {
    const res = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) throw new Error('Invalid password')
    const { token: t } = await res.json()
    localStorage.setItem(TOKEN_KEY, t)
    setToken(t)
    setIsAdmin(true)
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setIsAdmin(false)
  }

  return (
    <AdminContext.Provider value={{ isAdmin, token, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
