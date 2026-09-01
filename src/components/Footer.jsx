import { Link } from 'react-router-dom'

const JOIN_URL =
  'https://creatorapp.zohopublic.com/tie_dev/chapters/page-embed/TiE_Member_Details/wbegNfNZCbUwdv6jTpxMeK4HtB0KnTkKqVM63wEZzQ1yBx6pqybCB0kv3geqGsvDZASaa6K3XAkkAZbmYfC5kG3ZHQkAj7CabE34?Chapter_Name=4189632000003403039'

const links = {
  Explore: [
    { label: 'Home',          to: '/',          external: false },
    { label: 'Events',        to: '/events',    external: false },
    { label: 'Austin Team',   to: '/team',      external: false },
  ],
  Membership: [
    { label: 'Join TiE Austin', to: '/join-tie',  external: false },
    { label: 'Apply Now',        to: JOIN_URL,     external: true  },
  ],
  About: [
    { label: 'Pillars of TiE', to: '/pillars',  external: false },
    { label: 'Contact',         to: '/contact',  external: false },
  ],
}

function FooterLink({ item }) {
  const cls = 'text-sm text-gray-400 hover:text-white transition-colors'
  return item.external ? (
    <a href={item.to} target="_blank" rel="noopener noreferrer" className={cls}>
      {item.label}
    </a>
  ) : (
    <Link to={item.to} className={cls}>
      {item.label}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white px-6 pt-14 pb-8">
      <div className="max-w-5xl mx-auto">

        {/* Top row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ background: '#7D1426' }}>
                <span className="text-white font-black text-[11px] leading-none">TiE</span>
              </div>
              <span className="font-black text-white tracking-tight text-sm">
                TiE <span style={{ color: '#c04060' }}>Austin</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">
              Fostering entrepreneurship across Central Texas and beyond.
            </p>
            <a
              href="mailto:ExecutiveDirector@austin.tie.org"
              className="inline-block mt-4 text-xs text-gray-500 hover:text-white transition-colors"
            >
              ExecutiveDirector@austin.tie.org
            </a>
          </div>

          {/* Nav columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-600 mb-4">{group}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-7">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} TiE Austin. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            Part of{' '}
            <a
              href="https://tie.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              TiE Global
            </a>
            {' '}— 61 chapters worldwide.
          </p>
        </div>

      </div>
    </footer>
  )
}
