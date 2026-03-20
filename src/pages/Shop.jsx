const products = [
  { img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=85', tag: 'New Beginnings', name: 'Threshold Ring', desc: 'For every beginning that required courage.', price: '₹1,899' },
  { img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=85', tag: 'Celebrating Her', name: 'Milestone Pendant', desc: 'For the achievement only she fully understands.', price: '₹2,299' },
  { img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=700&q=85', tag: 'Love', name: 'Tether Bracelet', desc: 'For the love you don\'t say enough.', price: '₹1,699' },
  { img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=700&q=85', tag: 'Self Growth', name: 'Chapter Ring', desc: 'For the quiet revolution happening inside you.', price: '₹1,499' },
]

const filters = ['All Pieces', 'New Beginnings', 'Celebrating Her', 'Love', 'Self Growth', 'Milestones', 'Distance']

export default function Shop({ showPage }) {
  return (
    <div>
      {/* Header */}
      <section style={{ background: '#FAFAF7', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="wrap">
          <span className="section-label mb-5 block">The full collection</span>
          <h1 className="font-serif text-[#1C1C1A]" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.0 }}>
            Shop by<br /><em className="italic" style={{ color: '#B8975A' }}>Moment</em>
          </h1>
          <p className="font-sans text-[#9A9592] leading-relaxed" style={{ fontSize: '14px', fontWeight: 300, marginTop: '24px', maxWidth: '380px' }}>
            We don't organise by product type. We organise by what's happening in her life.
          </p>
          <div className="flex flex-wrap" style={{ gap: '16px', marginTop: '40px' }}>
            <button className="btn-dark" style={{ padding: '12px 24px', fontSize: '10px' }}>I'm buying for someone</button>
            <button className="btn-ghost" style={{ padding: '11px 24px', fontSize: '10px' }}>I'm buying for myself</button>
          </div>
        </div>
      </section>

      {/* Sticky filter nav */}
      <div
        className="sticky z-40"
        style={{
          top: '65px',
          background: 'rgba(250,250,247,0.97)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(184,151,90,0.12)',
          padding: '14px 0',
        }}
      >
        <div className="wrap flex" style={{ gap: '12px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {filters.map((f, i) => (
            <button
              key={f}
              className="flex-shrink-0 font-sans transition-all"
              style={{
                fontSize: '9px',
                fontWeight: i === 0 ? 600 : 400,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '8px 16px',
                background: i === 0 ? '#1C1C1A' : 'transparent',
                color: i === 0 ? '#FAFAF7' : '#6B6560',
                border: i === 0 ? '1px solid #1C1C1A' : '1px solid rgba(184,151,90,0.2)',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Gift finder nudge */}
      <div style={{ background: '#F0E8E0', borderBottom: '1px solid #EDE5D8', padding: '24px 0' }}>
        <div className="wrap flex flex-col md-flex-row md-items-center md-justify-between" style={{ gap: '16px' }}>
          <div>
            <p className="font-serif text-[#1C1C1A]" style={{ fontSize: '1.2rem' }}>
              Not sure what to get? <em className="italic" style={{ color: '#B8975A' }}>We'll help you find it.</em>
            </p>
            <p className="font-sans text-[#6B6560]" style={{ fontSize: '12px', fontWeight: 300, marginTop: '4px' }}>
              Answer 3 questions → 2–3 perfectly matched pieces in under 2 minutes.
            </p>
          </div>
          <button onClick={() => showPage('finder')} className="btn-dark flex-shrink-0" style={{ padding: '12px 24px', fontSize: '10px' }}>
            Use the Gift Finder →
          </button>
        </div>
      </div>

      {/* Products */}
      <section style={{ padding: '80px 0 120px' }}>
        <div className="wrap">
          <div className="flex items-center justify-between" style={{ marginBottom: '40px' }}>
            <p className="font-sans text-[#9A9592]" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>4 pieces</p>
            <select
              className="font-sans text-[#1C1C1A] focus:outline-none"
              style={{
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: 'transparent',
                border: '1px solid rgba(184,151,90,0.2)',
                padding: '8px 16px',
                borderRadius: '999px',
              }}
            >
              <option>Best Selling</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          <div className="md-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {products.map((p) => (
              <button
                key={p.name}
                onClick={() => showPage('product')}
                className="product-card text-left group"
              >
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '3/4', background: '#F5F0E8' }}>
                  <img src={p.img} alt={p.name} className="card-img w-full h-full object-cover" />
                  <div className="card-overlay absolute inset-0 flex items-end p-5" style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.65) 0%, transparent 60%)' }}>
                    <span style={{ color: '#FAFAF7', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'DM Sans', borderBottom: '1px solid rgba(250,250,247,0.4)', paddingBottom: '2px' }}>View piece →</span>
                  </div>
                  <div className="absolute top-3 left-3"><span className="tag">{p.tag}</span></div>
                </div>
                <h3 className="font-serif text-[#1C1C1A] mb-1" style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>{p.name}</h3>
                <p className="font-sans text-[#9A9592] mb-2" style={{ fontSize: '11px', fontWeight: 300, fontStyle: 'italic' }}>{p.desc}</p>
                <span className="font-sans text-[#1C1C1A]" style={{ fontSize: '13px', fontWeight: 500 }}>{p.price}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
