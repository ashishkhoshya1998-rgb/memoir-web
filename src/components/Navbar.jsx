import { useState, useEffect } from 'react'

export default function Navbar({ showPage, currentPage }) {
  const [scrolled, setScrolled]     = useState(false)
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

  const links = [
    ['shop',   'Shop by Moment'],
    ['finder', 'Find a Gift'],
    ['home',   'Our Story'],
  ]

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.5s ease, border-color 0.5s ease, padding 0.5s ease',
        background: scrolled ? 'rgba(250,250,247,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(184,151,90,0.12)' : '1px solid transparent',
        padding: scrolled ? '14px 0' : '26px 0',
      }}
    >
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <button
          onClick={() => nav('home')}
          className="font-serif"
          style={{
            fontSize: '1.45rem',
            letterSpacing: '-0.02em',
            color: '#1C1C1A',
            transition: 'color 0.25s',
            background: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#B8975A'}
          onMouseLeave={e => e.currentTarget.style.color = '#1C1C1A'}
        >
          Memoir
        </button>

        {/* Desktop nav links */}
        <nav className="nav-links">
          {links.map(([page, label]) => (
            <button
              key={page}
              onClick={() => nav(page)}
              className="nav-link"
              style={{
                color: currentPage === page ? '#1C1C1A' : '#6B6560',
                borderBottom: currentPage === page
                  ? '1px solid rgba(184,151,90,0.6)'
                  : '1px solid transparent',
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
            style={{ padding: '10px 22px', fontSize: '10px' }}
          >
            Gift Finder <span style={{ opacity: 0.55 }}>→</span>
          </button>
          <button
            onClick={() => nav('shop')}
            aria-label="Shop"
            style={{ background: 'none', cursor: 'pointer', color: '#6B6560', transition: 'color 0.25s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#1C1C1A'}
            onMouseLeave={e => e.currentTarget.style.color = '#6B6560'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger flex-col items-center justify-center"
          style={{ gap: '5px', width: '32px', height: '32px', background: 'none', cursor: 'pointer' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            style={{
              display: 'block',
              background: '#1C1C1A', height: '1px', width: '22px',
              transition: 'transform 0.3s ease',
              transformOrigin: 'center',
              transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              background: '#1C1C1A', height: '1px', width: '22px',
              transition: 'opacity 0.3s ease',
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              background: '#1C1C1A', height: '1px', width: '22px',
              transition: 'transform 0.3s ease',
              transformOrigin: 'center',
              transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: mobileOpen ? '420px' : '0',
          opacity: mobileOpen ? 1 : 0,
          transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
        }}
      >
        <div
          className="wrap"
          style={{
            background: 'rgba(250,250,247,0.99)',
            borderTop: '1px solid #EDE5D8',
            paddingTop: '28px',
            paddingBottom: '36px',
            marginTop: '14px',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '32px' }}>
            {links.map(([page, label]) => (
              <button
                key={page}
                onClick={() => nav(page)}
                className="nav-link"
                style={{
                  fontSize: '13px',
                  textAlign: 'left',
                  color: currentPage === page ? '#1C1C1A' : '#6B6560',
                  letterSpacing: '0.14em',
                }}
              >
                {label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => nav('finder')}
            className="btn-dark"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Find the Perfect Gift →
          </button>
        </div>
      </div>
    </header>
  )
}
