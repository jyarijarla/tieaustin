export default function SectionRenderer({ section }) {
  const { type, data } = section

  if (type === 'heading') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{data.text}</h2>
        {data.subtext && <p className="mt-3 text-gray-500">{data.subtext}</p>}
      </div>
    )
  }

  if (type === 'text') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-8">
        {data.heading && <h3 className="text-xl font-black text-gray-900 mb-3">{data.heading}</h3>}
        <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{data.body}</p>
      </div>
    )
  }

  if (type === 'image') {
    if (!data.src) return null
    return (
      <div className="max-w-3xl mx-auto px-6 py-8">
        <img src={data.src} alt={data.caption || ''} className="w-full rounded-xl" />
        {data.caption && <p className="text-center text-xs text-gray-400 mt-2">{data.caption}</p>}
      </div>
    )
  }

  if (type === 'stats') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {data.map((s, i) => (
          <div key={i}>
            <p className="text-3xl font-black text-tie-red">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'cards') {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((c, i) => (
          <div key={i} className="border border-gray-100 rounded-2xl p-6">
            {c.image && <img src={c.image} alt="" className="w-full h-32 object-cover rounded-lg mb-4" />}
            <p className="font-black text-gray-900 mb-2">{c.title}</p>
            <p className="text-sm text-gray-500">{c.desc}</p>
          </div>
        ))}
      </div>
    )
  }

  return null
}
