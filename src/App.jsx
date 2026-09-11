import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AdminProvider, useAdmin } from './contexts/AdminContext'
import { ContentProvider, useContent } from './contexts/ContentContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminBar from './components/admin/AdminBar'
import LoginModal from './components/admin/LoginModal'
import CommitModal from './components/admin/CommitModal'
import Home from './pages/Home'
import AboutPage from './pages/About'
import TeamPage from './pages/Team'
import MembershipPage from './pages/Membership'
import JoinTiEPage from './pages/JoinTiE'
import PillarsPage from './pages/Pillars'
import ContactPage from './pages/Contact'
import EventsPage from './pages/EventsPage'
import DynamicPage from './pages/DynamicPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppShell() {
  const { isAdmin } = useAdmin()
  const { publishOpen } = useContent()
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ paddingBottom: isAdmin ? '3rem' : 0 }}>
      <ScrollToTop />
      <Navbar onAdminClick={() => setLoginOpen(true)} />
      <main className="flex-1">
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<AboutPage />} />
          <Route path="/team"     element={<TeamPage />} />
          <Route path="/join"     element={<MembershipPage />} />
          <Route path="/join-tie" element={<JoinTiEPage />} />
          <Route path="/pillars"  element={<PillarsPage />} />
          <Route path="/contact"  element={<ContactPage />} />
          <Route path="/events"   element={<EventsPage />} />
          <Route path="/:slug"    element={<DynamicPage />} />
        </Routes>
      </main>
      <Footer onAdminClick={() => setLoginOpen(true)} />
      {isAdmin && <AdminBar />}
      {loginOpen && !isAdmin && <LoginModal onClose={() => setLoginOpen(false)} />}
      {isAdmin && publishOpen && <CommitModal />}
    </div>
  )
}

export default function App() {
  return (
    <AdminProvider>
      <ContentProvider>
        <AppShell />
      </ContentProvider>
    </AdminProvider>
  )
}
