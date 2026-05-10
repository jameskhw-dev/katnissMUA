/* ═══════════════════════════════════════════════
   KATNISS MUA — Interactive JavaScript
   ═══════════════════════════════════════════════ */

'use strict';

/* ─── PARTICLE SYSTEM ─────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.r    = Math.random() * 1.5 + 0.3;
    this.vx   = (Math.random() - 0.5) * 0.25;
    this.vy   = (Math.random() - 0.5) * 0.25 - 0.1;
    this.life = Math.random() * 200 + 100;
    this.age  = 0;
    const palette = ['201,149,108', '212,175,122', '232,184,154', '125,43,78'];
    this.color = palette[Math.floor(Math.random() * palette.length)];
  };
  Particle.prototype.update = function () {
    this.x  += this.vx;
    this.y  += this.vy;
    this.age++;
    if (this.age > this.life || this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
      this.reset();
    }
  };
  Particle.prototype.draw = function () {
    const alpha = Math.sin((this.age / this.life) * Math.PI) * 0.6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${alpha})`;
    ctx.fill();
  };

  function init() {
    resize();
    particles = Array.from({ length: 80 }, () => new Particle());
    window.addEventListener('resize', resize);
    loop();
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }

  init();
})();


/* ─── CUSTOM CURSOR ───────────────────────────── */
(function initCursor() {
  const dot   = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  if (!dot || !trail) return;

  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function smoothTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(smoothTrail);
  }
  smoothTrail();

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    trail.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    trail.style.opacity = '0.5';
  });
})();


/* ─── NAVIGATION ──────────────────────────────── */
(function initNav() {
  const nav      = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const overlay  = document.getElementById('mobileOverlay');
  const close    = document.getElementById('mobileClose');
  const links    = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  hamburger.addEventListener('click', () => overlay.classList.add('open'));
  close.addEventListener('click',     () => overlay.classList.remove('open'));
  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => overlay.classList.remove('open'));
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => io.observe(s));
})();


/* ─── SCROLL REVEAL ───────────────────────────── */
(function initScrollReveal() {
  const els = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  const io  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();


/* ─── SKILL BAR ANIMATION ─────────────────────── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  const io   = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target.querySelector('.skill-bar__fill');
        const pct  = e.target.dataset.pct;
        setTimeout(() => { fill.style.width = pct + '%'; }, 200);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => io.observe(b));
})();


/* ─── COUNTER ANIMATION ───────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-item__num[data-count]');
  const io   = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el    = e.target;
      const end   = parseInt(el.dataset.count, 10);
      const dur   = 1800;
      const start = performance.now();
      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / dur, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * end);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = end;
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
})();


/* ─── PORTFOLIO FILTER & LIGHTBOX ─────────────── */
(function initPortfolio() {
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const items       = document.querySelectorAll('.portfolio-item');
  const lightbox    = document.getElementById('lightbox');
  const lbContent   = document.getElementById('lightboxContent');
  const lbClose     = document.getElementById('lightboxClose');
  const lbPrev      = document.getElementById('lightboxPrev');
  const lbNext      = document.getElementById('lightboxNext');

  let current = 0;
  let filtered = [];

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');
      const f = btn.dataset.filter;
      items.forEach(item => {
        const show = f === 'all' || item.dataset.category === f;
        item.classList.toggle('hidden', !show);
      });
    });
  });

  function openLightbox(item) {
    const visibleItems = [...items].filter(i => !i.classList.contains('hidden'));
    filtered  = visibleItems;
    current   = visibleItems.indexOf(item);
    renderLb();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function renderLb() {
    const item = filtered[current];
    const img  = item.querySelector('.portfolio-item__img');
    const title = item.querySelector('.portfolio-item__title').textContent;
    const cat   = item.querySelector('.portfolio-item__category').textContent;
    lbContent.innerHTML = `
      <div style="width:100%;height:100%;background:${getComputedStyle(img).background};
                  background-image:${getComputedStyle(img).backgroundImage};
                  display:flex;align-items:flex-end;padding:24px;border-radius:12px;position:relative;">
        <div>
          <p style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--rose-gold);margin-bottom:6px;">${cat}</p>
          <h3 style="font-family:var(--font-serif);font-size:1.4rem;font-weight:300;color:var(--cream);">${title}</h3>
        </div>
      </div>`;
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach(item => {
    item.querySelector('.portfolio-item__expand').addEventListener('click', () => openLightbox(item));
    item.querySelector('.portfolio-item__img').addEventListener('click', () => openLightbox(item));
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  lbPrev.addEventListener('click', () => { current = (current - 1 + filtered.length) % filtered.length; renderLb(); });
  lbNext.addEventListener('click', () => { current = (current + 1) % filtered.length; renderLb(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   { current = (current - 1 + filtered.length) % filtered.length; renderLb(); }
    if (e.key === 'ArrowRight')  { current = (current + 1) % filtered.length; renderLb(); }
  });
})();


/* ─── TESTIMONIAL SLIDER ──────────────────────── */
(function initTestimonials() {
  const track   = document.getElementById('testimonialTrack');
  const dots    = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  const cards   = track.querySelectorAll('.testimonial-card');
  const total   = cards.length;
  let current   = 0;
  let autoTimer;

  // Create dots
  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Slide ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dots.appendChild(d);
  });

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.querySelectorAll('.testimonial-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    resetTimer();
  }

  function resetTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 6000);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Touch/swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });

  resetTimer();
})();


/* ─── CONTACT FORM ────────────────────────────── */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn     = form.querySelector('.btn');
    const btnText = btn.querySelector('.btn__text');
    const btnLoad = btn.querySelector('.btn__loader');

    btnText.hidden = true;
    btnLoad.hidden = false;
    btn.disabled   = true;

    // Simulate async submission
    setTimeout(() => {
      btnText.hidden = false;
      btnLoad.hidden = true;
      btn.disabled   = false;
      success.hidden = false;
      form.reset();
      setTimeout(() => { success.hidden = true; }, 6000);
    }, 1800);
  });
})();


/* ─── BACK TO TOP ─────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ─── HERO PARALLAX ───────────────────────────── */
(function initParallax() {
  const layers = document.querySelectorAll('.hero__layer');
  if (!layers.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      layers[0].style.transform = `translateY(${y * 0.25}px)`;
      layers[1].style.transform = `translateY(${y * 0.15}px)`;
      ticking = false;
    });
    ticking = true;
  });
})();


/* ─── HOVER SPARKLE TRAIL ─────────────────────── */
(function initSparkles() {
  const isMobile = () => window.innerWidth < 768;

  document.addEventListener('mousemove', e => {
    if (isMobile()) return;
    if (Math.random() > 0.3) return; // throttle

    const spark = document.createElement('div');
    spark.style.cssText = `
      position:fixed;
      left:${e.clientX}px;
      top:${e.clientY}px;
      width:${Math.random() * 4 + 2}px;
      height:${Math.random() * 4 + 2}px;
      border-radius:50%;
      background:rgba(201,149,108,${Math.random() * 0.6 + 0.2});
      pointer-events:none;
      z-index:9990;
      transform:translate(-50%,-50%);
      transition:transform 0.8s ease,opacity 0.8s ease;
    `;
    document.body.appendChild(spark);

    const angle = Math.random() * Math.PI * 2;
    const dist  = Math.random() * 40 + 10;
    requestAnimationFrame(() => {
      spark.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px))`;
      spark.style.opacity   = '0';
    });
    setTimeout(() => spark.remove(), 900);
  });
})();
