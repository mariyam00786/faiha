const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const outputPdfPath = path.join(publicDir, 'FAIHA_FAISAL_Portfolio.pdf');

function toBase64(relPath) {
  const fullPath = path.join(publicDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn('Image not found:', fullPath);
    return '';
  }
  const ext = path.extname(fullPath).toLowerCase();
  let mime = 'image/jpeg';
  if (ext === '.png') mime = 'image/png';
  if (ext === '.webp') mime = 'image/webp';
  if (ext === '.svg') mime = 'image/svg+xml';
  const data = fs.readFileSync(fullPath);
  return `data:${mime};base64,${data.toString('base64')}`;
}

console.log('Encoding assets to base64...');

// Hero & Intro
const profileIntro = toBase64('images/profile-intro.jpg');

// Exterior Project
const exteriorCover = toBase64('images/projects/exterior/exterior-cover.jpg');
const ext1 = toBase64('images/projects/exterior/design 1 (1).png');
const ext2 = toBase64('images/projects/exterior/design 2 (1).png');
const ext3 = toBase64('images/projects/exterior/design 3 (1).png');
const ext4 = toBase64('images/projects/exterior/design 3 (2).png');
const ext5 = toBase64('images/projects/exterior/4 (1).png');

// Interior Project
const interiorCover = toBase64('images/projects/interior/interior-cover.jpg');
const int1 = toBase64('images/projects/interior/1 (1).png');
const int2 = toBase64('images/projects/interior/2 (1).png');
const int3 = toBase64('images/projects/interior/3 (1).png');
const int4 = toBase64('images/projects/interior/design 1 (2).png');
const int5 = toBase64('images/projects/interior/design 2 (1).png');
const int6 = toBase64('images/projects/interior/design 4 (3).png');

// Working Drawings
const wdWardrobe = toBase64('images/projects/working-drawings/WARDROBE.jpg.jpeg');
const wdKettle = toBase64('images/projects/working-drawings/wall with kttl.jpg.jpeg');

// Typologies & Moments
const kitchen1 = toBase64('gallery/kitchen/design 2 (1).png');
const kitchen2 = toBase64('gallery/kitchen/design 3 (1).png');
const bath1 = toBase64('gallery/WASHROOM/1 (12).png');
const bath2 = toBase64('gallery/WASHROOM/2 (12).png');
const moment1 = toBase64('images/moments/moment-1.png');
const moment2 = toBase64('images/moments/moment-2.png');
const moment3 = toBase64('images/moments/moment-3.png');
const moment4 = toBase64('images/moments/moment-4.png');

