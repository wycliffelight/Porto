import React from 'react';
import HeroThreeScene from './HeroThreeScene';

const HeroSection = ({ threeCanvasRef, particlesCanvasRef }) => {
  return (
    <section
      id="hero"
      className="relative w-full"
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'rgba(5,5,8,0.4)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(108,99,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <HeroThreeScene canvasRef={threeCanvasRef} />

      <div
        className="hero-content-layer flex flex-col items-start justify-end"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <div className="px-6 md:px-12 pb-12 md:pb-20 w-full flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          
          <div className="flex-shrink-0">
            <p
              className="font-body text-xs tracking-[0.3em] uppercase mb-6 glow-cyan"
              style={{ color: 'var(--cyan)', opacity: 0.85 }}
            >
              Multimedia · 3D Design · Motion
            </p>

            <h1
              className="font-display font-extrabold leading-none md:mb-0"
              style={{
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                color: 'var(--mist)',
                letterSpacing: '-0.02em',
              }}
            >
              Matthew
              <br />
              <span
                className="glow-indigo pdf-text-gradient-fix"
                style={{
                  background: 'linear-gradient(135deg, #6C63FF 0%, #00E5FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: '#00E5FF'
                }}
              >
                Light
              </span>
            </h1>
          </div>

          <p
            className="font-body font-light md:mb-2 text-left md:text-right md:ml-auto md:max-w-[32ch]"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(232,230,240,0.65)',
              letterSpacing: '0.01em',
              margin: '0',
            }}
          >
            Fluent in {' '}
            <em style={{ color: 'rgba(232,230,240,0.9)', fontStyle: 'italic' }}>
            code and canvas,
            </em> <br />
            {' '}Engineering digital masterpieces.
          </p>

        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 3 }}
      >
        <div
          className="w-px h-12 mx-auto"
          style={{
            background: 'linear-gradient(to bottom, rgba(108,99,255,0.8), transparent)',
            animation: 'float 2s ease-in-out infinite',
          }}
        />
        <p className="font-body text-xs tracking-widest uppercase mt-2 text-center"
          style={{ color: 'rgba(232,230,240,0.3)' }}>
          scroll
        </p>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'linear-gradient(to bottom, transparent, var(--void))',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
};

export default HeroSection;