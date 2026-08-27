export default function JoinCTA() {
  return (
    <section id="membership" className="py-24 px-6" style={{ background: '#7D1426' }}>
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-white/60 text-xs font-bold tracking-[0.3em] uppercase mb-4">Get Involved</p>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-5">
          Ready to Join?
        </h2>
        <p className="text-white/70 text-base leading-relaxed max-w-md mx-auto mb-10">
          TiE Austin membership opens doors to mentors, events, and a community of people building real companies in Texas.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://tie.org/join-now/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-tie-red text-xs font-black tracking-widest uppercase px-7 py-4 rounded-full hover:bg-gray-100 transition-colors"
          >
            Apply for Membership
          </a>
          <a
            href="/contact"
            className="border-2 border-white/40 text-white text-xs font-black tracking-widest uppercase px-7 py-4 rounded-full hover:border-white/80 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
