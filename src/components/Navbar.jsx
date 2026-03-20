import { useState, useEffect } from 'react'

export default function Navbar({ showPage, currentPage }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const closeOnDesktop = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', closeOnDesktop)
    return () => window.removeEventListener('resize', closeOnDesktop)
  }, [])

  const nav = (page) => { showPage(page); setMobileOpen(false) }

  const links = [['shop', 'Shop by Moment'], ['finder', 'Find a Gift'], ['home', 'Our Story']]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(250,250,247,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
        borderBottom: scrolled ? '1px solid rgba(184,151,90,0.12)' : '1px solid transparent',
        padding: scrolled ? '16px 0' : '28px 0',
      }}
    >
      <div className="wrap flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => nav('home')}
          className="font-serif text-[#1C1C1A] hover:text-[#B8975A] transition-colors duration-300"
          style={{ fontSize: '1.5rem', letterSpacing: '-0.01em' }}
        >
          Memoir
        </button>

        {/* Desktop nav */}
        <nav className="nav-links">
          {links.map(([page, label]) => (
            <button
              key={page}
              onClick={() => nav(page)}
              className="nav-link"
              style={{
                color: currentPage === page ? '#1C1C1A' : '#6B6560',
                borderBottom: currentPage === page ? '1px solid rgba(184,151,90,0.6)' : '1px solid transparent',
                paddingBottom: '3px',
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="nav-actions">
          <button
            onClick={() => nav('finder')}
            className="btn-dark"
            style={{ padding: '11px 24px', fontSize: '10px' }}
          >
            Gift Finder <span style={{ opacity: 0.6 }}>→</span>
          </button>
          <button className="text-[#1C1C1A] hover:text-[#B8975A] transition-colors" aria-label="Bag">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger flex-col items-center justify-center"
          style={{ gap: '5px', width: '32px', height: '32px' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span
            className="block transition-all duration-300"
            style={{ background: '#1C1C1A', height: '1px', width: '20px', transformOrigin: 'center', transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block transition-all duration-300"
            style={{ background: '#1C1C1A', height: '1px', width: '20px', opacity: mobileOpen ? 0 : 1 }}
          />
          <span
            className="block transition-all duration-300"
            style={{ background: '#1C1C1A', height: '1px', width: '20px', transformOrigin: 'center', transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: mobileOpen ? '400px' : '0', opacity: mobileOpen ? 1 : 0 }}
      >
        <div className="wrap pt-6 pb-8 mt-4" style={{ background: 'rgba(250,250,247,0.99)', borderTop: '1px solid #EDE5D8' }}>
          <nav className="flex flex-col gap-6 mb-8">
            {links.map(([page, label]) => (
              <button
                key={page}
                onClick={() => nav(page)}
                className="nav-link text-left"
                style={{
                  fontSize: '12px',
                  color: currentPage === page ? '#1C1C1A' : '#6B6560',
                }}
              >
                {label}
              </button>
            ))}
          </nav>
          <button onClick={() => nav('finder')} className="btn-dark w-full justify-center">
            Find the Perfect Gift →
          </button>
        </div>
      </div>
    </header>
  )
}
