import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const EarthModel = () => {
  const parallaxRef = useRef();
  const earthRotationRef = useRef();
  const cloudsRef = useRef();
  const wireMatRef = useRef();
  const earthScaleRef = useRef();
  
  const { nodes, materials } = useGLTF('./Earth.glb');
  const revealUniforms = useMemo(() => ({
    uMousePos: { value: new THREE.Vector3(999, 999, 999) }, 
    uRadius: { value: 0.5 } 
  }), []);

  const wireGeometry = useMemo(() => {
    return new THREE.WireframeGeometry(nodes.Earth.geometry);
  }, [nodes.Earth.geometry]);

  useEffect(() => {
    const applyHoverMask = (material, isWireframe) => {
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uMousePos = revealUniforms.uMousePos;
        shader.uniforms.uRadius = revealUniforms.uRadius;

        shader.vertexShader = `
          uniform vec3 uMousePos;
          uniform float uRadius;
          varying vec3 vCustomWorldPos;
          ${shader.vertexShader}
        `.replace(
          `#include <worldpos_vertex>`,
          `#include <worldpos_vertex>
           vCustomWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`
        );

        const discardLogic = isWireframe 
          ? `if (distance(vCustomWorldPos, uMousePos) > uRadius) discard;`
          : `if (distance(vCustomWorldPos, uMousePos) < uRadius) discard;`;

        shader.fragmentShader = `
          uniform vec3 uMousePos;
          uniform float uRadius;
          varying vec3 vCustomWorldPos;
          ${shader.fragmentShader}
        `.replace(
          `#include <clipping_planes_fragment>`,
          `#include <clipping_planes_fragment>
           ${discardLogic}
          `
        );
      };
      
      material.customProgramCacheKey = () => isWireframe ? 'wire' : 'tex';
      material.needsUpdate = true;
    };

    if (materials.Earth_Diffuse_6K) {
      materials.Earth_Diffuse_6K.side = THREE.DoubleSide;
      materials.Earth_Diffuse_6K.transparent = false;
      materials.Earth_Diffuse_6K.depthWrite = true;
      applyHoverMask(materials.Earth_Diffuse_6K, false);
    }
    
    if (materials['Material.001']) {
      materials['Material.001'].transparent = true;
      materials['Material.001'].depthWrite = false;
      materials['Material.001'].opacity = 0.75;
      materials['Material.001'].blending = THREE.AdditiveBlending;
      applyHoverMask(materials['Material.001'], false);
    }

    if (wireMatRef.current) applyHoverMask(wireMatRef.current, true);

  }, [materials, revealUniforms]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (earthScaleRef.current) {
      const currentScale = earthScaleRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(currentScale, 5, 0.03); 
      earthScaleRef.current.scale.setScalar(nextScale);
    }

    if (parallaxRef.current) {
      const targetX = state.pointer.x * 0.2;
      const targetY = state.pointer.y * 0.2;
      
      parallaxRef.current.position.x = THREE.MathUtils.lerp(parallaxRef.current.position.x, targetX, 0.05);
      parallaxRef.current.position.y = THREE.MathUtils.lerp(parallaxRef.current.position.y, targetY, 0.05);
      parallaxRef.current.rotation.x = THREE.MathUtils.lerp(parallaxRef.current.rotation.x, -targetY * 0.5, 0.05);
      parallaxRef.current.rotation.y = THREE.MathUtils.lerp(parallaxRef.current.rotation.y, targetX * 0.5, 0.05);
    }

    // Native Earth rotation on the Z-axis
    if (earthRotationRef.current) {
      earthRotationRef.current.rotation.y += 0.0015; 
    }

    // Faster cloud rotation
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.002;
    }

    // Wireframe pulse
    if (wireMatRef.current) {
      wireMatRef.current.opacity = 0.65 + Math.sin(t * 1.5) * 0.2;
    }
  });

  return (
    // Parallax
    <group ref={parallaxRef}>
      
      {/* 23.5-degree axial tilt */}
      <group ref={earthScaleRef} rotation={[0, 0, 23.5 * (Math.PI / 180)]} scale={0}>
        
        <group ref={earthRotationRef}>
          
          <mesh geometry={nodes.Earth.geometry} scale={0.99}>
            <meshBasicMaterial color="#000000" />
          </mesh>

          {/* Wireframe lines */}
          <lineSegments geometry={wireGeometry}>
            <lineBasicMaterial ref={wireMatRef} color="#00E5FF" transparent opacity={0.8} />
          </lineSegments>

          {/* Textured Earth */}
          <mesh geometry={nodes.Earth.geometry} material={materials.Earth_Diffuse_6K} />

          {/* CLOUDS */}
          <mesh ref={cloudsRef} geometry={nodes.Earth_Clouds.geometry} material={materials['Material.001']} scale={1.008} />
        </group>

        <mesh 
          geometry={nodes.Earth.geometry}
          scale={1.05}
          onPointerMove={(e) => {
            e.stopPropagation(); 
            revealUniforms.uMousePos.value.copy(e.point);
          }}
          onPointerOut={() => {
            revealUniforms.uMousePos.value.set(999, 999, 999);
          }}
        >
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
};

const Particles = () => {
  const pointsRef = useRef();
  
  const positions = useMemo(() => {
    const pCount = 80;
    const pos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05;
      pointsRef.current.rotation.x = t * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#6C63FF" size={0.035} transparent opacity={0.6} />
    </points>
  );
};

const HeroThreeScene = ({ canvasRef }) => {
  return (
    <div
      className="threejs-layer"
      style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'auto' }}
      aria-hidden="true"
    >
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{
          preserveDrawingBuffer: true,
          alpha: true,
          antialias: true,
        }}
      >
        <ambientLight color="#6C63FF" intensity={0.5} />
        <directionalLight position={[5, 3, 5]} color="#ffffff" intensity={1.5} />
        <pointLight position={[-4, -2, 3]} color="#00E5FF" intensity={1.5} distance={20} />

        <EarthModel />
        <Particles />
      </Canvas>
    </div>
  );
};

useGLTF.preload('./Earth.glb');

export default HeroThreeScene;