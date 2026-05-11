// ─── Full-Page Star Canvas Background ───
(function () {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let frame;
  const isMobile = window.innerWidth < 768;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // ── Stars — reduce count on mobile for performance ──
  const STAR_COUNT = isMobile ? 100 : 300;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    r:  Math.random() * 1.4 + 0.2,
    o:  Math.random() * 0.7 + 0.3,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    ts: Math.random() * 0.008 + 0.003,
    td: Math.random() > 0.5 ? 1 : -1,
  }));

  // ── Shooting Stars ──
  const shootingStars = [];
  function spawnShootingStar() {
    const startX = Math.random() * canvas.width * 0.8;
    const startY = Math.random() * canvas.height * 0.4;
    const angle = (Math.random() * 30 + 15) * (Math.PI / 180);
    const speed = Math.random() * 6 + 8;
    shootingStars.push({
      x: startX, y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1.0,
      decay: Math.random() * 0.015 + 0.012,
      length: Math.random() * 60 + 80,
      width: Math.random() * 1.5 + 0.8,
    });
  }

  // Spawn a shooting star every 3-6 seconds (less frequent on mobile)
  const spawnInterval = isMobile ? 6000 : 3000;
  setInterval(() => {
    if (shootingStars.length < (isMobile ? 1 : 3)) spawnShootingStar();
  }, Math.random() * spawnInterval + 2000);
  setTimeout(spawnShootingStar, 1500);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ── Milky Way — skip on mobile for perf ──
    if (!isMobile) {
      const milkyWay = ctx.createLinearGradient(
        0, canvas.height * 0.15,
        canvas.width, canvas.height * 0.85
      );
      milkyWay.addColorStop(0,    'rgba(255,255,255,0)');
      milkyWay.addColorStop(0.25, 'rgba(180,200,255,0.015)');
      milkyWay.addColorStop(0.4,  'rgba(160,190,255,0.045)');
      milkyWay.addColorStop(0.5,  'rgba(200,215,255,0.06)');
      milkyWay.addColorStop(0.6,  'rgba(160,190,255,0.045)');
      milkyWay.addColorStop(0.75, 'rgba(180,200,255,0.015)');
      milkyWay.addColorStop(1,    'rgba(255,255,255,0)');
      ctx.fillStyle = milkyWay;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
      ctx.rotate(-0.45);
      const innerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, canvas.width * 0.5);
      innerGlow.addColorStop(0, 'rgba(168,200,255,0.04)');
      innerGlow.addColorStop(0.4, 'rgba(140,180,255,0.02)');
      innerGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = innerGlow;
      ctx.fillRect(-canvas.width, -canvas.height * 0.15, canvas.width * 2, canvas.height * 0.3);
      ctx.restore();
    }

    // ── Draw Stars ──
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

    // ── Draw Shooting Stars ──
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      const mag = Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy);
      const tailX = ss.x - (ss.vx / mag) * ss.length;
      const tailY = ss.y - (ss.vy / mag) * ss.length;

      const trail = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      trail.addColorStop(0, `rgba(255,255,255,0)`);
      trail.addColorStop(0.6, `rgba(200,220,255,${ss.life * 0.3})`);
      trail.addColorStop(1, `rgba(255,255,255,${ss.life * 0.9})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.strokeStyle = trail;
      ctx.lineWidth = ss.width;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(ss.x, ss.y, ss.width + 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${ss.life * 0.8})`;
      ctx.fill();

      ss.x += ss.vx;
      ss.y += ss.vy;
      ss.life -= ss.decay;

      if (ss.life <= 0 || ss.x > canvas.width + 100 || ss.y > canvas.height + 100) {
        shootingStars.splice(i, 1);
      }
    }

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

// ─── Nav Scroll Effect ───
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

// ─── Mobile Menu Toggle ───
const burger = document.querySelector('.nav-burger');
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.getElementById('nav');

function toggleMenu() {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  nav.classList.toggle('menu-open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

burger.addEventListener('click', toggleMenu);
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', toggleMenu);
});

// ─── Gallery Image Loading & Skeleton ───
document.querySelectorAll('.gallery-card').forEach(card => {
  const img = card.querySelector('img');
  function onLoaded() {
    card.classList.remove('loading');
    card.classList.add('loaded');
  }
  if (img.complete && img.naturalHeight > 0) {
    onLoaded();
  } else {
    img.addEventListener('load', onLoaded);
    img.addEventListener('error', () => {
      card.classList.remove('loading');
    });
  }
});

// ─── Lightbox ───
const cards = document.querySelectorAll('.gallery-card');
const getImgs = () => Array.from(cards).map(c => ({
  src: c.querySelector('img').getAttribute('src'),
  alt: c.querySelector('img').getAttribute('alt'),
}));
let imgs = getImgs();
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

// ─── Touch Swipe for Lightbox (mobile) ───
let touchStartX = 0;
let touchStartY = 0;
lb.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });
lb.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  const dy = e.changedTouches[0].screenY - touchStartY;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    if (dx < 0) navigate(1);
    else navigate(-1);
  }
}, { passive: true });

// ─── Scroll Reveal ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Contact Form ───
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const service = document.getElementById('contact-service').value;
    const message = document.getElementById('contact-message').value.trim();

    const subject = encodeURIComponent(`Project Inquiry – ${service || 'General'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\n${message}`
    );
    window.location.href = `mailto:hello@yourstudio.com?subject=${subject}&body=${body}`;

    const btn = document.getElementById('contact-submit');
    btn.querySelector('span').textContent = 'Opening Mail App…';
    btn.classList.add('sent');
    setTimeout(() => {
      btn.querySelector('span').textContent = 'Send Message';
      btn.classList.remove('sent');
    }, 3000);
  });
}
