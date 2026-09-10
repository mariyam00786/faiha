const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const outputPdfPath = path.join(publicDir, 'FAIHA_FAISAL_Portfolio.pdf');

const imageCache = new Map();

async function optimizeAndCache(relPath) {
  const fullPath = path.join(publicDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn('Image not found:', fullPath);
    imageCache.set(relPath, '');
    return;
  }
  const ext = path.extname(fullPath).toLowerCase();
  if (ext === '.svg') {
    const data = fs.readFileSync(fullPath);
    imageCache.set(relPath, `data:image/svg+xml;base64,${data.toString('base64')}`);
    return;
  }

  const isDrawing = relPath.includes('working-drawings');
  let buffer;
  let mime = 'image/jpeg';
  if (isDrawing && ext === '.png') {
    buffer = await sharp(fullPath)
      .resize({ width: 2200, fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 8 })
      .toBuffer();
    mime = 'image/png';
  } else {
    buffer = await sharp(fullPath)
      .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true })
      .toBuffer();
  }

  imageCache.set(relPath, `data:${mime};base64,${buffer.toString('base64')}`);
}

function toBase64(relPath) {
  if (imageCache.has(relPath)) {
    return imageCache.get(relPath);
  }
  const fullPath = path.join(publicDir, relPath);
  if (!fs.existsSync(fullPath)) return '';
  const ext = path.extname(fullPath).toLowerCase();
  let mime = 'image/jpeg';
  if (ext === '.png') mime = 'image/png';
  if (ext === '.webp') mime = 'image/webp';
  if (ext === '.svg') mime = 'image/svg+xml';
  const data = fs.readFileSync(fullPath);
  return `data:${mime};base64,${data.toString('base64')}`;
}

