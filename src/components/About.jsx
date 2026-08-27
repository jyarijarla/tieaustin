const pillars = [
  {
    title: 'Mentorship',
    desc: 'Get paired with experienced founders and executives who have navigated the exact challenges you face.',
  },
  {
    title: 'Network',
    desc: "Meet Austin's most active investors, operators, and fellow entrepreneurs at our regular meetups and events.",
  },
  {
    title: 'Community',
    desc: 'Join a chapter that has been fostering entrepreneurship in Central Texas for over two decades.',
  },
]

export default function About() {
  return (
    <section id="about" className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <p className="text-tie-red text-xs font-bold tracking-[0.3em] uppercase mb-4">About Us</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight leading-tight">
              Fostering Entrepreneurship in Austin
            </h2>
          </div>
          <p className="text-gray-500 leading-relaxed pt-1 sm:pt-8">
            TiE Austin is part of TiE Global — the world's largest entrepreneurship network. Our chapter brings together founders, mentors, and investors right here in Central Texas to help ideas grow into companies.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {pillars.map((p) => (
            <div key={p.title} className="bg-white p-8">
              <div className="w-8 h-0.5 bg-tie-red mb-6" />
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide mb-3">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
