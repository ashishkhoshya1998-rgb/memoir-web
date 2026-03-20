import { useState } from 'react'

const thumbs = [
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=90',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=90',
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=90',
]

const specs = [
  { label: 'Material', value: '925 Sterling Silver' },
  { label: 'Plating', value: 'Premium Rhodium (0.5–1 micron)' },
  { label: 'Certification', value: 'BIS Hallmarked' },
  { label: 'Packaging', value: 'Gift-ready box + moment card' },
]

export default function Product({ showPage }) {
  const [activeImg, setActiveImg] = useState(0)
  const [giftOn, setGiftOn] = useState(false)
  const [cartState, setCartState] = useState('idle')

  const handleCart = () => {
    setCartState('adding')
    setTimeout(() => {
      setCartState('added')
      setTimeout(() => setCartState('idle'), 2500)
    }, 800)
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ paddingTop: '100px', paddingBottom: '0' }}>
        <div className="wrap py-4" style={{ borderBottom: '1px solid rgba(184,151,90,0.1)' }}>
          <nav className="flex items-center gap-3 font-sans" style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#9A9592' }}>
            {[['home', 'Home'], ['shop', 'Shop'], ['collection', 'New Beginnings']].map(([page, label]) => (
              <span key={page} className="flex items-center gap-3">
                <button onClick={() => showPage(page)} className="hover:text-[#1C1C1A] transition-colors uppercase">{label}</button>
                <span style={{ opacity: 0.3 }}>·</span>
              </span>
            ))}
            <span className="text-[#1C1C1A] uppercase">Threshold Ring</span>
          </nav>
        </div>
      </div>

      {/* Main product */}
      <section style={{ padding: '60px 0 100px' }}>
        <div className="wrap">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">

          {/* Gallery */}
          <div>
            {/* Main image */}
            <div
              className="relative overflow-hidden mb-3"
              style={{ aspectRatio: '1/1', background: '#F5F0E8' }}
            >
              <img
                src={thumbs[activeImg]}
                alt="Threshold Ring"
                className="w-full h-full object-cover transition-opacity duration-400"
              />
              <div
                className="absolute bottom-5 right-5 font-sans"
                style={{
                  background: 'rgba(250,250,247,0.9)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 14px',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  color: '#1C1C1A',
                }}
              >
                {activeImg + 1} / {thumbs.length}
              </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2">
              {thumbs.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    width: '80px',
                    height: '80px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: `2px solid ${i === activeImg ? '#B8975A' : 'transparent'}`,
                    opacity: i === activeImg ? 1 : 0.5,
                    transition: 'all 0.25s ease',
                  }}
                >
                  <img src={src.replace('w=900', 'w=200')} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <button onClick={() => showPage('collection')} className="self-start mb-6">
              <span className="tag">✦ New Beginnings</span>
            </button>

            <h1
              className="font-serif text-[#1C1C1A] leading-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
            >
              Threshold Ring
            </h1>
            <p className="font-sans text-[#9A9592] italic mb-6 leading-relaxed" style={{ fontSize: '14px', fontWeight: 300 }}>
              For every beginning that required courage.
            </p>

            <div className="mb-8" style={{ borderBottom: '1px solid rgba(184,151,90,0.12)', paddingBottom: '24px' }}>
              <span className="font-serif text-[#1C1C1A]" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em' }}>₹1,899</span>
            </div>

            <p className="font-sans text-[#6B6560] leading-relaxed mb-8" style={{ fontSize: '14px', fontWeight: 300 }}>
              For the woman stepping into something new. Minimal. Meaningful. Made to be worn every day.
            </p>

            {/* Specs */}
            <div style={{ background: '#F5F0E8', padding: '20px 24px', marginBottom: '24px' }}>
              {specs.map((s, i) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between font-sans"
                  style={{
                    fontSize: '11px',
                    padding: '10px 0',
                    borderBottom: i < specs.length - 1 ? '1px solid rgba(184,151,90,0.1)' : 'none',
                  }}
                >
                  <span style={{ color: '#9A9592', letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '9px', fontWeight: 500 }}>{s.label}</span>
                  <span style={{ color: '#1C1C1A', fontWeight: 400 }}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Gift toggle */}
            <button
              onClick={() => setGiftOn(!giftOn)}
              className="w-full flex items-center justify-between transition-all duration-300"
              style={{
                padding: '18px 20px',
                marginBottom: '12px',
                background: giftOn ? 'rgba(184,151,90,0.06)' : 'transparent',
                border: `1px solid ${giftOn ? 'rgba(184,151,90,0.35)' : 'rgba(184,151,90,0.15)'}`,
              }}
            >
              <div className="flex items-center gap-3">
                <span style={{ fontSize: '16px' }}>{giftOn ? '🎁' : '♡'}</span>
                <div className="text-left">
                  <p className="font-sans text-[#1C1C1A]" style={{ fontSize: '12px', fontWeight: 500 }}>
                    {giftOn ? 'Sending as a gift' : 'Send as a gift?'}
                  </p>
                  <p className="font-sans text-[#9A9592]" style={{ fontSize: '11px', fontWeight: 300, marginTop: '2px' }}>
                    {giftOn ? 'Message + packaging included' : 'Add a personal message, hide the price'}
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: '40px', height: '22px',
                  background: giftOn ? '#B8975A' : '#EDE5D8',
                  borderRadius: '99px',
                  position: 'relative',
                  transition: 'background 0.3s ease',
                  flexShrink: 0,
                }}
              >
                <div style={{
                  width: '16px', height: '16px',
                  background: '#fff',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '3px',
                  left: giftOn ? '21px' : '3px',
                  transition: 'left 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                }} />
              </div>
            </button>

            {giftOn && (
              <div style={{ background: '#F0E8E0', padding: '24px', border: '1px solid rgba(184,151,90,0.15)', marginBottom: '12px' }}>
                <div className="mb-4">
                  <label className="font-sans text-[#1C1C1A] block mb-2" style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>Recipient's name</label>
                  <input
                    type="text"
                    placeholder="Who is this for?"
                    className="w-full font-sans text-[#1C1C1A] focus:outline-none"
                    style={{ background: '#FAFAF7', border: '1px solid #EDE5D8', padding: '12px 16px', fontSize: '13px' }}
                  />
                </div>
                <div className="mb-4">
                  <label className="font-sans text-[#1C1C1A] block mb-2" style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>Personal message</label>
                  <textarea
                    placeholder="Write something from the heart..."
                    rows={3}
                    className="w-full font-sans text-[#1C1C1A] focus:outline-none resize-none"
                    style={{ background: '#FAFAF7', border: '1px solid #EDE5D8', padding: '12px 16px', fontSize: '13px' }}
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div style={{ width: '16px', height: '16px', background: '#1C1C1A', border: '1px solid #1C1C1A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#FAFAF7', fontSize: '10px' }}>✓</span>
                  </div>
                  <span className="font-sans text-[#6B6560]" style={{ fontSize: '12px', fontWeight: 300 }}>Hide price on the packing slip</span>
                </label>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={handleCart}
              disabled={cartState === 'adding'}
              className="w-full font-sans font-medium transition-all duration-300 mb-3"
              style={{
                padding: '18px',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                background: cartState === 'added' ? '#15803d' : '#1C1C1A',
                color: '#FAFAF7',
                opacity: cartState === 'adding' ? 0.7 : 1,
                cursor: cartState === 'adding' ? 'wait' : 'pointer',
              }}
            >
              {cartState === 'adding' ? 'Adding...' : cartState === 'added' ? '✓ Added to bag' : giftOn ? 'Add Gift to Bag →' : 'Add to Bag →'}
            </button>
            <button
              className="w-full font-sans transition-colors"
              style={{ padding: '17px', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', background: 'transparent', border: '1px solid rgba(184,151,90,0.2)', color: '#6B6560', marginBottom: '28px' }}
            >
              ♡ Save to Wishlist
            </button>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-8 gap-y-3" style={{ paddingTop: '24px', borderTop: '1px solid rgba(184,151,90,0.12)' }}>
              {[['✦', 'BIS Hallmarked'], ['♡', 'Gift-ready packaging'], ['↩', '15-day returns'], ['🚚', 'Free on ₹999+']].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2 font-sans text-[#9A9592]" style={{ fontSize: '10px', letterSpacing: '0.08em' }}>
                  <span style={{ color: '#B8975A' }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Story strip */}
      <section style={{ background: '#1C1C1A', padding: '80px 0' }}>
        <div className="wrap-sm text-center">
          <span className="section-label mb-6 block" style={{ color: 'rgba(184,151,90,0.7)' }}>The story behind this piece</span>
          <div className="gold-line mx-auto mb-8" />
          <blockquote
            className="font-serif text-[#EDE5D8] italic leading-relaxed"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', letterSpacing: '-0.01em' }}
          >
            "She walked through a door she'd been standing at for months. This ring is for that moment — not after, not before. Right then."
          </blockquote>
          <button onClick={() => showPage('collection')} className="btn-text btn-text-light mt-10">
            See all New Beginnings pieces
          </button>
        </div>
      </section>

      {/* Accordions */}
      <section style={{ padding: '80px 0 100px' }}>
        <div className="wrap-sm space-y-px">
          {[
            {
              title: 'Jewellery Care',
              content: (
                <ul className="space-y-2 font-sans text-[#6B6560]" style={{ fontSize: '13px', fontWeight: 300 }}>
                  <li>· Remove before swimming, showering, or working out</li>
                  <li>· Store in the pouch provided when not wearing</li>
                  <li>· Clean gently with a soft, dry cloth</li>
                  <li>· Avoid contact with perfume, lotion, or harsh chemicals</li>
                </ul>
              ),
            },
            {
              title: 'Shipping & Returns',
              content: (
                <div className="space-y-3 font-sans text-[#6B6560]" style={{ fontSize: '13px', fontWeight: 300 }}>
                  <p>Free shipping on orders above ₹999. Standard delivery in 4–7 business days.</p>
                  <p>We accept returns and exchanges within 15 days of delivery.</p>
                </div>
              ),
            },
          ].map((item) => (
            <details key={item.title} className="group" style={{ borderTop: '1px solid rgba(184,151,90,0.15)' }}>
              <summary
                className="flex items-center justify-between font-sans cursor-pointer"
                style={{ padding: '20px 0', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1C1C1A', fontWeight: 500 }}
              >
                {item.title}
                <span className="text-[#B8975A] group-open:rotate-45 transition-transform inline-block" style={{ fontSize: '18px', fontWeight: 300 }}>+</span>
              </summary>
              <div style={{ paddingBottom: '24px' }}>{item.content}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
