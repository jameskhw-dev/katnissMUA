# Katniss MUA — Website Documentation

## Project Overview

A luxury makeup artist portfolio website for **Katniss MUA**, built as a single-page application (SPA) using vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies (other than Google Fonts).

**Live entry point:** `index.html`

---

## File Structure

```
katnissMUA/
├── index.html      # Full page markup and content
├── styles.css      # All styling — tokens, layout, animations, responsive
├── script.js       # All interactive behaviour (vanilla JS, modular IIFEs)
└── CLAUDE.md       # This file
```

---

## Design System

### Colour Tokens (defined in `:root` — `styles.css`)

| Token | Value | Usage |
|---|---|---|
| `--rose-gold` | `#c9956c` | Primary accent, CTA buttons, highlights |
| `--rose-light` | `#e8b89a` | Hover states on primary elements |
| `--rose-dark` | `#9a6b4b` | Gradient starts, avatar backgrounds |
| `--gold` | `#d4af7a` | Star ratings, award icons, price tags |
| `--gold-light` | `#f0d5a0` | Gradient ends on skill bars |
| `--burgundy` | `#7d2b4e` | Hero background radial glow |
| `--cream` | `#f5f0e8` | Primary text on dark backgrounds |
| `--ink` | `#0d0a08` | Main page background |
| `--dark-mid` | `#1c1714` | Alternate section background |
| `--dark-card` | `#211e1b` | Card backgrounds |
| `--text-muted` | `#a89880` | Secondary text, labels, subtitles |

### Typography

| Font | Family | Usage |
|---|---|---|
| **Cormorant Garamond** | `var(--font-serif)` | Headings, quotes, hero title, logo |
| **Montserrat** | `var(--font-sans)` | Body copy, labels, navigation, buttons |

### Spacing & Layout

- `--section-gap: 120px` — vertical padding on all sections (reduces to `80px` ≤ 768px)
- `--container: 1200px` — max content width, centred with inline padding via `clamp()`
- `--radius: 12px` / `--radius-lg: 20px` — card corner radii

---

## Page Sections

### 1. Navigation (`<nav class="nav">`)
- **Fixed** at top; becomes `scrolled` class (semi-transparent glass effect) after 60px scroll
- **Logo** — serif `K` + `atniss` + `MUA` tag
- **Links** — animated underline on hover; active link tracked via `IntersectionObserver`
- **Mobile** — hamburger triggers a full-screen overlay (`mobile-overlay`) that slides in from right
- **CTA** — "Book Now" styled as a bordered pill, turns solid rose-gold on hover

### 2. Hero (`<section class="hero">`)
- Full-viewport height (`100svh`)
- **Three layered radial gradients** — burgundy bleed left, rose-gold right, ink fade bottom
- **Animated title** — two lines stagger-fade in (`fadeInUp`) on load
- Floating **stat badges** (8+ years, 500+ clients, 12 awards) — visible on desktop only
- **Scroll indicator** — animated line with `scrollLine` keyframe
- **Parallax** — the two gradient layers shift vertically on scroll via `requestAnimationFrame`

### 3. About (`<section id="about">`)
- Two-column grid (visual left, text right); stacks to single column on mobile
- Left: styled placeholder frame with double border decoration rings and a large serif monogram
- Right: bio paragraphs, skill pills, CTA button
- **Signature** — italic rose-gold serif text below the frame

### 4. Skills (`<section id="skills">`)
- Dark alternate background (`--dark-mid`)
- **Left column** — five animated progress bars; width animates from 0 to `data-pct` value when scrolled into view
- **Right column** — 2×2 grid of skill cards with hover glow and icon characters

### 5. Services (`<section id="services">`)
- 3-column card grid (2-col ≤ 1024px, 1-col ≤ 768px)
- Each card has a radial glow element that fades in on hover
- Six service offerings: Bridal, Editorial, Film & TV, Special Occasions, Masterclass, Virtual Consultation

### 6. Portfolio (`<section id="portfolio">`)
- Dark background
- **Filter buttons** — `data-filter` attribute; `.hidden` class toggled on items
- **Masonry-style CSS grid** — 3 columns, `grid-auto-rows: 280px`; items can be `--tall` (span 2 rows) or `--wide` (span 2 cols)
- Each item is a CSS-gradient placeholder (no real images required to function)
- **Overlay** — fades in on hover, shows category tag + title + expand button
- **Lightbox** — fixed overlay; renders clicked item, supports Previous/Next navigation and keyboard (`Escape`, `←`, `→`)