console.log('Generating HTML layout for landscape A4 publication...');

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
    line-height: 1.5;
    font-size: 11px;
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
    height: 18mm;
    padding: 6mm 18mm 0 18mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(44, 39, 35, 0.12);
  }
  .page-header-left {
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #5A5148;
    font-weight: 600;
  }
  .page-header-right {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 13px;
    color: #25211E;
  }
  .page-footer {
    height: 14mm;
    padding: 0 18mm 4mm 18mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(44, 39, 35, 0.1);
    font-size: 8.5px;
    color: #7D746A;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .page-content {
    flex: 1;
    padding: 10mm 18mm;
    position: relative;
    display: flex;
    flex-direction: column;
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
    font-size: 8.5px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #592727;
    font-weight: 700;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .section-tag::before {
    content: "";
    display: inline-block;
    width: 14px;
    height: 1px;
    background: #592727;
  }

  /* Image Containers */
  .img-fill {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .img-frame {
    overflow: hidden;
    background-color: #ECE8E0;
    border: 1px solid rgba(44, 39, 35, 0.08);
  }

  /* Key Stats Pill */
  .fact-pill {
    background: #ECE8E0;
    border: 1px solid rgba(44, 39, 35, 0.1);
    padding: 6px 12px;
    border-radius: 2px;
  }
  .fact-label {
    font-size: 7.5px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #7D746A;
    margin-bottom: 2px;
  }
  .fact-val {
    font-size: 10px;
    font-weight: 600;
    color: #25211E;
  }

  /* ================================= PAGE 1: LUXURY COVER ================================= */
  .cover-sheet {
    background-color: #25211E;
    color: #FAF8F5;
    padding: 16mm 20mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .cover-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid rgba(250, 248, 245, 0.18);
    padding-bottom: 8mm;
  }
  .cover-brand {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #D3C9BC;
  }
  .cover-year {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 15px;
    color: #FAF8F5;
  }
  .cover-body {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 16mm;
    align-items: center;
    margin: auto 0;
  }
  .cover-title-group h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 64px;
    line-height: 0.95;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: #FAF8F5;
    margin-bottom: 18px;
  }
  .cover-title-group h1 em {
    font-style: italic;
    color: #E2DDD5;
    display: block;
  }
  .cover-role {
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #D3C9BC;
    margin-bottom: 16px;
    font-weight: 500;
  }
  .cover-quote {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 15px;
    font-style: italic;
    color: #FAF8F5;
    opacity: 0.85;
    line-height: 1.6;
    border-left: 2px solid #592727;
    padding-left: 14px;
    max-width: 440px;
  }
  .cover-image-box {
    height: 118mm;
    position: relative;
    border: 1px solid rgba(250, 248, 245, 0.2);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
  }
  .cover-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(250, 248, 245, 0.18);
    padding-top: 6mm;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #9E9487;
  }

  /* ================================= PAGE 2: PROFILE & PHILOSOPHY ================================= */
  .profile-grid {
    display: grid;
    grid-template-columns: 82mm 1fr;
    gap: 14mm;
    height: 100%;
  }
  .profile-sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .profile-photo {
    height: 96mm;
    width: 100%;
    margin-bottom: 5mm;
  }
  .designer-quote {
    background: #EDE8DE;
    border-left: 3px solid #592727;
    padding: 12px 14px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 13.5px;
    line-height: 1.5;
    color: #25211E;
  }
  .profile-main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .bio-text {
    font-size: 10.5px;
    line-height: 1.7;
    color: #433D36;
    margin-bottom: 12px;
  }
  .highlight-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    background: #EDE8DE;
    padding: 12px 16px;
    border: 1px solid rgba(44, 39, 35, 0.08);
  }

  /* ================================= PAGE 3: CONTENTS & METHODOLOGY ================================= */
  .toc-grid {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 16mm;
    height: 100%;
  }
  .toc-item {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid rgba(44, 39, 35, 0.12);
  }
  .toc-num {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 20px;
    color: #592727;
    font-weight: 600;
    width: 32px;
  }
  .toc-title {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #25211E;
  }
  .toc-desc {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 12px;
    color: #7D746A;
  }
  .methodology-step {
    padding: 10px 14px;
    background: #EDE8DE;
    border-left: 3px solid #25211E;
    margin-bottom: 8px;
  }

  /* ================================= PROJECT PAGES ================================= */
  .proj-split {
    display: grid;
    grid-template-columns: 105mm 1fr;
    gap: 12mm;
    height: 100%;
  }
  .proj-hero-box {
    height: 100%;
    position: relative;
  }
  .gallery-grid-2x2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 8px;
    height: 100%;
  }
  .gallery-grid-3 {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 10px;
    height: 100%;
  }

  /* ================================= TECHNICAL DRAWINGS ================================= */
  .tech-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 12mm;
    height: 100%;
  }

  /* ================================= CV / BACK COVER ================================= */
  .cv-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12mm;
    height: 100%;
  }
  .cv-column h3 {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #592727;
    border-bottom: 1px solid rgba(44, 39, 35, 0.15);
    padding-bottom: 4px;
    margin-bottom: 10px;
    font-weight: 700;
  }
  .cv-item {
    margin-bottom: 10px;
  }
  .cv-item-title {
    font-size: 11px;
    font-weight: 600;
    color: #25211E;
  }
  .cv-item-sub {
    font-size: 9.5px;
    color: #5A5148;
    margin-bottom: 2px;
  }
  .cv-item-desc {
    font-size: 9px;
    color: #7D746A;
    line-height: 1.4;
  }
  .skill-badge {
    display: inline-block;
    padding: 3px 7px;
    background: #ECE8E0;
    border: 1px solid rgba(44, 39, 35, 0.1);
    font-size: 8.5px;
    font-weight: 500;
    color: #25211E;
    margin: 2px;
  }
