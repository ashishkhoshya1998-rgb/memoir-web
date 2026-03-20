import { useState } from 'react'

const relationships = [
  { icon: '♡', label: 'Partner / Girlfriend', sub: 'Romantic partner' },
  { icon: '◇', label: 'Sister', sub: 'Biological or chosen' },
  { icon: '✦', label: 'Best Friend', sub: 'Someone like family' },
  { icon: '◆', label: 'Colleague', sub: 'Work friend or mentor' },
  { icon: '∞', label: 'Mother / Parent', sub: 'Mum or mother figure' },
  { icon: '⬡', label: 'Myself', sub: 'Buying for yourself' },
]

const occasions = [
  { icon: '✦', label: 'New Job / New Chapter', sub: 'Starting something fresh' },
  { icon: '◆', label: 'Birthday / Promotion', sub: 'A milestone worth marking' },
  { icon: '♡', label: 'Just Because / Love', sub: 'No occasion needed' },
  { icon: '⬡', label: 'Personal Growth / Healing', sub: 'A quiet internal milestone' },
  { icon: '◇', label: 'Graduation / Achievement', sub: 'An earned finish line' },
]

const budgets = ['Under ₹2,000', '₹2,000 – ₹3,000', '₹3,000+', 'No preference']

const results = [
  { img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=85', name: 'Milestone Pendant', desc: 'A quiet celebration, worn every day.', price: '₹2,299' },
  { img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=85', name: 'Threshold Ring', desc: 'For every beginning that required courage.', price: '₹1,899' },
  { img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&q=85', name: 'Tether Bracelet', desc: 'For the love you don\'t say enough.', price: '₹1,699' },
]

function OptionCard({ icon, label, sub, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 text-left w-full group transition-all duration-200"
      style={{
        padding: '20px 24px',
        background: '#F5F0E8',
        border: '1px solid transparent',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(184,151,90,0.4)'
        e.currentTarget.style.background = '#F0E8E0'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'transparent'
        e.currentTarget.style.background = '#F5F0E8'
      }}
    >
      <span style={{ fontSize: '1.25rem', color: '#B8975A', flexShrink: 0, width: '28px' }}>{icon}</span>
      <div>
        <p className="font-sans text-[#1C1C1A]" style={{ fontSize: '13px', fontWeight: 500 }}>{label}</p>
        <p className="font-sans text-[#9A9592]" style={{ fontSize: '11px', fontWeight: 300, marginTop: '2px' }}>{sub}</p>
      </div>
      <span className="ml-auto font-sans text-[#B8975A] transition-transform" style={{ fontSize: '14px' }}>→</span>
    </button>
  )
}

export default function GiftFinder({ showPage }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({ relationship: null, moment: null, budget: null })

  const selectRelationship = (val) => { setData(d => ({ ...d, relationship: val })); setStep(2) }
  const selectMoment = (val) => { setData(d => ({ ...d, moment: val })); setStep(3) }
  const selectBudget = (val) => { setData(d => ({ ...d, budget: val })); setStep(4) }
  const reset = () => { setData({ relationship: null, moment: null, budget: null }); setStep(1) }

  const progress = { 1: 33, 2: 66, 3: 100, 4: 100 }[step]
  const isSelf = data.relationship === 'Myself'
  const step2Sub = data.relationship
    ? isSelf ? "What's happening in your life right now?" : `What's happening in ${data.relationship.split(' ')[0]}'s life?`
    : "What's happening in her life?"

  return (
    <div>
      {/* Hero */}
      <section style={{ background: '#1C1C1A', paddingTop: '140px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=60)',
            backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.06,
          }}
        />
        <div className="wrap-sm text-center relative z-10">
          <span className="section-label mb-6 block" style={{ color: 'rgba(184,151,90,0.7)' }}>The Gift Finder</span>
          <div className="gold-line mx-auto mb-8" />
          <h1 className="font-serif text-[#FAFAF7] mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.02em', lineHeight: 1.0 }}>
            Find the perfect gift<br />
            <em className="italic" style={{ color: '#B8975A' }}>for her moment.</em>
          </h1>
          <p className="font-sans text-[#9A9592] leading-relaxed" style={{ fontSize: '14px', fontWeight: 300 }}>
            Three questions. Two minutes. The right piece — every time.
          </p>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: '80px 0 120px', minHeight: '60vh' }}>
        <div className="wrap-sm">

          {/* Progress */}
          {step < 4 && (
            <div style={{ marginBottom: '56px' }}>
              <div className="flex items-center justify-between font-sans mb-3" style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9592' }}>
                <span>Question {step} of 3</span>
                <button onClick={reset} className="hover:text-[#1C1C1A] transition-colors">Start over</button>
              </div>
              <div style={{ height: '1px', background: '#EDE5D8', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '1px', width: `${progress}%`, background: '#B8975A', transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
            </div>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <span className="section-label mb-4 block">Step one</span>
              <h2 className="font-serif text-[#1C1C1A] mb-2" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
                Who are you buying for?
              </h2>
              <p className="font-sans text-[#9A9592] mb-10" style={{ fontSize: '13px', fontWeight: 300 }}>
                We'll tailor the recommendation to the relationship.
              </p>
              <div className="flex flex-col gap-2">
                {relationships.map((r) => (
                  <OptionCard key={r.label} {...r} onClick={() => selectRelationship(r.label)} />
                ))}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} className="btn-text mb-6" style={{ fontSize: '9px' }}>← Back</button>
              <span className="section-label mb-4 block">Step two</span>
              <h2 className="font-serif text-[#1C1C1A] mb-2" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
                What's the occasion?
              </h2>
              <p className="font-sans text-[#9A9592] mb-10" style={{ fontSize: '13px', fontWeight: 300 }}>{step2Sub}</p>
              <div className="flex flex-col gap-2">
                {occasions.map((o) => (
                  <OptionCard key={o.label} {...o} onClick={() => selectMoment(o.label)} />
                ))}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <button onClick={() => setStep(2)} className="btn-text mb-6" style={{ fontSize: '9px' }}>← Back</button>
              <span className="section-label mb-4 block">Step three</span>
              <h2 className="font-serif text-[#1C1C1A] mb-2" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
                What's your budget?
              </h2>
              <p className="font-sans text-[#9A9592] mb-10" style={{ fontSize: '13px', fontWeight: 300 }}>
                All our pieces are 925 sterling silver, BIS hallmarked.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {budgets.map((b) => (
                  <button
                    key={b}
                    onClick={() => selectBudget(b)}
                    className="text-center font-serif transition-all duration-200"
                    style={{ padding: '32px 16px', background: '#F5F0E8', border: '1px solid transparent', fontSize: '1.1rem', color: '#1C1C1A' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(184,151,90,0.4)'; e.currentTarget.style.background = '#F0E8E0' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = '#F5F0E8' }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 — Results */}
          {step === 4 && (
            <div>
              {/* Summary card */}
              <div style={{ background: '#1C1C1A', padding: '32px', marginBottom: '40px' }}>
                <span className="section-label mb-3 block" style={{ color: 'rgba(184,151,90,0.7)' }}>Your match</span>
                <p className="font-serif text-[#FAFAF7] leading-tight" style={{ fontSize: '1.2rem' }}>
                  {isSelf ? 'For you' : `For ${data.relationship}`} →{' '}
                  <em className="italic" style={{ color: '#B8975A' }}>{data.moment}</em>
                </p>
                <p className="font-sans text-[#9A9592] mt-2" style={{ fontSize: '11px', fontWeight: 300 }}>3 pieces matched</p>
              </div>

              {/* Results */}
              <div className="flex flex-col gap-3 mb-10">
                {results.map((r, i) => (
                  <button
                    key={r.name}
                    onClick={() => showPage('product')}
                    className="flex gap-4 text-left transition-all duration-200"
                    style={{ padding: '20px', background: '#F5F0E8', border: '1px solid transparent' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(184,151,90,0.35)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                  >
                    <div
                      className="flex-shrink-0 font-sans font-semibold flex items-center justify-center"
                      style={{ width: '28px', height: '28px', background: '#B8975A', color: '#fff', fontSize: '11px' }}
                    >
                      {i + 1}
                    </div>
                    <div className="overflow-hidden flex-shrink-0" style={{ width: '64px', height: '64px' }}>
                      <img src={r.img} className="w-full h-full object-cover" alt={r.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-[#1C1C1A]" style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>{r.name}</h3>
                      <p className="font-sans text-[#9A9592] mt-0.5 italic" style={{ fontSize: '11px', fontWeight: 300 }}>{r.desc}</p>
                      <p className="font-sans text-[#1C1C1A] mt-1" style={{ fontSize: '13px', fontWeight: 500 }}>{r.price}</p>
                    </div>
                    <span className="flex-shrink-0 self-center font-sans text-[#B8975A]" style={{ fontSize: '14px' }}>→</span>
                  </button>
                ))}
              </div>

              <div style={{ background: '#F0E8E0', padding: '40px', textAlign: 'center', marginBottom: '24px' }}>
                <p className="font-serif text-[#1C1C1A] mb-2" style={{ fontSize: '1.2rem' }}>Want to see everything?</p>
                <p className="font-sans text-[#9A9592] mb-6" style={{ fontSize: '12px', fontWeight: 300 }}>Browse the full collection for this moment.</p>
                <button onClick={() => showPage('collection')} className="btn-dark">See Full Collection →</button>
              </div>

              <button onClick={reset} className="btn-text w-full justify-center" style={{ fontSize: '9px' }}>
                ↩ Start over with different answers
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  )
}
