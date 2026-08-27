const members = [
  { name: 'Harshal Shah',    role: 'President'          },
  { name: 'Ashok Ramaswami', role: 'Board Member'       },
  { name: 'Kartik Nanda',    role: 'Board Member'       },
  { name: 'Grace Lanni',     role: 'Executive Director' },
]

export default function TeamPage() {
  return (
    <section className="bg-white py-24 px-6 min-h-[60vh]">
      <div className="max-w-5xl mx-auto">
        <p className="text-tie-red text-xs font-bold tracking-[0.3em] uppercase mb-4 text-center">
          The People Behind TiE Austin
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight text-center mb-14 leading-tight">
          Austin Team
        </h1>

        {/* Group photo */}
        <div className="rounded-2xl overflow-hidden shadow-sm max-w-lg mx-auto">
          <img
            src="/Team.png"
            alt="TiE Austin Team"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
