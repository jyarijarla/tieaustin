const sponsors = [
  { name: 'ACC', fullName: 'Austin Community College', initials: 'ACC', accent: '#00539B' },
]

export default function Sponsors() {
  return (
    <section className="py-14 px-6" style={{ background: '#7D1426' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-[11px] font-black tracking-[0.3em] uppercase text-white/70 mb-10">
          Corporate Sponsors
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {sponsors.map((s) => (
            <div
              key={s.name}
              className="bg-white rounded-lg px-10 py-6 flex items-center justify-center"
              style={{ minWidth: '180px' }}
            >
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 28 24" width="28" height="24" aria-hidden="true">
                  <polygon points="0,24 10,0 14,8" fill="#E31837"/>
                  <polygon points="10,0 20,24 14,8" fill="#003DA5"/>
                  <polygon points="14,8 20,24 28,0" fill="#78BE20"/>
                </svg>
                <span className="font-black text-2xl tracking-tight text-gray-900">ACC</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
