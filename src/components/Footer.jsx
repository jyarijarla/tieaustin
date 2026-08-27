export default function Footer() {
  return (
    <footer id="contact" className="border-t border-gray-100 bg-white py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-tie-red rounded flex items-center justify-center">
            <span className="text-white font-black text-[10px]">TiE</span>
          </div>
          <span className="text-sm font-black text-gray-900 tracking-tight">
            TiE Austin
          </span>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {['About', 'Events', 'Membership', 'Contact'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} TiE Austin
        </p>
      </div>
    </footer>
  )
}
