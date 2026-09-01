import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/About'
import TeamPage from './pages/Team'
import MembershipPage from './pages/Membership'
import JoinTiEPage from './pages/JoinTiE'
import PillarsPage from './pages/Pillars'
import ContactPage from './pages/Contact'
import EventsPage from './pages/EventsPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <ScrollToTop />
      <Navbar />
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
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
