import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import allLocalImages from '../utils/importImages';
import * as THREE from 'three';

const AnimatedHingedCube = ({ isOpen, animationSpeed = 3.5, images }) => {
  const textures = useTexture(images);

  const rootRef = useRef();
  const leftHingeRef = useRef();
  const rightHingeRef = useRef();
  const topHingeRef = useRef();
  const bottomHingeRef = useRef();
  const backHingeRef = useRef(); 

  const progress = useRef(0);
  const tumbleAngle = useRef(0);

  useFrame((state, delta) => {
    progress.current = THREE.MathUtils.damp(progress.current, isOpen ? 1 : 0, animationSpeed, delta);
    const p = progress.current;
    
    tumbleAngle.current += delta * 0.5 * (1 - p);
    tumbleAngle.current = tumbleAngle.current % (Math.PI * 2);
    
    const cubeTiltX = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.2;
    
    rootRef.current.rotation.y = THREE.MathUtils.lerp(tumbleAngle.current, 0, p);
    rootRef.current.rotation.x = THREE.MathUtils.lerp(cubeTiltX, 0, p);

    rootRef.current.position.z = THREE.MathUtils.lerp(0.5, 0, p);
    rootRef.current.position.y = THREE.MathUtils.lerp(0, 0.5, p);

    leftHingeRef.current.rotation.y = THREE.MathUtils.lerp(-Math.PI / 2, 0, p);
    rightHingeRef.current.rotation.y = THREE.MathUtils.lerp(Math.PI / 2, 0, p);
    topHingeRef.current.rotation.x = THREE.MathUtils.lerp(-Math.PI / 2, 0, p);
    bottomHingeRef.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2, 0, p);
    backHingeRef.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2, 0, p);
  });

  return (
    <group ref={rootRef}>
      <mesh>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial map={textures[0]} side={THREE.DoubleSide} />
      </mesh>
      <group ref={leftHingeRef} position={[-0.5, 0, 0]}>
        <mesh position={[-0.5, 0, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial map={textures[1]} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group ref={rightHingeRef} position={[0.5, 0, 0]}>
        <mesh position={[0.5, 0, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial map={textures[2]} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group ref={topHingeRef} position={[0, 0.5, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial map={textures[3]} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group ref={bottomHingeRef} position={[0, -0.5, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial map={textures[4]} side={THREE.DoubleSide} />
        </mesh>
        <group ref={backHingeRef} position={[0, -1, 0]}>
          <mesh position={[0, -0.5, 0]}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial map={textures[5]} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

const CubeRow = ({ category, title, description, tags, accent, images, align = 'left' }) => {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const scrollOffset = 0.7; 

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const componentCenter = rect.top + (rect.height / 2);
      const triggerPoint = window.innerHeight * scrollOffset;
      setIsOpen(componentCenter <= triggerPoint);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const textStyle = isMobile 
    ? { left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' } 
    : (align === 'left' ? { left: '8%', transform: 'translateY(-50%)' } : { right: '8%', transform: 'translateY(-50%)' });
  
  const cubeXOffset = isMobile ? 0 : (align === 'left' ? 2.5 : -2.5);
  const tagFlexAlign = isMobile ? "justify-center" : "justify-start";

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      
      <div 
        className="absolute top-1/2 w-[90%] md:w-[40%] z-10 pointer-events-none rounded-2xl"
        style={{ 
          ...textStyle,
          background: isMobile ? 'radial-gradient(circle, rgba(5,5,8,0.85) 0%, rgba(5,5,8,0.4) 60%, transparent 100%)' : 'transparent',
          padding: isMobile ? '2rem 1rem' : '0'
        }}
      >
        <span
          className="font-body text-xs tracking-[0.2em] uppercase mb-2 block"
          style={{ color: accent, opacity: 0.85 }}
        >
          {category}
        </span>
        <h3
          className="font-display font-semibold mb-6"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--mist)',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            textShadow: isMobile ? '0px 4px 20px rgba(0,0,0,0.8)' : 'none'
          }}
        >
          {title}
        </h3>
        <p
          className="font-body text-base md:text-lg mb-8 mx-auto"
          style={{ color: 'rgba(232,230,240,0.8)', lineHeight: '1.75', maxWidth: isMobile ? '100%' : 'none' }}
        >
          {description}
        </p>

        <div className={`flex flex-wrap gap-2 pointer-events-auto ${tagFlexAlign}`}>
          {tags.map(tag => (
            <span
              key={tag}
              className="font-body text-xs px-4 py-2 rounded-full backdrop-blur-sm"
              style={{
                background: 'rgba(232,230,240,0.1)',
                border: '1px solid rgba(232,230,240,0.2)',
                color: 'rgba(232,230,240,0.9)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full">
        <Canvas 
          gl={{ preserveDrawingBuffer: true, alpha: true }}
          camera={{ position: [0, 0, isMobile ? 7.5 : 6.5], fov: 50 }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          
          <Float speed={1.5} rotationIntensity={0} floatIntensity={1}>
            <group position={[cubeXOffset, 0, 0]}>
              <Suspense fallback={null}>
                <AnimatedHingedCube isOpen={isOpen} images={images} animationSpeed={3.5} />
              </Suspense>
            </group>
          </Float>
        </Canvas>
      </div>
    </div>
  );
};

const ProjectsCubeSection = () => {
  const cube1Images = [
    allLocalImages['1.png'], 
    allLocalImages['2.png'],
    allLocalImages['3.png'],
    allLocalImages['4.png'],
    allLocalImages['5.png'],
    allLocalImages['6.png']
  ];
  
  const cube2Images = [
    allLocalImages['2_1.png'],
    allLocalImages['2_2.png'],
    allLocalImages['2_3.png'],
    allLocalImages['2_4.png'],
    allLocalImages['2_5.png'],
    allLocalImages['2_6.png'],
  ];

  return (
    <section
      id="projects"
      className="relative w-full"
      style={{ position: 'relative', zIndex: 1, background: 'rgba(5,5,8,0.4)' }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '5%',
          right: '-20%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(108,99,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 relative z-10">
        <div className="mb-4">
          <p
            className="font-body text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--cyan)' }}
          >
            Selected Works
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: 'var(--mist)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Projects &
              <br />
              <span style={{ color: 'var(--indigo)' }}>Experiments</span>
            </h2>
            
            {/* Temporary disabled
            <Link
              to="/works"
              className="flex items-center gap-2 font-body text-sm font-medium transition-all duration-300 mb-1 pointer-events-auto"
              style={{
                color: 'var(--cyan)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => e.currentTarget.style.gap = '12px'}
              onMouseLeave={e => e.currentTarget.style.gap = '8px'}
            >
              View all works
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link> */}
          </div>
          
          <div
            className="mt-6"
            style={{ height: '1px', background: 'linear-gradient(to right, var(--indigo), var(--cyan), transparent)', width: '100%' }}
          />
        </div>
      </div>

      <div className="w-full">
        <CubeRow 
          category="STYLIZED 3D ENVIRONMENTS"
          title="Modular Ecosystems"
          description="A collection of stylized environments. This series transforms familiar academic buildings, neon-lit local spots, and street scenes into vibrant, cohesive 3D spaces."
          tags={['Modeling', 'Texturing', 'Environment']}
          accent="#6C63FF"
          align="left"
          images={cube1Images} 
        />

        <CubeRow 
          category="LOOK DEVELOPMENT"
          title="Cinematic Lighting & Composition"
          description="Exploring mood, narrative, and atmosphere through 3D rendering. This series focuses on specialized lighting scenarios and composition, from automotive showcases to low-light streetscapes."
          tags={['Cinematic Rendering', 'Lighting Design', '3D Composition']}
          accent="#00E5FF"
          align="right"
          images={cube2Images} 
        />
      </div>

      {/* Temporary disabled
      <div className="pb-24 pt-12 text-center relative z-10">
        <Link
          to="/works"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-body font-medium text-sm tracking-wide transition-all duration-300"
          style={{
            background: 'transparent',
            border: '1px solid rgba(108,99,255,0.35)',
            color: 'var(--mist)',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(108,99,255,0.1)';
            e.currentTarget.style.borderColor = 'rgba(108,99,255,0.6)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(108,99,255,0.35)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          Explore All Works
        </Link>
      </div> */}
    </section>
  );
};

export default ProjectsCubeSection;