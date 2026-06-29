import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allWorks = [
  {
    id: 'w1',
    title: 'Void Sculpture I',
    category: 'Generative 3D',
    year: '2024',
    medium: 'Three.js, GLSL',
    duration: 'Ongoing series',
    description:
      'An algorithmic sculpture series born from noise field displacement. Each piece generates uniquely from a seed, producing infinite topological variations. The work interrogates reproducibility in digital art — when every render is unique, what constitutes the original?',
    dimensions: '4K / Variable',
    exhibited: 'Digital Futures Jakarta, 2024',
    accent: '#6C63FF',
    shape: '⬡',
  },
  {
    id: 'w2',
    title: 'Chromatic Drift',
    category: 'Motion Design',
    year: '2024',
    medium: 'Houdini, After Effects',
    duration: '90 seconds',
    description:
      'A motion piece using color temperature as its only narrative tool. Warm amber gradually shifts to deep indigo over the course of the piece, mimicking geological sunset — time compressed into ninety seconds of fluid simulation.',
    dimensions: '4K 16:9',
    exhibited: 'Screened at ISEA 2024, Brisbane',
    accent: '#00E5FF',
    shape: '◉',
  },
  {
    id: 'w3',
    title: 'Lattice Protocol',
    category: 'Interactive Installation',
    year: '2023',
    medium: 'WebGL, Web Audio API',
    duration: 'Real-time',
    description:
      'A browser-based installation where thousands of particles form a responsive lattice structure. Audio frequencies from the room microphone distort the lattice in real-time, making each visitor\'s presence visible as ripples in the field.',
    dimensions: 'Variable / Multi-screen',
    exhibited: 'Digital Futures, Jakarta 2023 · FutureWorld Gallery',
    accent: '#9D97FF',
    shape: '✦',
  },
  {
    id: 'w4',
    title: 'Erosion Series',
    category: 'Digital Sculpture',
    year: '2023',
    medium: 'Blender, Python',
    duration: 'Series of 5',
    description:
      'Five digital sculptures generated using marching cubes and simulated geological erosion algorithms. Each piece runs for exactly 10,000 simulation steps before being captured, preserving the moment just before complete dissolution.',
    dimensions: '8K prints available',
    exhibited: 'Yavuz Gallery, Singapore 2023',
    accent: '#7DF9FF',
    shape: '▲',
  },
  {
    id: 'w5',
    title: 'Membrane',
    category: 'Real-time Rendering',
    year: '2022',
    medium: 'WebGL 2.0, GLSL',
    duration: 'Looping',
    description:
      'A single organic surface rendered in real-time with custom subdivision shaders. The membrane breathes — physically-based simulation of pressure differentials drives the undulation. Available as a generative live wallpaper.',
    dimensions: '4K / Any aspect',
    exhibited: 'Online, commissioned by Studio Drift',
    accent: '#6C63FF',
    shape: '○',
  },
  {
    id: 'w6',
    title: 'Tessellate',
    category: 'Generative Print',
    year: '2022',
    medium: 'p5.js, Plotter',
    duration: 'Edition of 12',
    description:
      'A series of pen-plotter prints generated from recursive tessellation algorithms seeded with prime numbers. Each print in the edition is unique — the algorithm advances its state between pieces, producing a cohesive visual narrative across all twelve.',
    dimensions: '594 × 841 mm (A1)',
    exhibited: 'Art Jakarta 2022',
    accent: '#00E5FF',
    shape: '◇',
  },
];

const WorksPage = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.works-card', 
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.works-grid',
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--void)',
        color: 'var(--mist)',
      }}
    >
      <div
        className="sticky top-0 z-50 px-6 h-16 flex items-center"
        style={{
          background: 'rgba(5,5,8,0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(108,99,255,0.12)',
        }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-body text-sm font-medium transition-colors duration-200"
            style={{ color: 'rgba(232,230,240,0.6)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--mist)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,230,240,0.6)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back to Portfolio
          </Link>
          <span
            className="font-display font-bold text-lg"
            style={{ color: 'var(--mist)', letterSpacing: '-0.01em' }}
          >
            Works
          </span>
          <span style={{ width: '80px' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div ref={headerRef} className="mb-16">
          <p
            className="font-body text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--cyan)' }}
          >
            Complete Archive
          </p>
          <h1
            className="font-display font-bold mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: 'var(--mist)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
            }}
          >
            All Works &
            <br />
            <span style={{ color: 'var(--indigo)' }}>Explorations</span>
          </h1>
          <div
            style={{
              width: '100%',
              height: '1px',
              background: 'linear-gradient(to right, var(--indigo), var(--cyan), transparent)',
            }}
          />
        </div>

        <div className="works-grid flex flex-col gap-10">
          {allWorks.map((work, i) => (
            <article
              key={work.id}
              className="works-card glass-card p-8 md:p-10 opacity-0"
              style={{
                borderColor: `rgba(${work.accent.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16)).join(',')}, 0.12)`,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 flex items-start gap-5">
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `rgba(${work.accent.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16)).join(',')}, 0.1)`,
                      fontSize: '1.8rem',
                      border: `1px solid rgba(${work.accent.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16)).join(',')}, 0.2)`,
                    }}
                  >
                    {work.shape}
                  </div>
                  <div>
                    <p
                      className="font-body text-xs tracking-[0.2em] uppercase mb-1"
                      style={{ color: work.accent, opacity: 0.8 }}
                    >
                      {work.category}
                    </p>
                    <h2
                      className="font-display font-semibold"
                      style={{
                        fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
                        color: 'var(--mist)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                      }}
                    >
                      {work.title}
                    </h2>
                    <p
                      className="font-body text-sm mt-1"
                      style={{ color: 'rgba(232,230,240,0.35)' }}
                    >
                      {work.year}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: 'rgba(232,230,240,0.62)', lineHeight: '1.85' }}
                  >
                    {work.description}
                  </p>
                </div>

                <div className="lg:col-span-1">
                  <div className="flex flex-col gap-4">
                    {[
                      { label: 'Medium', value: work.medium },
                      { label: 'Duration', value: work.duration },
                      { label: 'Dimensions', value: work.dimensions },
                      { label: 'Exhibited', value: work.exhibited },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p
                          className="font-body text-xs tracking-wider uppercase mb-1"
                          style={{ color: 'rgba(232,230,240,0.25)' }}
                        >
                          {label}
                        </p>
                        <p
                          className="font-body text-sm"
                          style={{ color: 'rgba(232,230,240,0.65)' }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-3 font-body text-sm font-medium transition-colors duration-200"
            style={{ color: 'rgba(232,230,240,0.4)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--mist)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,230,240,0.4)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Return to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorksPage;