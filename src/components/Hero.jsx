import { useContent } from '../contexts/ContentContext'
import EditWrapper from './admin/EditWrapper'

const fields = [
  { key: 'imageSrc', label: 'Hero Image', type: 'image' },
]

export default function Hero() {
  const { content } = useContent()
  const { imageSrc } = content.hero

  return (
    <EditWrapper sectionKey="hero" title="Hero Image" fields={fields}>
      <section
        className="relative flex flex-col overflow-hidden"
        style={{
          height: 'clamp(580px, 88vh, 960px)',
          backgroundImage: `url('${imageSrc}')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundColor: '#f0efed',
        }}
      >
        <div className="relative z-10 flex flex-col flex-1 max-w-5xl mx-auto w-full px-6 pt-8 pb-16">
          <div className="flex-1" />
        </div>
      </section>
    </EditWrapper>
  )
}
