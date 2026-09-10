import { useContent } from '../contexts/ContentContext'
import EditWrapper from './admin/EditWrapper'

const JOIN_URL =
  'https://creatorapp.zohopublic.com/tie_dev/chapters/page-embed/TiE_Member_Details/wbegNfNZCbUwdv6jTpxMeK4HtB0KnTkKqVM63wEZzQ1yBx6pqybCB0kv3geqGsvDZASaa6K3XAkkAZbmYfC5kG3ZHQkAj7CabE34?Chapter_Name=4189632000003403039'

const fields = [
  { key: 'heading',  label: 'Heading',     type: 'text'     },
  { key: 'body',     label: 'Body text',   type: 'textarea' },
]

export default function JoinCTA() {
  const { content } = useContent()
  const { heading, body } = content.joinCTA

  return (
    <EditWrapper sectionKey="joinCTA" title="Join CTA" fields={fields}>
      <section id="membership" className="py-24 px-6" style={{ background: '#7D1426' }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white/60 text-xs font-bold tracking-[0.3em] uppercase mb-4">Get Involved</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-5">
            {heading}
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-md mx-auto mb-10">
            {body}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={JOIN_URL}
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
    </EditWrapper>
  )
}
