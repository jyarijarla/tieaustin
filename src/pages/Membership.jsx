import JoinCTA from '../components/JoinCTA'

const tiers = [
  {
    name: 'Associate',
    price: '$150',
    period: '/ year',
    desc: 'For aspiring entrepreneurs and students looking to connect with the Austin startup community.',
    perks: ['Event access', 'Member directory', 'Monthly newsletter', 'Online community'],
    cta: 'Apply as Associate',
  },
  {
    name: 'Member',
    price: '$500',
    period: '/ year',
    desc: 'For active founders and professionals ready to engage deeply with the TiE Austin network.',
    perks: ['Everything in Associate', 'Mentorship matching', 'Priority event access', 'TiE Global network', 'Investor introductions'],
    cta: 'Apply as Member',
    featured: true,
  },
  {
    name: 'Charter',
    price: 'Invite only',
    period: '',
    desc: 'For accomplished entrepreneurs and executives committed to giving back and shaping TiE Austin.',
    perks: ['Everything in Member', 'Voting rights', 'Leadership programs', 'Charter badge', 'Global chapter access'],
    cta: 'Contact Us',
  },
]

export default function MembershipPage() {
  return (
    <>
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-tie-red text-xs font-bold tracking-[0.3em] uppercase mb-4 text-center">
            Membership
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight text-center mb-4 leading-tight">
            Join TiE Austin
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto text-center leading-relaxed mb-16">
            Choose the level of involvement that fits where you are in your entrepreneurial journey.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`rounded-2xl p-8 flex flex-col ${
                  t.featured
                    ? 'bg-tie-red text-white shadow-xl'
                    : 'border border-gray-100 text-gray-900'
                }`}
              >
                <div className="mb-6">
                  <p className={`text-[10px] font-black tracking-[0.25em] uppercase mb-2 ${t.featured ? 'text-white/60' : 'text-tie-red'}`}>
                    {t.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-black ${t.featured ? 'text-white' : 'text-gray-900'}`}>{t.price}</span>
                    {t.period && <span className={`text-sm ${t.featured ? 'text-white/60' : 'text-gray-400'}`}>{t.period}</span>}
                  </div>
                </div>
                <p className={`text-sm leading-relaxed mb-6 flex-1 ${t.featured ? 'text-white/75' : 'text-gray-500'}`}>{t.desc}</p>
                <ul className="space-y-2 mb-8">
                  {t.perks.map((p) => (
                    <li key={p} className={`flex items-start gap-2 text-sm ${t.featured ? 'text-white/85' : 'text-gray-600'}`}>
                      <span className={`mt-0.5 shrink-0 text-xs ${t.featured ? 'text-white' : 'text-tie-red'}`}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:ExecutiveDirector@austin.tie.org"
                  className={`block text-center text-[11px] font-black tracking-widest uppercase py-3.5 rounded-full transition-colors ${
                    t.featured
                      ? 'bg-white text-tie-red hover:bg-gray-100'
                      : 'border border-gray-200 text-gray-700 hover:border-tie-red hover:text-tie-red'
                  }`}
                >
                  {t.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            Questions? Email{' '}
            <a href="mailto:ExecutiveDirector@austin.tie.org" className="text-tie-red hover:underline">
              ExecutiveDirector@austin.tie.org
            </a>
          </p>
        </div>
      </section>
      <JoinCTA />
    </>
  )
}
