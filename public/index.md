---
title: "Matthew Wycliffe Light Wowor - Technical Portfolio"
description: "An Informatics Engineering student at Institut Teknologi Perusahaan Listrik Negara specializing in 3D design. Technical architecture and specifications, a React 19 web application featuring React Three Fiber interactive 3D environments, custom GLSL shaders, TailwindCSS, and automated PDF export capabilities."
framework: "Create React App (react-scripts 5.0.1)"
language: "JavaScript (React / JSX)"
ai-train: "no"
search: "yes"
ai-input: "no"
key-dependencies:
  - "react: ^19.2.7"
  - "@react-three/fiber: ^9.6.1"
  - "@react-three/drei: ^10.7.7"
  - "three: ^0.165.0"
  - "react-router-dom: ^7.17.0"
  - "tailwindcss: ^3.4.19"
  - "jspdf: ^2.5.1"
  - "html2canvas: ^1.4.1"
  - "gsap: ^3.12.5"
---

# Porto Architecture & Technical Specification

Porto is a highly interactive, modern developer portfolio designed with an immersive 3D frontend experience and robust single-page application structure.

---

## 1. System Overview & Core Dependencies

The application relies on **React 19** and leverages specialized libraries for physics, rendering, animation, and document assembly:
* **3D Rendering Layer:** Utilizes `@react-three/fiber` and `@react-three/drei` to build declarative WebGL scenes on top of `three.js`.
* **Routing Strategy:** Implements `react-router-dom` (v7) for handling stateful views.
* **Layout & Utility:** Designed using utility-first classes via `tailwindcss` and micro-interactions powered by `gsap` and `motion`.
* **Export Engine:** Integrates `jspdf` and `html2canvas` for programmatically generating pixel-accurate multi-page PDF document summaries of the client-side portfolio.

---

## 2. Project Structure & Application Layout

The core initialization lives within `src/App.js`, which sets up application-wide styles, client-side routing, full-screen global overlays, and global notification handling for heavy asynchronous jobs.

### Routing Infrastructure
* **`/` (Home View):** Combines standard DOM components with parallel high-performance canvas layers inside `HomePage`.

### Global Composition Map
[App Root]
├── Global Reset CSS Style Overrides
├── Fixed Global Background Layer (ParticlesBackground - zIndex: 0)
├── Dynamic Layout Modals (PDF Export Overlays & Target Error Bars)
└── [React Router Switch]
├── Route "/" -> [Navigation] + [HomePage]
│                 ├── HeroSection (Mounts HeroThreeScene - zIndex: 2)
│                 ├── ProjectsCubeSection
│                 ├── AboutSection
│                 └── Footer
└── Route "/works" -> [Navigation] + [WorksPage]

---

## 3. Detailed Component Mechanics

### A. The Interactive 3D Earth Environment (`HeroThreeScene.jsx`)
The focal component of the hero header is an accelerated WebGL scene hosting a highly optimized 3D asset (`Earth.glb`) accompanied by dynamic orbital fields:
* **Custom Vertex & Fragment Shaders:** Modifies standard materials inside `onBeforeCompile` to perform realtime mathematical vector mask operations. A custom mask uniform (`uMousePos`, `uRadius`) computes distance functions against `vCustomWorldPos`.
* **Hover Transition Logic:** * If pixels fall inside the mouse radius threshold, the textured sphere material (`materials.Earth_Diffuse_6K`) is discarded (`discard;`), revealing an underlying neon wireframe model (`lineSegments` utilizing `wireGeometry`).
  * If pixels fall outside the radius, the wireframe fragments are discarded, revealing the fully textured planet.
* **Camera & Animation Loops:** Implements responsive lerped `useFrame` interpolation hooks capturing pointer coordinates (`state.pointer`) to animate camera parallax offsets, constant cloud layers (`rotation.y += 0.002`), and axial tilts (23.5 degrees).

### B. Canvas Interoperability & The PDF Export Engine
The system bridges asynchronous operations across multiple discrete render targets to package the current DOM state into a document buffer:
* **State Syncing & Refs:** The root component controls state flags (`isExporting`, `exportError`) and maintains distinct pointer bindings (`threeCanvasRef`, `particlesCanvasRef`) pointing down to operational WebGL and 2D contexts.
* **Buffer Strategy:** The WebGL context inside `HeroThreeScene` initializes with `preserveDrawingBuffer: true` explicitly configured to avoid frame buffer clearing, ensuring external tools (`html2canvas`) can sample textures during page captures without generating blank spaces.