### 7. Achievements (`<section id="achievements">`)
- **Stats row** — 4 animated counters (`data-count` attribute), triggered by `IntersectionObserver`
- **Awards grid** — 3-column grid of award cards with a gold top-border reveal on hover
- **Press logos** — serif typographic logos (Vogue, Harper's Bazaar, Elle, Tatler, Grazia, Cosmopolitan)

### 8. Testimonials (`<section id="testimonials">`)
- Auto-advancing slider (6-second interval)
- **Track** — CSS `flex` row; cards are `min-width: 100%`; translated via `transform: translateX`
- Dot indicators — active dot stretches to pill shape via CSS transition
- Previous / Next buttons + touch/swipe support (50px threshold)

### 9. Contact (`<section id="contact">`)
- Two-column layout (info left, form right); stacks on mobile
- Contact info items with icon chips
- Social links (Instagram, TikTok, Pinterest)
- **Form fields** — Name, Email, Service dropdown, Date, Message textarea
- **Simulated submission** — 1.8-second loader animation, then success message; resets after 6 seconds

### 10. Footer
- Three-column grid (brand, nav, socials)
- **Back-to-top button** — fixed bottom-right, fades in after 600px scroll

---

## Interactive Features

| Feature | File | Notes |
|---|---|---|
| Canvas particle system | `script.js` | 80 floating particles; rose-gold / burgundy palette; loops via `requestAnimationFrame` |
| Custom cursor | `script.js` | Dot snaps immediately; ring trails with lerp at 12% per frame; hides on mobile |
| Cursor sparkle trail | `script.js` | Random particles emitted on `mousemove` (throttled to 30%); fade-scatter animation |
| Nav scroll effect | `script.js` | `.scrolled` class after 60px; backdrop-filter blur |
| Active nav link | `script.js` | `IntersectionObserver` on `section[id]` elements; threshold 0.4 |
| Scroll reveal | `script.js` | `.fade-in-up`, `.fade-in-left`, `.fade-in-right` pause until `.is-visible` added |
| Skill bar animation | `script.js` | Width transition triggered by `IntersectionObserver` |
| Counter animation | `script.js` | Cubic ease-out easing over 1800ms |
| Portfolio filter | `script.js` | `data-filter` / `data-category` matching; `.hidden` class toggle |
| Lightbox | `script.js` | Open/close/prev/next; keyboard navigation; body scroll lock |
| Testimonial slider | `script.js` | Auto-advance + dots + swipe; touch threshold 50px |
| Hero parallax | `script.js` | Two gradient layers at different `translateY` rates (0.25× / 0.15×) |
| Back-to-top | `script.js` | `.visible` after 600px; smooth scroll |
| Contact form | `script.js` | Simulated async submission with loader state |

---

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `≤ 1024px` | Hero badges hidden; services → 2-col; awards → 2-col; footer → 2-col |
| `≤ 768px` | Nav links hidden → hamburger overlay; most grids → 1-col; portfolio → 2-col; cursor disabled |
| `≤ 480px` | Portfolio → 1-col; hero title scales further; skill cards → 1-col |

---

## CSS Architecture

- **No external CSS frameworks** — fully custom
- Design tokens live in `:root` pseudo-class
- Keyframe animations defined once at the top of `styles.css`
- Scroll-reveal classes (`.fade-in-*`) pause their animations by default; JS adds `.is-visible` to play them
- All colour, spacing, and font references use CSS custom properties for easy theming
- Custom scrollbar styled via `::-webkit-scrollbar` selectors

---

## JavaScript Architecture

All JS is wrapped in self-invoking IIFEs (`(function init…() { … })()`) to avoid global scope pollution. No external libraries. Modules:

1. `initParticles` — canvas 2D particle system
2. `initCursor` — custom cursor with lerp trail
3. `initNav` — scroll state, mobile overlay, active link observer
4. `initScrollReveal` — `IntersectionObserver` for all `.fade-in-*` elements
5. `initSkillBars` — `IntersectionObserver` + CSS width transition
6. `initCounters` — `IntersectionObserver` + `requestAnimationFrame` count-up
7. `initPortfolio` — filter + lightbox (keyboard + click)
8. `initTestimonials` — slider + dots + autoplay + swipe
9. `initContactForm` — async simulation + success state
10. `initBackToTop` — scroll threshold + smooth scroll
11. `initParallax` — hero background layers on scroll
12. `initSparkles` — mousemove sparkle particle trail

---

## Fonts & External Dependencies

Only one external dependency: **Google Fonts**

```html
https://fonts.googleapis.com/css2?
  family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400
  &family=Montserrat:wght@300;400;500;600
```

All other assets (images, icons) are CSS-generated — no image files required.

---

## Adding Real Portfolio Images

To replace CSS-gradient placeholders with real photos:

1. Add image files to an `/images/` directory
2. In `index.html`, on each `.portfolio-item__img`, replace the inline `style` with:
   ```html
   style="background-image: url('images/your-photo.jpg'); background-size: cover; background-position: center;"
   ```
3. Remove the `--hue`, `--sat`, `--light` CSS variables from the inline styles

---

## SEO & Meta

Defined in `<head>` of `index.html`:
- `<title>` — "Katniss MUA — Luxury Makeup Artistry"
- `<meta name="description">` — 155-char summary
- `lang="en"` on `<html>`
- `aria-label` on all icon-only buttons
- Semantic HTML5 elements throughout (`<nav>`, `<section>`, `<footer>`, `<form>`, `<blockquote>`)

---

## Extending the Site

| Task | Where to edit |
|---|---|
| Change name / bio | `index.html` — About section |
| Add a portfolio item | `index.html` — add a `.portfolio-item` div inside `#portfolioGrid` |
| Change colour scheme | `styles.css` — `:root` tokens |
| Add a new service | `index.html` — `.services__grid`, follow `.service-card` pattern |
| Add a testimonial | `index.html` — add `.testimonial-card` inside `.testimonial-track` |
| Change social links | `index.html` — update `href=""` on all `<a>` social elements |
| Add Google Analytics | `index.html` — add GA `<script>` tag before closing `</head>` |
| Connect form to backend | `script.js` — replace `setTimeout` in `initContactForm` with a `fetch()` POST |
