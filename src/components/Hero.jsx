export default function Hero() {
  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{
        height: 'clamp(580px, 88vh, 960px)',
        backgroundImage: "url('/Hero%20(2).png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      {/* Gradient scrim — light at top, dark at bottom for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(7,16,28,0.10) 0%, rgba(7,16,28,0.15) 25%, rgba(7,16,28,0.55) 55%, rgba(7,16,28,0.90) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 max-w-5xl mx-auto w-full px-6 pt-8 pb-16">
        {/* Spacer pushes tagline to lower third */}
        <div className="flex-1" />

      </div>
    </section>
  )
}
