import { useState, useEffect, useRef } from 'react'

/* ── Scroll-reveal hook ───────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── Reveal wrapper component ─────────────────────────────────── */
function R({ children, delay = 0, x = 0, y = 56, className = '', style = {} }) {
  const [ref, vis] = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translate(0,0)' : `translate(${x}px,${y}px)`,
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ── Data ─────────────────────────────────────────────────────── */
const moments = [
  { num: '01', title: 'New Beginnings',  desc: 'For every door she walks through.',                    img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80' },
  { num: '02', title: 'Celebrating Her', desc: 'Birthdays, promotions, everything she\'s earned.',     img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80' },
  { num: '03', title: 'Love',            desc: 'Not just romantic. All the love.',                     img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80' },
  { num: '04', title: 'Self Growth',     desc: 'For the woman she is becoming.',                       img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500&q=80' },
  { num: '05', title: 'Milestones',      desc: 'Graduation, first salary, every achievement.',         img: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&q=80' },
  { num: '06', title: 'Distance',        desc: 'When you can\'t be there, this can.',                  img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=500&q=80' },
]

const products = [
  { img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=85', tag: 'New Beginnings', name: 'Threshold Ring',    price: '₹1,899' },
  { img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=85', tag: 'Celebrating Her', name: 'Milestone Pendant', price: '₹2,299' },
  { img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=700&q=85', tag: 'Love',            name: 'Tether Bracelet',   price: '₹1,699' },
  { img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=700&q=85', tag: 'Self Growth',     name: 'Chapter Ring',      price: '₹1,499' },
]

const testimonials = [
  { name: 'Priya M.',  city: 'Mumbai',    tag: 'New Beginnings',  text: '"I gifted the New Beginnings ring to my sister when she got her first job. She cried when she opened the box. I did too."' },
  { name: 'Arjun K.',  city: 'Bangalore', tag: 'Celebrating Her', text: '"The gift finder took me to the perfect necklace in under 2 minutes. She loved it."' },
  { name: 'Sneha R.',  city: 'Delhi',     tag: 'Self Growth',     text: '"I bought myself the self-growth bracelet after finishing therapy. It means everything to me."' },
  { name: 'Rahul D.',  city: 'Pune',      tag: 'Love',            text: '"This felt completely different from anything I\'d seen. Arrived beautifully packed."' },
]

const trustItems = [
  '925 Sterling Silver', 'BIS Hallmarked', 'Gift-Ready Packaging',
  '15-Day Returns', 'Free Shipping on ₹999+', 'Handwritten Message Cards',
]

/* ── Component ────────────────────────────────────────────────── */
export default function Home({ showPage }) {
  const [hoveredMoment, setHoveredMoment] = useState(null)

  return (
    <div style={{ background: '#FAFAF7' }}>

      {/* ════════════════════════════════════════════════════════
          HERO — split: text left · image right
      ════════════════════════════════════════════════════════ */}
      <section className="hero-split">

        {/* Left: copy */}
        <div className="hero-text-panel">
          <div
            className="fade-in delay-1"
            style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}
          >
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, transparent, #B8975A)' }} />
            <span className="section-label">925 Sterling Silver · BIS Hallmarked</span>
          </div>

          <h1
            className="font-serif fade-up delay-2"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 6rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: '#1C1C1A',
            }}
          >
            Jewellery,<br />
            as a{' '}
            <em className="italic" style={{ color: '#B8975A' }}>memory</em><br />
            you can touch.
          </h1>

          <p
            className="font-sans fade-up delay-3"
            style={{
              fontSize: '15px',
              color: '#6B6560',
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: '320px',
              marginTop: '32px',
            }}
          >
            Each piece is designed around a moment in her life —
            not a category in a catalogue.
          </p>

          <div
            className="fade-up delay-4"
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '48px' }}
          >
            <button onClick={() => showPage('shop')} className="btn-dark">
              Shop by Moment
            </button>
            <button onClick={() => showPage('finder')} className="btn-ghost">
              Gift Finder →
            </button>
          </div>

          {/* Scroll hint */}
          <div
            className="fade-in delay-5"
            style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '64px' }}
          >
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(184,151,90,0.6), transparent)' }} />
            <span className="section-label" style={{ color: 'rgba(107,101,96,0.5)' }}>Scroll</span>
          </div>
        </div>

        {/* Right: image */}
        <div className="hero-img-panel fade-in delay-2">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=90"
            alt="Memoir jewellery"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
          {/* Ghost number watermark */}
          <div
            className="font-serif"
            style={{
              position: 'absolute', bottom: '40px', right: '40px',
              fontSize: 'clamp(100px, 16vw, 200px)',
              lineHeight: 1, color: 'rgba(250,250,247,0.1)',
              letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none',
            }}
          >
            01
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MARQUEE TRUST STRIP
      ════════════════════════════════════════════════════════ */}
      <div
        className="marquee-wrap"
        style={{ background: '#1C1C1A', overflow: 'hidden', padding: '22px 0', borderTop: '1px solid #242422' }}
      >
        <div className="marquee-track">
          {[...trustItems, ...trustItems].map((t, i) => (
            <span
              key={i}
              className="section-label"
              style={{
                padding: '0 40px',
                color: 'rgba(184,151,90,0.6)',
                fontSize: '8px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {t}
              {i < [...trustItems, ...trustItems].length - 1 && (
                <span style={{ marginLeft: '40px', color: 'rgba(184,151,90,0.25)' }}>✦</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BOLD BRAND STATEMENT  (Shupatto-style full-bleed copy)
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: '#1C1C1A', padding: 'clamp(80px, 12vw, 160px) 0', overflow: 'hidden' }}>
        <div className="wrap">
          <R>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 8rem)',
                lineHeight: 0.93,
                letterSpacing: '-0.035em',
                color: '#FAFAF7',
                fontWeight: 400,
              }}
            >
              Not a product.
              <br />
              <em className="italic" style={{ color: '#B8975A' }}>A moment.</em>
              <br />
              She'll wear forever.
            </h2>
          </R>
          <R delay={0.18} style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #B8975A)' }} />
            <p
              className="font-sans"
              style={{ fontSize: '13px', color: '#6B6560', fontWeight: 300, letterSpacing: '0.04em' }}
            >
              Every Memoir piece is designed around a specific moment in a woman's life.
            </p>
          </R>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SHOP BY MOMENT — large editorial list
      ════════════════════════════════════════════════════════ */}
      <section className="s-pad">
        <div className="wrap">

          <R style={{ marginBottom: '72px' }}>
            <span className="section-label mb-5 block">Curated by occasion</span>
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1, color: '#1C1C1A' }}
            >
              Shop by Moment
            </h2>
          </R>

          <div style={{ borderTop: '1px solid rgba(184,151,90,0.18)' }}>
            {moments.map((m, i) => (
              <R key={m.title} delay={i * 0.055}>
                <button
                  onClick={() => showPage('collection')}
                  onMouseEnter={() => setHoveredMoment(m.title)}
                  onMouseLeave={() => setHoveredMoment(null)}
                  className="moment-row"
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: 'clamp(20px, 3vw, 36px) 0',
                      gap: '28px',
                      transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                      transform: hoveredMoment === m.title ? 'translateX(10px)' : 'translateX(0)',
                    }}
                  >
                    {/* Number */}
                    <span
                      className="font-sans"
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.22em',
                        color: hoveredMoment === m.title ? '#B8975A' : 'rgba(184,151,90,0.35)',
                        width: '22px',
                        flexShrink: 0,
                        transition: 'color 0.3s',
                      }}
                    >
                      {m.num}
                    </span>

                    {/* Title */}
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                        letterSpacing: '-0.025em',
                        lineHeight: 1,
                        color: hoveredMoment === m.title ? '#B8975A' : '#1C1C1A',
                        flex: 1,
                        transition: 'color 0.3s',
                      }}
                    >
                      {m.title}
                    </h3>

                    {/* Description — desktop only */}
                    <p
                      className="moment-desc font-sans"
                      style={{ fontSize: '13px', color: '#9A9592', fontWeight: 300, maxWidth: '260px' }}
                    >
                      {m.desc}
                    </p>

                    {/* Arrow */}
                    <span
                      style={{
                        fontSize: '22px',
                        color: '#B8975A',
                        flexShrink: 0,
                        opacity: hoveredMoment === m.title ? 1 : 0.25,
                        transition: 'opacity 0.3s, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                        transform: hoveredMoment === m.title ? 'translateX(6px)' : 'translateX(0)',
                      }}
                    >
                      →
                    </span>
                  </div>
                </button>
              </R>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          DUAL CTA  (gift finder + self-purchase)
      ════════════════════════════════════════════════════════ */}
      <section style={{ paddingBottom: 'clamp(56px, 8vw, 100px)' }}>
        <div
          className="wrap md-grid-2"
          style={{ display: 'grid', gap: '3px' }}
        >
          {/* Dark card */}
          <R>
            <div
              className="card-pad"
              style={{
                background: '#1C1C1A',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'url(https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=50)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: 0.07,
                }}
              />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span className="section-label mb-5 block" style={{ color: 'rgba(154,149,146,0.6)' }}>For the gifter</span>
                <h3
                  className="font-serif"
                  style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: '#FAFAF7', lineHeight: 1.15 }}
                >
                  Not sure what to get her?<br />
                  <em className="italic" style={{ color: '#B8975A' }}>We'll help.</em>
                </h3>
                <p
                  className="font-sans"
                  style={{ fontSize: '13px', color: '#9A9592', fontWeight: 300, marginTop: '14px', maxWidth: '280px', lineHeight: 1.65 }}
                >
                  Answer 3 questions. Get 2–3 pieces that match the moment.
                </p>
              </div>
              <button
                onClick={() => showPage('finder')}
                className="btn-gold"
                style={{ position: 'relative', zIndex: 1, marginTop: '32px', alignSelf: 'flex-start' }}
              >
                Find the Perfect Gift →
              </button>
            </div>
          </R>

          {/* Light card */}
          <R delay={0.1}>
            <div
              className="card-pad"
              style={{
                background: '#F5F0E8',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #EDE5D8',
              }}
            >
              <div>
                <span className="section-label mb-5 block">For you</span>
                <h3
                  className="font-serif"
                  style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: '#1C1C1A', lineHeight: 1.15 }}
                >
                  Something happened.<br />
                  <em className="italic" style={{ color: '#B8975A' }}>You deserve to mark it.</em>
                </h3>
                <p
                  className="font-sans"
                  style={{ fontSize: '13px', color: '#6B6560', fontWeight: 300, marginTop: '14px', maxWidth: '280px', lineHeight: 1.65 }}
                >
                  No reason needed. The right piece for where you are, who you're becoming.
                </p>
              </div>
              <button
                onClick={() => showPage('shop')}
                className="btn-dark"
                style={{ marginTop: '32px', alignSelf: 'flex-start' }}
              >
                Shop the Collection
              </button>
            </div>
          </R>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          BESTSELLERS — magazine editorial grid
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: '#F5F0E8' }}>
        <R>
          <div
            style={{
              padding: 'clamp(40px, 6vw, 72px) clamp(24px, 4vw, 48px) 0',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              maxWidth: '1280px',
              margin: '0 auto',
            }}
          >
            <div>
              <span className="section-label mb-3 block">Most loved</span>
              <h2
                className="font-serif"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em', color: '#1C1C1A', lineHeight: 1 }}
              >
                Bestsellers
              </h2>
            </div>
            <button onClick={() => showPage('shop')} className="btn-text md-show">
              View all
            </button>
          </div>
        </R>

        {/* Magazine grid — no outer wrapper needed, goes edge-to-edge */}
        <div className="product-editorial" style={{ marginTop: '32px' }}>
          {products.map((p, i) => (
            <button
              key={p.name}
              onClick={() => showPage('product')}
              className="product-card text-left group"
              style={{ background: '#EDE5D8', display: 'block' }}
            >
              <div
                style={{
                  aspectRatio: i === 0 ? '2/3' : '3/4',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="card-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Hover overlay */}
                <div
                  className="card-overlay"
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(28,28,26,0.78) 0%, transparent 55%)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    padding: '20px',
                  }}
                >
                  <h3 className="font-serif" style={{ fontSize: '1.05rem', color: '#FAFAF7', letterSpacing: '-0.01em', marginBottom: '6px' }}>
                    {p.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="font-sans" style={{ fontSize: '13px', color: '#B8975A', fontWeight: 500 }}>{p.price}</span>
                    <span
                      className="tag"
                      style={{ background: 'rgba(184,151,90,0.18)', borderColor: 'rgba(184,151,90,0.35)', color: '#D4B483', fontSize: '7px' }}
                    >
                      {p.tag}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          STORY — dark, full-bleed
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: '#1C1C1A', padding: 'clamp(80px, 10vw, 140px) 0' }}>
        <div className="wrap">
          <div
            className="md-grid-2"
            style={{ display: 'grid', gap: 'clamp(40px, 7vw, 96px)', alignItems: 'center' }}
          >
            {/* Text */}
            <R>
              <span className="section-label mb-6 block" style={{ color: 'rgba(184,151,90,0.7)' }}>
                Why Memoir exists
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.08,
                  color: '#FAFAF7',
                  marginBottom: '40px',
                }}
              >
                Jewellery shouldn't just look beautiful. It should{' '}
                <em className="italic" style={{ color: '#B8975A' }}>mean something.</em>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '40px' }}>
                <p className="font-sans" style={{ fontSize: '14px', color: '#9A9592', fontWeight: 300, lineHeight: 1.85 }}>
                  Most jewellery brands organise by product type — rings, necklaces, bracelets.
                  We found that limiting. People don't buy jewellery because they need a ring.
                </p>
                <p className="font-sans" style={{ fontSize: '14px', color: '#EDE5D8', fontWeight: 300, lineHeight: 1.85 }}>
                  They buy it because something happened. A new job. A birthday that felt like
                  a turning point. A moment of finally choosing themselves.
                </p>
              </div>
              <button className="btn-text btn-text-light">Read our story</button>
            </R>

            {/* Image */}
            <R delay={0.18}>
              <div style={{ position: 'relative' }}>
                <div style={{ aspectRatio: '3/4', overflow: 'hidden', maxHeight: '560px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=88"
                    alt="Memoir"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, display: 'block' }}
                  />
                </div>
                <div
                  className="story-quote"
                  style={{
                    position: 'absolute', bottom: '-28px', left: '-28px',
                    background: '#FAFAF7', padding: '28px 32px', maxWidth: '256px',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="gold-line mb-5" />
                  <p className="font-serif italic" style={{ fontSize: '14px', color: '#1C1C1A', lineHeight: 1.65 }}>
                    "Not just beautiful. Meaningful."
                  </p>
                  <p className="font-sans mt-3" style={{ fontSize: '10px', letterSpacing: '0.14em', color: '#9A9592' }}>
                    — THE MEMOIR PROMISE
                  </p>
                </div>
              </div>
            </R>
          </div>

          {/* Stats row */}
          <R delay={0.12} style={{ marginTop: 'clamp(72px, 10vw, 120px)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                borderTop: '1px solid rgba(184,151,90,0.12)',
              }}
            >
              {[
                { num: '925', label: 'Sterling Silver' },
                { num: 'BIS', label: 'Hallmarked Quality' },
                { num: '15',  label: 'Day Return Policy' },
              ].map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    padding: 'clamp(32px, 5vw, 56px) 24px',
                    textAlign: 'center',
                    borderRight: i < 2 ? '1px solid rgba(184,151,90,0.12)' : 'none',
                  }}
                >
                  <div
                    className="font-serif"
                    style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.03em', color: '#B8975A' }}
                  >
                    {s.num}
                  </div>
                  <div className="section-label mt-3" style={{ color: 'rgba(154,149,146,0.55)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════════ */}
      <section className="s-pad" style={{ background: '#FAFAF7' }}>
        <div className="wrap">
          <R style={{ textAlign: 'center', marginBottom: '72px' }}>
            <span className="section-label mb-4 block">What people say</span>
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em', color: '#1C1C1A' }}
            >
              Real moments.<br />
              <em className="italic" style={{ color: '#B8975A' }}>Real stories.</em>
            </h2>
            <div className="gold-line mx-auto mt-8" />
          </R>

          <div
            className="md-grid-2"
            style={{ display: 'grid', gap: '3px' }}
          >
            {testimonials.map((t, i) => (
              <R key={t.name} delay={i * 0.07}>
                <div
                  className="testimonial-card"
                  style={{
                    background: '#F5F0E8',
                    padding: 'clamp(28px, 4vw, 48px)',
                    borderTop: '2px solid rgba(184,151,90,0.2)',
                  }}
                >
                  <p
                    className="font-serif italic"
                    style={{
                      fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                      color: '#1C1C1A',
                      lineHeight: 1.7,
                      letterSpacing: '-0.01em',
                      marginBottom: '32px',
                    }}
                  >
                    {t.text}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p className="font-sans" style={{ fontSize: '13px', fontWeight: 500, color: '#1C1C1A' }}>{t.name}</p>
                      <p className="font-sans" style={{ fontSize: '11px', color: '#9A9592' }}>{t.city}</p>
                    </div>
                    <span className="tag">{t.tag}</span>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          GIFT FINDER CTA — Shupatto-style bold asymmetric
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: '#F5F0E8', borderTop: '1px solid #EDE5D8', overflow: 'hidden' }}>
        <div className="wrap" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(24px, 4vw, 48px)' }}>
          <R>
            <div
              className="md-grid-2"
              style={{ display: 'grid', alignItems: 'flex-end', gap: 'clamp(40px, 6vw, 80px)' }}
            >
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.04em',
                  color: '#1C1C1A',
                }}
              >
                Not sure<br />
                where to<br />
                <em className="italic" style={{ color: '#B8975A' }}>start?</em>
              </h2>
              <div>
                <p
                  className="font-sans"
                  style={{ fontSize: '15px', color: '#6B6560', fontWeight: 300, lineHeight: 1.75, marginBottom: '40px', maxWidth: '320px' }}
                >
                  Our Gift Finder takes you from "I have no idea"
                  to the perfect piece in under 2 minutes.
                </p>
                <button onClick={() => showPage('finder')} className="btn-dark">
                  Find the Perfect Gift →
                </button>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════ */}
      <footer style={{ background: '#1C1C1A', color: '#FAFAF7' }}>
        <div className="wrap footer-inner" style={{ paddingTop: '80px', paddingBottom: '40px' }}>

          <div className="footer-cols" style={{ display: 'grid', gap: '40px', marginBottom: '64px' }}>

            {/* Brand */}
            <div>
              <h2 className="font-serif mb-4" style={{ fontSize: '2rem', letterSpacing: '-0.01em' }}>Memoir</h2>
              <p className="font-sans italic mb-6" style={{ fontSize: '14px', color: '#EDE5D8', fontWeight: 300 }}>
                Jewellery, as a memory you can touch.
              </p>
              <p className="font-sans" style={{ fontSize: '12px', color: '#6B6560', fontWeight: 300, maxWidth: '280px', lineHeight: 1.7 }}>
                925 sterling silver, BIS hallmarked. Designed for life's moments.
              </p>
              <div style={{ display: 'flex', gap: '24px', marginTop: '32px' }}>
                <button className="btn-text btn-text-light" style={{ fontSize: '9px' }}>Instagram</button>
                <button className="btn-text btn-text-light" style={{ fontSize: '9px' }}>WhatsApp</button>
              </div>
            </div>

            {/* Shop */}
            <div>
              <p className="section-label mb-6" style={{ color: 'rgba(154,149,146,0.55)' }}>Shop</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['New Beginnings', 'Celebrating Her', 'Love', 'Self Growth', 'Milestones', 'Find a Gift →'].map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => showPage(l.includes('Gift') ? 'finder' : 'collection')}
                      className="font-sans"
                      style={{ fontSize: '13px', fontWeight: 300, color: '#EDE5D8', background: 'none', cursor: 'pointer', transition: 'color 0.25s' }}
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <p className="section-label mb-6" style={{ color: 'rgba(154,149,146,0.55)' }}>Information</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Our Story', 'Jewellery Care', 'Shipping & Returns', 'Size Guide', 'Contact Us'].map((l) => (
                  <li key={l}>
                    <a href="#" className="font-sans" style={{ fontSize: '13px', fontWeight: 300, color: '#EDE5D8', transition: 'color 0.25s' }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trust grid */}
          <div
            className="footer-trust"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
              padding: '40px 0',
              borderTop: '1px solid rgba(184,151,90,0.1)',
            }}
          >
            {[
              { icon: '✦', title: '925 Sterling Silver', sub: 'BIS Hallmarked' },
              { icon: '◆', title: 'Gift Packaging',      sub: 'Every order, always' },
              { icon: '♡', title: 'Personal Message',    sub: 'Handwritten-feel cards' },
              { icon: '↩', title: 'Easy Returns',        sub: '15-day policy' },
            ].map((f) => (
              <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: '#B8975A', fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <p className="font-sans" style={{ fontSize: '11px', fontWeight: 500, color: '#EDE5D8' }}>{f.title}</p>
                  <p className="font-sans" style={{ fontSize: '10px', marginTop: '2px', color: '#6B6560' }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: '1px solid rgba(184,151,90,0.07)',
              paddingTop: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <p className="font-sans" style={{ fontSize: '11px', color: '#6B6560' }}>
              © 2025 Memoir Jewellery. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '32px' }}>
              {['Privacy Policy', 'Terms of Service'].map((l) => (
                <a key={l} href="#" className="font-sans" style={{ fontSize: '11px', color: '#6B6560', transition: 'color 0.25s' }}>{l}</a>
              ))}
            </div>
          </div>

        </div>
      </footer>

    </div>
  )
}
