import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Banner from '../images/Banner.JPG';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      const bioEls = sectionRef.current?.querySelectorAll('.bio-reveal');
      if (bioEls && bioEls.length > 0) {
        gsap.fromTo(
          bioEls,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      if (!prefersReducedMotion) {
        const imgContainer = sectionRef.current?.querySelector('.image-reveal');
        if (imgContainer) {
          gsap.fromTo(
            imgContainer,
            { opacity: 0, scale: 0.95, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: imgContainer,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
      style={{ position: 'relative', zIndex: 1, background: 'rgba(5,5,8,0.4)' }}
    >
      {/* Left glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '-15%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Bio */}
          <div>
            <p
              className="bio-reveal font-body text-xs tracking-[0.3em] uppercase mb-3 opacity-0"
              style={{ color: 'var(--cyan)' }}
            >
              About Me
            </p>
            <h2
              className="bio-reveal font-display font-bold mb-8 opacity-0"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: 'var(--mist)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              Graphics & 3D
              <br />
              <span style={{ color: 'var(--indigo)' }}>Developer</span>
            </h2>

            <div
              className="bio-reveal w-16 h-px mb-8 opacity-0"
              style={{ background: 'linear-gradient(to right, var(--indigo), var(--cyan))' }}
            />

            <p
              className="bio-reveal font-body text-base leading-loose mb-5 opacity-0"
              style={{ color: 'rgba(232,230,240,0.65)', lineHeight: '1.85' }}
            >
            I'm Matthew Wycliffe Light Wowor, networking professionally as Matthew Light!
            As an Informatics Engineering undergrad at IT PLN, I quickly realized I was a
            little too technical to be a pure artist, yet too creative to stick strictly to
            traditional programming.
            </p>
            <p
              className="bio-reveal font-body text-base leading-loose mb-5 opacity-0"
              style={{ color: 'rgba(232,230,240,0.65)', lineHeight: '1.85' }}
            >
            For me, the real magic happens when you bring those two worlds together. My
            specialty lies in 3D design, using tools like Blender and Unity, backed by a solid
            foundation in computer graphics and animation. I am a quick learner.
            </p>
            <p
              className="bio-reveal font-body text-base leading-loose opacity-0"
              style={{ color: 'rgba(232,230,240,0.65)', lineHeight: '1.85' }}
            >
            Whether I'm tackling a tough problem solo or brainstorming with a team, I am
            always eager to push boundaries. I am currently open to internships, either 
            onsite or remote. Take a look around my work, and feel free to reach out!
            </p>

            {/* Badges */}
            <div className="bio-reveal flex flex-wrap gap-3 mt-8 opacity-0">
              {['Based in West Jakarta', 'Available for internship', 'Open to remote'].map(badge => (
                <span
                  key={badge}
                  className="font-body text-xs px-4 py-2 rounded-full"
                  style={{
                    background: 'rgba(108,99,255,0.1)',
                    border: '1px solid rgba(108,99,255,0.25)',
                    color: 'rgba(232,230,240,0.7)',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Image & Tools */}
          <div className="flex flex-col gap-12">
            
            <div 
              className="image-reveal relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 20px 40px rgba(5,5,8,0.5), 0 0 0 1px rgba(0,229,255,0.1)',
                background: 'rgba(232,230,240,0.02)'
              }}
            >
              <div 
                className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-50"
                style={{ background: 'linear-gradient(to bottom right, var(--indigo), transparent, var(--cyan))' }}
              />
              <img 
                src={Banner}
                alt="Banner" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div
              className="p-6 glass-card"
              style={{ borderColor: 'rgba(0,229,255,0.1)' }}
            >
              <p
                className="font-body text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: 'rgba(232,230,240,0.3)' }}
              >
                Tools & Environments
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Blender', 'Unity', 'Figma', 'UI/UX', 'AR/VR',
                ].map(tool => (
                  <div key={tool} className="flex items-center gap-2">
                    <span style={{ color: 'var(--cyan)', fontSize: '8px' }}>◆</span>
                    <span
                      className="font-body text-sm"
                      style={{ color: 'rgba(232,230,240,0.55)' }}
                    >
                      {tool}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;