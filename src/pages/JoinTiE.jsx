import { useState } from 'react'

const TABS = ['About', 'Eligibility Criteria', 'Benefits']

const APPLY_URL =
  'https://creatorapp.zohopublic.com/tie_dev/chapters/page-embed/TiE_Member_Details/wbegNfNZCbUwdv6jTpxMeK4HtB0KnTkKqVM63wEZzQ1yBx6pqybCB0kv3geqGsvDZASaa6K3XAkkAZbmYfC5kG3ZHQkAj7CabE34?Chapter_Name=4189632000003403039'

// item types: para | section | header | bullet | note
const categories = [
  {
    id: 'associate',
    prefix: 'TiE',
    title: 'Associate',
    bgStyle: { background: 'linear-gradient(160deg, #1a3a6e 0%, #122a54 40%, #0a1830 100%)' },
    illustration: (
      <svg viewBox="0 0 120 80" width="120" height="80" aria-hidden="true" style={{ opacity: 0.12, position: 'absolute', bottom: 10, right: 60 }}>
        <rect x="10" y="15" width="100" height="60" rx="4" fill="none" stroke="white" strokeWidth="3"/>
        <line x1="10" y1="30" x2="110" y2="30" stroke="white" strokeWidth="2"/>
        <circle cx="35" cy="55" r="8" fill="white"/>
        <circle cx="60" cy="50" r="8" fill="white"/>
        <circle cx="85" cy="45" r="8" fill="white"/>
        <polyline points="35,55 60,50 85,45" fill="none" stroke="white" strokeWidth="2"/>
      </svg>
    ),
    tabs: {
      About: [
        { type: 'para', text: "The TiE Associate Membership is designed for early-stage entrepreneurs, young professionals, and aspiring founders who are ready to accelerate their business journey. It provides a gateway to TiE's global network of industry leaders, mentors, and accomplished entrepreneurs." },
        { type: 'para', text: "Associates gain access to curated learning opportunities, practical insights, and meaningful peer-to-peer connections—helping them build skills, strengthen their entrepreneurial mindset, and navigate the path from idea to growth with confidence." },
        { type: 'para', text: '$125/year' },
      ],
      'Eligibility Criteria': [
        { type: 'para', text: 'Applicants may apply directly or be referred by an existing TiE member. Ideal candidates include:' },
        { type: 'bullet', text: 'Early-stage entrepreneurs, startup founders, or small-business owners (from ideation to operational stages).' },
        { type: 'bullet', text: 'Professionals or aspiring founders seeking exposure to entrepreneurship.' },
        { type: 'bullet', text: 'Individuals with demonstrated entrepreneurial intent or initial market traction.' },
        { type: 'bullet', text: 'SMEs or business operators contributing to job creation or market impact.' },
        { type: 'bullet', text: 'Anyone with a genuine interest in learning, networking, and engaging with the TiE community.' },
        { type: 'header', text: 'Membership Fee' },
        { type: 'bullet', text: '$125 per year.' },
      ],
      Benefits: [
        { type: 'section', text: 'Learning & Skill Development' },
        { type: 'bullet', text: 'Entrepreneurship training through Bootcamps, TiE Institute programs, and workshops.' },
        { type: 'bullet', text: 'Exposure to real-world founder journeys through TiE Story sessions.' },
        { type: 'bullet', text: 'Monthly and annual TiE Global newsletters.' },
        { type: 'section', text: 'Network & Community' },
        { type: 'bullet', text: 'Networking with experienced entrepreneurs, mentors, and industry leaders.' },
        { type: 'bullet', text: 'Access to chapter-level events, knowledge sessions, and community meetups.' },
        { type: 'bullet', text: 'Opportunities to connect with mentors—including serial entrepreneurs—across the TiE network.' },
        { type: 'section', text: 'Career & Growth Opportunities' },
        { type: 'bullet', text: 'Access to emerging and established funding networks.' },
        { type: 'bullet', text: 'Opportunities for internships within TiE member companies.' },
        { type: 'bullet', text: 'Soft support for career development and professional visibility.' },
        { type: 'section', text: 'Events & Global Access' },
        { type: 'bullet', text: 'Complimentary access to regular TiE chapter events.' },
        { type: 'bullet', text: 'Discounted passes to flagship TiE conferences such as TiEcon, TiE Global Summit, and events hosted by other chapters.' },
        { type: 'bullet', text: 'Participation in youth and university-focused programs (TYE, TiE University Cup, etc.).' },
      ],
    },
  },
  {
    id: 'charter',
    prefix: 'TiE Charter',
    title: 'Member',
    bgStyle: { background: 'linear-gradient(160deg, #3d1a5c 0%, #2a1040 40%, #180828 100%)' },
    illustration: (
      <svg viewBox="0 0 120 80" width="120" height="80" aria-hidden="true" style={{ opacity: 0.12, position: 'absolute', bottom: 10, right: 60 }}>
        <polygon points="60,10 68,35 95,35 73,52 81,78 60,62 39,78 47,52 25,35 52,35" fill="white"/>
      </svg>
    ),
    tabs: {
      About: [
        { type: 'para', text: "TiE Charter Members (CMs) are accomplished entrepreneurs, corporate intrapreneurs, and thought leaders who have reached a pinnacle in their professional journey and are eager to give back to the entrepreneurial ecosystem. They embody the TiE mission of fostering wealth creation, mentoring the next generation, and strengthening the entrepreneurial community." },
        { type: 'para', text: "Charter Members play a pivotal role in shaping TiE's vision and operations, offering their expertise, leadership, and experience to empower fellow members and aspiring entrepreneurs. The rewards of Charter Membership go beyond personal recognition—they lie in contributing meaningfully to a global network of innovation and impact." },
        { type: 'para', text: '$1,200/year' },
      ],
      'Eligibility Criteria': [
        { type: 'bullet', text: 'Successful, high-profile entrepreneurs, corporate intrapreneurs, and thought leaders.' },
        { type: 'bullet', text: 'Reached a stage in their professional life when they are ready, willing, and able to contribute to fellow members.' },
        { type: 'bullet', text: "Dedicated to the mission of TiE and the virtuous cycle of wealth creation, engaging and giving back to the community." },
        { type: 'bullet', text: 'Believe in the merits of capitalism and have a strong desire to help other entrepreneurs.' },
        { type: 'header', text: 'Membership Fee' },
        { type: 'bullet', text: '$1,200 per year.' },
        { type: 'note', text: 'Charter Membership is by invitation only and subject to a due process prescribed in the TiE bylaws.' },
      ],
      Benefits: [
        { type: 'bullet', text: 'Exclusive networking with successful entrepreneurs, thought leaders, and Charter Members locally and globally.' },
        { type: 'bullet', text: 'Guide and inspire budding entrepreneurs through structured mentorship programs.' },
        { type: 'bullet', text: 'Participate as speakers, panelists, and thought leaders at TiE events.' },
        { type: 'bullet', text: 'Complimentary attendance to all flagship TiE events worldwide and invitations to exclusive local events, delegations, and mixers.' },
        { type: 'bullet', text: 'Opportunity to recruit talented professionals, interns, and volunteers.' },
        { type: 'bullet', text: "Engage in chapter or global leadership roles to shape the future of TiE." },
        { type: 'bullet', text: 'Invitation to the annual TiE CM Retreat—an exclusive destination event to build deeper connections within the CM community.' },
        { type: 'bullet', text: 'Satisfaction and recognition from giving back to the entrepreneurial community while helping shape the next generation of leaders.' },
      ],
    },
  },
  {
    id: 'nxtgen',
    prefix: 'TiE',
    title: 'NxtGen',
    bgStyle: { background: 'linear-gradient(160deg, #d4884a 0%, #b05a28 40%, #7a2e10 100%)' },
    illustration: (
      <svg viewBox="0 0 120 80" width="120" height="80" aria-hidden="true" style={{ opacity: 0.12, position: 'absolute', bottom: 10, right: 60 }}>
        <circle cx="30" cy="40" r="18" fill="white"/>
        <circle cx="60" cy="30" r="18" fill="white"/>
        <circle cx="90" cy="40" r="18" fill="white"/>
        <line x1="30" y1="40" x2="60" y2="30" stroke="white" strokeWidth="3"/>
        <line x1="60" y1="30" x2="90" y2="40" stroke="white" strokeWidth="3"/>
      </svg>
    ),
    tabs: {
      About: [
        { type: 'para', text: "NxtGen (fka Student) is TiE's exclusive membership category for fostering peer learning, exploration, and early entrepreneurial exposure for young adults aged 18–32, locally and globally." },
        { type: 'para', text: "Built to bridge youth ambition with experienced leadership, NxtGen provides access to mentorship, peer learning, global exposure, and entrepreneurial resources—equipping the next generation to build impactful, scalable ventures." },
        { type: 'para', text: '$75/year' },
      ],
      'Eligibility Criteria': [
        { type: 'header', text: 'Target Audience' },
        { type: 'bullet', text: 'Aspiring entrepreneurs aged between 18 and 32 years.' },
        { type: 'header', text: 'Stage of Journey' },
        { type: 'bullet', text: 'Individuals in the ideation stage or building early-stage businesses.' },
        { type: 'header', text: 'Entry Criteria' },
        { type: 'bullet', text: 'Current participants and alumni of TYE and TiE U.' },
        { type: 'bullet', text: 'Young professionals interested in entrepreneurship.' },
        { type: 'bullet', text: 'Aspiring founders, innovators, and early-stage entrepreneurs.' },
        { type: 'bullet', text: 'Children of TiE Charter Members (CMs) and Associate Members (AMs).' },
        { type: 'header', text: 'Membership Fee' },
        { type: 'bullet', text: '$75 per year.' },
        { type: 'header', text: 'Progression Path' },
        { type: 'bullet', text: 'NxtGen → Associate Member → Charter Member (by age 32).' },
      ],
      Benefits: [
        { type: 'section', text: 'Global Community & Networking' },
        { type: 'bullet', text: 'Access to curated peer networking events, workshops, and seminars designed to broaden perspectives and foster collaboration.' },
        { type: 'bullet', text: 'Opportunities to connect with young leaders from TiE chapters worldwide, building a truly global peer network.' },
        { type: 'section', text: 'Mentorship & Personalized Guidance' },
        { type: 'bullet', text: 'Structured mentorship programs pairing members with experienced Charter Members.' },
        { type: 'bullet', text: 'Chapter-driven mentor matching, regular one-on-one sessions, and goal-oriented development plans.' },
        { type: 'bullet', text: 'Opportunities for NxtGen members to mentor school and collegiate founders through TiE youth programs.' },
        { type: 'section', text: 'Entrepreneurial Growth & Learning' },
        { type: 'bullet', text: 'Access to exclusive NxtGen sessions—workshops, expert talks, founder roundtables, and networking formats tailored for emerging entrepreneurs.' },
        { type: 'bullet', text: 'Peer Learning Circles for collaborative problem-solving, experience sharing, and cross-stage learning.' },
        { type: 'bullet', text: 'Peer Learning Directory to connect with Associate and Fellow Members for knowledge exchange.' },
        { type: 'section', text: 'Funding & Investor Readiness' },
        { type: 'bullet', text: 'Priority access to funding-preparation resources and investor readiness initiatives.' },
        { type: 'bullet', text: 'Exposure to TiE Angels, pitch prep guidance, and access to curated funding pathways.' },
        { type: 'section', text: 'Access to TiE Global Resources' },
        { type: 'bullet', text: 'Expert speaker sessions, chapter-to-chapter travel support, and introductions to members across global chapters.' },
        { type: 'bullet', text: "Members can articulate their needs, and TiE leadership will facilitate relevant support and connections." },
      ],
    },
  },
  {
    id: 'partner',
    prefix: 'TiE',
    title: 'Partner',
    bgStyle: { background: 'linear-gradient(160deg, #1a2a3e 0%, #111e2e 40%, #080f18 100%)' },
    illustration: (
      <svg viewBox="0 0 120 80" width="120" height="80" aria-hidden="true" style={{ opacity: 0.12, position: 'absolute', bottom: 0, right: 50 }}>
        <rect x="10" y="30" width="20" height="50" fill="white"/>
        <rect x="35" y="15" width="25" height="65" fill="white"/>
        <rect x="65" y="25" width="18" height="55" fill="white"/>
        <rect x="88" y="35" width="22" height="45" fill="white"/>
      </svg>
    ),
    tabs: {
      About: [
        { type: 'para', text: "TiE Partner Membership is designed for forward-thinking businesses and organizations seeking to actively engage with the TiE global entrepreneurial ecosystem. This membership provides a unique platform for corporations to connect with innovative startups, industry leaders, and TiE's extensive network of successful entrepreneurs." },
        { type: 'para', text: 'Up to two senior representatives (Director level and above) from the organization can participate, gaining access to opportunities for collaboration, thought leadership, and strategic insights.' },
        { type: 'para', text: '$500/year' },
      ],
      'Eligibility Criteria': [
        { type: 'bullet', text: 'Membership is by invitation only from existing TiE Charter Members.' },
        { type: 'bullet', text: "Prospective partner members undergo a screening process to ensure alignment with TiE's mission and values." },
        { type: 'bullet', text: 'Up to two senior representatives (Director level and above) may participate per membership.' },
        { type: 'header', text: 'Membership Fee' },
        { type: 'bullet', text: '$500 per year.' },
      ],
      Benefits: [
        { type: 'bullet', text: 'Exclusive networking sessions with entrepreneurs, investors, and industry leaders.' },
        { type: 'bullet', text: 'Opportunities for thought leadership and speaking engagements at TiE events.' },
        { type: 'bullet', text: 'Recognition for corporate contributions and engagement within the entrepreneurial ecosystem.' },
        { type: 'bullet', text: 'Organization-wide access to TiE resources, programs, and regional/global events.' },
        { type: 'bullet', text: 'Opportunities to collaborate, mentor, and give back to the startup community.' },
      ],
    },
  },
]

