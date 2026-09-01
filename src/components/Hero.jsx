export default function Hero() {
  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{
        height: 'clamp(580px, 88vh, 960px)',
        backgroundImage: "url('/Hero%20(3).png')",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundColor: '#f0efed',
      }}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 max-w-5xl mx-auto w-full px-6 pt-8 pb-16">
        {/* Spacer pushes tagline to lower third */}
        <div className="flex-1" />

      </div>
    </section>
  )
}
