import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Works', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e, href) => {
    if (href.startsWith('#') && isHome) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <nav
      id="main-nav"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 box-border overflow-x-hidden max-w-[100vw]"
      style={{
        background: scrolled ? 'rgba(5,5,8,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(108,99,255,0.15)' : '1px solid transparent',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between box-border">
        {/* Logo */}
        <Link
          to="/"
          className="font-display font-800 text-lg tracking-tight z-50"
          style={{ color: 'var(--mist)', textDecoration: 'none' }}
        >
          <span style={{ color: 'var(--indigo)' }}>Light</span>
          <span className="text-sm font-normal ml-1 opacity-60">/ 3D</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {isHome ? (
            navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => scrollTo(e, href)}
                className="nav-link font-body text-sm font-medium tracking-wide"
                style={{ color: 'rgba(232,230,240,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--mist)'}
                onMouseLeave={e => e.target.style.color = 'rgba(232,230,240,0.7)'}
              >
                {label}
              </a>
            ))
          ) : (
            <Link
              to="/"
              className="nav-link font-body text-sm font-medium tracking-wide"
              style={{ color: 'rgba(232,230,240,0.7)', textDecoration: 'none' }}
            >
              ← Back
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative w-6 h-[14px] focus:outline-none z-50 block cursor-pointer"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span
            className="absolute left-0 w-full h-[1px] transition-all duration-300 origin-center"
            style={{
              background: 'var(--mist)',
              top: menuOpen ? '6px' : '0px',
              transform: menuOpen ? 'rotate(45deg)' : 'none',
            }}
          />
          <span
            className="absolute left-0 w-full h-[1px] transition-all duration-300"
            style={{
              background: 'var(--mist)',
              top: '6px',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="absolute left-0 w-full h-[1px] transition-all duration-300 origin-center"
            style={{
              background: 'var(--mist)',
              top: menuOpen ? '6px' : '12px',
              transform: menuOpen ? 'rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 w-full"
        style={{
          maxHeight: menuOpen ? '300px' : '0',
          background: 'rgba(5,5,8,0.97)',
          borderBottom: menuOpen ? '1px solid rgba(108,99,255,0.15)' : 'none',
        }}
      >
        <div 
          className="flex flex-col px-6 box-border w-full transition-all duration-300"
          style={{ 
            paddingTop: menuOpen ? '1rem' : '0', 
            paddingBottom: menuOpen ? '1rem' : '0',
            gap: menuOpen ? '1rem' : '0' 
          }}
        >
          {isHome ? (
            navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => scrollTo(e, href)}
                className="font-body text-sm font-medium py-2 w-fit"
                style={{ color: 'var(--mist)', textDecoration: 'none' }}
              >
                {label}
              </a>
            ))
          ) : (
            <Link to="/" className="w-fit py-2" style={{ color: 'var(--mist)', textDecoration: 'none' }}>
              ← Back to Home
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;