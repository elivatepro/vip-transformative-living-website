# About Page Hero Section — Redesign Plan

## Current Issues

1. **Photo feels "pasted on"** — Hard rectangular edge, no integration with background
2. **Photo style mismatch** — Casual selfie (car, sunglasses, cap) vs. premium brand aesthetic
3. **No visual flow** — Photo and background exist in separate visual spaces
4. **Competing focal points** — Sunset draws eye away from Coach Wayne

---

## Recommended Solutions

### Priority 1: Get a Professional Photo

The most impactful change would be using a **professional portrait** instead of the casual selfie. The current photo communicates "approachable friend" but not "premium transformational coach."

**Ideal photo characteristics:**
- Studio or professional setting
- Direct eye contact with camera
- Warm lighting (complements gold palette)
- Solid dark or neutral background (easier to blend)
- Confident, warm expression
- Professional attire

**If professional photos aren't available yet**, I've included options below that work with casual photos.

---

## Design Options

---

## OPTION A: Gradient Mask Blend (Recommended)

**Concept:** Photo fades seamlessly into the background using gradient masks

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│    NAVIGATION BAR                                              [Book Call] │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│         ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│         ██            ██░░░░░                                          ░   │
│         ██            ██░░░░░      MEET YOUR GUIDE                     ░   │
│         ██   WAYNE    ██░░░░░                                          ░   │
│         ██   PHOTO    ██▒▒▒▒▒      Coach Wayne Dawson                  ░   │
│         ██            ██▒▒▒▒▒                                          ░   │
│         ██   fades →  ▒▒▒▒▒▒▒      Transformational Coach | Speaker    ░   │
│         ██            ▒▒░░░░░      25+ Years Guiding Men...            ░   │
│         ████████▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│              ↓                                                              │
│         fade to                    ← Background: Dark with subtle           │
│         transparent                   gradient or texture                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Treatment:**
- Photo has **gradient mask** on right edge (fades to transparent)
- Photo has **gradient mask** on bottom edge (fades to transparent)
- Background is **solid dark** (#0A0A0A) or **subtle gradient**
- No competing scenic background — photo IS the visual interest

**CSS Implementation:**
```css
.hero-photo {
  -webkit-mask-image: linear-gradient(
    to right,
    black 0%,
    black 60%,
    transparent 100%
  ),
  linear-gradient(
    to bottom,
    black 0%,
    black 70%,
    transparent 100%
  );
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}
```

**Pros:**
- Clean, modern look
- Photo naturally integrates
- Works with any photo (even casual ones)
- Doesn't require perfect photo background

**Cons:**
- Loses some photo detail on edges

---

## OPTION B: Duotone/Color Overlay

**Concept:** Apply a color treatment to the photo that matches the site palette

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│    ┌────────────────────┐                                                   │
│    │                    │                                                   │
│    │   PHOTO WITH       │         MEET YOUR GUIDE                          │
│    │   DUOTONE EFFECT   │                                                   │
│    │                    │         Coach Wayne Dawson                        │
│    │   Dark charcoal    │                                                   │
│    │   + Gold highlights│         Transformational Coach | Speaker          │
│    │                    │                                                   │
│    │   Circular or      │                                                   │
│    │   rounded frame    │                                                   │
│    │                    │                                                   │
│    └────────────────────┘                                                   │
│                                                                             │
│    Background: Solid #0A0A0A with subtle gold glow behind photo             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Treatment:**
- Photo converted to **duotone** (dark charcoal shadows + gold/warm highlights)
- Creates artistic, cohesive look
- Frame can be **circular** or **rounded rectangle**
- Subtle **gold glow** behind the frame

**CSS Implementation:**
```css
.hero-photo {
  filter: grayscale(100%) contrast(1.1);
  position: relative;
}

.hero-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(212, 175, 55, 0.3) 0%,
    transparent 50%,
    rgba(10, 10, 10, 0.5) 100%
  );
  mix-blend-mode: color;
}

.photo-glow {
  box-shadow: 0 0 80px rgba(212, 175, 55, 0.2);
}
```

**Pros:**
- Very cohesive with brand
- Makes any photo look "designed"
- Hides imperfect photo quality

**Cons:**
- Loses natural skin tones
- May feel too "filtered" for personal brand

---

## OPTION C: Cutout with Gradient Background

**Concept:** Remove photo background entirely, place Wayne on gradient

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│    ░                                                                     ░   │
│    ░         ╭──────────╮                                                ░   │
│    ░         │          │                                                ░   │
│    ░         │  WAYNE   │       MEET YOUR GUIDE                          ░   │
│    ░         │  CUTOUT  │                                                ░   │
│    ░         │  (no bg) │       Coach Wayne Dawson                       ░   │
│    ░         │          │                                                ░   │
│    ░         │    ↓     │       Transformational Coach | Speaker         ░   │
│    ░         ╰──────────╯                                                ░   │
│    ░              │                                                      ░   │
│    ░       slight shadow                                                 ░   │
│    ░                                                                     ░   │
│    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│                                                                             │
│    Background: Radial gradient (dark center → darker edges) + gold glow     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Treatment:**
- Photo background **removed** (cutout)
- Coach Wayne placed on **gradient background**
- Subtle **drop shadow** for depth
- **Gold accent glow** behind figure

**Background CSS:**
```css
.hero-section {
  background: radial-gradient(
    ellipse at 30% 50%,
    rgba(212, 175, 55, 0.05) 0%,
    #0A0A0A 50%
  );
}

.wayne-cutout {
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
}
```

**Pros:**
- Very clean, professional look
- Full control over composition
- Photo truly "belongs" in the space

**Cons:**
- Requires photo editing (background removal)
- Harder with busy photos (like car interior)

---

## OPTION D: Blurred Background Match (Quick Fix)

**Concept:** Use a heavily blurred version of the scenic background BEHIND the photo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│    ▓▓                                                                   ▓▓   │
│    ▓▓   ┌─────────────────┐                                             ▓▓   │
│    ▓▓   │                 │                                             ▓▓   │
│    ▓▓   │  PHOTO WITH     │      MEET YOUR GUIDE                        ▓▓   │
│    ▓▓   │  SOFT BORDER    │                                             ▓▓   │
│    ▓▓   │  (rounded,      │      Coach Wayne Dawson                     ▓▓   │
│    ▓▓   │   glowing edge) │                                             ▓▓   │
│    ▓▓   │                 │      Transformational Coach | Speaker       ▓▓   │
│    ▓▓   └─────────────────┘                                             ▓▓   │
│    ▓▓                                                                   ▓▓   │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│                                                                             │
│    Background: Scenic image, HEAVILY blurred (30-50px) + dark overlay       │
│    Photo frame: Rounded corners, subtle gold border, soft shadow            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Treatment:**
- Keep the scenic background but **blur it heavily** (30-50px)
- Add **dark overlay** (70-80% opacity)
- Photo gets **rounded corners** and **subtle gold border**
- Soft **outer glow** on photo frame

**CSS Implementation:**
```css
.hero-bg {
  background-image: url('/images/sunset.jpg');
  background-size: cover;
  filter: blur(40px);
  transform: scale(1.1); /* Prevent blur edges showing */
}

.hero-overlay {
  background: rgba(10, 10, 10, 0.75);
}

.hero-photo {
  border-radius: 16px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 100px rgba(212, 175, 55, 0.1);
}
```

**Pros:**
- Quick to implement
- Keeps some visual warmth from scenic image
- Photo frame adds polish

**Cons:**
- Still has "photo on background" feel
- Background competes slightly for attention

---

## OPTION E: Full-Bleed Photo Hero (Dramatic)

**Concept:** Make Coach Wayne's photo THE background

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│    ████████████████████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░   │
│    ██                                        ██░░░░░░░░░░░░░░░░░░░░░░░░░   │
│    ██                                        ██░░░░░░░░░░░░░░░░░░░░░░░░░   │
│    ██         WAYNE'S PHOTO                  ██░░   MEET YOUR GUIDE   ░░   │
│    ██         (large, cropped)               ██░░                     ░░   │
│    ██                                      ▒▒▒▒░░   Coach Wayne       ░░   │
│    ██         Covers left 50-60%         ▒▒▒▒▒▒░░   Dawson            ░░   │
│    ██         of the screen            ▒▒▒▒▒▒▒▒░░                     ░░   │
│    ██                                ▒▒▒▒▒▒▒▒▒▒░░   Transformational  ░░   │
│    ██                              ▒▒▒▒▒▒▒▒▒▒▒▒░░   Coach | Speaker   ░░   │
│    ██                            ▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░                     ░░   │
│    ████████████████████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░   │
│                              ↑                                              │
│                        gradient fade                                        │
│                        to dark                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Treatment:**
- Photo is **large and cropped** (face/upper body focus)
- Takes up **left 50-60%** of viewport
- **Gradient fade** from photo → solid dark on right
- Text sits on **solid dark area** on right

**CSS Implementation:**
```css
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;
}

.hero-photo-side {
  background-image: 
    linear-gradient(to right, transparent 60%, #0A0A0A 100%),
    url('/images/wayne-portrait.jpg');
  background-size: cover;
  background-position: center top;
}

.hero-text-side {
  background-color: #0A0A0A;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
}
```

**Pros:**
- Very dramatic, memorable
- Photo is the hero, not decoration
- Professional, high-end feel

**Cons:**
- Requires HIGH QUALITY photo
- Won't work well with casual/busy photos
- Needs portrait orientation photo

---

## OPTION F: Circular Frame with Decorative Elements

**Concept:** Photo in a styled circular frame with decorative accents

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                    ╭──────────────────╮                                     │
│               ╭────│                  │────╮                                │
│               │    │   ┌──────────┐   │    │                                │
│               │    │   │          │   │    │      MEET YOUR GUIDE           │
│               │    │   │  WAYNE   │   │    │                                │
│           ────┤    │   │  PHOTO   │   │    ├────  Coach Wayne Dawson        │
│               │    │   │ (circle) │   │    │                                │
│               │    │   │          │   │    │      Transformational Coach    │
│               │    │   └──────────┘   │    │      Speaker | Author          │
│               ╰────│     ◦     ◦      │────╯                                │
│                    ╰──────────────────╯                                     │
│                           │                                                 │
│                     decorative                                              │
│                     ring + lines                                            │
│                                                                             │
│    Background: Solid #0A0A0A with subtle texture                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Treatment:**
- Photo cropped to **circle**
- **Decorative ring** around photo (gold gradient border)
- Subtle **decorative lines** extending from ring
- Clean **dark background** with texture

**CSS Implementation:**
```css
.hero-photo-container {
  position: relative;
}

.hero-photo {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid transparent;
  background: 
    linear-gradient(#0A0A0A, #0A0A0A) padding-box,
    linear-gradient(135deg, #D4AF37, #B8860B, #D4AF37) border-box;
}

.decorative-ring {
  position: absolute;
  inset: -20px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 50%;
}

.decorative-lines {
  /* SVG or pseudo-elements for extending lines */
}
```

**Pros:**
- Works with any photo (crops to face)
- Elegant, timeless look
- Decorative elements add brand polish

**Cons:**
- Smaller photo presence
- Less dramatic impact

---

## My Recommendation

### If Professional Photos Are Available:
**→ OPTION E (Full-Bleed Photo Hero)** or **OPTION A (Gradient Mask Blend)**

### If Using Current Casual Photo:
**→ OPTION A (Gradient Mask Blend)** with these adjustments:
1. Remove the scenic background entirely
2. Use solid dark (#0A0A0A) with subtle gold glow
3. Mask the photo edges so it fades naturally
4. Consider light color correction to warm up the photo

### Quick Improvement for Current Design:
**→ OPTION D (Blurred Background Match)**
- Blur the sunset to 40px
- Darken overlay to 80%
- Add rounded corners and gold border to photo
- This can be done in 30 minutes

---

## Revised Hero Section Design (Using Option A)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  VIP TRANSFORMATIVE LIVING               Home  About  Coaching  [Book Call] │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                                                                             │
│                                                          M E E T  Y O U R   │
│         ████████████████████▒▒▒▒░░░░░░░░░░░░░             G U I D E        │
│         ██                  ▒▒▒▒░░░░░░░░░░░░░                              │
│         ██                  ▒▒▒▒░░░░░░░░░░░░░                              │
│         ██    COACH         ▒▒▒▒░░░░░░░░░░░░░  Coach Wayne                 │
│         ██    WAYNE         ▒▒▒▒░░░░░░░░░░░░░  Dawson                      │
│         ██    PHOTO         ▒▒▒▒░░░░░░░░░░░░░                              │
│         ██                  ▒▒▒▒░░░░░░░░░░░░░  ─────────────────────       │
│         ██    ↓             ▒▒▒▒░░░░░░░░░░░░░                              │
│         ██    gradient      ▒▒▒▒░░░░░░░░░░░░░  Transformational Coach      │
│         ██    fade →        ▒▒▒▒░░░░░░░░░░░░░  Speaker | Author            │
│         ██                ▒▒▒▒▒▒░░░░░░░░░░░░░                              │
│         ████████████████▒▒▒▒▒▒▒▒░░░░░░░░░░░░░  25+ Years Guiding Men       │
│              ↓          ▒▒▒▒▒▒▒▒░░░░░░░░░░░░░  Through Life's Pivotal      │
│         gradient fade   ▒▒▒▒▒▒▒▒░░░░░░░░░░░░░  Moments                     │
│         (bottom)        ▒▒▒▒▒▒▒▒░░░░░░░░░░░░░                              │
│                                                                             │
│                                                [Read My Story ↓]            │
│                                                                             │
│─────────────────────────────────────────────────────────────────────────────│
│                                                                             │
│    Background: #0A0A0A with subtle radial gold glow behind photo area       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Code (Option A)

### HTML Structure
```jsx
<section className="hero-about">
  <div className="hero-content">
    <div className="hero-photo-wrapper">
      <img 
        src="/images/coach-wayne.jpg" 
        alt="Coach Wayne Dawson"
        className="hero-photo"
      />
    </div>
    <div className="hero-text">
      <span className="overline">MEET YOUR GUIDE</span>
      <h1>Coach Wayne Dawson</h1>
      <div className="title-divider"></div>
      <p className="credentials">
        Transformational Coach <span>|</span> Speaker <span>|</span> Author
      </p>
      <p className="tagline">
        25+ Years Guiding Men Through Life's Pivotal Moments
      </p>
      <a href="#story" className="scroll-cta">
        Read My Story <span>↓</span>
      </a>
    </div>
  </div>
  
  {/* Background glow */}
  <div className="hero-glow"></div>
</section>
```

### CSS
```css
.hero-about {
  position: relative;
  min-height: 90vh;
  background-color: #0A0A0A;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Subtle gold glow behind photo area */
.hero-glow {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 4rem;
  align-items: center;
}

.hero-photo-wrapper {
  position: relative;
}

.hero-photo {
  width: 100%;
  max-width: 450px;
  height: auto;
  object-fit: cover;
  
  /* THE KEY: Gradient mask for seamless blend */
  -webkit-mask-image: 
    linear-gradient(to right, black 0%, black 70%, transparent 100%),
    linear-gradient(to bottom, black 0%, black 80%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image: 
    linear-gradient(to right, black 0%, black 70%, transparent 100%),
    linear-gradient(to bottom, black 0%, black 80%, transparent 100%);
  mask-composite: intersect;
}

.hero-text {
  color: #F5F5F5;
}

.overline {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #D4AF37;
  text-transform: uppercase;
  display: block;
  margin-bottom: 1rem;
}

.hero-text h1 {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.title-divider {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #D4AF37, transparent);
  margin-bottom: 1.5rem;
}

.credentials {
  font-size: 1.25rem;
  color: #9CA3AF;
  margin-bottom: 0.5rem;
}

.credentials span {
  color: #D4AF37;
  margin: 0 0.5rem;
}

.tagline {
  font-size: 1.1rem;
  color: #9CA3AF;
  margin-bottom: 2rem;
}

.scroll-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #D4AF37;
  text-decoration: none;
  font-weight: 500;
  transition: gap 0.3s ease;
}

.scroll-cta:hover {
  gap: 0.75rem;
}

.scroll-cta span {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

/* Mobile */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 2rem;
  }
  
  .hero-photo-wrapper {
    order: -1;
    margin-bottom: 2rem;
  }
  
  .hero-photo {
    max-width: 280px;
    margin: 0 auto;
    -webkit-mask-image: radial-gradient(
      ellipse at center,
      black 50%,
      transparent 80%
    );
  }
  
  .title-divider {
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-text h1 {
    font-size: 2.5rem;
  }
}
```

---

## Photo Editing Recommendations

If keeping the current photo, apply these adjustments:

1. **Color temperature:** Warm it up slightly (+10-15)
2. **Shadows:** Lift slightly to see more face detail
3. **Contrast:** Reduce slightly to soften harsh car interior shadows
4. **Vignette:** Add subtle dark vignette around edges
5. **Crop:** Tighter on face/upper body, less car interior visible

**Quick Photoshop/Lightroom settings:**
```
Temperature: +15
Tint: +5
Exposure: +0.2
Contrast: -10
Highlights: -20
Shadows: +30
Vignette: -25
```

---

## Alternative: Replace Background in Photo

If you want to keep the casual photo but make it more professional:

1. Use **remove.bg** or Photoshop to remove car interior
2. Place Wayne on **solid dark background** (#0A0A0A)
3. Add subtle **rim lighting effect** (gold edge light)
4. Apply gradient fade as described above

This turns a casual selfie into a more polished, on-brand image.

---

## Summary

| Option | Effort | Impact | Best For |
|--------|--------|--------|----------|
| A. Gradient Mask | Low | High | Any photo |
| B. Duotone | Low | Medium | Artistic feel |
| C. Cutout | Medium | High | Clean photos |
| D. Blurred BG | Low | Medium | Quick fix |
| E. Full-Bleed | Low | Highest | Pro photos only |
| F. Circular Frame | Medium | Medium | Headshots |

**My recommendation:** Start with **Option A (Gradient Mask)** on a **solid dark background**. It's the fastest path to a polished result with your current assets.

If Coach Wayne can provide professional photos later, upgrade to **Option E (Full-Bleed)** for maximum impact.

---

## Questions for You

1. Does Coach Wayne have any other photos we could use (studio shots, speaking photos)?
2. Would you like me to create a visual mockup of Option A?
3. Is editing the current photo (warming, cropping) something you can do, or should I provide more specific guidance?
