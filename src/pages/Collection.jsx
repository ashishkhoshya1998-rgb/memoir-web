export default function Collection({ showPage }) {
  return (
    <div>
      {/* Header */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', background: '#FAFAF7' }}>
        <div className="wrap">
          <button onClick={() => showPage('shop')} className="btn-text mb-10" style={{ fontSize: '9px' }}>
            ← All Moments
          </button>

          <div className="grid md:grid-cols-2 gap-16 items-end">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span style={{ fontSize: '2rem', color: '#B8975A' }}>✦</span>
                <span className="section-label">The Collection</span>
              </div>
              <h1
                className="font-serif text-[#1C1C1A]"
                style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.0 }}
              >
                New<br /><em className="italic" style={{ color: '#B8975A' }}>Beginnings</em>
              </h1>
            </div>
            <div>
              <p className="font-sans text-[#6B6560] leading-relaxed mb-8" style={{ fontSize: '14px', fontWeight: 300 }}>
                She just landed her dream job, moved cities, or started something new. This is how you say "I see you, I'm proud of you."
              </p>
              <div className="flex gap-4">
                <button className="btn-dark" style={{ padding: '12px 24px', fontSize: '10px' }}>I'm buying as a gift</button>
                <button className="btn-ghost" style={{ padding: '11px 24px', fontSize: '10px' }}>I'm buying for myself</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <div style={{ background: '#1C1C1A', padding: '60px 32px' }}>
        <div className="wrap-sm text-center">
          <div className="gold-line mx-auto mb-8" />
          <blockquote
            className="font-serif text-[#EDE5D8] italic leading-relaxed"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', letterSpacing: '-0.01em' }}
          >
            "For every door she walks through. For every beginning that required courage."
          </blockquote>
        </div>
      </div>

      {/* Products */}
      <section style={{ padding: '80px 0 120px' }}>
        <div className="wrap">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <button onClick={() => showPage('product')} className="product-card text-left">
              <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '3/4', background: '#F5F0E8' }}>
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=85"
                  alt="Threshold Ring"
                  className="card-img w-full h-full object-cover"
                />
                <div className="card-overlay absolute inset-0 flex items-end p-5" style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.65) 0%, transparent 60%)' }}>
                  <span style={{ color: '#FAFAF7', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'DM Sans', borderBottom: '1px solid rgba(250,250,247,0.4)', paddingBottom: '2px' }}>View piece →</span>
                </div>
                <div className="absolute top-3 left-3"><span className="tag">New Beginnings</span></div>
              </div>
              <h3 className="font-serif text-[#1C1C1A] mb-1" style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>Threshold Ring</h3>
              <p className="font-sans text-[#9A9592] mb-2 italic" style={{ fontSize: '11px', fontWeight: 300 }}>For every beginning that required courage.</p>
              <span className="font-sans text-[#1C1C1A]" style={{ fontSize: '13px', fontWeight: 500 }}>₹1,899</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
