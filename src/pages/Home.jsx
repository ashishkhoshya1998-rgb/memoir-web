const moments = [
  { num: '01', icon: '✦', title: 'New Beginnings',   desc: 'For every door she walks through.' },
  { num: '02', icon: '◆', title: 'Celebrating Her',  desc: 'Birthdays, promotions, everything she\'s earned.' },
  { num: '03', icon: '♡', title: 'Love',             desc: 'Not just romantic. All the love.' },
  { num: '04', icon: '⬡', title: 'Self Growth',      desc: 'For the woman she is becoming.' },
  { num: '05', icon: '◇', title: 'Milestones',       desc: 'Graduation, first salary, every achievement.' },
  { num: '06', icon: '∞', title: 'Distance',         desc: 'When you can\'t be there, this can.' },
]

function MomentRow({ m, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left group transition-all duration-300"
      style={{ borderBottom: '1px solid rgba(184,151,90,0.2)', padding: '0' }}
    >
      <div className="flex items-center transition-all duration-300" style={{ padding: '28px 0', gap: '24px' }}>
        <span
          className="font-sans flex-shrink-0 transition-colors duration-300 group-hover:text-[#B8975A]"
          style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#C4B99A', width: '28px' }}
        >
          {m.num}
        </span>
        <span
          className="font-serif flex-shrink-0 transition-colors duration-300"
          style={{ fontSize: '1rem', color: '#D4C4A0', width: '20px' }}
        >
          {m.icon}
        </span>
        <h3
          className="font-serif text-[#1C1C1A] flex-shrink-0 transition-colors duration-300 group-hover:text-[#B8975A]"
          style={{ fontSize: 'clamp(1.1rem, 3vw, 2rem)', letterSpacing: '-0.02em', lineHeight: 1 }}
        >
          {m.title}
        </h3>
        <p className="moment-desc font-sans flex-1" style={{ color: '#9A9592', fontSize: '13px', fontWeight: 300 }}>
          {m.desc}
        </p>
        <span
          className="font-sans flex-shrink-0 transition-all duration-300 group-hover:translate-x-2"
          style={{ fontSize: '13px', color: '#B8975A', marginLeft: 'auto' }}
        >
          →
        </span>
      </div>
    </button>
  )
}

