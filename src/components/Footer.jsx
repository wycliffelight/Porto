import React from 'react';

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/matthew-light-944287297/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/wycliffelight',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/matthewwowor/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
];

const Footer = ({ onExportPDF, isExporting }) => {
  return (
    <footer
      id="contact"
      className="relative py-20 px-6"
      style={{
        background: 'linear-gradient(to bottom, var(--void), rgba(10,5,20,1))',
        borderTop: '1px solid rgba(108,99,255,0.12)',
      }}
    >
      {/* Glow at top */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(108,99,255,0.5), rgba(0,229,255,0.5), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div
              className="font-display font-extrabold text-2xl mb-3"
              style={{ color: 'var(--mist)', letterSpacing: '-0.02em' }}
            >
              <span style={{ color: 'var(--indigo)' }}>Light</span>
            </div>
            <div className="flex items-center gap-5 mt-6">
              {socials.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="transition-all duration-200"
                  style={{ color: 'rgba(232,230,240,0.4)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,230,240,0.4)'}
                >
                  {icon}
                </a>
              ))}
            </div>
              <p
                className="font-body text-xs leading-relaxed mt-6"
                style={{ color: 'rgba(232,230,240,0.45)', maxWidth: '42ch' }}
              >
              This portfolio is an experimental digital space utilizing
              multiple concurrent 3D canvases. Performance may
              vary across systems depending on hardware
              limitations.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="font-body text-xs tracking-[0.25em] uppercase mb-5"
              style={{ color: 'rgba(232,230,240,0.3)' }}
            >
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Hero', href: '#hero' },
                { label: 'Projects', href: '#projects' },
                { label: 'About', href: '#about' },
                { label: 'Works Archive', href: '/works' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-body text-sm transition-colors duration-200"
                    style={{ color: 'rgba(232,230,240,0.5)', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--mist)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,230,240,0.5)'}
                    onClick={e => {
                      if (href.startsWith('#')) {
                        e.preventDefault();
                        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & PDF Export */}
          <div>
            <p
              className="font-body text-xs tracking-[0.25em] uppercase mb-5"
              style={{ color: 'rgba(232,230,240,0.3)' }}
            >
              Get In Touch
            </p>
            <a
              href="mailto:matthewwowor@gmail.com"
              className="font-display font-semibold block mb-3 transition-colors duration-200"
              style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                color: 'var(--mist)',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--mist)'}
            >
              Matthewwowor@gmail.com
            </a>
            <p
              className="font-body text-sm"
              style={{ color: 'rgba(232,230,240,0.45)' }}
            >
              +62 851 6190 0530
            </p>
            <p
              className="font-body text-sm mt-1"
              style={{ color: 'rgba(232,230,240,0.35)' }}
            >
              Jakarta, Indonesia
            </p>

            {/* PDF Export */}
            <button
              onClick={onExportPDF}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 mt-6 rounded-lg text-sm font-medium font-body transition-all duration-300 w-fit"
              style={{
                background: isExporting
                  ? 'rgba(108,99,255,0.2)'
                  : 'rgba(108,99,255,0.12)',
                border: '1px solid rgba(108,99,255,0.4)',
                color: isExporting ? 'rgba(232,230,240,0.5)' : 'var(--indigo)',
                cursor: isExporting ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={e => !isExporting && (e.currentTarget.style.background = 'rgba(108,99,255,0.25)')}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(108,99,255,0.12)'}
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  Capturing…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Save PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(232,230,240,0.06)' }}
        >
          <p
            className="font-body text-xs"
            style={{ color: 'rgba(232,230,240,0.25)' }}
          >
            © 2026 Matthew Light.
          </p>
          <p
            className="font-body text-xs"
            style={{ color: 'rgba(232,230,240,0.2)' }}
          >
            All works reserved · Jakarta, Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;