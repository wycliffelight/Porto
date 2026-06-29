const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

const captureCanvas = (canvas) => {
  try {
    return canvas?.toDataURL('image/png') || null;
  } catch (e) {
    console.warn('Canvas capture failed:', e);
    return null;
  }
};

const overlayCanvasImage = (canvas, dataUrl) => {
  if (!canvas || !dataUrl) return () => {};

  const rect = canvas.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  const img = document.createElement('img');
  img.src = dataUrl;
  img.style.cssText = `
    position: absolute;
    top: ${rect.top + scrollTop}px;
    left: ${rect.left}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    z-index: 9999;
    pointer-events: none;
    object-fit: contain;
  `;
  img.setAttribute('data-pdf-overlay', 'true');

  const container = document.getElementById('pdf-root') || document.body;
  container.appendChild(img);

  return () => img.remove();
};

export const exportPortfolioPDF = async () => {
  const [html2canvasModule, jsPDFModule] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);
  const html2canvas = html2canvasModule.default;
  const { jsPDF } = jsPDFModule;

  const root = document.getElementById('pdf-root');
  if (!root) throw new Error('pdf-root element not found');

  const allCanvases = Array.from(document.querySelectorAll('canvas'));
  const activeCleanups = [];

  allCanvases.forEach((canvas) => {
    const dataUrl = captureCanvas(canvas);
    if (dataUrl) {
      const cleanup = overlayCanvasImage(canvas, dataUrl);
      activeCleanups.push(cleanup);
    }
  });

  const excludeEls = root.querySelectorAll('.pdf-exclude, #main-nav button[data-pdf-hide]');
  const hiddenBackups = [];
  excludeEls.forEach(el => {
    hiddenBackups.push({ el, display: el.style.display });
    el.style.display = 'none';
  });

  const gradientTextEls = root.querySelectorAll('.pdf-text-gradient-fix');
  const gradientBackups = [];
  gradientTextEls.forEach(el => {
    gradientBackups.push({ 
      el, 
      background: el.style.background,
      webkitBackgroundClip: el.style.webkitBackgroundClip,
      webkitTextFillColor: el.style.webkitTextFillColor,
      backgroundClip: el.style.backgroundClip
    });
    el.style.background = 'none';
    el.style.webkitBackgroundClip = 'initial';
    el.style.webkitTextFillColor = 'initial';
    el.style.backgroundClip = 'initial';
  });

  try {
    const canvas = await html2canvas(root, {
      useCORS: true,
      allowTaint: false,
      scale: 1.5, 
      backgroundColor: '#050508',
      logging: false,
      ignoreElements: (el) => {
        return (
          el.tagName === 'CANVAS' ||
          el.getAttribute('data-html2canvas-ignore') === 'true'
        );
      },
      onclone: (clonedDoc) => {
        const body = clonedDoc.body;
        body.style.background = '#050508';
      },
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    const canvasW = canvas.width;
    const canvasH = canvas.height;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = A4_WIDTH_MM;
    const pdfHeight = (canvasH / canvasW) * pdfWidth;

    if (pdfHeight <= A4_HEIGHT_MM) {
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    } else {
      const pageHeightPx = Math.floor((A4_HEIGHT_MM / pdfWidth) * canvasW);
      let yOffset = 0;
      let pageNum = 0;

      while (yOffset < canvasH) {
        if (pageNum > 0) pdf.addPage();

        const sliceH = Math.min(pageHeightPx, canvasH - yOffset);

        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvasW;
        sliceCanvas.height = sliceH;
        const ctx = sliceCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, yOffset, canvasW, sliceH, 0, 0, canvasW, sliceH);

        const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.92);
        const sliceHeightMM = (sliceH / canvasW) * pdfWidth;
        
        pdf.addImage(sliceData, 'JPEG', 0, 0, pdfWidth, sliceHeightMM);

        yOffset += sliceH;
        pageNum++;
      }
    }

    pdf.setProperties({
      title: 'Matthew Light — 3D Design Portfolio',
      author: 'Matthew Light',
      subject: 'Multimedia 3D Design Portfolio',
      keywords: '3d design, portfolio, three.js, webgl, generative art',
      creator: 'Portfolio App',
    });

    pdf.save('matthew-light-portfolio.pdf');
  } finally {
    activeCleanups.forEach(cleanup => cleanup());
    
    hiddenBackups.forEach(({ el, display }) => {
      el.style.display = display;
    });

    gradientBackups.forEach(({ el, background, webkitBackgroundClip, webkitTextFillColor, backgroundClip }) => {
      el.style.background = background;
      el.style.webkitBackgroundClip = webkitBackgroundClip;
      el.style.webkitTextFillColor = webkitTextFillColor;
      el.style.backgroundClip = backgroundClip;
    });
  }
};