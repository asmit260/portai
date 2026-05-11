# PRD — AI Portfolio Website
### Build Document · Static · One-Time · No Maintenance

---

## What This Is

A single HTML file portfolio. Built once, deployed, never touched again.
No CMS. No blog. No analytics. No backend. No future scaling.
Just a fast, beautiful page that shows your work and gets you clients.

---

## The 5 Sections (in order on page)

```
1. Nav
2. Hero
3. Gallery
4. Services
5. Contact + Footer
```

One file. One scroll. Done.

---

## Build Order — Do This Exactly

Work in this sequence. Do not skip ahead. Each step builds on the last.

---

### STEP 1 — Project Setup (30 min)

Create 3 files:

```
/
├── index.html
├── styles.css
└── main.js
```

In `index.html`, set up the skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name — AI Image Studio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav id="nav"></nav>
  <section id="hero"></section>
  <section id="gallery"></section>
  <section id="services"></section>
  <section id="contact"></section>
  <script src="main.js" defer></script>
</body>
</html>
```

In `styles.css`, paste the design system variables first — before writing any component styles:

```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400&display=swap');

:root {
  --bg:           #000000;
  --bg-2:         #0A0A0A;
  --bg-3:         #0D0D0D;
  --text:         #FFFFFF;
  --text-muted:   #888888;
  --accent:       #A8C8FF;
  --border:       rgba(255,255,255,0.08);
  --border-hover: rgba(255,255,255,0.2);

  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  32px;
  --space-xl:  64px;
  --space-2xl: 120px;

  --radius-sm: 8px;
  --radius-md: 12px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  overflow-x: hidden;
}
```

**Deliverable:** Open `index.html` in browser — black page, no errors in console.

---

### STEP 2 — Navigation (45 min)

**HTML:**
```html
<nav id="nav">
  <div class="nav-inner">
    <a class="nav-logo" href="#">STUDIO</a>
    <ul class="nav-links">
      <li><a href="#gallery">Work</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <a class="nav-cta" href="#contact">Get a Quote</a>
    <button class="nav-burger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="mobile-menu">
    <a href="#gallery">Work</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
    <a href="#contact" class="mobile-cta">Get a Quote</a>
  </div>
</nav>
```

**CSS:**
```css
#nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 0 var(--space-lg);
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
}
#nav.scrolled {
  background: rgba(10,10,10,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  font-family: 'Syne', sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  color: var(--text);
  text-decoration: none;
}
.nav-links {
  display: flex;
  gap: var(--space-lg);
  list-style: none;
}
.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--text); }
.nav-cta {
  padding: 8px 20px;
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-sm);
  color: var(--text);
  text-decoration: none;
  font-size: 0.85rem;
  transition: background 0.2s;
}
.nav-cta:hover { background: rgba(255,255,255,0.05); }

.nav-burger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}
.nav-burger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--text);
  transition: transform 0.3s;
}

.mobile-menu {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.96);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
}
.mobile-menu.open { transform: translateX(0); }
.mobile-menu a {
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  color: var(--text);
  text-decoration: none;
}
.mobile-cta {
  padding: 12px 32px;
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-sm);
  font-size: 1rem !important;
}

@media (max-width: 768px) {
  .nav-links, .nav-cta { display: none; }
  .nav-burger { display: flex; }
}
```

**JS:**
```javascript
// Nav scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