(async function main() {
  console.log('Optimizing portfolio assets with sharp...');
  const selfContent = fs.readFileSync(__filename, 'utf8');
  const matches = [...selfContent.matchAll(/toBase64\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
  const uniquePaths = [...new Set(matches)];
  console.log(`Pre-optimizing ${uniquePaths.length} portfolio assets with sharp...`);
  for (const relPath of uniquePaths) {
    await optimizeAndCache(relPath);
  }
  console.log('Assets successfully optimized in memory.');

// Profile & Cover
const profileIntro = toBase64('images/profile-intro.jpg');
const exteriorCover = toBase64('images/projects/exterior/architectural-facade-sketch.jpg');

// 01 · Courtyard Living & Biophilic Spaces (public/gallery/courtyard — dedicated Designs 01–03)
// Design 01 (3 Views - Modern Zen Garden)
const courtD1_1 = toBase64('gallery/courtyard/design 1 (1).png');
const courtD1_2 = toBase64('gallery/courtyard/design 1 (2).png');
const courtD1_3 = toBase64('gallery/courtyard/design 1 (3).png');

// Design 02 (2 Views - Tropical Light Atrium)
const courtD2_1 = toBase64('gallery/courtyard/design 2 (1).png');
const courtD2_2 = toBase64('gallery/courtyard/design 2 (2).png');

// Design 03 (5 Views - Minimalist Concrete & Raw Timber)
const courtD3_1 = toBase64('gallery/courtyard/design 3 (1).png');
const courtD3_2 = toBase64('gallery/courtyard/design 3 (2).png');
const courtD3_3 = toBase64('gallery/courtyard/design 3 (3).png');
const courtD3_4 = toBase64('gallery/courtyard/design 3 (4).png');
const courtD3_5 = toBase64('gallery/courtyard/design 3 (5).png');

// 02 · Exterior Architecture (public/gallery/EXTERIOR)
const extHero = toBase64('gallery/EXTERIOR/1 (3).png');
const ext1 = toBase64('gallery/EXTERIOR/2 (3).png');
const ext2 = toBase64('gallery/EXTERIOR/3 (2).png');
const ext3 = toBase64('gallery/EXTERIOR/4 (1).png');
const ext4 = toBase64('gallery/EXTERIOR/5 (1).png');

// 03 · Culinary Architecture (public/gallery/kitchen — dedicated Designs 01–04)
// Design 01 (3 Views)
const kitD1_1 = toBase64('gallery/kitchen/design 1 (1).png');
const kitD1_2 = toBase64('gallery/kitchen/design 1 (2).png');
const kitD1_3 = toBase64('gallery/kitchen/design 1 (3).png');

// Design 02 (4 Views)
const kitD2_1 = toBase64('gallery/kitchen/design 2 (1).png');
const kitD2_2 = toBase64('gallery/kitchen/design 2 (2).png');
const kitD2_3 = toBase64('gallery/kitchen/design 2 (3).png');
const kitD2_4 = toBase64('gallery/kitchen/design 2 (4).png');

// Design 03 (3 Views)
const kitD3_1 = toBase64('gallery/kitchen/design 3 (1).png');
const kitD3_2 = toBase64('gallery/kitchen/design 3 (2).png');
const kitD3_3 = toBase64('gallery/kitchen/design 3 (3).png');

// Design 04 (4 Views)
const kitD4_1 = toBase64('gallery/kitchen/design 4 (1).png');
const kitD4_2 = toBase64('gallery/kitchen/design 4 (2).png');
const kitD4_3 = toBase64('gallery/kitchen/design 4 (3).png');
const kitD4_4 = toBase64('gallery/kitchen/design 4 (4).png');

// 04 · Living Environments (public/gallery/living — dedicated Designs 01–03)
// Design 01 (3 Views - Double-Height Lounge & Media Feature)
const livD1_1 = toBase64('gallery/living/1 (1).png');
const livD1_2 = toBase64('gallery/living/1 (2).png');
const livD1_3 = toBase64('gallery/living/1 (3).png');

// Design 02 (3 Views - Tactile Timber Paneling & Family Retreat)
const livD2_1 = toBase64('gallery/living/2 (1).png');
const livD2_2 = toBase64('gallery/living/2 (2).png');
const livD2_3 = toBase64('gallery/living/2 (3).png');

// Design 03 (4 Views - Contemporary Lounge & Ambient Sconces)
const livD3_1 = toBase64('gallery/living/3 (1).png');
const livD3_2 = toBase64('gallery/living/3 (2).png');
const livD3_3 = toBase64('gallery/living/3 (3).png');
const livD3_4 = toBase64('gallery/living/3 (4).png');

// 05 · Dining Architecture (public/gallery/DINING)
const din1 = toBase64('gallery/DINING/1 (11).png');
const din2 = toBase64('gallery/DINING/2 (11).png');
const din3 = toBase64('gallery/DINING/3 (9).png');

// 06 · Wellness Washrooms (public/gallery/WASHROOM)
const wash1 = toBase64('gallery/WASHROOM/1 (12).png');
const wash2 = toBase64('gallery/WASHROOM/2 (12).png');
const wash3 = toBase64('gallery/WASHROOM/3 (10).png');
const washB1 = toBase64('gallery/WASHROOM/b1.png');
const washB2 = toBase64('gallery/WASHROOM/b2.png');
const washB3 = toBase64('gallery/WASHROOM/b3.png');

// 08 · Commercial Workplace (public/gallery/conference hall)
const confHero = toBase64('gallery/conference hall/ChatGPT Image Aug 12, 2026, 11_47_06 AM (1).png');

// Hand-drawn Architectural Concept Perspective Sketch
const sketchVilla = toBase64('gallery/working-drawings/WhatsApp Image 2026-09-08 at 11.26.23 PM.jpeg');

// 01 · Bedroom Suites (public/gallery/BEDROOM — dedicated Designs 01 & 02, Views 01–05)
// Design 01 (2 images - Heritage Cane Headboard & Dressing Suite)
const bedD1_1 = toBase64('gallery/BEDROOM/DESIGN 1 (1).png');
const bedD1_2 = toBase64('gallery/BEDROOM/DESIGN 1 (2).png');

// Design 02 (3 images - Luxury Master Sanctuary & Window Lounge)
const bedD2_1 = toBase64('gallery/BEDROOM/DESIGN 2 (1).jpeg');
const bedD2_2 = toBase64('gallery/BEDROOM/DESIGN 2 (2).jpeg');
const bedD2_3 = toBase64('gallery/BEDROOM/DESIGN 2 (3).jpeg');

// Design 03 (3 images - Modern Arched Sanctuary & Illuminated Niche)
const bedD3_1 = toBase64('gallery/BEDROOM/DESIGN 3 (1).png');
const bedD3_2 = toBase64('gallery/BEDROOM/DESIGN 3 (2).png');
const bedD3_3 = toBase64('gallery/BEDROOM/DESIGN 3 (3).png');

// Bedroom Suites (public/gallery/BEDROOM — dedicated Views 01–05)
// View 01 (3 images)
const bedV1_1 = toBase64('gallery/BEDROOM/view 1 (1).png');
const bedV1_2 = toBase64('gallery/BEDROOM/view 1 (2).png');
const bedV1_3 = toBase64('gallery/BEDROOM/view 1 (3).png');

// View 02 (5 images - Master Suite)
const bedV2_1 = toBase64('gallery/BEDROOM/view 2 (1).png');
const bedV2_2 = toBase64('gallery/BEDROOM/view 2 (2).png');
const bedV2_3 = toBase64('gallery/BEDROOM/view 2 (3).png');
const bedV2_4 = toBase64('gallery/BEDROOM/view 2 (4).png');
const bedV2_5 = toBase64('gallery/BEDROOM/view 2 (5).png');

// View 03 (3 images - Earth Tone Suite)
const bedV3_1 = toBase64('gallery/BEDROOM/view 3 (1).png');
const bedV3_2 = toBase64('gallery/BEDROOM/view 3 (2).png');
const bedV3_3 = toBase64('gallery/BEDROOM/view 3 (3).png');

// View 05 (2 images - Tailored Wardrobe & Alcove)
const bedV5_1 = toBase64('gallery/BEDROOM/view 5 (1).png');
const bedV5_2 = toBase64('gallery/BEDROOM/view 5 (2).png');

// 08 · Technical Working Drawings
// Formal Living Room & Courtyard CAD sets
const dwg1 = toBase64('images/projects/working-drawings/drawing-1.png');
const dwg2 = toBase64('images/projects/working-drawings/drawing-2.png');
const dwg3 = toBase64('images/projects/working-drawings/drawing-3.png');
const dwg4 = toBase64('images/projects/working-drawings/drawing-4.png');
const dwg5 = toBase64('images/projects/working-drawings/drawing-5.png');
const dwg6 = toBase64('images/projects/working-drawings/drawing-6.png');
const dwg7 = toBase64('images/projects/working-drawings/drawing-7.png');
const dwg8 = toBase64('images/projects/working-drawings/drawing-8.png');

// Bespoke Joinery & Bedroom Millwork sheets
const wdWardrobe = toBase64('images/projects/working-drawings/WARDROBE.jpg.jpeg');
const wdKettle = toBase64('images/projects/working-drawings/wall with kttl.jpg.jpeg');
const wdWardrobeDetail = toBase64('images/projects/working-drawings/WARDROBE DETAIL.jpg.jpeg');
const wdKattlSideTable = toBase64('images/projects/working-drawings/KATTL WITH SIDE TABLE.jpg.jpeg');

console.log('Generating 33-page editorial publication layout with dedicated bedroom, courtyard, kitchen, living, washroom suites, conference hall, and technical CAD sets...');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Faiha Faisal — Interior Architecture & Design Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page {
    size: 297mm 210mm;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  body {
    background-color: #F8F6F1;
    color: #25211E;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.45;
    font-size: 11.5px;
  }

  .sheet {
    width: 297mm;
    height: 210mm;
    page-break-after: always;
    break-after: page;
    position: relative;
    overflow: hidden;
    background-color: #F8F6F1;
    display: flex;
    flex-direction: column;
  }

  /* Header & Footer Rules */
  .page-header {
    height: 11mm;
    padding: 2.8mm 10mm 0 10mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(44, 39, 35, 0.12);
  }
  .page-header-left {
    font-size: 9.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #5A5148;
    font-weight: 600;
  }
  .page-header-right {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 13.5px;
    color: #25211E;
  }
  .page-footer {
    height: 8mm;
    padding: 0 10mm 2mm 10mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(44, 39, 35, 0.1);
    font-size: 8.5px;
    color: #7D746A;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .page-content {
    flex: 1;
    min-height: 0;
    padding: 3mm 10mm;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Typography Utilities */
  .serif-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 400;
    color: #25211E;
  }
  .serif-italic {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
  }
  .section-tag {
    font-size: 9.5px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #592727;
    font-weight: 700;
    margin-bottom: 4px;
    display: inline-block;
  }
  .editorial-body {
    font-size: 11px;
    line-height: 1.55;
    color: #433D36;
    margin-bottom: 6px;
  }

  /* Image Containers */
  .img-frame {
    position: relative;
    overflow: hidden;
    background-color: #EDE8DE;
    border: 1px solid rgba(44, 39, 35, 0.08);
    min-height: 0;
  }
  .img-fill {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .img-caption {
    position: absolute;
    bottom: 6px;
    left: 6px;
    background: rgba(37, 33, 30, 0.85);
    color: #FAF8F5;
    padding: 3px 8px;
    font-size: 8.8px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 500;
    backdrop-filter: blur(2px);
    border-radius: 1px;
    z-index: 2;
  }

  /* Fact Cards */
  .fact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    margin-bottom: 4px;
  }
  .fact-pill {
    background: #EDE8DE;
    padding: 4px 7px;
    border: 1px solid rgba(44, 39, 35, 0.06);
  }
  .fact-label {
    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #7D746A;
    margin-bottom: 1.5px;
  }
  .fact-val {
    font-size: 9.5px;
    font-weight: 600;
    color: #25211E;
    line-height: 1.2;
  }
  .intent-box {
    background: #EDE8DE;
    padding: 5px 8px;
    border-left: 2px solid #592727;
    font-size: 9.2px;
    color: #433D36;
    line-height: 1.38;
  }

  /* Specific Grids */
  .split-layout {
    display: grid;
    grid-template-columns: 78mm 1fr;
    grid-template-rows: minmax(0, 1fr);
    gap: 6mm;
    height: 100%;
    min-height: 0;
  }
  .split-layout-rev {
    display: grid;
    grid-template-columns: 1fr 78mm;
    grid-template-rows: minmax(0, 1fr);
    gap: 6mm;
    height: 100%;
    min-height: 0;
  }
  .split-layout > *, .split-layout-rev > * {
    min-height: 0;
  }

  /* Cover Styles */
  .cover-sheet {
    background-color: #201D1A;
    color: #FAF8F5;
  }
  .cover-container {
    height: 100%;
    padding: 12mm 14mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .cover-main-grid {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 16mm;
    align-items: center;
    flex: 1;
  }
  .cover-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 50px;
    line-height: 1.05;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: #FAF8F5;
    margin-bottom: 14px;
    white-space: nowrap;
  }
  .cover-subtitle {
    font-size: 11.8px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #D3C9BC;
    margin-bottom: 16px;
    font-weight: 500;
  }
  .cover-quote {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 15.5px;
    font-style: italic;
    color: #E2DDD5;
    opacity: 0.9;
    line-height: 1.55;
    border-left: 2px solid #592727;
    padding-left: 12px;
    max-width: 420px;
  }
  .cover-img-frame {
    height: 136mm;
    position: relative;
    border: 1px solid rgba(250, 248, 245, 0.2);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
  }
  .cover-footer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(250, 248, 245, 0.15);
    padding-top: 5mm;
    font-size: 9.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #9E9487;
  }

  /* Profile Styles */
  .profile-grid {
    display: grid;
    grid-template-columns: 88mm 1fr;
    gap: 7mm;
    height: 100%;
  }
  .profile-photo {
    height: 124mm;
    width: 100%;
    margin-bottom: 3mm;
  }
  .profile-quote {
    background: #EDE8DE;
    border-left: 3px solid #592727;
    padding: 10px 12px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 13.5px;
    line-height: 1.5;
    color: #25211E;
  }

  /* Table of Contents */
  .toc-grid {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 14mm;
    height: 100%;
  }
  .toc-item {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 4.8px 0;
    border-bottom: 1px solid rgba(44, 39, 35, 0.1);
  }
  .toc-num {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 17px;
    color: #592727;
    font-weight: 600;
    width: 28px;
  }
  .toc-title {
    font-size: 11.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #25211E;
  }
  .toc-desc {
    font-size: 9.5px;
    color: #7D746A;
  }
  .methodology-step {
    background: #EDE8DE;
    padding: 9px 12px;
    margin-bottom: 7px;
    border-left: 3px solid #25211E;
  }

  /* CV & Toolkit */
  .cv-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10mm;
    height: 100%;
  }
  .cv-column h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 18px;
    margin-bottom: 10px;
    border-bottom: 1px solid #592727;
    padding-bottom: 4px;
    color: #25211E;
  }
  .cv-item {
    margin-bottom: 10px;
  }
  .cv-item-title {
    font-size: 11px;
    font-weight: 700;
    color: #25211E;
  }
  .cv-item-sub {
    font-size: 9.8px;
    color: #592727;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .cv-item-desc {
    font-size: 9.5px;
    color: #5A5148;
    line-height: 1.45;
  }
  .skill-badge {
    background: #EDE8DE;
    padding: 3.5px 7px;
    font-size: 8.8px;
    font-weight: 600;
    color: #25211E;
    letter-spacing: 0.04em;
    border: 1px solid rgba(44, 39, 35, 0.08);
  }

  /* Materiality & Highlights Utilities to eliminate blank voids */
  .material-strip {
    background: #EDE8DE;
    padding: 5px 8px;
    border: 1px solid rgba(44, 39, 35, 0.08);
    margin-bottom: 5px;
  }
  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 3.5px;
    margin-top: 3px;
  }
  .mat-chip {
    background: #FAF8F5;
    padding: 2.2px 6px;
    font-size: 8px;
    font-weight: 600;
    color: #25211E;
    letter-spacing: 0.02em;
    border: 1px solid rgba(44, 39, 35, 0.08);
    border-radius: 1px;
  }
  .highlights-box {
    background: #FAF8F5;
    border: 1px solid rgba(44, 39, 35, 0.08);
    padding: 5px 8px;
    margin-bottom: 5px;
  }
  .highlight-list {
    list-style: none;
    margin-top: 2px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .highlight-list li {
    font-size: 8.5px;
    color: #433D36;
    line-height: 1.35;
  }

</style>
</head>
<body>

  <!-- ================================= SHEET 1: COVER PAGE ================================= -->
  <div class="sheet cover-sheet">
    <div class="cover-container">
      <div style="font-size: 9.5px; letter-spacing: 0.25em; text-transform: uppercase; color: #9E9487; display: flex; justify-content: space-between;">
        <span>Selected Works Publication · 2024–2025</span>
        <span>Kerala, India</span>
      </div>

      <div class="cover-main-grid">
        <div>
          <div class="cover-subtitle">Interior Architecture &amp; Spatial Design</div>
          <h1 class="cover-title">FAIHA <span class="serif-italic">FAISAL</span></h1>
          <div class="cover-quote">
            "Translating human social dynamics, cultural context, and sensory rituals into enduring, warm architectural environments."
          </div>
          <div style="margin-top: 20px; display: flex; gap: 14px; font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; color: #9E9487;">
            <span>Residential</span>
            <span>·</span>
            <span>Commercial</span>
            <span>·</span>
            <span>Bespoke Joinery</span>
            <span>·</span>
            <span>Façades</span>
          </div>
        </div>

        <div class="cover-img-frame img-frame">
          <img src="${exteriorCover}" alt="Faiha Faisal Architecture" class="img-fill">
          <div class="img-caption">Architectural Facade &amp; Landscape</div>
        </div>
      </div>

      <div class="cover-footer-row">
        <div>Faiha Faisal · Junior Interior Designer</div>
        <div>Calicut, Kerala, India</div>
        <div>Portfolio Edition 02</div>
      </div>
    </div>
  </div>

  <!-- ================================= SHEET 2: PROFILE & PHILOSOPHY ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">01 · Profile &amp; Background</div>
      <div class="page-header-right">Design Philosophy &amp; Experience</div>
    </div>

    <div class="page-content">
      <div class="profile-grid">
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div class="profile-photo img-frame">
            <img src="${profileIntro}" alt="Faiha Faisal" class="img-fill">
          </div>
          <div class="profile-quote">
            "My background in sociology taught me to observe human rituals and translate them into enduring, emotionally resonant spatial systems."
          </div>
        </div>

        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">About The Designer</div>
            <h2 class="serif-title" style="font-size: 30px; line-height: 1.1; margin-bottom: 10px;">
              Bridging Human Behavior &amp; <span class="serif-italic">Spatial Harmony</span>
            </h2>
            <p class="editorial-body">
              Born and raised in Kerala, India, and now practicing as an interior designer in Calicut, my design foundation is deeply informed by cultural context, natural materials, and an innate focus on how people genuinely experience physical space.
            </p>
            <p class="editorial-body">
              Prior to spatial design, I completed a <strong>Bachelor's degree in Sociology from Calicut University</strong>. While sociology and interior architecture are often viewed as distinct disciplines, this analytical background fundamentally directs my practice: it empowers me to observe family dynamics, functional flows, and social rituals before drawing a single wall. Wanting to merge that human-centered insight with creative execution, I pursued and completed my <strong>Diploma in Interior Design from Alagappa University</strong>.
            </p>
            <p class="editorial-body">
              Having contributed to residential and commercial projects at <em>Theyyampattil Homesoul Interior</em> and <em>AlHawaj Architect &amp; Builders</em>, I enjoy guiding projects from early research, conceptual moodboards, and spatial planning through photorealistic 3D visualization and millimeter-accurate technical documentation.
            </p>
          </div>

          
          <!-- 3 Pillars of Spatial Practice -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin: 8px 0;">
            <div style="background: #EDE8DE; padding: 7px 9px; border-left: 2px solid #592727;">
              <div style="font-size: 8px; text-transform: uppercase; letter-spacing: 0.12em; color: #7D746A; font-weight: 700; margin-bottom: 2px;">01 · Socio-Spatial Analysis</div>
              <div style="font-size: 9px; color: #433D36; line-height: 1.35;">Translating user routines and social rituals into organic floor flow and intuitive zoning.</div>
            </div>
            <div style="background: #EDE8DE; padding: 7px 9px; border-left: 2px solid #592727;">
              <div style="font-size: 8px; text-transform: uppercase; letter-spacing: 0.12em; color: #7D746A; font-weight: 700; margin-bottom: 2px;">02 · Bespoke Joinery Craft</div>
              <div style="font-size: 9px; color: #433D36; line-height: 1.35;">Millimeter-level millwork drafting with integrated LED coves and Blum mechanical hardware.</div>
            </div>
            <div style="background: #EDE8DE; padding: 7px 9px; border-left: 2px solid #592727;">
              <div style="font-size: 8px; text-transform: uppercase; letter-spacing: 0.12em; color: #7D746A; font-weight: 700; margin-bottom: 2px;">03 · Photorealistic 3D Rendering</div>
              <div style="font-size: 9px; color: #433D36; line-height: 1.35;">Light temperature simulation (2700K–4000K) and tactile material fidelity in Enscape &amp; 3ds Max.</div>
            </div>
          </div>

          <!-- Academic & Practice Credentials Grid -->
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 6px; margin-bottom: 6px;">
            <div style="background: #FAF8F5; border: 1px solid rgba(44, 39, 35, 0.08); padding: 7px 10px;">
              <div class="fact-label">Professional Experience Snapshot</div>
              <div style="font-size: 9.5px; font-weight: 700; color: #25211E;">Junior Interior Designer · AlHawaj Architect &amp; Builders</div>
              <div style="font-size: 9px; color: #592727; font-weight: 600; margin-bottom: 3px;">Theyyampattil Homesoul Interior · Calicut, Kerala</div>
              <div style="font-size: 8.8px; color: #5A5148; line-height: 1.35;">Space planning, residential villa conceptualization, client presentations, and site supervision.</div>
            </div>

            <div style="background: #FAF8F5; border: 1px solid rgba(44, 39, 35, 0.08); padding: 7px 10px;">
              <div class="fact-label">Education &amp; Credentials</div>
              <div style="font-size: 9.5px; font-weight: 700; color: #25211E;">Diploma in Interior Design</div>
              <div style="font-size: 8.8px; color: #592727; font-weight: 600;">Alagappa University (2024–2025)</div>
              <div style="font-size: 9.5px; font-weight: 700; color: #25211E; margin-top: 3px;">B.A. in Sociology</div>
              <div style="font-size: 8.8px; color: #592727; font-weight: 600;">Calicut University (2017–2020)</div>
            </div>
          </div>

          <div style="background: #EDE8DE; padding: 7px 10px; border: 1px solid rgba(44, 39, 35, 0.08); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div class="fact-label">Core Specializations</div>
              <div style="font-size: 9.5px; font-weight: 700; color: #25211E;">
                Residential Interiors · Space Planning · Photorealistic 3D Visualization · Custom Joinery · Biophilic Courtyards
              </div>
            </div>
            <div style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.1em; text-transform: uppercase;">
              Calicut, Kerala
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Faiha Faisal — Junior Interior Designer</div>
      <div>Page 02</div>
    </div>
  </div>

  <!-- ================================= SHEET 3: CONTENTS & METHODOLOGY ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">02 · Taxonomy &amp; Process</div>
      <div class="page-header-right">Curated Portfolio Index</div>
    </div>

    <div class="page-content">
      <div class="toc-grid">
        <!-- Left: Index of Projects matching contents.ts exact order -->
        <div>
          <div class="section-tag">Index of Typologies</div>
          <h2 class="serif-title" style="font-size: 26px; margin-bottom: 10px;">Selected Works Contents</h2>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">01</span>
              <div>
                <div class="toc-title">Bedroom Sanctuaries &amp; Suites</div>
                <div class="toc-desc">Designs 01–03 &amp; Views 01–05 Master Lounges, Arched Niches &amp; Millwork</div>
              </div>
            </div>
            <div style="font-weight: 700; font-size: 11px; color: #592727;">p. 04–10</div>
          </div>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">02</span>
              <div>
                <div class="toc-title">Courtyard &amp; Biophilic Spaces</div>
                <div class="toc-desc">Designs 01–03 Modern Zen, Tropical Atrium &amp; Concrete Light Wells</div>
              </div>
            </div>
            <div style="font-weight: 700; font-size: 11px; color: #592727;">p. 11–13</div>
          </div>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">03</span>
              <div>
                <div class="toc-title">Exterior Architecture</div>
                <div class="toc-desc">Villa Facades, Climate Modulation &amp; Framed Overhangs</div>
              </div>
            </div>
            <div style="font-weight: 700; font-size: 11px; color: #592727;">p. 14</div>
          </div>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">04</span>
              <div>
                <div class="toc-title">Culinary Architecture</div>
                <div class="toc-desc">Designs 01–04 Modular Kitchens, Islands &amp; Blum Hardware</div>
              </div>
            </div>
            <div style="font-weight: 700; font-size: 11px; color: #592727;">p. 15–18</div>
          </div>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">05</span>
              <div>
                <div class="toc-title">Living Environments</div>
                <div class="toc-desc">Designs 01–03 Double-Height Lounges, Social Flow &amp; Paneling</div>
              </div>
            </div>
            <div style="font-weight: 700; font-size: 11px; color: #592727;">p. 19–21</div>
          </div>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">06</span>
              <div>
                <div class="toc-title">Dining Architecture</div>
                <div class="toc-desc">Entertaining Hubs, Custom Buffet Joinery &amp; Ambient Lighting</div>
              </div>
            </div>
            <div style="font-weight: 700; font-size: 11px; color: #592727;">p. 22</div>
          </div>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">07</span>
              <div>
                <div class="toc-title">Wellness Washrooms</div>
                <div class="toc-desc">Master Spa Sanctuary, Soaking Tub, Fluted Stone &amp; Powder Suites</div>
              </div>
            </div>
            <div style="font-weight: 700; font-size: 11px; color: #592727;">p. 23–24</div>
          </div>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">08</span>
              <div>
                <div class="toc-title">Commercial Workplace</div>
                <div class="toc-desc">Executive Conference Hall, Boardroom AV Integration &amp; Acoustic Millwork</div>
              </div>
            </div>
            <div style="font-weight: 700; font-size: 11px; color: #592727;">p. 25</div>
          </div>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">09</span>
              <div>
                <div class="toc-title">Technical Working Drawings</div>
                <div class="toc-desc">Hand-Drawn Ideation &amp; AutoCAD Construction Sets A101–J204</div>
              </div>
            </div>
            <div style="font-weight: 700; font-size: 11px; color: #592727;">p. 26–32</div>
          </div>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">10</span>
              <div>
                <div class="toc-title">Curriculum Vitae &amp; Toolkit</div>
                <div class="toc-desc">Professional Experience, Technical Skills &amp; Contact</div>
              </div>
            </div>
            <div style="font-weight: 700; font-size: 11px; color: #592727;">p. 33</div>
          </div>
        </div>

        <!-- Right: 4-Stage Methodology -->
        <div>
          <div class="section-tag">Design Methodology</div>
          <h2 class="serif-title" style="font-size: 26px; margin-bottom: 10px;">The 4-Stage Lifecycle</h2>

          <div class="methodology-step">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <span style="font-weight: 700; font-size: 10.8px; text-transform: uppercase; letter-spacing: 0.08em; color: #25211E;">01 · Discovery &amp; Spatial Strategy</span>
              <span style="font-size: 8.5px; color: #7D746A; text-transform: uppercase;">Brief &amp; Research</span>
            </div>
            <p style="font-size: 9.8px; color: #5A5148; line-height: 1.48;">
              Engaging closely with client lifestyles, cultural habits, circulation constraints, and site context to define the design compass.
            </p>
          </div>

          <div class="methodology-step">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <span style="font-weight: 700; font-size: 10.8px; text-transform: uppercase; letter-spacing: 0.08em; color: #25211E;">02 · Concept Design &amp; 3D Modeling</span>
              <span style="font-size: 8.5px; color: #7D746A; text-transform: uppercase;">Volume &amp; Mood</span>
            </div>
            <p style="font-size: 9.8px; color: #5A5148; line-height: 1.48;">
              Synthesizing moodboards, spatial zoning diagrams, material palettes, and photorealistic 3D mockups in SketchUp &amp; 3ds Max.
            </p>
          </div>

          <div class="methodology-step">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <span style="font-weight: 700; font-size: 10.8px; text-transform: uppercase; letter-spacing: 0.08em; color: #25211E;">03 · Technical Detailing &amp; Documentation</span>
              <span style="font-size: 8.5px; color: #7D746A; text-transform: uppercase;">AutoCAD &amp; Revit</span>
            </div>
            <p style="font-size: 9.8px; color: #5A5148; line-height: 1.48;">
              Producing complete construction packs, electrical schematics, custom joinery sections, and finish schedules with zero ambiguity.
            </p>
          </div>

          <div class="methodology-step">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <span style="font-weight: 700; font-size: 10.8px; text-transform: uppercase; letter-spacing: 0.08em; color: #25211E;">04 · Site Coordination &amp; Realization</span>
              <span style="font-size: 8.5px; color: #7D746A; text-transform: uppercase;">On-Site Craft</span>
            </div>
            <p style="font-size: 9.8px; color: #5A5148; line-height: 1.48;">
              Collaborating on-site with carpenters, contractors, and lighting specialists to ensure precision craft and harmonious aesthetic finish.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Faiha Faisal — Junior Interior Designer</div>
      <div>Page 03</div>
    </div>
  </div>

  <!-- ================================= SHEET 4: PROJECT 01 · BEDROOM SUITES — DESIGN 01 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 01 · Bedroom Suites</div>
      <div class="page-header-right">Design 01 · Heritage Cane Headboard &amp; Dressing Suite</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Private Sanctuaries · Design 01</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Bespoke Woodcraft, Cane Weave &amp; <span class="serif-italic">Dressing Foyer</span>
            </h2>
            <p class="editorial-body">
              Conceived as an intimate sanctuary of natural craftsmanship, Design 01 pairs rich teak woodwork, woven cane screening, and organic botanical artwork.
            </p>
            <p class="editorial-body">
              A bespoke bed frame featuring an integrated slatted and woven cane headboard anchors the sleeping volume, while an artisanal carved arched mirror in the dressing foyer establishes deep visual perspective and connects the arrival threshold with rest quarters.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Woven Natural Cane</span><span class="mat-chip">Solid Plantation Teak</span><span class="mat-chip">Earthy Lime Wash</span><span class="mat-chip">Brushed Brass</span><span class="mat-chip">Sisal Weave Rug</span><span class="mat-chip">Fluted Timber</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Hand-woven cane headboard modulating acoustic reverberation and tactile warmth</li><li>• Symmetrical bedside floating drawer units with concealed cable management</li><li>• Dressing corridor portal with arched artisanal vanity mirror and warm 2700K illumination</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Master Suite &amp; Dressing Foyer</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Headboard</div>
                <div class="fact-val">Custom Teak &amp; Natural Cane</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Wall Finish</div>
                <div class="fact-val">Earthy Lime Wash &amp; Botanical Art</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Flooring</div>
                <div class="fact-val">Polished Limestone &amp; Sisal Rug</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Spatial Reflection:</strong> The carved arched mirror in the dressing corridor captures soft natural daylight and reflects the primary bed elevation, cultivating continuous spatial dialogue between morning preparation and restful retreat.
            </div>
          </div>
        </div>

        <!-- Right 2-Image Composition for Design 01 -->
        <div style="display: grid; grid-template-rows: 1.05fr 1fr; gap: 8px; height: 100%; min-height: 0;">
          <div class="img-frame" style="min-height: 0;">
            <img src="${bedD1_2}" alt="Master Suite Bed Elevation &amp; Cane Headboard" class="img-fill">
            <div class="img-caption">Primary Suite Composition · Slatted Cane Headboard &amp; Botanical Triptych</div>
          </div>
          <div class="img-frame" style="min-height: 0;">
            <img src="${bedD1_1}" alt="Dressing Corridor &amp; Arched Mirror Perspective" class="img-fill">
            <div class="img-caption">Dressing Foyer &amp; Arched Mirror Elevation · Spatial Connection &amp; Vanity</div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Bedroom Suites — Design 01 · Heritage Cane Headboard &amp; Dressing Suite</div>
      <div>Page 04</div>
    </div>
  </div>

  <!-- ================================= SHEET 5: PROJECT 01 · BEDROOM SUITES — DESIGN 02 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 01 · Bedroom Suites</div>
      <div class="page-header-right">Design 02 · Contemporary Luxury Suite &amp; Lounge</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Private Sanctuaries · Design 02</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Warm Minimalist Luxury &amp; <span class="serif-italic">Organic Textures</span>
            </h2>
            <p class="editorial-body">
              Conceived as an expansive luxury master sanctuary, Design 02 harmonizes tactile natural finishes, architectural lighting, and an integrated private window lounge.
            </p>
            <p class="editorial-body">
              A bespoke timber frame with curved woven cane headboard anchors the bedroom space, while floor-to-ceiling sheer drapery, sculptural hanging globe pendants, and acoustic 3D wall art cultivate an enveloping, resort-grade tranquility.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Smoked Oak Paneling</span><span class="mat-chip">Calacatta Marble Slabs</span><span class="mat-chip">Textured Bouclé</span><span class="mat-chip">Concealed Cove LED</span><span class="mat-chip">Brushed Nickel</span><span class="mat-chip">Polished Stone</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Full-height architectural smoked oak paneling establishing deep visual calm</li><li>• Integrated cantilevered window daybed lounge framing tranquil external garden vistas</li><li>• Seamless flush door integration connecting the sleeping chamber to the luxury dressing suite</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Master Suite &amp; Lounge</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Headboard</div>
                <div class="fact-val">Custom Timber &amp; Woven Cane</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Palette</div>
                <div class="fact-val">Warm Greige, Teak, Bouclé</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Flooring</div>
                <div class="fact-val">Polished Architectural Terrazzo</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Spatial Strategy:</strong> An open corridor naturally leads to the walk-in wardrobe dressing suite, preserving generous circulation and calm visual breathing room.
            </div>
          </div>
        </div>

        <!-- Right 3-Image Composition for Design 02 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.3;">
            <img src="${bedD2_3}" alt="Master Suite Bed &amp; Cane Headboard Elevation" class="img-fill">
            <div class="img-caption">Primary Suite Composition · Bespoke Cane Headboard &amp; Acoustic Wall Relief</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 56mm;">
            <div class="img-frame">
              <img src="${bedD2_2}" alt="Private Window Lounge &amp; Daylighting" class="img-fill">
              <div class="img-caption">Window Lounge · Daylighting &amp; Sheer Drapery</div>
            </div>
            <div class="img-frame">
              <img src="${bedD2_1}" alt="Spatial Angle &amp; Dressing Corridor Entry" class="img-fill">
              <div class="img-caption">Room Perspective · Hospitality Bar &amp; Dressing Suite</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Bedroom Suites — Design 02 · Contemporary Luxury Suite &amp; Window Lounge</div>
      <div>Page 05</div>
    </div>
  </div>

    <!-- ================================= SHEET 6: PROJECT 01 · BEDROOM SUITES — DESIGN 03 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 01 · Bedroom Suites</div>
      <div class="page-header-right">Design 03 · Modern Arched Sanctuary &amp; Illuminated Niche</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Private Sanctuaries · Design 03</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Illuminated Arched Niches, Stucco &amp; <span class="serif-italic">Vanity Alcove</span>
            </h2>
            <p class="editorial-body">
              Conceived as a serene contemporary haven, Design 03 pairs an illuminated sage green stucco arched niche, classical damask wall coverings, and an acoustic perforated plaster frieze.
            </p>
            <p class="editorial-body">
              A low-profile upholstered bed is flanked by minimalist walnut nightstands and dual spherical brass wall sconces. Seamless full-height glazing welcomes abundant daylight and lush garden views, while the dedicated dressing nook integrates an arched vanity mirror and compact floating joinery.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Backlit Sage Stucco</span><span class="mat-chip">Perforated Plaster Frieze</span><span class="mat-chip">Natural Walnut Millwork</span><span class="mat-chip">Brushed Brass Sconces</span><span class="mat-chip">Classical Damask Fabric</span><span class="mat-chip">Honed Limestone</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Symmetrical headboard wall with concealed 2700K perimeter LED radiance</li><li>• Dedicated vanity niche creating continuous architectural dialogue with sleeping quarters</li><li>• Acoustic perforation frieze mitigating flutter echoes and ensuring restful sanctuary</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Master Suite &amp; Vanity Nook</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Accent Niche</div>
                <div class="fact-val">Backlit Sage Stucco Arch</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Headboard Wall</div>
                <div class="fact-val">Perforated Plaster Frieze</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Hardware &amp; Lighting</div>
                <div class="fact-val">Brass Sconces &amp; Warm LED</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Lighting Strategy:</strong> Concealed warm perimeter LED illumination around the arched alcove creates soft indirect evening radiance, providing a glare-free architectural focal point that gently dissolves boundary walls.
            </div>
          </div>
        </div>

        <!-- Right 3-Image Composition for Design 03 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.3;">
            <img src="${bedD3_1}" alt="Master Suite Bed &amp; Illuminated Arched Accent Niche" class="img-fill">
            <div class="img-caption">Primary Suite Perspective · Illuminated Arched Alcove &amp; Perforated Frieze</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 56mm;">
            <div class="img-frame">
              <img src="${bedD3_2}" alt="Axial Elevation View &amp; Garden Access" class="img-fill">
              <div class="img-caption">Axial Elevation · Symmetrical Bed Wall &amp; Balcony Access</div>
            </div>
            <div class="img-frame">
              <img src="${bedD3_3}" alt="Vanity Nook &amp; Arched Mirror" class="img-fill">
              <div class="img-caption">Vanity Nook · Arched Brass Mirror &amp; Damask Accent</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Bedroom Suites — Design 03 · Modern Arched Sanctuary &amp; Illuminated Niche</div>
      <div>Page 06</div>
    </div>
  </div>

<!-- ================================= SHEET 7: PROJECT 01 · BEDROOM — VIEW 01 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 01 · Bedroom Suites</div>
      <div class="page-header-right">Design View 01 · Minimalist Symmetry</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Private Sanctuaries · View 01</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Minimalist Warmth &amp; <span class="serif-italic">Spatial Symmetry</span>
            </h2>
            <p class="editorial-body">
              Designed as a tranquil minimalist haven, View 01 centers on balanced spatial alignment, subtle natural light, and refined modern finishes.
            </p>
            <p class="editorial-body">
              Low-profile platform bedding, integrated bedside ledges, and warm recessed LED illumination establish a calming, uncluttered retreat tailored for evening relaxation and peaceful morning daylight.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Warm Terracotta Stucco</span><span class="mat-chip">Ribbed Timber Paneling</span><span class="mat-chip">2700K Recessed Troffers</span><span class="mat-chip">Linen Drapery</span><span class="mat-chip">Terrazzo Inset</span><span class="mat-chip">Brushed Bronze</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Double-aspect daylight modulation through sheer linen drapery and deep window returns</li><li>• Earthy terracotta accent wall grounding the low-profile upholstered platform bed</li><li>• Axial circulation pathway linking bedroom lounge effortlessly to outdoor balcony</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Master Bedroom · View 01</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Palette</div>
                <div class="fact-val">Oatmeal, Ash Wood, Linen</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Lighting</div>
                <div class="fact-val">Circadian Warm LED Coves</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Joinery</div>
                <div class="fact-val">Concealed Minimalist Units</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Spatial Strategy:</strong> Pure geometric lines and neutral surfaces accentuate natural textures, eliminating clutter to create an oasis of rest.
            </div>
          </div>
        </div>

        <!-- Right 3-Image Composition for View 01 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.3;">
            <img src="${bedV1_2}" alt="Bedroom View 01 Hero" class="img-fill">
            <div class="img-caption">Main Bedroom Composition · Symmetrical Elevation &amp; Lighting</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 56mm;">
            <div class="img-frame">
              <img src="${bedV1_1}" alt="Bedroom View 01 Detail 1" class="img-fill">
              <div class="img-caption">Bedside &amp; Reading Accent Detail</div>
            </div>
            <div class="img-frame">
              <img src="${bedV1_3}" alt="Bedroom View 01 Detail 2" class="img-fill">
              <div class="img-caption">Spatial Angle &amp; Ambient Perspective</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Bedroom Suites — View 01 · Minimalist Symmetry &amp; Restful Tones</div>
      <div>Page 07</div>
    </div>
  </div>

  <!-- ================================= SHEET 8: PROJECT 01 · BEDROOM — VIEW 02 (MASTER SANCTUARY) ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 01 · Bedroom Suites</div>
      <div class="page-header-right">Design View 02 · Master Sanctuary Suite</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Master Sanctuary · View 02</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Master Suite &amp; <span class="serif-italic">Bespoke Millwork</span>
            </h2>
            <p class="editorial-body">
              An expansive master bedroom suite featuring an integrated fluted headboard wall panel, full-height custom wardrobe joinery, and an ergonomic vanity study unit.
            </p>
            <p class="editorial-body">
              Acoustic timber battens eliminate flutter echoes while seamlessly housing floating nightstands, touch-activated brass reading sconces, and indirect perimeter illumination.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Rift-cut White Oak</span><span class="mat-chip">Fluted Wall Battens</span><span class="mat-chip">Bronze Mirror Glass</span><span class="mat-chip">Microcement Flooring</span><span class="mat-chip">Blackened Steel Trims</span><span class="mat-chip">Wool Felt</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Unobstructed threshold transition onto private landscaped terrace deck</li><li>• Custom floor-to-ceiling wardrobe millwork with flush integrated shadowline pulls</li><li>• Directional glare-free architectural reading sconces positioned at ergonomic headboard height</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Master Suite · View 02</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Joinery</div>
                <div class="fact-val">Full-Height Fluted Wardrobes</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Materials</div>
                <div class="fact-val">Smoked Walnut, Bouclé, Brass</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Lighting</div>
                <div class="fact-val">Concealed 3000K Perimeter LED</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Joinery Focus:</strong> Continuous vertical battens maintain architectural rhythm across both bed elevation and dressing alcove, crafting seamless luxury.
            </div>
          </div>
        </div>

        <!-- Right 5-Render Master Suite Composition for View 02 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.25;">
            <img src="${bedV2_2}" alt="Master Suite Hero View 02" class="img-fill">
            <div class="img-caption">Master Suite Bed Composition &amp; Integrated Fluted Wood Paneling</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px; height: 52mm;">
            <div class="img-frame">
              <img src="${bedV2_3}" alt="Wardrobe Suite View 02" class="img-fill">
              <div class="img-caption">Wardrobe Suite</div>
            </div>
            <div class="img-frame">
              <img src="${bedV2_4}" alt="Slatted Paneling View 02" class="img-fill">
              <div class="img-caption">Slatted Paneling</div>
            </div>
            <div class="img-frame">
              <img src="${bedV2_5}" alt="Vanity Console View 02" class="img-fill">
              <div class="img-caption">Vanity Console</div>
            </div>
            <div class="img-frame">
              <img src="${bedV2_1}" alt="Ambient Lighting View 02" class="img-fill">
              <div class="img-caption">Ambient Lighting</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Bedroom Suites — View 02 · Master Sanctuary &amp; Fluted Joinery</div>
      <div>Page 08</div>
    </div>
  </div>

  <!-- ================================= SHEET 9: PROJECT 01 · BEDROOM — VIEW 03 (EARTH TONE SUITE) ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 01 · Bedroom Suites</div>
      <div class="page-header-right">Design View 03 · Earth-Toned Retreat</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Acoustic Sanctuaries · View 03</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Tactile Wood &amp; <span class="serif-italic">Organic Warmth</span>
            </h2>
            <p class="editorial-body">
              Rooted in organic materials and deep earthy tones, View 03 demonstrates how warm wood textures, acoustic slatted partitions, and tactile linens foster an enveloping sense of quietude.
            </p>
            <p class="editorial-body">
              The spatial configuration balances private sleep zones with reading corners, highlighted by directional warm sconces and soft textured rugs that absorb reverberations.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Ochre Clay Plaster</span><span class="mat-chip">Muted Sandstone Slabs</span><span class="mat-chip">Solid Ash Wood</span><span class="mat-chip">Warm 3000K Cove Lighting</span><span class="mat-chip">Textured Wool Carpet</span><span class="mat-chip">Matte Brass</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Tactile earth-toned plaster finish providing organic natural resonance across all wall faces</li><li>• Minimalist closet millwork with concealed reveals and integrated interior sensor lighting</li><li>• Axial sightline alignment from arrival threshold through to serene window garden view</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Guest Suite · View 03</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Palette</div>
                <div class="fact-val">Moka, Terracotta, Charcoal</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Textures</div>
                <div class="fact-val">Woven Wool, Slatted Teak</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Acoustics</div>
                <div class="fact-val">Acoustic Fabric &amp; Battens</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Ambiance:</strong> Soft perimeter lighting accentuates the organic grain of natural timber, evoking the grounding warmth of a secluded retreat.
            </div>
          </div>
        </div>

        <!-- Right 3-Image Composition for View 03 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.3;">
            <img src="${bedV3_2}" alt="Bedroom View 03 Hero" class="img-fill">
            <div class="img-caption">Main Earth-Toned Suite Perspective · Slatting &amp; Soft Fabrics</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 56mm;">
            <div class="img-frame">
              <img src="${bedV3_1}" alt="Bedroom View 03 Detail 1" class="img-fill">
              <div class="img-caption">Acoustic Wall Slat Detail</div>
            </div>
            <div class="img-frame">
              <img src="${bedV3_3}" alt="Bedroom View 03 Detail 2" class="img-fill">
              <div class="img-caption">Textured Linen &amp; Sconce Vignette</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Bedroom Suites — View 03 · Earth Tones &amp; Acoustic Millwork</div>
      <div>Page 09</div>
    </div>
  </div>

  <!-- ================================= SHEET 10: PROJECT 01 · BEDROOM — VIEW 05 (TAILORED WARDROBE & ALCOVE) ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 01 · Bedroom Suites</div>
      <div class="page-header-right">Design View 05 · Tailored Wardrobe &amp; Alcove</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div>
            <div class="section-tag">Ergonomic Storage · View 05</div>
            <h2 class="serif-title" style="font-size: 26px; line-height: 1.1; margin-bottom: 8px;">
              Tailored Wardrobe &amp; <span class="serif-italic">Study Alcove</span>
            </h2>
            <p class="editorial-body">
              View 05 emphasizes space-efficient joinery solutions, featuring custom floor-to-ceiling built-in wardrobes paired with a dedicated vanity console.
            </p>
            <p class="editorial-body">
              Flush handle profiles, integrated LED sensor strips, and compartmentalized organizers maximize functional capacity within a minimal footprint.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Fluted Glass Sliders</span><span class="mat-chip">Anodized Champagne Aluminum</span><span class="mat-chip">Italian Leather Pulls</span><span class="mat-chip">Velvet Dressing Bench</span><span class="mat-chip">Backlit Shelf Rails</span><span class="mat-chip">Smoked Oak</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Modular wardrobe interior with dedicated jewelry drawers, hanging bays, and tie trays</li><li>• Curved corner vanity transition maximizing circulation clearance in dressing suite</li><li>• Full-height backlit dressing mirror providing true-color CRI>95 illumination</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Storage Suite · View 05</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Joinery</div>
                <div class="fact-val">Full-Height Built-in Wardrobes</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Workstation</div>
                <div class="fact-val">Integrated Vanity Study Desk</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Finishes</div>
                <div class="fact-val">Anti-Fingerprint Matte Laminate</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Storage Maximization:</strong> Floor-to-ceiling cabinetry conceals wardrobe essentials behind clean, uniform planes for uninterrupted visual order.
            </div>
          </div>
        </div>

        <!-- Right 2-Image Composition for View 05 -->
        <div style="display: grid; grid-template-rows: 1fr 1fr; gap: 8px; height: 100%; min-height: 0;">
          <div class="img-frame" style="min-height: 0;">
            <img src="${bedV5_2}" alt="Bedroom View 05 Main Suite" class="img-fill">
            <div class="img-caption">Modern Suite Perspective · Symmetrical Joinery &amp; Bed Integration</div>
          </div>
          <div class="img-frame" style="min-height: 0;">
            <img src="${bedV5_1}" alt="Bedroom View 05 Wardrobe Detail" class="img-fill">
            <div class="img-caption">Integrated Wardrobe Millwork &amp; Dedicated Vanity Station</div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Bedroom Suites — View 05 · Tailored Wardrobe &amp; Spatial Efficiency</div>
      <div>Page 10</div>
    </div>
  </div>

  <!-- ================================= SHEET 11: PROJECT 02 · COURTYARD LIVING — DESIGN 01 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 02 · Courtyard Living</div>
      <div class="page-header-right">Design 01 · Modern Zen Garden &amp; Light Wells</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Biophilic Sanctuaries · Design 01</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Modern Zen &amp; <span class="serif-italic">Contemplative Silence</span>
            </h2>
            <p class="editorial-body">
              Conceived as a contemplative sanctuary within the residence, Design 01 translates classic Japanese zen garden principles into a contemporary architectural form.
            </p>
            <p class="editorial-body">
              Raked white quartz gravel, organic granite stepping pavers, and a Japanese maple focal point are gently illuminated by overhead skylight louvers, inviting shifting sun patterns and serene stillness into daily living.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">White Quartz Gravel</span><span class="mat-chip">Honed Granite Stepping Pavers</span><span class="mat-chip">Weathered Cedar Decking</span><span class="mat-chip">Perforated Breezeway Screen</span><span class="mat-chip">Japanese Maple Specimen</span><span class="mat-chip">Basalt</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Geometric water reflection pool with recessed underwater spotlights and granite coping</li><li>• Perforated breeze wall modulating harsh afternoon sun while enabling cross-ventilation</li><li>• Seamless flush threshold connecting indoor living room directly into open-air courtyard</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Internal Zen Garden</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Materials</div>
                <div class="fact-val">Granite Pavers, White Quartz</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Focal Elements</div>
                <div class="fact-val">Japanese Maple &amp; Basin</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Daylight</div>
                <div class="fact-val">Filtered North Skylight</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Spatial Strategy:</strong> Low-profile ground textures and frameless glass thresholds visually expand connecting corridors, transforming circulation into a restful pause.
            </div>
          </div>
        </div>

        <!-- Right 3-Image Composition for Courtyard Design 01 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.3;">
            <img src="${courtD1_1}" alt="Courtyard Design 01 Hero" class="img-fill">
            <div class="img-caption">Modern Zen Courtyard · Granite Pavers &amp; Skylit Light Atrium</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 56mm;">
            <div class="img-frame">
              <img src="${courtD1_2}" alt="Courtyard Design 01 Detail 1" class="img-fill">
              <div class="img-caption">Raked Gravel Bed &amp; Stepping Paver Detail</div>
            </div>
            <div class="img-frame">
              <img src="${courtD1_3}" alt="Courtyard Design 01 Detail 2" class="img-fill">
              <div class="img-caption">Skylight Perspective &amp; Ambient Daylight Flow</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Courtyards — Design 01 · Modern Zen Garden &amp; Contemplative Light</div>
      <div>Page 11</div>
    </div>
  </div>

  <!-- ================================= SHEET 12: PROJECT 02 · COURTYARD LIVING — DESIGN 02 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 02 · Courtyard Living</div>
      <div class="page-header-right">Design 02 · Tropical Light Atrium &amp; Passive Cooling</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Biophilic Sanctuaries · Design 02</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Tropical Atrium &amp; <span class="serif-italic">Thermal Modulation</span>
            </h2>
            <p class="editorial-body">
              Design 02 serves as both a lush green sanctuary and a high-performance thermal chimney, channeling fresh breezes and gentle filtered daylight into the home's core.
            </p>
            <p class="editorial-body">
              A cantilevered timber pergola roof modulates harsh midday sun, casting dynamic geometric shadows while encouraging natural stack-effect convection that flushes warm interior air through upper clerestory vents.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Basalt Stone Cladding</span><span class="mat-chip">Teak Slat Trellis</span><span class="mat-chip">Living Fern Wall</span><span class="mat-chip">Black Pebble Border</span><span class="mat-chip">Frameless Skylight Glazing</span><span class="mat-chip">Cast Bronze</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Double-height glass skylight atrium channeling abundant diffuse northern sunlight</li><li>• Integrated automated drip-irrigation vertical plant wall promoting indoor air purification</li><li>• Cantilevered natural timber bench seating integrated into the perimeter stone planter</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Tropical Light Atrium</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Flora</div>
                <div class="fact-val">Monstera, Ficus, Tree Ferns</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Shading</div>
                <div class="fact-val">Cantilevered Teak Pergola</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Climate</div>
                <div class="fact-val">Passive Stack Ventilation</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Micro-Climate Benefit:</strong> High foliage transpiration and sheltered breeze corridors lower adjacent ambient temperatures naturally without artificial mechanical cooling.
            </div>
          </div>
        </div>

        <!-- Right 2-Image Composition for Courtyard Design 02 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.25;">
            <img src="${courtD2_1}" alt="Courtyard Design 02 Hero" class="img-fill">
            <div class="img-caption">Tropical Light Atrium · Lush Foliage &amp; Double-Height Well</div>
          </div>
          <div class="img-frame" style="height: 56mm;">
            <img src="${courtD2_2}" alt="Courtyard Design 02 Pergola Detail" class="img-fill">
            <div class="img-caption">Cantilevered Teak Pergola &amp; Sunlight Modulation</div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Courtyards — Design 02 · Tropical Light Atrium &amp; Passive Stack Cooling</div>
      <div>Page 12</div>
    </div>
  </div>

  <!-- ================================= SHEET 13: PROJECT 02 · COURTYARD LIVING — DESIGN 03 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 02 · Courtyard Living</div>
      <div class="page-header-right">Design 03 · Minimalist Concrete &amp; Monolithic Planters</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Biophilic Sanctuaries · Design 03</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Raw Concrete &amp; <span class="serif-italic">Architectural Honesty</span>
            </h2>
            <p class="editorial-body">
              Design 03 embraces sculptural minimalism, combining board-formed cast concrete planter walls with custom teakwood bench seating and architectural pebble drainage channels.
            </p>
            <p class="editorial-body">
              Crisp geometric lines frame tactile greenery against smooth cement surfaces, elevated at dusk by discreet recessed 3000K floor grazers that highlight the natural aggregate texture of the walls.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Board-Formed Concrete</span><span class="mat-chip">Reclaimed Ironwood</span><span class="mat-chip">River Rock Bed</span><span class="mat-chip">Polished Microcement</span><span class="mat-chip">Stainless Tension Cables</span><span class="mat-chip">Bamboo Shading</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Monolithic architectural concrete wall featuring authentic timber board grain texture</li><li>• Floating raw-edge timber bench hovering above a recessed river pebble drain bed</li><li>• Sculptural specimen planting illuminated by low-voltage recessed ground uplights</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Raw Concrete Courtyard</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Surfaces</div>
                <div class="fact-val">Board-Formed Concrete</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Joinery</div>
                <div class="fact-val">Integrated Teak Benches</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Lighting</div>
                <div class="fact-val">Recessed 3000K Ground Grazers</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Material Detailing:</strong> The tactile contrast between solid board-formed concrete and warm wood grain achieves an enduring, dignified architectural balance.
            </div>
          </div>
        </div>

        <!-- Right 5-Image Composition for Courtyard Design 03 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.25;">
            <img src="${courtD3_1}" alt="Courtyard Design 03 Hero" class="img-fill">
            <div class="img-caption">Monolithic Concrete Planter &amp; Integrated Teak Seating Hero</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px; height: 52mm;">
            <div class="img-frame">
              <img src="${courtD3_2}" alt="Courtyard Design 03 Detail 1" class="img-fill">
              <div class="img-caption">Planter Joinery</div>
            </div>
            <div class="img-frame">
              <img src="${courtD3_3}" alt="Courtyard Design 03 Detail 2" class="img-fill">
              <div class="img-caption">Pebble Drain Channel</div>
            </div>
            <div class="img-frame">
              <img src="${courtD3_4}" alt="Courtyard Design 03 Detail 3" class="img-fill">
              <div class="img-caption">Concrete Texture</div>
            </div>
            <div class="img-frame">
              <img src="${courtD3_5}" alt="Courtyard Design 03 Detail 4" class="img-fill">
              <div class="img-caption">Ground Illumination</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Courtyards — Design 03 · Raw Concrete, Monolithic Planters &amp; Timber</div>
      <div>Page 13</div>
    </div>
  </div>

  <!-- ================================= SHEET 14: PROJECT 03 · EXTERIOR ARCHITECTURE ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 03 · Exterior Architecture</div>
      <div class="page-header-right">Modern Villa Facade &amp; Thresholds · 2024</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Facades &amp; Entryways</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Tropical Form &amp; <span class="serif-italic">Framed Thresholds</span>
            </h2>
            <p class="editorial-body">
              The architectural exterior was conceived as a dynamic dialogue between contemporary geometric minimalism and tropical contextual responsiveness.
            </p>
            <p class="editorial-body">
              Deep cantilevered overhangs, integrated green planters, and vertical rhythmic louvers modulate harsh tropical daylight while ensuring effortless cross-ventilation. Bold geometric volumes protect family privacy while crafting a dignified, enduring street presence.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Cast Concrete Portals</span><span class="mat-chip">Marine-Grade Teak Louvers</span><span class="mat-chip">Low-E Solar Glazing</span><span class="mat-chip">Textured Sand Wash</span><span class="mat-chip">Black Powdercoated Aluminum</span><span class="mat-chip">Granite</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Deep structural cantilevered overhangs providing passive solar protection in tropical heat</li><li>• Rhythmic vertical timber louvers shielding upper floor bedroom terraces for privacy</li><li>• Layered architectural massing defining an impressive yet welcoming private arrival court</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Modern Villa Facade</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Location</div>
                <div class="fact-val">Kerala, India</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Software</div>
                <div class="fact-val">AutoCAD, SketchUp, Enscape</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Focus Area</div>
                <div class="fact-val">Climate Shading &amp; Massing</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Design Intent:</strong> Seamless transition between the public arrival approach and private residential retreat through tactile concrete, warm teakwood, and recessed lighting.
            </div>
          </div>
        </div>

        <!-- Right Visual Display (Hero + 4 Mini Perspectives from gallery/EXTERIOR) -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.2;">
            <img src="${extHero}" alt="Exterior Facade Hero" class="img-fill">
            <div class="img-caption">Main Approach Elevation · Daylight Study</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px; height: 50mm;">
            <div class="img-frame">
              <img src="${ext1}" alt="Entry Porch" class="img-fill">
              <div class="img-caption">Entry Porch</div>
            </div>
            <div class="img-frame">
              <img src="${ext2}" alt="Cantilever Overhang" class="img-fill">
              <div class="img-caption">Cantilever</div>
            </div>
            <div class="img-frame">
              <img src="${ext3}" alt="Dusk Illumination" class="img-fill">
              <div class="img-caption">Dusk Lighting</div>
            </div>
            <div class="img-frame">
              <img src="${ext4}" alt="Balcony Planter" class="img-fill">
              <div class="img-caption">Balcony Planter</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Exterior Architecture — Massing, Climate Modulation &amp; Thresholds</div>
      <div>Page 14</div>
    </div>
  </div>

  <!-- ================================= SHEET 15: PROJECT 04 · CULINARY ARCHITECTURE — DESIGN 01 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 04 · Culinary Architecture</div>
      <div class="page-header-right">Design 01 · Minimalist White &amp; Warm Oak</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Culinary Architecture · Design 01</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Nordic Minimalism &amp; <span class="serif-italic">Streamlined Joinery</span>
            </h2>
            <p class="editorial-body">
              Design 01 pairs clean Nordic minimalism with warm oak accents to create an airy, light-flooded culinary workspace. Designed with strict adherence to ergonomic circulation, the island configuration enables fluid multi-person cooking and entertaining.
            </p>
            <p class="editorial-body">
              Concealed handle profiles, anti-fingerprint matte acrylic surfaces, and stain-resistant quartz countertops ensure timeless aesthetic purity paired with effortless day-to-day resilience.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Ultra-Matte Acrylic</span><span class="mat-chip">Natural Oak Veneer</span><span class="mat-chip">Calacatta Quartz Slabs</span><span class="mat-chip">Brushed Brass Mixer</span><span class="mat-chip">Blum Blumotion Slides</span><span class="mat-chip">Fluted Tile</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Ergonomic kitchen working triangle optimizing distances between prep, cooking, and refrigeration</li><li>• Continuous quartz waterfall island with flush undermount sink and integrated breakfast seating</li><li>• Handleless push-to-open upper cabinets with integrated warm under-cabinet task LED strips</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Island Modular Kitchen</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Palette</div>
                <div class="fact-val">Matte White, Oak, Calacatta</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Countertops</div>
                <div class="fact-val">Engineered Quartz Slab</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Hardware</div>
                <div class="fact-val">Blum Tandembox Soft-Close</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Spatial Strategy:</strong> Low-profile central island maintains clear sightlines into adjacent living zones while doubling as a casual breakfast bar.
            </div>
          </div>
        </div>

        <!-- Right 3-Image Composition for Design 01 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.3;">
            <img src="${kitD1_1}" alt="Kitchen Design 01 Hero" class="img-fill">
            <div class="img-caption">Kitchen Elevation &amp; Quartz Breakfast Island</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 56mm;">
            <div class="img-frame">
              <img src="${kitD1_2}" alt="Kitchen Design 01 Detail 1" class="img-fill">
              <div class="img-caption">Pantry Storage &amp; Fluted Joinery Detail</div>
            </div>
            <div class="img-frame">
              <img src="${kitD1_3}" alt="Kitchen Design 01 Detail 2" class="img-fill">
              <div class="img-caption">Hob Station &amp; Ambient LED Profile</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Culinary Architecture — Design 01 · Minimalist Joinery &amp; Ergonomic Triangles</div>
      <div>Page 15</div>
    </div>
  </div>

  <!-- ================================= SHEET 16: PROJECT 04 · CULINARY ARCHITECTURE — DESIGN 02 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 04 · Culinary Architecture</div>
      <div class="page-header-right">Design 02 · Monolithic Quartz Island &amp; Fluted Smoked Oak</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Culinary Architecture · Design 02</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Monolithic Quartz &amp; <span class="serif-italic">Textured Cabinetry</span>
            </h2>
            <p class="editorial-body">
              Design 02 celebrates bold textural contrast, pairing dark fluted wood cabinetry with a dramatic monolithic waterfall quartz island. The composition anchors the home as an inviting social and culinary centerpiece.
            </p>
            <p class="editorial-body">
              Flush-integrated high-end appliances remain hidden behind full-height smoked oak panels, preserving the pristine architectural massing while delivering uncompromising professional kitchen performance.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Charcoal Fluted Laminate</span><span class="mat-chip">Stainless Steel Backsplash</span><span class="mat-chip">Silestone Countertop</span><span class="mat-chip">Smoked Glass Cabinets</span><span class="mat-chip">Recessed Channel LED</span><span class="mat-chip">Matte Black</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• High-capacity full-height pantry towers with internal pull-out tandem storage baskets</li><li>• Under-cabinet 3000K warm task lighting completely eliminating worktop shadow zones</li><li>• Central prep island housing flush induction cooktop and downdraft ventilation unit</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Open-Plan Island Kitchen</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Island</div>
                <div class="fact-val">Waterfall Quartz Countertop</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Cabinetry</div>
                <div class="fact-val">Smoked Oak &amp; Fluted Panels</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Fittings</div>
                <div class="fact-val">Matte Gunmetal &amp; 3000K LED</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Work Triangle:</strong> Prep sink, induction hob, and concealed refrigeration form an effortless golden triangle with zero wasted footsteps.
            </div>
          </div>
        </div>

        <!-- Right 4-Image Composition for Design 02 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.25;">
            <img src="${kitD2_1}" alt="Kitchen Design 02 Hero" class="img-fill">
            <div class="img-caption">Monolithic Waterfall Island &amp; Smoked Wood Accents</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; height: 52mm;">
            <div class="img-frame">
              <img src="${kitD2_2}" alt="Kitchen Design 02 Detail 1" class="img-fill">
              <div class="img-caption">Breakfast Bar Counter</div>
            </div>
            <div class="img-frame">
              <img src="${kitD2_3}" alt="Kitchen Design 02 Detail 2" class="img-fill">
              <div class="img-caption">Concealed Appliance Joinery</div>
            </div>
            <div class="img-frame">
              <img src="${kitD2_4}" alt="Kitchen Design 02 Detail 3" class="img-fill">
              <div class="img-caption">Task Lighting &amp; Prep Station</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Culinary Architecture — Design 02 · Monolithic Island &amp; Social Continuity</div>
      <div>Page 16</div>
    </div>
  </div>

  <!-- ================================= SHEET 17: PROJECT 04 · CULINARY ARCHITECTURE — DESIGN 03 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 04 · Culinary Architecture</div>
      <div class="page-header-right">Design 03 · Contemporary Parallel Architecture</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Culinary Architecture · Design 03</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Parallel Efficiency &amp; <span class="serif-italic">Ambient Illumination</span>
            </h2>
            <p class="editorial-body">
              Design 03 utilizes a high-efficiency parallel (galley) layout that maximizes functional counter run while accommodating dedicated wet and dry preparation zones.
            </p>
            <p class="editorial-body">
              Warm contemporary timber laminates, anti-glare under-cabinet LED task profiles, and textured stone backsplashes create an intimate, tactile cooking atmosphere tailored for passionate home chefs.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Bleached Birch Plywood</span><span class="mat-chip">Fluted Ceramic Subway Tiles</span><span class="mat-chip">Terrazzo Worktops</span><span class="mat-chip">Matte Black Fixtures</span><span class="mat-chip">Integrated Herb Planters</span><span class="mat-chip">Natural Rattan</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Open timber floating shelves displaying curated tableware with concealed recessed groove lights</li><li>• Vertical stacked ceramic subway tile splashback sealed with waterproof epoxy grout</li><li>• Concealed countertop appliance garage equipped with bi-fold retracting pocket doors</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Parallel Modular Kitchen</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Zones</div>
                <div class="fact-val">Dedicated Wet &amp; Dry Counters</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Backsplash</div>
                <div class="fact-val">Seamless Large-Format Tile</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Lighting</div>
                <div class="fact-val">Under-Cabinet 3000K Strip LED</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Storage Detailing:</strong> Full-height larder units and soft-close pull-out pantries organize kitchen essentials with high volumetric efficiency.
            </div>
          </div>
        </div>

        <!-- Right 3-Image Composition for Design 03 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.3;">
            <img src="${kitD3_1}" alt="Kitchen Design 03 Hero" class="img-fill">
            <div class="img-caption">Contemporary Parallel Kitchen &amp; Storage Efficiency</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 56mm;">
            <div class="img-frame">
              <img src="${kitD3_2}" alt="Kitchen Design 03 Detail 1" class="img-fill">
              <div class="img-caption">Backsplash Tile &amp; Linear Task Light</div>
            </div>
            <div class="img-frame">
              <img src="${kitD3_3}" alt="Kitchen Design 03 Detail 2" class="img-fill">
              <div class="img-caption">Full Elevation &amp; Circulation Path</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Culinary Architecture — Design 03 · Parallel Configuration &amp; Storage Flow</div>
      <div>Page 17</div>
    </div>
  </div>

  <!-- ================================= SHEET 18: PROJECT 04 · CULINARY ARCHITECTURE — DESIGN 04 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 04 · Culinary Architecture</div>
      <div class="page-header-right">Design 04 · Compact Modular Ergonomics</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Culinary Architecture · Design 04</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Compact Geometry &amp; <span class="serif-italic">Smart Storage Zoning</span>
            </h2>
            <p class="editorial-body">
              Design 04 explores high-density modular joinery tailored for compact urban living, demonstrating that restricted square footage never requires aesthetic or functional compromise.
            </p>
            <p class="editorial-body">
              Every millimeter is optimized with corner carousel pull-outs, integrated spice racks, overhead lift-up Blum Aventos bi-fold cabinets, and sleek undermount appliances.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Blackened Steel Framing</span><span class="mat-chip">Distressed Brick Veneer</span><span class="mat-chip">Concrete Quartz Slab</span><span class="mat-chip">Reclaimed Elm Timber</span><span class="mat-chip">Edison Filament Pendants</span><span class="mat-chip">Brass Mesh</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Ceiling-suspended architectural steel gantry storing stemware and bar accessories</li><li>• Heavy-duty prep island integrating under-counter beverage cooler and double pull-out waste bins</li><li>• Commercial-grade high-arc pull-down sprayer faucet over deep stainless steel basin</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Compact L-Shaped Kitchen</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Hardware</div>
                <div class="fact-val">Blum Aventos Bi-Fold Lift</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Storage</div>
                <div class="fact-val">Corner Carousel &amp; Pull-Outs</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Surfaces</div>
                <div class="fact-val">Satin Anti-Scratch Acrylic</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Ergonomic Detailing:</strong> Continuous work surfaces adjacent to both the hob and sink streamline single-cook meal preparation with total fluidity.
            </div>
          </div>
        </div>

        <!-- Right 4-Image Composition for Design 04 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.25;">
            <img src="${kitD4_1}" alt="Kitchen Design 04 Hero" class="img-fill">
            <div class="img-caption">Compact Modular Kitchen &amp; Clean Modern Geometry</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; height: 52mm;">
            <div class="img-frame">
              <img src="${kitD4_2}" alt="Kitchen Design 04 Detail 1" class="img-fill">
              <div class="img-caption">Tall Storage Unit &amp; Oven Tower</div>
            </div>
            <div class="img-frame">
              <img src="${kitD4_3}" alt="Kitchen Design 04 Detail 2" class="img-fill">
              <div class="img-caption">Undermount Sink &amp; Matte Cabinetry</div>
            </div>
            <div class="img-frame">
              <img src="${kitD4_4}" alt="Kitchen Design 04 Detail 3" class="img-fill">
              <div class="img-caption">Ergonomic Workflow Triangle</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Culinary Architecture — Design 04 · Compact Modular Geometry &amp; Smart Storage</div>
      <div>Page 18</div>
    </div>
  </div>

  <!-- ================================= SHEET 19: PROJECT 05 · LIVING ENVIRONMENTS — DESIGN 01 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 05 · Living Environments</div>
      <div class="page-header-right">Design 01 · Double-Height Lounge &amp; Feature Media Paneling</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Living Environments · Design 01</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Sanctuary of <span class="serif-italic">Tactile Warmth</span>
            </h2>
            <p class="editorial-body">
              Conceived as a grand restful heart for family life, Design 01 orchestrates natural light penetration, vertical volume, and acoustic balance within an expansive double-height lounge.
            </p>
            <p class="editorial-body">
              Warm fluted oak paneling, integrated media joinery, tactile linen upholstery, and recessed cove lighting create a calming, grounded ambiance that effortlessly counters the fast pace of modern life.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Bookmatched Statuario Marble</span><span class="mat-chip">Charcoal Acoustic Battens</span><span class="mat-chip">Top-Grain Italian Leather</span><span class="mat-chip">Brushed Brass Reveals</span><span class="mat-chip">Motorized Velvet Drapes</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Monumental two-story bookmatched marble feature wall housing a flush linear ethanol fireplace</li><li>• Custom floating media console with acoustic fabric doors concealing AV components</li><li>• Spectacular multi-tier sculptural ring chandelier suspended through the double-height void</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Double-Height Formal Lounge</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Millwork</div>
                <div class="fact-val">Fluted Oak Feature Wall</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Materials</div>
                <div class="fact-val">Oak, Bouclé, Travertine</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Lighting</div>
                <div class="fact-val">Indirect 3000K Cove LED</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Spatial Strategy:</strong> Floor-to-ceiling slatted paneling visually connects the ground floor lounge with the upper gallery, unifying vertical sightlines.
            </div>
          </div>
        </div>

        <!-- Right 3-Image Composition for Living Design 01 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.3;">
            <img src="${livD1_1}" alt="Living Design 01 Hero" class="img-fill">
            <div class="img-caption">Double-Height Living Void &amp; Feature Media Paneling</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 56mm;">
            <div class="img-frame">
              <img src="${livD1_2}" alt="Living Design 01 Detail 1" class="img-fill">
              <div class="img-caption">Lounge Seating &amp; Coffee Table Arrangement</div>
            </div>
            <div class="img-frame">
              <img src="${livD1_3}" alt="Living Design 01 Detail 2" class="img-fill">
              <div class="img-caption">Vertical Perspective &amp; Daylight Glazing</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Living Environments — Design 01 · Double-Height Lounge &amp; Spatial Flow</div>
      <div>Page 19</div>
    </div>
  </div>

  <!-- ================================= SHEET 20: PROJECT 05 · LIVING ENVIRONMENTS — DESIGN 02 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 05 · Living Environments</div>
      <div class="page-header-right">Design 02 · Tactile Timber Paneling &amp; Family Retreat</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div>
            <div class="section-tag">Living Environments · Design 02</div>
            <h2 class="serif-title" style="font-size: 26px; line-height: 1.1; margin-bottom: 8px;">
              Acoustic Paneling &amp; <span class="serif-italic">Intimate Flow</span>
            </h2>
            <p class="editorial-body">
              Design 02 establishes an intimate, cozy family entertainment sanctuary centered on full-height acoustic timber battens and bespoke low-profile credenza joinery.
            </p>
            <p class="editorial-body">
              Deep natural teak textures absorb sound reverberation while providing seamless concealed storage for audiovisual hardware, resulting in an uncluttered aesthetic of quiet elegance.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Slatted American Walnut</span><span class="mat-chip">Textured Cream Bouclé</span><span class="mat-chip">Honed Travertine Coffee Tables</span><span class="mat-chip">Recessed Wall Sconces</span><span class="mat-chip">Wool-Silk Area Rug</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Full-perimeter vertical walnut acoustic paneling cultivating sound dampening and intimacy</li><li>• Deep-seated modular sectional sofa layout configured for effortless conversational flow</li><li>• Integrated display niches finished in brushed bronze with dimmable perimeter warm wash</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Family Living Retreat</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Joinery</div>
                <div class="fact-val">Concealed Low-Profile Credenza</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Finishes</div>
                <div class="fact-val">Natural Teak &amp; Warm Linen</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Hardware</div>
                <div class="fact-val">Push-to-Open Concealed Tracks</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Acoustic Focus:</strong> Wood battens and textured fabrics eliminate echo, creating an enveloping acoustic environment ideal for cinematic immersion.
            </div>
          </div>
        </div>

        <!-- Right 3-Image Composition for Living Design 02 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%; min-height: 0;">
          <div class="img-frame" style="flex: 1.3; min-height: 0;">
            <img src="${livD2_1}" alt="Living Design 02 Hero" class="img-fill">
            <div class="img-caption">Tactile Wood Paneling &amp; Floating Media Console Hero</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 56mm; min-height: 0;">
            <div class="img-frame" style="min-height: 0;">
              <img src="${livD2_2}" alt="Living Design 02 Detail 1" class="img-fill">
              <div class="img-caption">Textured Wall Paneling Detail &amp; Side Sconce</div>
            </div>
            <div class="img-frame" style="min-height: 0;">
              <img src="${livD2_3}" alt="Living Design 02 Detail 2" class="img-fill">
              <div class="img-caption">Circulation Flow &amp; Ceiling Linear Light</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Living Environments — Design 02 · Tactile Wood Paneling &amp; Intimate Retreat</div>
      <div>Page 20</div>
    </div>
  </div>

  <!-- ================================= SHEET 21: PROJECT 05 · LIVING ENVIRONMENTS — DESIGN 03 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 05 · Living Environments</div>
      <div class="page-header-right">Design 03 · Contemporary Lounge &amp; Ambient Illumination</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Living Environments · Design 03</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Social Continuity &amp; <span class="serif-italic">Curated Vignettes</span>
            </h2>
            <p class="editorial-body">
              Design 03 embraces an open-plan lifestyle, seamlessly connecting the informal living zone with adjacent dining spaces through low-profile modular furniture and unobstructed sightlines.
            </p>
            <p class="editorial-body">
              A bespoke open bookcase unit defines spatial boundaries without solid walls, enriched by warm directional brass sconces and recessed ceiling channels for atmospheric evening hosting.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Micro-Ribbed Wall Panels</span><span class="mat-chip">Polished Botticino Marble</span><span class="mat-chip">Brushed Bronze Accents</span><span class="mat-chip">Sheer Motorized Blinds</span><span class="mat-chip">Smoked Walnut Credenza</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Curved architectural drop ceiling bulkhead with concealed 2700K perimeter LED ribbon</li><li>• Symmetrical twin spherical wall sconces framing the primary artwork and floating console</li><li>• Continuous visual and material alignment guiding movement from living lounge toward dining</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Open-Plan Contemporary Lounge</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Seating</div>
                <div class="fact-val">Modular Deep-Seat Sectional</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Storage</div>
                <div class="fact-val">Integrated Open Bookcase Unit</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Lighting</div>
                <div class="fact-val">Directional Sconces &amp; Profile LED</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Zoning Detailing:</strong> Low-profile furniture forms maintain natural breeze and visual continuity toward adjacent green light courts and entertaining areas.
            </div>
          </div>
        </div>

        <!-- Right 4-Image Composition for Living Design 03 -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.25;">
            <img src="${livD3_1}" alt="Living Design 03 Hero" class="img-fill">
            <div class="img-caption">Contemporary Lounge Composition &amp; Open Spatial Flow</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; height: 52mm;">
            <div class="img-frame">
              <img src="${livD3_2}" alt="Living Design 03 Detail 1" class="img-fill">
              <div class="img-caption">Accent Sconce &amp; Bookcase</div>
            </div>
            <div class="img-frame">
              <img src="${livD3_3}" alt="Living Design 03 Detail 2" class="img-fill">
              <div class="img-caption">Conversation Seating</div>
            </div>
            <div class="img-frame">
              <img src="${livD3_4}" alt="Living Design 03 Detail 3" class="img-fill">
              <div class="img-caption">Dining Transition View</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Living Environments — Design 03 · Contemporary Form &amp; Ambient Illumination</div>
      <div>Page 21</div>
    </div>
  </div>

  <!-- ================================= SHEET 22: PROJECT 06 · DINING ARCHITECTURE ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 06 · Dining Architecture</div>
      <div class="page-header-right">Entertaining Hubs &amp; Millwork Transitions</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Dining &amp; Hospitality</div>
            <h2 class="serif-title" style="font-size: 28px; line-height: 1.1; margin-bottom: 8px;">
              Social Continuity &amp; <span class="serif-italic">Material Harmony</span>
            </h2>
            <p class="editorial-body">
              The dining space serves as the central gathering fulcrum connecting the open kitchen with the internal courtyard. It is designed to foster leisurely family meals and gracious evening entertainment.
            </p>
            <p class="editorial-body">
              A bespoke solid timber dining table is flanked by custom upholstered chairs, anchored overhead by a sculptural linear light fixture that emphasizes intimacy without cluttering vertical air space.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Solid American Walnut</span><span class="mat-chip">Fluted Glass Buffet Doors</span><span class="mat-chip">Smoked Bronze Mirror</span><span class="mat-chip">Brushed Brass Chandelier</span><span class="mat-chip">Nubuck Leather Dining Chairs</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• 8-seater monolithic solid timber dining table crafted for grand family hospitality</li><li>• Bespoke sideboard buffet credenza featuring fluted glass doors and Calacatta marble counter</li><li>• Low-glare architectural pendant luminaire positioned at precise 75cm table datum</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Residential Dining Room</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Seating</div>
                <div class="fact-val">8-Person Solid Wood Table</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Cabinetry</div>
                <div class="fact-val">Bespoke Fluted Buffet Unit</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Finishes</div>
                <div class="fact-val">Walnut, Brass, Textured Stone</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Spatial Strategy:</strong> Low-profile furniture forms ensure continuous sightlines toward the green courtyard, weaving nature into everyday dining rituals.
            </div>
          </div>
        </div>

        <!-- Right 3-Image Composition from gallery/DINING -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%;">
          <div class="img-frame" style="flex: 1.3;">
            <img src="${din1}" alt="Dining Hero Setting" class="img-fill">
            <div class="img-caption">Main Dining Perspective · Table, Chandelier &amp; Spatial Flow</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 50mm;">
            <div class="img-frame">
              <img src="${din2}" alt="Buffet & Wall Detailing" class="img-fill">
              <div class="img-caption">Custom Buffet Joinery &amp; Fluted Wall Paneling</div>
            </div>
            <div class="img-frame">
              <img src="${din3}" alt="Dining Chandelier Vignette" class="img-fill">
              <div class="img-caption">Linear Chandelier &amp; Table Setting Vignette</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Dining Architecture — Gathering Hubs &amp; Custom Millwork Transitions</div>
      <div>Page 22</div>
    </div>
  </div>

  <!-- ================================= SHEET 23: PROJECT 07 · WELLNESS WASHROOMS — MASTER SPA SANCTUARY ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 07 · Wellness Washrooms</div>
      <div class="page-header-right">Master Spa Sanctuary · Soaking Tub &amp; Restorative Wellness</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div>
            <div class="section-tag">Master En-Suite · Spa Sanctuary</div>
            <h2 class="serif-title" style="font-size: 26px; line-height: 1.1; margin-bottom: 8px;">
              Restorative Calm &amp; <span class="serif-italic">Monolithic Stone</span>
            </h2>
            <p class="editorial-body">
              Conceived as an immersive private spa retreat within the master residence, the design prioritizes ritual relaxation, natural biophilic connections, and tactile warmth.
            </p>
            <p class="editorial-body">
              A sculptural freestanding soaking bathtub is centered between twin panoramic picture windows framing lush exterior treetops. Bookmatched Calacatta marble wall paneling with an illuminated recessed niche anchors the space, harmonized with fluted white millwork, dark stone flooring, and warm concealed cove illumination.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Honed Silver Travertine</span><span class="mat-chip">Cast Mineral Soaking Tub</span><span class="mat-chip">Matte Black In-Wall Taps</span><span class="mat-chip">Fluted Natural Oak Vanity</span><span class="mat-chip">Frameless Starphire Glass</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Freestanding sculptural oval soaking tub positioned against full-height lush garden glazing</li><li>• Curbless walk-in shower suite featuring ceiling-recessed rainhead and linear slot drain</li><li>• Double vanity unit with undermount vitreous china basins and heated anti-fog LED mirror</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Master Wellness Spa Suite</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Bathtub</div>
                <div class="fact-val">Sculptural Freestanding Tub</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Feature Wall</div>
                <div class="fact-val">Bookmatched Calacatta Marble</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Fixtures</div>
                <div class="fact-val">Concealed Brushed Brass &amp; Gunmetal</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Biophilic Harmony:</strong> Expansive landscape sightlines blend internal sanctuary with outdoor greenery, cultivating an atmosphere of deep restorative tranquility.
            </div>
          </div>
        </div>

        <!-- Right Visual Showcase: Hero Tub + Vanity & Rain Shower -->
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%; min-height: 0;">
          <div class="img-frame" style="flex: 1.35; min-height: 0;">
            <img src="${washB3}" alt="Master Spa Soaking Tub" class="img-fill">
            <div class="img-caption">Master Spa Sanctuary · Freestanding Soaking Tub &amp; Panoramic Tree Canopy Windows</div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 50mm; min-height: 0;">
            <div class="img-frame" style="min-height: 0;">
              <img src="${washB1}" alt="Floating Vanity & Backlit Mirror" class="img-fill">
              <div class="img-caption">Floating Vanity &amp; Halo Mirror</div>
            </div>
            <div class="img-frame" style="min-height: 0;">
              <img src="${washB2}" alt="Walk-in Shower & Niche" class="img-fill">
              <div class="img-caption">Rain Shower &amp; Niche Detailing</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Wellness Washrooms — Master Spa Sanctuary · Freestanding Soaking Tub &amp; Biophilic Daylighting</div>
      <div>Page 23</div>
    </div>
  </div>

  <!-- ================================= SHEET 24: PROJECT 07 · WELLNESS WASHROOMS — POWDER ROOMS & EN-SUITES ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 07 · Wellness Washrooms</div>
      <div class="page-header-right">Contemporary En-Suites &amp; Powder Rooms</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <div style="display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div>
            <div class="section-tag">Secondary Suites &amp; Powder Rooms</div>
            <h2 class="serif-title" style="font-size: 26px; line-height: 1.1; margin-bottom: 8px;">
              Tactile Serenity &amp; <span class="serif-italic">Precision Detailing</span>
            </h2>
            <p class="editorial-body">
              Secondary guest washrooms and powder rooms detailed with uncompromised material discipline and visual calm. Large-format seamless tiles minimize grout joints, maximizing spatial continuity across compact footprints.
            </p>
            <p class="editorial-body">
              Floating stone vanities, ambient halo-lit mirrors, and brushed gunmetal brassware create elegant architectural vignettes. Recessed LED lighting grazes stone textures, eliminating glare while enhancing sensory depth.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Verde Alpi Green Marble</span><span class="mat-chip">Wall-Hung Concealed WC</span><span class="mat-chip">Brushed Gold Monobloc Faucet</span><span class="mat-chip">Terrazzo Mosaic Floor</span><span class="mat-chip">Backlit Fluted Mirror</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Monolithic custom washbasin carved from a single solid block of Verde Alpi marble</li><li>• Concealed in-wall plumbing cistern with brushed brass dual-flush architectural faceplate</li><li>• Vertical shadowline perimeter lighting washing textured wallpaper with dramatic accent graze</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Surfaces</div>
                <div class="fact-val">Large Porcelain Slabs &amp; Fluted Tile</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Sanitaryware</div>
                <div class="fact-val">Concealed Cisterns &amp; Wall-Hung Pans</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Fittings</div>
                <div class="fact-val">Brushed Gunmetal &amp; Matte Black</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Lighting</div>
                <div class="fact-val">IP65 Warm 3000K Backlit Vanity</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Detailing:</strong> Linear concealed tile-insert drain channels and frameless toughened glass screens keep visual sightlines razor-sharp.
            </div>
          </div>
        </div>

        <!-- Right Washroom Gallery Showcase from gallery/WASHROOM -->
        <div style="display: grid; grid-template-columns: 1.15fr 1fr; gap: 8px; height: 100%; min-height: 0;">
          <div class="img-frame" style="height: 100%; min-height: 0;">
            <img src="${wash1}" alt="Main Vanity & Mirror" class="img-fill">
            <div class="img-caption">En-Suite Vanity · Halo Mirror &amp; Floating Stone Basin</div>
          </div>
          <div style="display: grid; grid-template-rows: 1fr 1fr; gap: 8px; height: 100%; min-height: 0;">
            <div class="img-frame" style="min-height: 0;">
              <img src="${wash2}" alt="Walk-in Shower & Niche" class="img-fill">
              <div class="img-caption">Walk-In Shower &amp; Niche Detail</div>
            </div>
            <div class="img-frame" style="min-height: 0;">
              <img src="${wash3}" alt="Powder Room Concept" class="img-fill">
              <div class="img-caption">Sculptural Powder Room</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Wellness Washrooms — En-Suites &amp; Powder Rooms · Concealed Plumbing &amp; Ambient Detailing</div>
      <div>Page 24</div>
    </div>
  </div>

  <!-- ================================= SHEET 25: PROJECT 08 · COMMERCIAL INTERIORS — EXECUTIVE CONFERENCE HALL ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 08 · Commercial Interiors</div>
      <div class="page-header-right">Corporate Workplace · Executive Boardroom &amp; Conference Suite</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div>
            <div class="section-tag">Commercial Workplace · Corporate Suite</div>
            <h2 class="serif-title" style="font-size: 26px; line-height: 1.1; margin-bottom: 8px;">
              Executive Presence &amp; <span class="serif-italic">Acoustic Precision</span>
            </h2>
            <p class="editorial-body">
              Engineered for high-stakes corporate deliberations and seamless international video conferencing, this executive boardroom synthesizes commanding presence with acoustic comfort and ergonomic excellence.
            </p>
            <p class="editorial-body">
              A bespoke 14-seat monolithic conference table featuring an Italian marble inset slab is equipped with flush-integrated gooseneck conference microphones and concealed cable raceways. Smoked walnut millwork with fluted acoustic paneling conceals AV infrastructure while framing an ultra-high-definition presentation screen and open curated display shelving. Warm cove perimeter lighting and herringbone parquet flooring cultivate an authoritative yet welcoming environment.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Bookmatched Marquina Marble</span><span class="mat-chip">Slatted Smoked Walnut Battens</span><span class="mat-chip">Top-Grain Conference Leather</span><span class="mat-chip">Herringbone Walnut Parquet</span><span class="mat-chip">Bronze AV Trims</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• 14-seat boardroom table with flush motorized connectivity boxes and integrated boundary mics</li><li>• Ultra-wide 4K presentation display seamlessly framed by acoustic walnut wall battens</li><li>• Multi-layer acoustic ceiling baffle assembly achieving optimal RT60 reverberation control</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Executive Conference Hall</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Capacity</div>
                <div class="fact-val">14-Seat Boardroom Table</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Joinery</div>
                <div class="fact-val">Fluted Smoked Walnut Millwork</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Technology</div>
                <div class="fact-val">Integrated AV Screen &amp; Tabletop Mics</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Acoustic Engineering:</strong> Fluted wall battens, recessed acoustic ceiling coves, and flush acoustic doors balance reverberation time (RT60), guaranteeing exceptional speech intelligibility.
            </div>
          </div>
        </div>

        <!-- Right Hero Visual -->
        <div class="img-frame" style="height: 100%; min-height: 0;">
          <img src="${confHero}" alt="Executive Conference Hall & Boardroom" class="img-fill">
          <div class="img-caption">Executive Boardroom · 14-Seat Marble Conference Table, Acoustic Wall Joinery &amp; Integrated AV Display</div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Commercial Interiors — Executive Conference Hall &amp; Boardroom · Acoustic Joinery &amp; AV Integration</div>
      <div>Page 25</div>
    </div>
  </div>

  <!-- ================================= SHEET 26: PROJECT 09 · TECHNICAL WORKING DRAWINGS — SCHEMATIC IDEATION ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 09 · Technical Documentation</div>
      <div class="page-header-right">Schematic Design · Freehand Architectural Ideation</div>
    </div>

    <div class="page-content">
      <div class="split-layout">
        <!-- Left Narrative & Specs -->
        <div style="display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div>
            <div class="section-tag">Schematic Phase · Freehand Ideation</div>
            <h2 class="serif-title" style="font-size: 26px; line-height: 1.1; margin-bottom: 8px;">
              From Conceptual Sketch to <span class="serif-italic">Constructed Reality</span>
            </h2>
            <p class="editorial-body">
              Every rigorous architectural interior originates in the disciplined freedom of freehand sketching. Before transitioning to digital CAD drafting, volumetric massing, daylighting angles, and indoor-outdoor thresholds are explored through rapid perspective studies.
            </p>
            <p class="editorial-body">
              This perspective sketch explores the architectural massing of a contemporary two-story villa: cantilevered upper suites, deep solar shading overhangs, expansive ground-level glazing, and integrated poolside terraces. This conceptual vision directly informs the dimensioned floor plans, structural sections, and bespoke joinery packages that follow.
            
            <div class="material-strip">
              <div class="fact-label">Materiality &amp; Architectural Finishes</div>
              <div class="chip-row">
                <span class="mat-chip">Hand-Drawn Perspective Drafting</span><span class="mat-chip">Prismacolor Architectural Markers</span><span class="mat-chip">Technical Fineliner Ink</span><span class="mat-chip">Isometric Volume Grids</span><span class="mat-chip">Drafting Vellum</span>
              </div>
            </div>

            <div class="highlights-box">
              <div class="fact-label">Spatial &amp; Technical Highlights</div>
              <ul class="highlight-list">
                <li>• Early volumetric concept sketch studying sun angles and overhang depths for tropical climate</li><li>• Exploration of cantilevered terraces, water reflection basins, and arrival threshold hierarchy</li><li>• Tactile material delineation tested freehand before advancing into parametric CAD & 3D</li>
              </ul>
            </div>
          </div>

          <div>
            <div class="fact-grid">
              <div class="fact-pill">
                <div class="fact-label">Medium</div>
                <div class="fact-val">Freehand Perspective Sketch</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Modern Cantilevered Villa</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Focus Area</div>
                <div class="fact-val">Volumetric Balance &amp; Terraces</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">CAD Translation</div>
                <div class="fact-val">Ground Plans, Sections &amp; Details</div>
              </div>
            </div>

            <div class="intent-box">
              <strong>Methodological Continuity:</strong> Freehand ideation unlocks spatial proportion and massing clarity, which are subsequently codified into millimeter-precise AutoCAD construction documentation.
            </div>
          </div>
        </div>

        <!-- Right Side-by-Side: Sketch + Floor Plan -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; height: 100%; min-height: 0;">
          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">Schematic Ideation · Freehand Study</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">Architectural Perspective Massing</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">Hand Sketch</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${sketchVilla}" alt="Architectural Concept Hand Sketch" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Freehand architectural perspective exploring cantilevered upper volumes, shaded poolside terrace, and glazing thresholds.
            </div>
          </div>

          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">CAD Translation · Floor Plan</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">AutoCAD 1:50 Dimensioned Plan</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">AutoCAD 1:50</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${dwg1}" alt="Formal Living Room Layout Plan" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Precise 2D translation documenting structural masonry, circulation corridors, and interior fitout boundaries.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Technical Documentation — Schematic Design · Freehand Architectural Perspective &amp; CAD Integration</div>
      <div>Page 26</div>
    </div>
  </div>

  <!-- ================================= SHEET 27: PROJECT 09 · TECHNICAL WORKING DRAWINGS — SHEET 01 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 09 · Technical Documentation</div>
      <div class="page-header-right">Formal Living Room · Layout &amp; Elevation Sections</div>
    </div>

    <div class="page-content">
      <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div class="section-tag">Architectural CAD Set · 01 of 06</div>
            <h2 class="serif-title" style="font-size: 24px; line-height: 1.1;">
              Formal Living Room <span class="serif-italic">Layout &amp; Section AA</span>
            </h2>
          </div>
          <div style="font-size: 9.2px; color: #5A5148; max-width: 480px; text-align: right; line-height: 1.38;">
            Architectural working drawings drafted to 1:50 scale specifying structural perimeter envelope, circulation clearances, modular seating offsets, and media wall paneling.
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; flex: 1; min-height: 0;">
          <!-- Card Left: drawing-1.png -->
          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">Sheet A101 · Dimensioned Floor Plan</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">Formal Living Room Spatial Layout</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">AutoCAD 1:50</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${dwg1}" alt="Formal Living Room Layout Plan" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Dimensioned layout detailing circulation corridors, seating positions, masonry envelope, and fenestration openings.
            </div>
          </div>

          <!-- Card Right: drawing-2.png -->
          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">Sheet A102 · Section AA Elevation</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">Transverse Section &amp; Paneling Elevation</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">AutoCAD 1:50</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${dwg2}" alt="Formal Living Section AA" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Sectional elevation detailing ceiling drop levels, fluted timber paneling height, wall sconce heights, and conduit routes.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Technical Documentation — Formal Living Room AutoCAD Construction Set · Sheet A101 / A102</div>
      <div>Page 27</div>
    </div>
  </div>

  <!-- ================================= SHEET 28: PROJECT 09 · TECHNICAL WORKING DRAWINGS — SHEET 02 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 09 · Technical Documentation</div>
      <div class="page-header-right">Formal Living Room · Longitudinal Sections &amp; Glazing Details</div>
    </div>

    <div class="page-content">
      <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div class="section-tag">Architectural CAD Set · 02 of 06</div>
            <h2 class="serif-title" style="font-size: 24px; line-height: 1.1;">
              Formal Living <span class="serif-italic">Longitudinal Sections &amp; Glazing</span>
            </h2>
          </div>
          <div style="font-size: 9.2px; color: #5A5148; max-width: 480px; text-align: right; line-height: 1.38;">
            Vertical sections illustrating lintel datum levels, floor slab drop transitions, acoustic insulation cavity detailing, and structural framing.
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; flex: 1; min-height: 0;">
          <!-- Card Left: drawing-3.png -->
          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">Sheet A103 · Longitudinal Section BB</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">Longitudinal Section Through Living Suite</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">AutoCAD 1:50</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${dwg3}" alt="Formal Living Longitudinal Section BB" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Full-length sectional cut displaying wall cladding substrates, ceiling cove recesses, and skirting interface details.
            </div>
          </div>

          <!-- Card Right: drawing-4.png -->
          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">Sheet A104 · Sectional Elevation CC</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">Fenestration &amp; Glazing Interface</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">AutoCAD 1:50</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${dwg4}" alt="Formal Living Fenestration Section CC" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Constructability details showing thermally broken aluminum window profiles, structural mullions, and ceiling reveals.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Technical Documentation — Formal Living Room AutoCAD Construction Set · Sheet A103 / A104</div>
      <div>Page 28</div>
    </div>
  </div>

  <!-- ================================= SHEET 29: PROJECT 09 · TECHNICAL WORKING DRAWINGS — SHEET 03 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 09 · Technical Documentation</div>
      <div class="page-header-right">Biophilic Courtyard · Plan Layout &amp; Sections AA/BB</div>
    </div>

    <div class="page-content">
      <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div class="section-tag">Architectural CAD Set · 03 of 06</div>
            <h2 class="serif-title" style="font-size: 24px; line-height: 1.1;">
              Biophilic Courtyard <span class="serif-italic">Layout &amp; Console Millwork</span>
            </h2>
          </div>
          <div style="font-size: 9.2px; color: #5A5148; max-width: 480px; text-align: right; line-height: 1.38;">
            Working documentation for central courtyard integration, detailing light well positioning, planter masonry, and custom plywood console.
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; flex: 1; min-height: 0;">
          <!-- Card Left: drawing-5.png -->
          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">Sheet B101 · Plan Layout &amp; Console</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">Courtyard Floor Plan &amp; Joinery Layout</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">AutoCAD 1:50</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${dwg5}" alt="Courtyard Floor Plan and Console" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Floor plan detailing courtyard perimeters, stone paving boundaries, and custom multi-compartment plywood console.
            </div>
          </div>

          <!-- Card Right: drawing-6.png -->
          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">Sheet B102 · Courtyard Cross Sections</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">Transverse Sections AA &amp; BB</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">AutoCAD 1:50</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${dwg6}" alt="Courtyard Cross Sections AA and BB" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Vertical sections specifying ceiling skylight opening, double-height light shaft geometry, and planter waterproofing.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Technical Documentation — Biophilic Courtyard CAD Detailing Set · Sheet B101 / B102</div>
      <div>Page 29</div>
    </div>
  </div>

  <!-- ================================= SHEET 30: PROJECT 09 · TECHNICAL WORKING DRAWINGS — SHEET 04 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 09 · Technical Documentation</div>
      <div class="page-header-right">Biophilic Courtyard · Longitudinal Sections &amp; Door Schedules</div>
    </div>

    <div class="page-content">
      <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div class="section-tag">Architectural CAD Set · 04 of 06</div>
            <h2 class="serif-title" style="font-size: 24px; line-height: 1.1;">
              Courtyard Enclosure <span class="serif-italic">&amp; Planter Drainage</span>
            </h2>
          </div>
          <div style="font-size: 9.2px; color: #5A5148; max-width: 480px; text-align: right; line-height: 1.38;">
            Constructability package detailing planter sub-base soil filtration, rainwater drainage scuppers, and sliding partition enclosure systems.
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; flex: 1; min-height: 0;">
          <!-- Card Left: drawing-7.png -->
          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">Sheet B103 · Longitudinal Sections CC &amp; DD</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">Planter Soil Bed &amp; Drainage Profiles</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">AutoCAD 1:50</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${dwg7}" alt="Courtyard Longitudinal Sections CC and DD" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Engineering details illustrating geotextile membrane layers, perforated drain pipes, overflow traps, and perimeter gravel.
            </div>
          </div>

          <!-- Card Right: drawing-8.png -->
          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">Sheet B104 · Enclosure &amp; Sliding Fenestration</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">Sliding Glass Partitions &amp; Thresholds</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">AutoCAD 1:50</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${dwg8}" alt="Courtyard Sliding Partition and Door Schedules" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Jamb, head, and recessed floor track details for weatherproof glass sliding systems interfacing courtyard with dining spaces.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Technical Documentation — Biophilic Courtyard CAD Detailing Set · Sheet B103 / B104</div>
      <div>Page 30</div>
    </div>
  </div>

  <!-- ================================= SHEET 31: PROJECT 09 · TECHNICAL WORKING DRAWINGS — SHEET 05 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 09 · Technical Documentation</div>
      <div class="page-header-right">Master Suite · Wardrobe &amp; Headboard Millwork</div>
    </div>

    <div class="page-content">
      <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div class="section-tag">Joinery Production Pack · 05 of 06</div>
            <h2 class="serif-title" style="font-size: 24px; line-height: 1.1;">
              Master Suite 4 <span class="serif-italic">Wardrobe &amp; Accent Wall</span>
            </h2>
          </div>
          <div style="font-size: 9.2px; color: #5A5148; max-width: 480px; text-align: right; line-height: 1.38;">
            Joinery shop drawings specifying carcass divisions, Blum soft-close hardware, integrated LED channels, and tactile finish swatches.
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; flex: 1; min-height: 0;">
          <!-- Card Left: WARDROBE.jpg.jpeg -->
          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">Detail Sheet J201 · Master Wardrobe</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">Full-Height Master Wardrobe Elevation</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">Joinery Shop Detail</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${wdWardrobe}" alt="Master Wardrobe Production Sheet" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Shop drawing detailing carcass thicknesses, hanging rails, accessory drawers, handle recesses, and integrated LED extrusion.
            </div>
          </div>

          <!-- Card Right: wall with kttl.jpg.jpeg -->
          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">Detail Sheet J202 · Headboard &amp; Accent Wall</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">Headboard Paneling &amp; Beverage Station</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">Joinery Shop Detail</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${wdKettle}" alt="Headboard Paneling and Kettle Station Sheet" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Detailed wall paneling elevation with recessed niche for tea station, integrated electrical points, and approved finish board.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Technical Documentation — Master Suite Bespoke Joinery &amp; Finish Schedules · Sheet J201 / J202</div>
      <div>Page 31</div>
    </div>
  </div>

  <!-- ================================= SHEET 32: PROJECT 09 · TECHNICAL WORKING DRAWINGS — SHEET 06 ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 09 · Technical Documentation</div>
      <div class="page-header-right">Contemporary Suite · Wardrobe Millwork &amp; Bed Detailing</div>
    </div>

    <div class="page-content">
      <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div class="section-tag">Joinery Production Pack · 06 of 06</div>
            <h2 class="serif-title" style="font-size: 24px; line-height: 1.1;">
              Contemporary Suite 2 <span class="serif-italic">Millwork &amp; Bed Detailing</span>
            </h2>
          </div>
          <div style="font-size: 9.2px; color: #5A5148; max-width: 480px; text-align: right; line-height: 1.38;">
            Production drawings detailing carcass construction, edge banding, structural bed frame supports, and floating nightstand integration.
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; flex: 1; min-height: 0;">
          <!-- Card Left: WARDROBE DETAIL.jpg.jpeg -->
          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">Detail Sheet J203 · Internal Wardrobe Millwork</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">Wardrobe Internal Sections &amp; Divisions</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">Joinery Shop Detail</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${wdWardrobeDetail}" alt="Wardrobe Internal Millwork Detail Sheet" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Detailed section through wardrobe units illustrating 18mm marine ply carcass, shelf spacing, and drawer slide positions.
            </div>
          </div>

          <!-- Card Right: KATTL WITH SIDE TABLE.jpg.jpeg -->
          <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; background: #FFFFFF; border: 1px solid rgba(44, 39, 35, 0.12); padding: 7px; border-radius: 2px;">
            <div style="margin-bottom: 5px; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span class="fact-label" style="display: inline-block; margin-bottom: 1px;">Detail Sheet J204 · Bed Cot &amp; Nightstand</span>
                <div style="font-size: 11.2px; font-weight: 700; color: #25211E;">Bed Platform &amp; Cantilever Nightstand</div>
              </div>
              <span style="font-size: 8.5px; font-weight: 600; color: #592727; letter-spacing: 0.08em; text-transform: uppercase;">Joinery Shop Detail</span>
            </div>
            <div class="img-frame" style="flex: 1; min-height: 0; background: #FFFFFF; border: 1px solid #EAE5DE; display: flex; align-items: center; justify-content: center;">
              <img src="${wdKattlSideTable}" alt="Bed Cot with Side Table Drawing" class="img-fill" style="object-fit: contain; background: #FFFFFF; width: 100%; height: 100%;">
            </div>
            <div style="font-size: 8.5px; color: #6E665D; margin-top: 4px; line-height: 1.35; font-style: italic;">
              Plan, front elevation, and cross-section of platform bed cot with integrated floating cantilever nightstand and headboard.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Technical Documentation — Contemporary Suite Joinery &amp; Millwork Detailing · Sheet J203 / J204</div>
      <div>Page 32</div>
    </div>
  </div>

  <!-- ================================= SHEET 33: 10 · CV, TOOLKIT & CONTACT ================================= -->
  <div class="sheet" style="background-color: #FAF8F5;">
    <div class="page-header">
      <div class="page-header-left">10 · Curriculum Vitae &amp; Toolkit</div>
      <div class="page-header-right">Faiha Faisal · Professional Record</div>
    </div>

    <div class="page-content">
      <div class="cv-grid">
        <!-- Experience -->
        <div class="cv-column">
          <h3>Professional Experience</h3>

          <div class="cv-item">
            <div class="cv-item-title">Junior Interior Designer</div>
            <div class="cv-item-sub">AlHawaj Architect &amp; Builders · Calicut</div>
            <div class="cv-item-desc">
              Coordinating multi-disciplinary teams across residential villas and commercial developments. Managing space planning, 3D visualization, and cost-efficient client specifications.
            </div>
          </div>

          <div class="cv-item">
            <div class="cv-item-title">Interior Designer</div>
            <div class="cv-item-sub">Theyyampattil Homesoul Interior · Calicut</div>
            <div class="cv-item-desc">
              Developed mood boards, furniture plans, and photorealistic 3D perspectives. Created detailed 2D production drawings for custom millwork and supervised site execution schedules.
            </div>
          </div>

          <div style="margin-top: 12px;">
            <h3>Professional Focus</h3>
            <p class="cv-item-desc" style="margin-bottom: 3px;">• Residential &amp; Living Space Planning</p>
            <p class="cv-item-desc" style="margin-bottom: 3px;">• Bespoke Millwork &amp; Joinery Detailing</p>
            <p class="cv-item-desc">• Photorealistic 3D Architectural Visualization</p>
          </div>
        </div>

        <!-- Education & Software -->
        <div class="cv-column">
          <h3>Academic Education</h3>

          <div class="cv-item">
            <div class="cv-item-title">Diploma in Interior Design</div>
            <div class="cv-item-sub">Alagappa University, Tamil Nadu · 2024–2025</div>
            <div class="cv-item-desc">Specialized in interior architecture, 3D computer rendering, and technical detailing.</div>
          </div>

          <div class="cv-item">
            <div class="cv-item-title">Bachelor of Arts in Sociology</div>
            <div class="cv-item-sub">Calicut University, Kerala · 2017–2020</div>
            <div class="cv-item-desc">Focused on human behavior, community environments, and socio-spatial interaction.</div>
          </div>

          <div style="margin-top: 12px;">
            <h3>Software Stack</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px;">
              <span class="skill-badge">AutoCAD</span>
              <span class="skill-badge">Revit BIM</span>
              <span class="skill-badge">SketchUp</span>
              <span class="skill-badge">3ds Max</span>
              <span class="skill-badge">Enscape</span>
              <span class="skill-badge">Lumion</span>
              <span class="skill-badge">D5 Render</span>
              <span class="skill-badge">Adobe Photoshop</span>
              <span class="skill-badge">Adobe InDesign</span>
              <span class="skill-badge">Adobe Illustrator</span>
              <span class="skill-badge">Procreate</span>
              <span class="skill-badge">Microsoft Office</span>
            </div>
          </div>
        </div>

        <!-- Contact & Closing -->
        <div class="cv-column" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3>Let's Collaborate</h3>
            <p style="font-size: 10.5px; line-height: 1.5; color: #433D36; margin-bottom: 12px;">
              Open to junior interior designer positions, collaborative architectural projects, and design consultations worldwide.
            </p>

            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 10.5px; color: #25211E;">
              <div><strong>Email:</strong> <a href="mailto:faihafaisal668@gmail.com" style="color: #592727; text-decoration: none;">faihafaisal668@gmail.com</a></div>
              <div><strong>Phone:</strong> +91 9544466908</div>
              <div><strong>LinkedIn:</strong> linkedin.com/in/faiha-faisal</div>
              <div><strong>Location:</strong> Calicut, Kerala, India</div>
              <div><strong>Languages:</strong> English, Hindi, Tamil, Malayalam</div>
            </div>
          </div>

          <div style="background: #25211E; color: #FAF8F5; padding: 14px; text-align: center; border-radius: 2px;">
            <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 20px; font-style: italic; margin-bottom: 4px;">Faiha Faisal</div>
            <div style="font-size: 8.8px; letter-spacing: 0.2em; text-transform: uppercase; color: #D3C9BC;">Thank you for reviewing my portfolio</div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Faiha Faisal · Selected Works Portfolio 2024–2025</div>
      <div>Page 33</div>
    </div>
  </div>

</body>
</html>
`;

const tempHtmlPath = path.join(rootDir, 'temp_portfolio.html');
fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');
console.log('Temporary HTML file generated at:', tempHtmlPath);

const userDataDir = path.join(os.tmpdir(), 'scratch_edge_profile_' + Date.now());
if (!fs.existsSync(userDataDir)) {
  fs.mkdirSync(userDataDir, { recursive: true });
}

console.log('Compiling 33-page PDF with Microsoft Edge headless...');
const edgeExe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fileUrl = 'file:///' + tempHtmlPath.replace(/\\/g, '/');

const command = `"${edgeExe}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${userDataDir}" --print-to-pdf="${outputPdfPath}" --no-pdf-header-footer "${fileUrl}"`;

try {
  execSync(command, { stdio: 'inherit', timeout: 300000 });
  console.log('Edge process finished successfully.');
} catch (err) {
  console.error('Error during PDF printing:', err);
}

// Clean up
try {
  fs.unlinkSync(tempHtmlPath);
  fs.rmSync(userDataDir, { recursive: true, force: true });
} catch (e) {
  // ignore
}

if (fs.existsSync(outputPdfPath)) {
  const stats = fs.statSync(outputPdfPath);
  console.log(`SUCCESS! Portfolio PDF generated at: ${outputPdfPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
} else {
  console.error('FAILED: PDF file was not created.');
  process.exit(1);
}
})();