function renderItem(item, i) {
  switch (item.type) {
    case 'para':
      return <p key={i} className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
    case 'section':
      return (
        <p key={i} className={`text-[10px] font-black tracking-[0.22em] uppercase text-tie-red ${i > 0 ? 'mt-3' : ''}`}>
          {item.text}
        </p>
      )
    case 'header':
      return (
        <p key={i} className={`text-[11px] font-bold text-gray-800 ${i > 0 ? 'mt-3' : ''}`}>
          {item.text}
        </p>
      )
    case 'bullet':
      return (
        <div key={i} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
          <span className="text-tie-red font-bold shrink-0 mt-0.5 text-xs">✓</span>
          <span>{item.text}</span>
        </div>
      )
    case 'note':
      return (
        <div key={i} className="mt-3 border-l-2 border-tie-red/30 pl-3">
          <p className="text-xs text-gray-500 italic leading-relaxed">{item.text}</p>
        </div>
      )
    default:
      return null
  }
}

function MembershipCard({ cat }) {
  const [activeTab, setActiveTab] = useState('About')
  const content = cat.tabs[activeTab]

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 flex flex-col">
      {/* Header */}
      <div
        className="relative flex flex-col justify-end p-6 overflow-hidden"
        style={{ ...cat.bgStyle, minHeight: '220px' }}
      >
        {cat.illustration}
        <div className="relative z-10">
          <p className="text-white/55 text-xs font-semibold tracking-widest uppercase leading-none mb-1">
            {cat.prefix}
          </p>
          <p className="text-white font-black text-3xl uppercase leading-tight">
            {cat.title}
          </p>
        </div>
        <a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-5 right-5 z-10 bg-tie-red text-white text-[11px] font-black tracking-widest uppercase px-5 py-2.5 rounded-full hover:bg-tie-red-dark transition-colors whitespace-nowrap shadow-lg"
        >
          Apply Now
        </a>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-50 border-b border-gray-100">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[11px] font-semibold tracking-wide transition-colors ${
              activeTab === tab ? 'bg-tie-red text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col gap-2.5">
        {content.map((item, i) => renderItem(item, i))}
        <p className="text-[11px] text-gray-400 mt-4 pt-4 border-t border-gray-100">
          Questions? Write to{' '}
          <a href="mailto:membership@tie.org" className="text-tie-red hover:underline">
            membership@tie.org
          </a>
        </p>
      </div>
    </div>
  )
}

export default function JoinTiEPage() {
  return (
    <section className="bg-gray-50 py-20 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <p className="text-tie-red text-xs font-bold tracking-[0.3em] uppercase mb-4 text-center">
          Membership Categories
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight text-center mb-4 leading-tight">
          Join TiE Austin
        </h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto text-center leading-relaxed mb-14">
          Find the membership that fits your entrepreneurial journey.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <MembershipCard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
