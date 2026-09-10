import { useContent } from '../contexts/ContentContext'
import EditWrapper from '../components/admin/EditWrapper'

const fields = [
  { key: 'email',       label: 'Email address', type: 'text'     },
  { key: 'description', label: 'Description',   type: 'textarea' },
]

export default function ContactPage() {
  const { content } = useContent()
  const { email, description } = content.contact

  return (
    <EditWrapper sectionKey="contact" title="Contact" fields={fields}>
      <section className="bg-white min-h-[80vh] flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-sm">
          <p className="text-tie-red text-xs font-bold tracking-[0.3em] uppercase mb-5">
            Contact
          </p>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight leading-tight mb-6">
            Get in Touch
          </h1>
          <div className="w-8 h-px bg-tie-red mx-auto mb-8" />
          <p className="text-gray-500 text-sm leading-relaxed mb-10">
            {description}
          </p>
          <a
            href={`mailto:${email}`}
            className="text-tie-red font-semibold text-[15px] hover:underline underline-offset-4 break-all"
          >
            {email}
          </a>
        </div>
      </section>
    </EditWrapper>
  )
}