const products = [
  { img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=85', tag: 'New Beginnings', name: 'Threshold Ring', desc: 'For every beginning that required courage.', price: '₹1,899' },
  { img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=85', tag: 'Celebrating Her', name: 'Milestone Pendant', desc: 'For the achievement only she fully understands.', price: '₹2,299' },
  { img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=700&q=85', tag: 'Love', name: 'Tether Bracelet', desc: 'For the love you don\'t say enough.', price: '₹1,699' },
  { img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=700&q=85', tag: 'Self Growth', name: 'Chapter Ring', desc: 'For the quiet revolution happening inside you.', price: '₹1,499' },
]

const testimonials = [
  { name: 'Priya M.', city: 'Mumbai', tag: 'New Beginnings', text: '"I gifted the New Beginnings ring to my sister when she got her first job. She cried when she opened the box. I did too."' },
  { name: 'Arjun K.', city: 'Bangalore', tag: 'Celebrating Her', text: '"The gift finder took me to the perfect necklace in under 2 minutes. She loved it."' },
  { name: 'Sneha R.', city: 'Delhi', tag: 'Self Growth', text: '"I bought myself the self-growth bracelet after finishing therapy. It means everything to me."' },
  { name: 'Rahul D.', city: 'Pune', tag: 'Love', text: '"This felt completely different from anything I\'d seen. Arrived beautifully packed."' },
]

export default function Home({ showPage }) {
  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '100vh' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1800&q=90"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(250,250,247,0.50) 0%, rgba(250,250,247,0.28) 40%, rgba(250,250,247,0.72) 100%)' }}
          />
        </div>

        <div className="relative z-10 text-center" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          <span className="fade-in delay-1 section-label mb-8 block">925 Sterling Silver · BIS Hallmarked</span>
          <div className="gold-line mx-auto mb-8 fade-in delay-1" />
          <h1
            className="fade-up delay-2 font-serif text-[#1C1C1A]"
            style={{ fontSize: 'clamp(2rem, 8vw, 6rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
          >
            Jewellery, as a <em className="italic" style={{ color: '#B8975A' }}>memory</em> you can touch.
          </h1>
          <p
            className="fade-up delay-3 font-sans text-[#6B6560] leading-relaxed mx-auto"
            style={{ fontSize: '1rem', maxWidth: '420px', fontWeight: 300, marginTop: '32px', marginBottom: '48px' }}
          >
            Each piece is designed around a moment in her life — not a category in a catalogue.
          </p>
          <div className="fade-up delay-4 flex items-center justify-center flex-wrap" style={{ gap: '20px' }}>
            <button onClick={() => showPage('shop')} className="btn-dark">
              Shop by Moment
            </button>
            <button onClick={() => showPage('finder')} className="btn-ghost">
              Find the Perfect Gift →
            </button>
          </div>
        </div>

        <div className="fade-in delay-5 absolute flex flex-col items-center" style={{ bottom: '40px', left: '50%', transform: 'translateX(-50%)', gap: '12px' }}>
          <span className="section-label" style={{ color: 'rgba(107,101,96,0.6)' }}>Scroll</span>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(184,151,90,0.6), transparent)' }} />
        </div>
      </section>

      {/* ── TRUST STRIP ────────────────────────────────────── */}
      <div style={{ background: '#1C1C1A', borderTop: '1px solid #3A3A38' }}>
        <div className="wrap py-5">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            {['925 Sterling Silver', 'BIS Hallmarked', 'Gift-Ready Packaging', '15-Day Returns', 'Free Shipping on ₹999+'].map((t, i, arr) => (
              <span
                key={t}
                className="section-label flex-shrink-0"
                style={{
                  color: 'rgba(154,149,146,0.7)',
                  fontSize: '8px',
                  padding: '0 24px',
                  borderRight: i < arr.length - 1 ? '1px solid rgba(154,149,146,0.15)' : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SHOP BY MOMENT ────────────────────────────────── */}
      <section className="s-pad">
        <div className="wrap">
          <div
            className="flex flex-col md-flex-row md-items-end md-justify-between"
            style={{ marginBottom: '64px', gap: '24px' }}
          >
            <div>
              <span className="section-label mb-4 block">Curated by occasion</span>
              <h2 className="font-serif text-[#1C1C1A]" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
                Shop by Moment
              </h2>
            </div>
            <p className="font-sans text-[#9A9592] leading-relaxed" style={{ fontSize: '0.875rem', fontWeight: 300, maxWidth: '300px' }}>
              We don't organise by product type. We organise by what's happening in her life.
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(184,151,90,0.2)' }}>
            {moments.map((m) => (
              <MomentRow key={m.title} m={m} onClick={() => showPage('collection')} />
            ))}
          </div>
        </div>
      </section>

      {/* ── DUAL CTA ──────────────────────────────────────── */}
      <section className="s-pad-b">
        <div className="wrap md-grid-2" style={{ display: 'grid', gap: '16px' }}>
          {/* Dark card */}
          <div
            className="card-pad relative overflow-hidden flex flex-col justify-between"
            style={{ background: '#1C1C1A', minHeight: '300px' }}
          >
            <div
              className="absolute inset-0"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=60)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }}
            />
            <div className="relative z-10">
              <span className="section-label mb-5 block" style={{ color: 'rgba(154,149,146,0.7)' }}>For the gifter</span>
              <h3 className="font-serif text-[#FAFAF7] leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                Not sure what to get her?<br />
                <em className="italic" style={{ color: '#B8975A' }}>We'll help.</em>
              </h3>
              <p className="font-sans text-[#9A9592] leading-relaxed" style={{ fontSize: '13px', fontWeight: 300, marginTop: '16px', maxWidth: '280px' }}>
                Answer 3 questions. Get 2–3 pieces that match the moment.
              </p>
            </div>
            <button onClick={() => showPage('finder')} className="btn-gold relative z-10" style={{ marginTop: '32px', alignSelf: 'flex-start' }}>
              Find the Perfect Gift →
            </button>
          </div>

          {/* Light card */}
          <div
            className="card-pad flex flex-col justify-between"
            style={{ background: '#F5F0E8', minHeight: '300px', border: '1px solid #EDE5D8' }}
          >
            <div>
              <span className="section-label mb-5 block">For you</span>
              <h3 className="font-serif text-[#1C1C1A] leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                Something happened.<br />
                <em className="italic" style={{ color: '#B8975A' }}>You deserve to mark it.</em>
              </h3>
              <p className="font-sans text-[#6B6560] leading-relaxed" style={{ fontSize: '13px', fontWeight: 300, marginTop: '16px', maxWidth: '280px' }}>
                No reason needed. The right piece for where you are, who you're becoming.
              </p>
            </div>
            <button onClick={() => showPage('shop')} className="btn-dark" style={{ marginTop: '32px', alignSelf: 'flex-start' }}>
              Shop the Collection
            </button>
          </div>
        </div>
      </section>

      {/* ── BESTSELLERS ───────────────────────────────────── */}
      <section className="s-pad-b">
        <div className="wrap">
          <div className="flex items-end justify-between" style={{ marginBottom: '56px' }}>
            <div>
              <span className="section-label mb-3 block">Most loved</span>
              <h2 className="font-serif text-[#1C1C1A]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
                Bestsellers
              </h2>
            </div>
            <button onClick={() => showPage('shop')} className="btn-text md-show">
              View all
            </button>
          </div>

          <div className="md-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {products.map((p) => (
              <button key={p.name} onClick={() => showPage('product')} className="product-card text-left group">
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '3/4', background: '#F5F0E8' }}>
                  <img src={p.img} alt={p.name} className="card-img w-full h-full object-cover" />
                  <div className="card-overlay absolute inset-0 flex items-end p-5" style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.65) 0%, transparent 60%)' }}>
                    <span className="btn-text" style={{ color: '#FAFAF7', borderColor: 'rgba(250,250,247,0.4)', fontSize: '9px' }}>View piece →</span>
                  </div>
                  <div className="absolute top-3 left-3"><span className="tag">{p.tag}</span></div>
                </div>
                <h3 className="font-serif text-[#1C1C1A] mb-1" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>{p.name}</h3>
                <p className="font-sans text-[#9A9592] mb-2" style={{ fontSize: '11px', fontWeight: 300, fontStyle: 'italic' }}>{p.desc}</p>
                <span className="font-sans text-[#1C1C1A]" style={{ fontSize: '13px', fontWeight: 500 }}>{p.price}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────── */}
      <section className="s-pad-t" style={{ background: '#1C1C1A' }}>
        <div className="wrap">
          <div className="md-grid-2" style={{ display: 'grid', gap: '40px', alignItems: 'start', paddingBottom: '60px' }}>
            <div>
              <span className="section-label mb-6 block" style={{ color: 'rgba(184,151,90,0.8)' }}>Why Memoir exists</span>
              <h2
                className="font-serif text-[#FAFAF7] leading-tight mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
              >
                Jewellery shouldn't just look beautiful. It should{' '}
                <em className="italic" style={{ color: '#B8975A' }}>mean something.</em>
              </h2>
              <div style={{ marginBottom: '40px' }}>
                <p className="font-sans text-[#9A9592] leading-relaxed" style={{ fontSize: '14px', fontWeight: 300, marginBottom: '20px' }}>
                  Most jewellery brands organise by product type — rings, necklaces, bracelets. We found that limiting. People don't buy jewellery because they need a ring.
                </p>
                <p className="font-sans text-[#9A9592] leading-relaxed" style={{ fontSize: '14px', fontWeight: 300, marginBottom: '20px' }}>
                  They buy it because something happened. A new job. A birthday that felt like a turning point. A moment of finally choosing themselves.
                </p>
                <p className="font-sans text-[#EDE5D8] leading-relaxed" style={{ fontSize: '14px', fontWeight: 300 }}>
                  Every Memoir piece is designed around a specific moment in a woman's life. 925 sterling silver, BIS hallmarked, made to be worn every single day — and kept forever.
                </p>
              </div>
              <button className="btn-text btn-text-light">Read our story</button>
            </div>

            <div className="relative">
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', maxHeight: '600px' }}>
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85"
                  alt="Memoir"
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.85 }}
                />
              </div>
              <div
                className="story-quote absolute"
                style={{ bottom: '-32px', left: '-32px', background: '#FAFAF7', padding: '28px 32px', maxWidth: '260px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
              >
                <div className="gold-line mb-5" />
                <p className="font-serif text-[#1C1C1A] italic leading-relaxed" style={{ fontSize: '14px' }}>
                  "Not just beautiful. Meaningful."
                </p>
                <p className="font-sans text-[#9A9592] mt-3" style={{ fontSize: '10px', letterSpacing: '0.12em' }}>
                  — THE MEMOIR PROMISE
                </p>
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="stat-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid rgba(184,151,90,0.15)', background: 'rgba(184,151,90,0.08)' }}>
            {[
              { num: '925', label: 'Sterling Silver' },
              { num: 'BIS', label: 'Hallmarked Quality' },
              { num: '15', label: 'Day Return Policy' },
            ].map((s) => (
              <div key={s.label} className="text-center" style={{ background: '#1C1C1A', padding: '40px 20px' }}>
                <div className="font-serif text-[#B8975A]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>{s.num}</div>
                <div className="section-label mt-2" style={{ color: 'rgba(154,149,146,0.6)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="s-pad">
        <div className="wrap">
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <span className="section-label mb-4 block">What people say</span>
            <h2 className="font-serif text-[#1C1C1A]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
              Real moments.<br />
              <em className="italic" style={{ color: '#B8975A' }}>Real stories.</em>
            </h2>
            <div className="gold-line mx-auto mt-8" />
          </div>

          <div className="md-grid-2" style={{ display: 'grid', gap: '24px' }}>
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="testimonial-card"
                style={{ background: '#F5F0E8', padding: '40px', borderTop: '2px solid rgba(184,151,90,0.2)' }}
              >
                <p
                  className="font-serif text-[#1C1C1A] leading-relaxed mb-8"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontStyle: 'italic', letterSpacing: '-0.01em' }}
                >
                  {t.text}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-sans text-[#1C1C1A]" style={{ fontSize: '13px', fontWeight: 500 }}>{t.name}</p>
                    <p className="font-sans text-[#9A9592]" style={{ fontSize: '11px' }}>{t.city}</p>
                  </div>
                  <span className="tag">{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GIFT FINDER CTA ──────────────────────────────── */}
      <section className="s-pad" style={{ background: '#F5F0E8', borderTop: '1px solid #EDE5D8' }}>
        <div className="wrap-sm text-center">
          <div className="gold-line mx-auto mb-8" />
          <span className="section-label mb-6 block">Gift Finder</span>
          <h2 className="font-serif text-[#1C1C1A] mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.02em' }}>
            Not sure where<br />to start?
          </h2>
          <p className="font-sans text-[#6B6560] leading-relaxed mb-10" style={{ fontSize: '14px', fontWeight: 300 }}>
            Our Gift Finder takes you from "I have no idea" to the perfect piece in under 2 minutes.
          </p>
          <button onClick={() => showPage('finder')} className="btn-dark">
            Find the Perfect Gift →
          </button>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{ background: '#1C1C1A', color: '#FAFAF7' }}>
        <div className="wrap footer-inner" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
          <div className="footer-cols" style={{ display: 'grid', gap: '40px', marginBottom: '64px' }}>
            {/* Brand */}
            <div>
              <h2 className="font-serif mb-4" style={{ fontSize: '2rem', letterSpacing: '-0.01em' }}>Memoir</h2>
              <p className="font-sans mb-6 italic" style={{ fontSize: '14px', color: '#EDE5D8', fontWeight: 300 }}>
                Jewellery, as a memory you can touch.
              </p>
              <p className="font-sans leading-relaxed" style={{ fontSize: '12px', color: '#6B6560', fontWeight: 300, maxWidth: '280px' }}>
                925 sterling silver, BIS hallmarked. Designed for life's moments.
              </p>
              <div className="flex" style={{ gap: '24px', marginTop: '32px' }}>
                <button className="btn-text btn-text-light" style={{ fontSize: '9px' }}>Instagram</button>
                <button className="btn-text btn-text-light" style={{ fontSize: '9px' }}>WhatsApp</button>
              </div>
            </div>
            {/* Shop */}
            <div>
              <p className="section-label mb-6" style={{ color: 'rgba(154,149,146,0.6)' }}>Shop</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['New Beginnings', 'Celebrating Her', 'Love', 'Self Growth', 'Milestones', 'Find a Gift →'].map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => showPage(l.includes('Gift') ? 'finder' : 'collection')}
                      className="font-sans text-[#EDE5D8] hover:text-[#B8975A] transition-colors"
                      style={{ fontSize: '13px', fontWeight: 300 }}
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Info */}
            <div>
              <p className="section-label mb-6" style={{ color: 'rgba(154,149,146,0.6)' }}>Information</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Our Story', 'Jewellery Care', 'Shipping & Returns', 'Size Guide', 'Contact Us'].map((l) => (
                  <li key={l}>
                    <a href="#" className="font-sans text-[#EDE5D8] hover:text-[#B8975A] transition-colors" style={{ fontSize: '13px', fontWeight: 300 }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trust strip */}
          <div className="footer-trust" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', padding: '40px 0', borderTop: '1px solid rgba(184,151,90,0.12)' }}>
            {[
              { icon: '✦', title: '925 Sterling Silver', sub: 'BIS Hallmarked' },
              { icon: '◆', title: 'Gift Packaging', sub: 'Every order, always' },
              { icon: '♡', title: 'Personal Message', sub: 'Handwritten-feel cards' },
              { icon: '↩', title: 'Easy Returns', sub: '15-day policy' },
            ].map((f) => (
              <div key={f.title} className="flex items-start" style={{ gap: '12px' }}>
                <span style={{ color: '#B8975A', fontSize: '12px', marginTop: '2px' }}>{f.icon}</span>
                <div>
                  <p className="font-sans text-[#EDE5D8]" style={{ fontSize: '11px', fontWeight: 500 }}>{f.title}</p>
                  <p className="font-sans text-[#6B6560]" style={{ fontSize: '10px', marginTop: '2px' }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between" style={{ borderTop: '1px solid rgba(184,151,90,0.08)', paddingTop: '32px', gap: '16px' }}>
            <p className="font-sans text-[#6B6560]" style={{ fontSize: '11px' }}>
              © 2025 Memoir Jewellery. All rights reserved.
            </p>
            <div className="flex" style={{ gap: '32px' }}>
              {['Privacy Policy', 'Terms of Service'].map((l) => (
                <a key={l} href="#" className="font-sans text-[#6B6560] hover:text-[#EDE5D8] transition-colors" style={{ fontSize: '11px' }}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
