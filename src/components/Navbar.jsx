import { useState, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  {
    label: 'About',
    to: '/about',
    external: false,
    dropdown: [
      { label: 'Pillars of TiE', to: '/pillars' },
      { label: 'Contact',        to: '/contact' },
    ],
  },
  { label: 'Join TiE Austin', to: '/join-tie', external: false },
  { label: 'Events',          to: '/events',   external: false },
  { label: 'Austin Team',     to: '/team',     external: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const baseLinkClass = 'text-[13px] font-medium transition-colors text-gray-500 hover:text-gray-900'
  const activeLinkClass = 'text-[13px] font-medium transition-colors text-tie-red'

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 bg-tie-red rounded flex items-center justify-center">
            <span className="text-white font-black text-[11px] leading-none">TiE</span>
          </div>
          <span className="font-black text-gray-900 tracking-tight text-sm">
            TiE <span className="text-tie-red">Austin</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => {
            if (l.dropdown) {
              return (
                <div
                  key={l.label}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 ${baseLinkClass}`}
                    onClick={() => setDropdownOpen((v) => !v)}
                  >
                    {l.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-0 pt-1 min-w-[170px]">
                      <div className="bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden py-1">
                        {l.dropdown.map((sub) => (
                          <NavLink
                            key={sub.label}
                            to={sub.to}
                            onClick={() => setDropdownOpen(false)}
                            className={({ isActive }) =>
                              `block px-5 py-2.5 text-[13px] font-medium transition-colors ${
                                isActive ? 'text-tie-red bg-gray-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            if (l.external) {
              return (
                <a
                  key={l.label}
                  href={l.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={baseLinkClass}
                >
                  {l.label}
                </a>
              )
            }

            return (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) => isActive ? activeLinkClass : baseLinkClass}
              >
                {l.label}
              </NavLink>
            )
          })}

          <a
            href="https://tie.org/join-now/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-tie-red text-white text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-full hover:bg-tie-red-dark transition-colors whitespace-nowrap"
          >
            Join Now
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          {navLinks.map((l) => {
            if (l.dropdown) {
              return (
                <div key={l.label}>
                  <p className="block px-6 py-3 text-[11px] font-black tracking-[0.2em] uppercase text-gray-400 border-b border-gray-50">
                    {l.label}
                  </p>
                  {l.dropdown.map((sub) => (
                    <NavLink
                      key={sub.label}
                      to={sub.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block px-8 py-3 text-sm border-b border-gray-50 transition-colors ${
                          isActive ? 'text-tie-red font-medium' : 'text-gray-600 hover:text-gray-900'
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )
            }

            if (l.external) {
              return (
                <a
                  key={l.label}
                  href={l.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3.5 text-sm text-gray-600 hover:text-gray-900 border-b border-gray-50 transition-colors"
                >
                  {l.label}
                </a>
              )
            }

            return (
              <NavLink
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-6 py-3.5 text-sm border-b border-gray-50 transition-colors ${
                    isActive ? 'text-tie-red font-medium' : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                {l.label}
              </NavLink>
            )
          })}

          <div className="px-6 py-4">
            <a
              href="https://tie.org/join-now/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block text-center bg-tie-red text-white text-[11px] font-bold tracking-widest uppercase py-3 rounded-full"
            >
              Join Now
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
