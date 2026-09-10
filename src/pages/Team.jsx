import { useContent } from '../contexts/ContentContext'
import EditWrapper from '../components/admin/EditWrapper'

const fields = [
  { key: 'imageSrc', label: 'Team Photo', type: 'image' },
]

export default function TeamPage() {
  const { content } = useContent()
  const { imageSrc } = content.team

  return (
    <EditWrapper sectionKey="team" title="Team Photo" fields={fields}>
      <section className="bg-white py-24 px-6 min-h-[60vh]">
        <div className="max-w-5xl mx-auto">
          <p className="text-tie-red text-xs font-bold tracking-[0.3em] uppercase mb-4 text-center">
            The People Behind TiE Austin
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight text-center mb-14 leading-tight">
            Austin Team
          </h1>
          <div className="rounded-2xl overflow-hidden shadow-sm max-w-lg mx-auto">
            <img src={imageSrc} alt="TiE Austin Team" className="w-full object-cover" />
          </div>
        </div>
      </section>
    </EditWrapper>
  )
}
