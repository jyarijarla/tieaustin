const members = [
  {
    name: 'Harshal Shah',
    role: 'President',
    initials: 'HS',
    color: '#1e3a5f',
    img: null,
  },
  {
    name: 'Ashok Ramaswami',
    role: 'Board Member',
    initials: 'AR',
    color: '#3d1a5c',
    img: null,
  },
  {
    name: 'Kartik Nanda',
    role: 'Board Member',
    initials: 'KN',
    color: '#1a4a3a',
    img: null,
  },
  {
    name: 'Grace Lanni',
    role: 'Executive Director',
    initials: 'GL',
    color: '#C41230',
    img: null,
  },
]

export default function TeamPage() {
  return (
    <section className="bg-white py-24 px-6 min-h-[60vh]">
      <div className="max-w-5xl mx-auto">
        <p className="text-tie-red text-xs font-bold tracking-[0.3em] uppercase mb-4 text-center">
          The People Behind TiE Austin
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight text-center mb-16 leading-tight">
          Austin Team
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 max-w-4xl mx-auto">
          {members.map((m) => (
            <div key={m.name} className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="w-36 h-36 rounded-full overflow-hidden mb-5 shrink-0 shadow-md">
                {m.img ? (
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${m.color}cc, ${m.color})`,
                    }}
                  >
                    <span className="text-3xl font-black text-white/90 tracking-tight select-none">
                      {m.initials}
                    </span>
                  </div>
                )}
              </div>

              {/* Name */}
              <p className="font-black text-gray-900 uppercase tracking-wide text-sm leading-tight mb-1">
                {m.name}
              </p>

              {/* Role */}
              <p className="text-[11px] font-medium text-gray-400 italic uppercase tracking-wider mb-4">
                {m.role}
              </p>

              {/* Read More */}
              <a
                href="mailto:ExecutiveDirector@austin.tie.org"
                className="bg-tie-red text-white text-[10px] font-black tracking-widest uppercase px-5 py-2 rounded-full hover:bg-tie-red-dark transition-colors"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
