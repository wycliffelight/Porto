import React, { useRef, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import WorksPage from './pages/WorksPage';
import { exportPortfolioPDF } from './utils/exportPDF';
import ParticlesBackground from './components/ParticlesBackground';
import ProjectsCubeSection from './components/ProjectsCubeSection';

const HomePage = ({ threeCanvasRef, particlesCanvasRef, onExportPDF, isExporting }) => (
  <main id="pdf-root" style={{ width: '100%', overflowX: 'hidden' }}>
    <HeroSection
      threeCanvasRef={threeCanvasRef}
      particlesCanvasRef={particlesCanvasRef}
    />
    <ProjectsCubeSection />
    <AboutSection />
    <Footer onExportPDF={onExportPDF} isExporting={isExporting} />
  </main>
);

function App() {
  const threeCanvasRef = useRef(null);
  const particlesCanvasRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);

  const handleExportPDF = useCallback(async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportError(null);
    try {
      await exportPortfolioPDF(threeCanvasRef, particlesCanvasRef);
    } catch (err) {
      console.error('PDF export failed:', err);
      setExportError('PDF export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [isExporting]);

  return (
    <Router>
      <style>{`
        html, body, #root {
          overflow-x: hidden;
          width: 100%;
          max-width: 100vw;
          margin: 0;
          padding: 0;
          overscroll-behavior-x: none;
        }
      `}</style>

      {exportError && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            background: 'rgba(255,80,80,0.15)',
            border: '1px solid rgba(255,80,80,0.4)',
            color: '#ff8080',
            padding: '12px 20px',
            borderRadius: '10px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            backdropFilter: 'blur(12px)',
          }}
          onClick={() => setExportError(null)}
        >
          {exportError} <span style={{ marginLeft: '8px', cursor: 'pointer', opacity: 0.6 }}>✕</span>
        </div>
      )}

      {isExporting && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            background: 'rgba(5,5,8,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              border: '2px solid rgba(108,99,255,0.2)',
              borderTop: '2px solid #6C63FF',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(232,230,240,0.7)', fontSize: '14px' }}>
            Generating PDF…
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'auto',
        }}
      >
        <ParticlesBackground
          canvasRef={particlesCanvasRef}
          particleCount={110}
          color="#6C63FF"
          secondaryColor="#00E5FF"
          connectionDistance={130}
          speed={0.35}
        />
      </div>      

      <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <HomePage
                  threeCanvasRef={threeCanvasRef}
                  particlesCanvasRef={particlesCanvasRef}
                  onExportPDF={handleExportPDF}
                  isExporting={isExporting}
                />
              </>
            }
          />

          <Route
            path="/works"
            element={
              <>
                <Navigation />
                <WorksPage />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;