// Mobile menu toggle
const burger = document.querySelector('.nav-burger');
const mobileMenu = document.querySelector('.mobile-menu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});
```

**Deliverable:** Sticky nav visible, goes frosted on scroll, hamburger works on mobile.

---

### STEP 3 — Hero Section (1.5 hours)

**HTML:**
```html
<section id="hero">
  <canvas id="stars"></canvas>
  <div class="hero-content">
    <span class="hero-label">AI IMAGE STUDIO</span>
    <h1 class="hero-h1">Crafted to Look<br>Indistinguishable.</h1>
    <p class="hero-sub">AI-generated product shots, posters & visuals<br>built for brands that want more.</p>
    <a href="#gallery" class="hero-btn">View Work</a>
    <div class="scroll-hint">↓</div>
  </div>
</section>
```

**CSS:**
```css
#hero {
  position: relative;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
#stars {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 var(--space-lg);
}
.hero-label {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin-bottom: var(--space-md);
  animation: fadeUp 0.6s ease both;
}
.hero-h1 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.8rem, 7vw, 6rem);
  line-height: 1.05;
  font-weight: 700;
  margin-bottom: var(--space-md);
  animation: fadeUp 0.6s 0.2s ease both;
}
.hero-sub {
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  color: var(--text-muted);
  margin-bottom: var(--space-lg);
  animation: fadeUp 0.6s 0.4s ease both;
}
.hero-btn {
  display: inline-block;
  padding: 14px 36px;
  background: var(--text);
  color: var(--bg);
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: opacity 0.2s, transform 0.2s;
  animation: fadeUp 0.6s 0.6s ease both;
}
.hero-btn:hover { opacity: 0.85; transform: translateY(-2px); }
.scroll-hint {
  margin-top: var(--space-xl);
  color: var(--text-muted);
  font-size: 1.2rem;
  animation: fadeUp 0.6s 0.8s ease both, bounce 2s 1.5s ease infinite;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
}
```

**Star Canvas JS:**
```javascript
(function () {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let frame;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const stars = Array.from({ length: 260 }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    r:  Math.random() * 1.2 + 0.2,
    o:  Math.random() * 0.7 + 0.3,
    vx: (Math.random() - 0.5) * 0.07,
    vy: (Math.random() - 0.5) * 0.07,
    ts: Math.random() * 0.005 + 0.002,
    td: Math.random() > 0.5 ? 1 : -1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Milky Way soft diagonal band
    const g = ctx.createLinearGradient(0, canvas.height * 0.3, canvas.width, canvas.height * 0.7);
    g.addColorStop(0,   'rgba(255,255,255,0)');
    g.addColorStop(0.5, 'rgba(200,220,255,0.025)');
    g.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      s.o += s.ts * s.td;
      if (s.o > 1 || s.o < 0.2) s.td *= -1;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.o})`;
      ctx.fill();

      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;
    });

    frame = requestAnimationFrame(draw);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else frame = requestAnimationFrame(draw);
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    frame = requestAnimationFrame(draw);
  }
})();
```

**Deliverable:** Hero complete — stars drift slowly, text staggered fade-in, button scrolls to gallery.

---

### STEP 4 — Gallery Section (2 hours)

**Prepare images BEFORE writing code:**

1. Export each image as `.jpg`
2. Convert to `.webp` at [squoosh.app](https://squoosh.app) — free, browser tool
3. Upload all to [Cloudinary free tier](https://cloudinary.com) — drag and drop
4. Get each URL and add `f_auto,q_auto,w_800/` into it:
   `https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_800/IMAGE_NAME`
5. Target 12–18 images: mix portrait (3:4), landscape (16:9), square (1:1)

**HTML — hardcode all images directly:**
```html
<section id="gallery">
  <div class="gallery-header">
    <span class="section-label">WORK</span>
  </div>
  <div class="gallery-grid">

    <!-- First 6 images: loading="eager" (above fold) -->
    <div class="gallery-card">
      <img
        src="YOUR_CLOUDINARY_URL"
        alt="AI generated skincare product shot on marble surface"
        width="800" height="1067"
        loading="eager"
      >
      <div class="card-overlay">
        <span class="card-tag">Product Shot</span>
      </div>
    </div>

    <!-- Images 7 onward: loading="lazy" -->
    <div class="gallery-card">
      <img
        src="YOUR_CLOUDINARY_URL"
        alt="AI generated event poster with cosmic theme"
        width="800" height="800"
        loading="lazy"
      >
      <div class="card-overlay">
        <span class="card-tag">Poster</span>
      </div>
    </div>

    <!-- Add all your images here following the same pattern -->

  </div>
</section>
```

**CSS:**
```css
#gallery {
  padding: var(--space-2xl) var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
}
.gallery-header { margin-bottom: var(--space-lg); }
.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  color: var(--text-muted);
}

/* CSS columns masonry — works in all browsers */
.gallery-grid {
  columns: 3;
  column-gap: 12px;
}
@media (max-width: 1023px) { .gallery-grid { columns: 2; } }
@media (max-width: 640px)  { .gallery-grid { columns: 1; } }

.gallery-card {
  position: relative;
  break-inside: avoid;
  margin-bottom: 12px;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: zoom-in;
}
.gallery-card img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
  will-change: transform;
}
.gallery-card:hover img { transform: scale(1.04); }

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 50%, rgba(0,0,0,0.75));
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: var(--space-md);
}
.gallery-card:hover .card-overlay { opacity: 1; }

.card-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: var(--text);
  text-transform: uppercase;
  background: rgba(255,255,255,0.1);
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.15);
}
```

**Lightbox CSS:**
```css
#lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
#lightbox.open { opacity: 1; pointer-events: all; }
.lb-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.92);
}
.lb-img {
  position: relative;
  z-index: 1;
  max-width: 90vw;
  max-height: 90vh;
  border-radius: var(--radius-sm);
  object-fit: contain;
}
.lb-close, .lb-prev, .lb-next {
  position: absolute;
  z-index: 2;
  background: rgba(255,255,255,0.08);
  border: 1px solid var(--border);
  color: var(--text);
  cursor: pointer;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.lb-close:hover, .lb-prev:hover, .lb-next:hover { background: rgba(255,255,255,0.15); }
.lb-close { top: 20px; right: 20px; }
.lb-prev  { left: 20px; top: 50%; transform: translateY(-50%); }
.lb-next  { right: 20px; top: 50%; transform: translateY(-50%); }
@media (max-width: 640px) { .lb-prev, .lb-next { display: none; } }
```

**Lightbox JS:**
```javascript
const cards = document.querySelectorAll('.gallery-card');
const imgs  = Array.from(cards).map(c => ({
  src: c.querySelector('img').src,
  alt: c.querySelector('img').alt,
}));
let currentIndex = 0;

const lb = document.createElement('div');
lb.id = 'lightbox';
lb.innerHTML = `
  <div class="lb-backdrop"></div>
  <button class="lb-close">✕</button>
  <button class="lb-prev">‹</button>
  <button class="lb-next">›</button>
  <img class="lb-img" src="" alt="">
`;
document.body.appendChild(lb);

function openLightbox(i) {
  currentIndex = i;
  lb.querySelector('.lb-img').src = imgs[i].src;
  lb.querySelector('.lb-img').alt = imgs[i].alt;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
function navigate(dir) {
  currentIndex = (currentIndex + dir + imgs.length) % imgs.length;
  lb.querySelector('.lb-img').src = imgs[currentIndex].src;
}

cards.forEach((card, i) => card.addEventListener('click', () => openLightbox(i)));
lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
lb.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);
lb.querySelector('.lb-prev').addEventListener('click', () => navigate(-1));
lb.querySelector('.lb-next').addEventListener('click', () => navigate(1));
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});
```

**Deliverable:** All images in masonry layout. Click opens fullscreen lightbox with keyboard navigation.

---

### STEP 5 — Services Section (1 hour)

**HTML:**
```html
<section id="services">
  <div class="services-inner">
    <span class="section-label">SERVICES</span>
    <div class="services-grid">

      <div class="service-card service-primary">
        <div class="service-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6z"/>
          </svg>
        </div>
        <span class="service-badge">Most Popular</span>
        <h3>AI Image Generation</h3>
        <p>Hyper-realistic product shots, lifestyle images, and creative visuals — no studio, no photographer, delivered in 24–48 hours.</p>
      </div>

      <div class="service-card">
        <div class="service-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 3H8L6 7h12z"/>
          </svg>
        </div>
        <h3>Poster & Brand Visuals</h3>
        <p>Event posters, social media creatives, and brand identity visuals that stop the scroll.</p>
      </div>

      <div class="service-card">
        <div class="service-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
        </div>
        <h3>Website Development</h3>
        <p>Fast, modern websites built with clean code. From landing pages to full product sites.</p>
      </div>

    </div>
  </div>
</section>
```

**CSS:**
```css
#services {
  background: var(--bg-3);
  padding: var(--space-2xl) var(--space-lg);
}
.services-inner {
  max-width: 1200px;
  margin: 0 auto;
}
#services .section-label { display: block; margin-bottom: var(--space-lg); }

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}
@media (max-width: 1023px) { .services-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px)  { .services-grid { grid-template-columns: 1fr; } }

.service-card {
  padding: var(--space-lg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: rgba(255,255,255,0.02);
  transition: border-color 0.3s, box-shadow 0.3s;
}
.service-card:hover {
  border-color: var(--border-hover);
  box-shadow: 0 0 40px rgba(168,200,255,0.04);
}
.service-primary { border-color: rgba(168,200,255,0.2); }
.service-icon { color: var(--accent); margin-bottom: var(--space-md); }
.service-badge {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: var(--accent);
  border: 1px solid rgba(168,200,255,0.3);
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: var(--space-sm);
}
.service-card h3 {
  font-family: 'Syne', sans-serif;
  font-size: 1.2rem;
  margin-bottom: var(--space-sm);
}
.service-card p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.7; }
```

**Deliverable:** Three service cards, responsive grid, hover glow on cards.

---

### STEP 6 — Contact + Footer (45 min)

No form. A mailto link is enough — simple, no backend, works forever.

**HTML:**
```html
<section id="contact">
  <div class="contact-inner">
    <span class="section-label">CONTACT</span>
    <h2 class="contact-h2">Let's build<br>something real.</h2>
    <p class="contact-sub">Tell me what you need — I'll tell you what's possible.</p>
    <a href="mailto:hello@yourstudio.com" class="contact-btn">hello@yourstudio.com</a>
  </div>
</section>

<footer>
  <div class="footer-inner">
    <span>© 2025 Your Studio Name</span>
    <div class="footer-links">
      <a href="https://instagram.com/YOURHANDLE" target="_blank" rel="noopener">Instagram</a>
      <a href="https://behance.net/YOURHANDLE" target="_blank" rel="noopener">Behance</a>
    </div>
  </div>
</footer>
```

**CSS:**
```css
#contact {
  padding: var(--space-2xl) var(--space-lg);
  text-align: center;
  background: var(--bg-2);
}
.contact-inner { max-width: 700px; margin: 0 auto; }
#contact .section-label { display: block; margin-bottom: var(--space-lg); }
.contact-h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.1;
  margin-bottom: var(--space-md);
}
.contact-sub { color: var(--text-muted); font-size: 1rem; margin-bottom: var(--space-lg); }
.contact-btn {
  display: inline-block;
  padding: 14px 36px;
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-sm);
  color: var(--text);
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  transition: background 0.2s, border-color 0.2s;
}
.contact-btn:hover { background: rgba(255,255,255,0.05); border-color: var(--accent); }

footer {
  background: var(--bg);
  border-top: 1px solid var(--border);
  padding: var(--space-lg);
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-md);
}
footer span { color: var(--text-muted); font-size: 0.85rem; }
.footer-links { display: flex; gap: var(--space-lg); }
.footer-links a { color: var(--text-muted); text-decoration: none; font-size: 0.85rem; transition: color 0.2s; }
.footer-links a:hover { color: var(--text); }
```

**Deliverable:** Full page complete. Scrolls through all sections top to bottom.

---

### STEP 7 — Scroll Reveal Animations (30 min)

Sections fade in as you scroll to them.

**Add `class="reveal"` to these sections in HTML:**
```html
<section id="gallery" class="reveal">
<section id="services" class="reveal">
<section id="contact" class="reveal">
```

**CSS:**
```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

**JS:**
```javascript
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
```

**Deliverable:** Each section below hero fades up gracefully when scrolled into view.

---

### STEP 8 — Final Checks & Deploy (1 hour)

**Replace placeholder content:**
- [ ] `STUDIO` in nav → your actual brand name
- [ ] `hello@yourstudio.com` → your real email
- [ ] Footer name → your name
- [ ] Instagram/Behance links → your real profiles
- [ ] `<title>` tag → your real name

**Images checklist:**
- [ ] Every `<img>` has a real descriptive `alt` (what is actually in the image)
- [ ] First 6 gallery images have `loading="eager"`, rest have `loading="lazy"`
- [ ] Every `<img>` has `width` and `height` set to actual pixel dimensions

**Add these 3 tags to `<head>` — makes sharing links look good on WhatsApp/Instagram:**
```html
<meta name="description" content="AI-generated product shots, posters, and brand visuals. Web development.">
<meta property="og:title" content="Your Name — AI Image Studio">
<meta property="og:image" content="https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_1200/YOUR_BEST_IMAGE">
```
For the og:image — just use your best portfolio image URL from Cloudinary at 1200px width. No need to make a separate file.

**Deploy — Cloudflare Pages (free):**
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. New project → Upload files directly (no git needed)
3. Drop your 3 files: `index.html`, `styles.css`, `main.js`
4. Free `.pages.dev` URL in 60 seconds
5. Optional: connect custom domain later (₹800/year from Namecheap)

**Final browser test:**
- Chrome DevTools → Network tab → throttle to "Fast 3G" → reload → gallery visible within 3s ✓
- DevTools → toggle mobile view at 375px → no horizontal scroll, all readable ✓
- Click every nav link → scrolls to correct section ✓
- Click gallery image → lightbox opens, ESC closes, arrows navigate ✓
- Click email link → opens mail app ✓

**Deliverable:** Site is live at a real URL. Share it. Done.

---

## Complete File Structure

```
/
├── index.html     ← all HTML
├── styles.css     ← all styles
└── main.js        ← stars + nav + lightbox + scroll reveal
```

Three files. No build tool. No node_modules. No maintenance.

---

## Time Estimate

| Step | Task | Time |
|------|------|------|
| 1 | Setup + design variables | 30 min |
| 2 | Navigation | 45 min |
| 3 | Hero + star animation | 1.5 hr |
| 4 | Gallery + lightbox | 2 hr |
| 5 | Services | 1 hr |
| 6 | Contact + footer | 45 min |
| 7 | Scroll animations | 30 min |
| 8 | Polish + deploy | 1 hr |
| **Total** | | **~8 hours** |

---

*Build it in one day. Deploy. Share the link. Done.*