</style>
</head>
<body>

  <!-- ================================= SHEET 1: LUXURY COVER ================================= -->
  <div class="sheet cover-sheet">
    <div class="cover-top">
      <div class="cover-brand">Interior Architecture · Selected Works</div>
      <div class="cover-year">2024 — 2025 Edition</div>
    </div>

    <div class="cover-body">
      <div class="cover-title-group">
        <div class="cover-role">Portfolio of Selected Projects</div>
        <h1>
          Faiha<br>
          <em>Faisal</em>
        </h1>
        <p class="cover-quote">
          "Thoughtful design can support people, strengthen communities, and bring tactile calm into everyday living."
        </p>
      </div>

      <div class="cover-image-box img-frame">
        <img src="${interiorCover}" alt="Hero Architecture" class="img-fill">
      </div>
    </div>

    <div class="cover-bottom">
      <div>Junior Interior Designer · Calicut, Kerala, India</div>
      <div>faihafaisal668@gmail.com · +91 9544466908</div>
    </div>
  </div>

  <!-- ================================= SHEET 2: ABOUT & DESIGN PHILOSOPHY ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">01 · Profile & Philosophy</div>
      <div class="page-header-right">Faiha Faisal · Portfolio</div>
    </div>

    <div class="page-content">
      <div class="profile-grid">
        <div class="profile-sidebar">
          <div class="profile-photo img-frame">
            <img src="${profileIntro}" alt="Faiha Faisal" class="img-fill">
          </div>
          <div class="designer-quote">
            "My background in sociology taught me to observe human rituals and translate them into enduring, emotionally resonant spatial systems."
          </div>
        </div>

        <div class="profile-main">
          <div>
            <div class="section-tag">About The Designer</div>
            <h2 class="serif-title" style="font-size: 34px; line-height: 1.1; margin-bottom: 12px;">
              Bridging Human Behavior &amp; <em>Spatial Harmony</em>
            </h2>
            <p class="bio-text">
              Born and raised in Kerala, India, and now practicing as an interior designer in Calicut, my design foundation is deeply informed by cultural context, natural materials, and an innate focus on how people genuinely experience physical space.
            </p>
            <p class="bio-text">
              Prior to spatial design, I completed a <strong>Bachelor's degree in Sociology from Calicut University</strong>. While sociology and interior architecture are often viewed as distinct disciplines, this analytical background fundamentally directs my practice: it empowers me to observe family dynamics, functional flows, and social rituals before drawing a single wall. Wanting to merge that human-centered insight with creative execution, I pursued and completed my <strong>Diploma in Interior Design from Alagappa University</strong>.
            </p>
            <p class="bio-text">
              Having contributed to residential and commercial projects at <em>Theyyampattil Homesoul Interior</em> and <em>AlHawaj Architect &amp; Builders</em>, I enjoy guiding projects from early research, conceptual moodboards, and spatial planning through photorealistic 3D visualization and millimeter-accurate technical documentation.
            </p>
          </div>

          <div class="highlight-box">
            <div>
              <div class="fact-label">Core Specializations</div>
              <div style="font-size: 9.5px; font-weight: 600; color: #25211E;">
                Residential Interiors · Space Planning · 3D Photorealism · Custom Joinery
              </div>
            </div>
            <div>
              <div class="fact-label">Affiliations &amp; Honors</div>
              <div style="font-size: 9.5px; font-weight: 600; color: #25211E;">
                IIID Member · 2024 Design Excellence Showcase
              </div>
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
      <div class="page-header-right">Selected Works Overview</div>
    </div>

    <div class="page-content">
      <div class="toc-grid">
        <!-- Left: Contents Table -->
        <div>
          <div class="section-tag">Index of Projects</div>
          <h2 class="serif-title" style="font-size: 30px; margin-bottom: 16px;">Curated Portfolio Contents</h2>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">01</span>
              <div>
                <div class="toc-title">Exterior Architecture</div>
                <div class="toc-desc">Architectural Form, Contemporary Minimalism &amp; Framed Thresholds</div>
              </div>
            </div>
            <div style="font-weight: 600; font-size: 11px; color: #592727;">p. 04–05</div>
          </div>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">02</span>
              <div>
                <div class="toc-title">Residential Interior</div>
                <div class="toc-desc">Spatial Harmony, Tactile Warmth &amp; Bespoke Joinery</div>
              </div>
            </div>
            <div style="font-weight: 600; font-size: 11px; color: #592727;">p. 06–07</div>
          </div>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">03</span>
              <div>
                <div class="toc-title">Working Drawings &amp; Joinery</div>
                <div class="toc-desc">Technical Detailing, Wardrobe Millwork &amp; Wall Services</div>
              </div>
            </div>
            <div style="font-weight: 600; font-size: 11px; color: #592727;">p. 08</div>
          </div>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">04</span>
              <div>
                <div class="toc-title">Typologies &amp; Curated Moments</div>
                <div class="toc-desc">Culinary Spaces, Wellness Washrooms &amp; Material Textures</div>
              </div>
            </div>
            <div style="font-weight: 600; font-size: 11px; color: #592727;">p. 09</div>
          </div>

          <div class="toc-item">
            <div style="display: flex; align-items: baseline;">
              <span class="toc-num">05</span>
              <div>
                <div class="toc-title">Curriculum Vitae &amp; Toolkit</div>
                <div class="toc-desc">Education, Experience, Software Stack &amp; Contact Channels</div>
              </div>
            </div>
            <div style="font-weight: 600; font-size: 11px; color: #592727;">p. 10</div>
          </div>
        </div>

        <!-- Right: 4-Stage Methodology -->
        <div>
          <div class="section-tag">Design Methodology</div>
          <h2 class="serif-title" style="font-size: 30px; margin-bottom: 16px;">The 4-Stage Design Lifecycle</h2>

          <div class="methodology-step">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
              <span style="font-weight: 700; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; color: #25211E;">01 · Discovery &amp; Spatial Strategy</span>
              <span style="font-size: 8.5px; color: #7D746A; text-transform: uppercase;">Brief &amp; Research</span>
            </div>
            <p style="font-size: 9.5px; color: #5A5148; line-height: 1.5;">
              Engaging closely with client lifestyles, cultural habits, circulation constraints, and site context to define the design compass.
            </p>
          </div>

          <div class="methodology-step">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
              <span style="font-weight: 700; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; color: #25211E;">02 · Concept Design &amp; 3D Modeling</span>
              <span style="font-size: 8.5px; color: #7D746A; text-transform: uppercase;">Volume &amp; Mood</span>
            </div>
            <p style="font-size: 9.5px; color: #5A5148; line-height: 1.5;">
              Synthesizing moodboards, spatial zoning diagrams, material palettes, and 3D architectural mockups in SketchUp &amp; 3ds Max.
            </p>
          </div>

          <div class="methodology-step">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
              <span style="font-weight: 700; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; color: #25211E;">03 · Technical Detailing &amp; Documentation</span>
              <span style="font-size: 8.5px; color: #7D746A; text-transform: uppercase;">AutoCAD &amp; Revit</span>
            </div>
            <p style="font-size: 9.5px; color: #5A5148; line-height: 1.5;">
              Producing complete construction packs, electrical schematics, custom joinery sections, and finish schedules with zero ambiguity.
            </p>
          </div>

          <div class="methodology-step">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
              <span style="font-weight: 700; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; color: #25211E;">04 · Site Coordination &amp; Final Styling</span>
              <span style="font-size: 8.5px; color: #7D746A; text-transform: uppercase;">Realization</span>
            </div>
            <p style="font-size: 9.5px; color: #5A5148; line-height: 1.5;">
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

  <!-- ================================= SHEET 4: PROJECT 01 - EXTERIOR ARCHITECTURE ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 01 · Exterior Architecture</div>
      <div class="page-header-right">Framed Thresholds · 2024</div>
    </div>

    <div class="page-content">
      <div class="proj-split">
        <!-- Project Narrative & Facts -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Residential Facade</div>
            <h2 class="serif-title" style="font-size: 32px; line-height: 1.1; margin-bottom: 12px;">
              Framed Thresholds &amp; <em>Tropical Minimalism</em>
            </h2>
            <p style="font-size: 10.5px; line-height: 1.65; color: #433D36; margin-bottom: 10px;">
              The architectural exterior was conceived as a dynamic dialogue between contemporary geometric minimalism and tropical contextual responsiveness.
            </p>
            <p style="font-size: 10.5px; line-height: 1.65; color: #433D36; margin-bottom: 14px;">
              Deep cantilevered overhangs, integrated green planters, and vertical rhythmic louvers modulate harsh tropical daylight while ensuring effortless cross-ventilation. Bold geometric volumes protect family privacy while crafting a dignified, enduring street presence.
            </p>
          </div>

          <div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px;">
              <div class="fact-pill">
                <div class="fact-label">Typology</div>
                <div class="fact-val">Modern Villa Facade</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Year / Status</div>
                <div class="fact-val">2024 · Completed Design</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Tools Used</div>
                <div class="fact-val">AutoCAD, SketchUp, Enscape</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Focus Area</div>
                <div class="fact-val">Massing &amp; Climate Shading</div>
              </div>
            </div>

            <div style="background: #EDE8DE; padding: 10px 12px; border-left: 2px solid #592727; font-size: 9.5px; color: #433D36;">
              <strong>Design Intent:</strong> Seamless transition between the public arrival approach and private residential retreat through tactile concrete, warm teakwood, and recessed lighting.
            </div>
          </div>
        </div>

        <!-- Hero Exterior Image -->
        <div class="proj-hero-box img-frame">
          <img src="${exteriorCover}" alt="Exterior Facade Hero" class="img-fill">
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Exterior Architecture — Facades, Elevations &amp; Landscaping</div>
      <div>Page 04</div>
    </div>
  </div>

  <!-- ================================= SHEET 5: PROJECT 01 - FACADE STUDIES & DETAILS ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 01 · Facade Massing &amp; Lighting</div>
      <div class="page-header-right">Exterior Perspectives Study</div>
    </div>

    <div class="page-content">
      <div class="gallery-grid-2x2">
        <div class="img-frame" style="position: relative;">
          <img src="${ext1}" alt="Daylight Study 1" class="img-fill">
          <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(37,33,30,0.8); color: #FFF; padding: 3px 8px; font-size: 8px; text-transform: uppercase; letter-spacing: 0.1em;">
            South-West Elevation · Daylight
          </div>
        </div>
        <div class="img-frame" style="position: relative;">
          <img src="${ext2}" alt="Entryway Threshold" class="img-fill">
          <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(37,33,30,0.8); color: #FFF; padding: 3px 8px; font-size: 8px; text-transform: uppercase; letter-spacing: 0.1em;">
            Covered Entry Porch &amp; Louvers
          </div>
        </div>
        <div class="img-frame" style="position: relative;">
          <img src="${ext3}" alt="Evening Illumination" class="img-fill">
          <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(37,33,30,0.8); color: #FFF; padding: 3px 8px; font-size: 8px; text-transform: uppercase; letter-spacing: 0.1em;">
            Dusk Horizon &amp; Recessed Illumination
          </div>
        </div>
        <div class="img-frame" style="position: relative;">
          <img src="${ext4}" alt="Balcony & Overhang" class="img-fill">
          <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(37,33,30,0.8); color: #FFF; padding: 3px 8px; font-size: 8px; text-transform: uppercase; letter-spacing: 0.1em;">
            Upper Cantilever &amp; Planter Integration
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Exterior Architecture — Natural Light Modulation &amp; Material Studies</div>
      <div>Page 05</div>
    </div>
  </div>

  <!-- ================================= SHEET 6: PROJECT 02 - RESIDENTIAL INTERIORS ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 02 · Residential Interior</div>
      <div class="page-header-right">Tactile Warmth &amp; Spatial Harmony · 2024</div>
    </div>

    <div class="page-content">
      <div class="proj-split">
        <!-- Interior Hero Image -->
        <div class="proj-hero-box img-frame">
          <img src="${interiorCover}" alt="Living Room Hero" class="img-fill">
        </div>

        <!-- Project Narrative & Facts -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Living &amp; Dining Spaces</div>
            <h2 class="serif-title" style="font-size: 32px; line-height: 1.1; margin-bottom: 12px;">
              Sanctuary of <em>Tactile Warmth</em>
            </h2>
            <p style="font-size: 10.5px; line-height: 1.65; color: #433D36; margin-bottom: 10px;">
              A private residence designed as a calming retreat from urban intensity. The layout prioritizes continuous visual sightlines, natural daylight penetration, and intuitive circulation between social reception and intimate family areas.
            </p>
            <p style="font-size: 10.5px; line-height: 1.65; color: #433D36; margin-bottom: 14px;">
              Custom fluted timber wall accents, tactile linen drapery, and discreet indirect cove lighting produce a layered emotional atmosphere. Natural marble tops and bronze metallic hardware introduce understated luxury without overpowering the organic warmth.
            </p>
          </div>

          <div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px;">
              <div class="fact-pill">
                <div class="fact-label">Scope of Work</div>
                <div class="fact-val">Full Interior FF&amp;E &amp; Joinery</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Stylistic Language</div>
                <div class="fact-val">Modern Warm Minimalist</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Software Stack</div>
                <div class="fact-val">AutoCAD, 3ds Max, Enscape</div>
              </div>
              <div class="fact-pill">
                <div class="fact-label">Key Materials</div>
                <div class="fact-val">Oak, Boucle, Travertine, Fluted Timber</div>
              </div>
            </div>

            <div style="background: #EDE8DE; padding: 10px 12px; border-left: 2px solid #592727; font-size: 9.5px; color: #433D36;">
              <strong>Spatial Strategy:</strong> Low-profile bespoke furnishings maintain unobstructed vistas across the open living-dining threshold, enhancing perceived volume.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Residential Interior — Spatial Harmony &amp; Tactile Comfort</div>
      <div>Page 06</div>
    </div>
  </div>

  <!-- ================================= SHEET 7: PROJECT 02 - LIVING & PRIVATE RETREATS ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 02 · Spatial Perspectives</div>
      <div class="page-header-right">Living, Dining &amp; Bedroom Suites</div>
    </div>

    <div class="page-content">
      <div class="gallery-grid-3">
        <!-- Large Left Visual -->
        <div class="img-frame" style="position: relative;">
          <img src="${int1}" alt="Master Bedroom Sanctuary" class="img-fill">
          <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(37,33,30,0.8); color: #FFF; padding: 3px 8px; font-size: 8px; text-transform: uppercase; letter-spacing: 0.1em;">
            Master Suite · Integrated Headboard &amp; Ambient Sconces
          </div>
        </div>

        <!-- Right Stack (2 images) -->
        <div style="display: grid; grid-template-rows: 1fr 1fr; gap: 10px;">
          <div class="img-frame" style="position: relative;">
            <img src="${int2}" alt="Dining Threshold" class="img-fill">
            <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(37,33,30,0.8); color: #FFF; padding: 3px 8px; font-size: 8px; text-transform: uppercase; letter-spacing: 0.1em;">
              Dining Transition &amp; Custom Display Millwork
            </div>
          </div>
          <div class="img-frame" style="position: relative;">
            <img src="${int3}" alt="Media Wall & Joinery" class="img-fill">
            <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(37,33,30,0.8); color: #FFF; padding: 3px 8px; font-size: 8px; text-transform: uppercase; letter-spacing: 0.1em;">
              Lounge Seating &amp; Architectural Wall Paneling
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Residential Interior — Material Cohesion &amp; Bespoke Millwork</div>
      <div>Page 07</div>
    </div>
  </div>

  <!-- ================================= SHEET 8: TECHNICAL WORKING DRAWINGS ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">Project 03 · Technical Working Drawings</div>
      <div class="page-header-right">Precision Joinery &amp; Constructability</div>
    </div>

    <div class="page-content">
      <div class="tech-grid">
        <!-- Left: Wardrobe Technical Sheet -->
        <div style="display: flex; flex-direction: column; height: 100%;">
          <div style="margin-bottom: 6px;">
            <div class="section-tag">Detail Sheet 01 · Millwork</div>
            <h3 class="serif-title" style="font-size: 18px;">Built-in Master Wardrobe Detail</h3>
            <p style="font-size: 9px; color: #5A5148;">Full elevation, sectional joinery, drawer internal dimensions &amp; LED profiles.</p>
          </div>
          <div class="img-frame" style="flex: 1;">
            <img src="${wdWardrobe}" alt="Wardrobe Working Drawing" class="img-fill" style="object-fit: contain; background: #FFF;">
          </div>
        </div>

        <!-- Right: Wall with Kettle Unit Sheet -->
        <div style="display: flex; flex-direction: column; height: 100%;">
          <div style="margin-bottom: 6px;">
            <div class="section-tag">Detail Sheet 02 · Services &amp; Joinery</div>
            <h3 class="serif-title" style="font-size: 18px;">Integrated Wall &amp; Beverage Station</h3>
            <p style="font-size: 9px; color: #5A5148;">Electrical coordination, backsplash stone backing &amp; recessed shelving.</p>
          </div>
          <div class="img-frame" style="flex: 1;">
            <img src="${wdKettle}" alt="Wall with Kettle Station Drawing" class="img-fill" style="object-fit: contain; background: #FFF;">
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Technical Documentation — AutoCAD &amp; Revit Detailing for On-Site Construction</div>
      <div>Page 08</div>
    </div>
  </div>

  <!-- ================================= SHEET 9: SPATIAL TYPOLOGIES & CURATED MOMENTS ================================= -->
  <div class="sheet">
    <div class="page-header">
      <div class="page-header-left">04 · Spatial Typologies &amp; Materiality</div>
      <div class="page-header-right">Kitchens, Wellness &amp; Textural Vignettes</div>
    </div>

    <div class="page-content">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14mm; height: 100%;">
        <!-- Left Column: Culinary & Wellness -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Culinary Spaces</div>
            <h3 class="serif-title" style="font-size: 20px; margin-bottom: 6px;">Ergonomic Modular Kitchens</h3>
            <p style="font-size: 9.5px; color: #5A5148; line-height: 1.5; margin-bottom: 10px;">
              Designed with strict adherence to the golden work triangle, anti-fingerprint acrylic laminates, quartz counters, and soft-close Blum hardware.
            </p>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 38mm; margin-bottom: 8mm;">
            <div class="img-frame"><img src="${kitchen1}" alt="Kitchen 1" class="img-fill"></div>
            <div class="img-frame"><img src="${kitchen2}" alt="Kitchen 2" class="img-fill"></div>
          </div>

          <div>
            <div class="section-tag">Wellness Bathrooms</div>
            <h3 class="serif-title" style="font-size: 20px; margin-bottom: 6px;">Powder &amp; En-Suite Spa Typologies</h3>
            <p style="font-size: 9.5px; color: #5A5148; line-height: 1.5; margin-bottom: 10px;">
              Concealed cisterns, large format porcelain slabs, back-lit vanity mirrors, and brushed gunmetal sanitary fixtures.
            </p>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 38mm;">
            <div class="img-frame"><img src="${bath1}" alt="Bath 1" class="img-fill"></div>
            <div class="img-frame"><img src="${bath2}" alt="Bath 2" class="img-fill"></div>
          </div>
        </div>

        <!-- Right Column: Curated Moments & Vignettes -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="section-tag">Selected Moments</div>
            <h3 class="serif-title" style="font-size: 20px; margin-bottom: 6px;">Tactile Micro-Vignettes</h3>
            <p style="font-size: 9.5px; color: #5A5148; line-height: 1.5; margin-bottom: 10px;">
              The small intersections of material, shadow, and touch that elevate everyday living into an enduring sensory experience.
            </p>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 8px; height: 96mm;">
            <div class="img-frame"><img src="${moment1}" alt="Moment 1" class="img-fill"></div>
            <div class="img-frame"><img src="${moment2}" alt="Moment 2" class="img-fill"></div>
            <div class="img-frame"><img src="${moment3}" alt="Moment 3" class="img-fill"></div>
            <div class="img-frame"><img src="${moment4}" alt="Moment 4" class="img-fill"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Curated Typologies — Functional Zoning &amp; Textural Tactility</div>
      <div>Page 09</div>
    </div>
  </div>

  <!-- ================================= SHEET 10: CV, TOOLKIT & BACK COVER ================================= -->
  <div class="sheet" style="background-color: #FAF8F5;">
    <div class="page-header">
      <div class="page-header-left">05 · Curriculum Vitae &amp; Toolkit</div>
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

          <div style="margin-top: 14px;">
            <h3>Affiliations</h3>
            <p class="cv-item-desc" style="margin-bottom: 4px;">• IIID (Institute of Indian Interior Designers)</p>
            <p class="cv-item-desc" style="margin-bottom: 4px;">• ASID Student Affiliate</p>
            <p class="cv-item-desc">• Kerala Interior Designers Forum</p>
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

          <div style="margin-top: 14px;">
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
            <p style="font-size: 10px; line-height: 1.6; color: #433D36; margin-bottom: 12px;">
              Open to junior interior designer positions, collaborative architectural projects, and design consultations worldwide.
            </p>

            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 10px; color: #25211E;">
              <div><strong>Email:</strong> <a href="mailto:faihafaisal668@gmail.com" style="color: #592727; text-decoration: none;">faihafaisal668@gmail.com</a></div>
              <div><strong>Phone:</strong> +91 9544466908</div>
              <div><strong>LinkedIn:</strong> linkedin.com/in/faiha-faisal</div>
              <div><strong>Location:</strong> Calicut, Kerala, India</div>
              <div><strong>Languages:</strong> English, Hindi, Tamil, Malayalam</div>
            </div>
          </div>

          <div style="background: #25211E; color: #FAF8F5; padding: 14px; text-align: center; border-radius: 2px;">
            <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 20px; font-style: italic; margin-bottom: 4px;">Faiha Faisal</div>
            <div style="font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: #D3C9BC;">Thank you for reviewing my portfolio</div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>Faiha Faisal · Selected Works Portfolio 2024–2025</div>
      <div>Page 10</div>
    </div>
  </div>

</body>
</html>
`;

const tempHtmlPath = path.join(rootDir, 'temp_portfolio.html');
fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');
console.log('Temporary HTML file generated at:', tempHtmlPath);

const userDataDir = path.join(rootDir, 'scratch_edge_profile');
if (!fs.existsSync(userDataDir)) {
  fs.mkdirSync(userDataDir, { recursive: true });
}

console.log('Compiling PDF with Microsoft Edge headless...');
const edgeExe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fileUrl = 'file:///' + tempHtmlPath.replace(/\\\\/g, '/');

const command = `"${edgeExe}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${userDataDir}" --print-to-pdf="${outputPdfPath}" --no-pdf-header-footer "${fileUrl}"`;

try {
  execSync(command, { stdio: 'inherit', timeout: 30000 });
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
