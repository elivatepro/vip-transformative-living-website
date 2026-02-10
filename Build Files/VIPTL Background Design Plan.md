# VIP Transformative Living
## Background Design Plan

**Theme:** Dark mode with high-contrast section alternation  
**Primary Background:** #0A0A0A (deep charcoal)  
**Secondary Background:** #141414 (elevated surface)  
**Accent:** Subtle gold glows, noise textures, gradient fades  
**Photo Treatment:** Heavy blur/fade, photo bleeds from edges  

---

## Available Assets

| Asset Type | Quantity | Notes |
|------------|----------|-------|
| Coach Wayne pro photos | 5 | Use for About, CTA sections |
| Video clip | 1 | Landscape — Hero only |
| Landscape images | Multiple | Skylines, nature — ambient backgrounds |
| Textures | None | Will generate noise/grain programmatically |

---

## Background Types Reference

### Type A: Solid Dark
```css
background: #0A0A0A;
```
Clean, minimal, lets content breathe.

### Type B: Elevated Surface
```css
background: #141414;
```
Slightly lighter, creates depth/layering.

### Type C: Noise Texture
```css
background: #0A0A0A;
/* Overlay with CSS noise or SVG texture at 3-5% opacity */
```
Adds subtle depth without distraction.

### Type D: Gold Glow
```css
background: #0A0A0A;
/* Radial gradient: gold at center, fading to transparent */
background-image: radial-gradient(
  ellipse at center,
  rgba(212, 175, 55, 0.08) 0%,
  transparent 60%
);
```
Subtle warmth behind key elements.

### Type E: Photo Fade (from edge)
```css
/* Photo positioned to one side, fading into solid dark */
background: linear-gradient(to right, transparent 0%, #0A0A0A 50%),
            url('photo.jpg');
background-position: left center;
```
Photo visible on edge, text area remains clean.

### Type F: Photo Overlay (full bleed)
```css
background: linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.85)),
            url('photo.jpg');
background-size: cover;
filter: blur(2px); /* optional subtle blur on image */
```
Full photo dimmed heavily, creates atmosphere.

### Type G: Gradient Accent
```css
/* Gold gradient line or glow at section edge */
background: #0A0A0A;
border-top: 1px solid transparent;
border-image: linear-gradient(90deg, transparent, #D4AF37, transparent) 1;
```
Subtle gold separator between sections.

---

# HOME PAGE — Section Backgrounds

```
┌─────────────────────────────────────────────────────────────────┐
│ SECTION                │ BACKGROUND              │ MOBILE       │
├─────────────────────────────────────────────────────────────────┤
│ 1. Hero                │ VIDEO + dark overlay    │ Photo + overlay │
│ 2. Problem/Pain Points │ Solid #0A0A0A + noise   │ Same         │
│ 3. VIP Framework       │ #141414 + gold glow     │ Same         │
│ 4. About Teaser        │ Photo fade (Wayne)      │ Photo top, text below │
│ 5. Testimonials        │ Solid #0A0A0A           │ Same         │
│ 6. Services Overview   │ #141414 + subtle noise  │ Same         │
│ 7. Coaching Packages   │ Solid #0A0A0A           │ Same         │
│ 8. Newsletter Signup   │ Skyline photo fade      │ Gradient only │
│ 9. Recent Articles     │ #141414                 │ Same         │
│ 10. Final CTA          │ Wayne photo (blurred)   │ Gold glow only │
│ Footer                 │ Solid #0A0A0A           │ Same         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. HERO
**Background:** Video with dark overlay (70% opacity)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│    ▓▓                                                      ▓▓   │
│    ▓▓   VIDEO OF COACH WAYNE (looping, muted)              ▓▓   │
│    ▓▓   with dark gradient overlay                         ▓▓   │
│    ▓▓                                                      ▓▓   │
│    ▓▓        [ HEADLINE TEXT ]                             ▓▓   │
│    ▓▓        [ Subheadline ]                               ▓▓   │
│    ▓▓        [ CTA Button ]                                ▓▓   │
│    ▓▓                                                      ▓▓   │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│                                                                 │
│    Gradient: darker at bottom for text readability              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.hero {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  inset: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 10, 0.5) 0%,
    rgba(10, 10, 10, 0.7) 50%,
    rgba(10, 10, 10, 0.9) 100%
  );
}
```

**Mobile:** Replace video with static photo (first frame or best still) + same overlay

---

## 2. PROBLEM / PAIN POINTS
**Background:** Solid #0A0A0A with subtle noise texture

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│    ░░                                                      ░░   │
│    ░░   Solid dark with 3% noise grain overlay             ░░   │
│    ░░   Creates subtle texture without distraction         ░░   │
│    ░░                                                      ░░   │
│    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.problem-section {
  background-color: #0A0A0A;
  position: relative;
}

.problem-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/textures/noise.png');
  opacity: 0.03;
  pointer-events: none;
}
```

**Mobile:** Same

---

## 3. VIP FRAMEWORK
**Background:** #141414 with centered gold glow

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                         ∗∗∗∗∗∗∗∗∗                               │
│                    ∗∗∗∗    ◉    ∗∗∗∗                            │
│                 ∗∗∗   Gold glow    ∗∗∗                          │
│                ∗∗    behind the     ∗∗                          │
│                ∗∗   V-I-P diagram   ∗∗                          │
│                 ∗∗∗               ∗∗∗                           │
│                    ∗∗∗∗       ∗∗∗∗                              │
│                         ∗∗∗∗∗∗∗∗∗                               │
│                                                                 │
│    Surface: #141414 (elevated from hero)                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.vip-framework {
  background-color: #141414;
  position: relative;
}

.vip-framework::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.1) 0%,
    rgba(212, 175, 55, 0.05) 30%,
    transparent 70%
  );
  pointer-events: none;
}
```

**Mobile:** Same, glow scales down

---

## 4. ABOUT TEASER (Coach Wayne Photo)
**Background:** Photo fades from left into solid dark

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│    ██          ░░░░░                                       ░░   │
│    ██  WAYNE   ░░░░░   "I've Been Where You Are."          ░░   │
│    ██  PHOTO   ░░░░░                                       ░░   │
│    ██          ░░░░░   For 25+ years I've walked           ░░   │
│    ██          ░░░░░   alongside men through...            ░░   │
│    ██          ░░░░░                                       ░░   │
│    ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│                                                                 │
│    Photo on left 40%, fades into #0A0A0A                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.about-teaser {
  background-color: #0A0A0A;
  background-image: 
    linear-gradient(to right, transparent 0%, transparent 30%, #0A0A0A 60%),
    url('/images/wayne-portrait-1.jpg');
  background-size: 50% 100%, 50% auto;
  background-position: left center, left center;
  background-repeat: no-repeat;
}
```

**Mobile:** Photo at top (30vh height), fades to bottom, text below on solid

```css
@media (max-width: 768px) {
  .about-teaser {
    background-image: 
      linear-gradient(to bottom, transparent 0%, #0A0A0A 80%),
      url('/images/wayne-portrait-1.jpg');
    background-size: 100% 40vh, 100% 40vh;
    background-position: top center;
  }
}
```

---

## 5. TESTIMONIALS
**Background:** Solid #0A0A0A (clean, lets video thumbnails stand out)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    Pure solid #0A0A0A                                           │
│                                                                 │
│    Testimonial cards have #141414 background                    │
│    Video thumbnails pop against the dark                        │
│                                                                 │
│    Gold accent on play button and card borders on hover         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.testimonials {
  background-color: #0A0A0A;
}

.testimonial-card {
  background-color: #141414;
  border: 1px solid #2A2A2A;
  transition: border-color 0.3s ease;
}

.testimonial-card:hover {
  border-color: #D4AF37;
}
```

**Mobile:** Same

---

## 6. SERVICES OVERVIEW
**Background:** #141414 with subtle noise texture

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   │
│    ▒▒                                                      ▒▒   │
│    ▒▒   Elevated surface #141414                           ▒▒   │
│    ▒▒   Creates contrast from sections above/below         ▒▒   │
│    ▒▒   Subtle 2% noise overlay                            ▒▒   │
│    ▒▒                                                      ▒▒   │
│    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.services-overview {
  background-color: #141414;
  position: relative;
}

.services-overview::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/textures/noise.png');
  opacity: 0.02;
  pointer-events: none;
}
```

**Mobile:** Same

---

## 7. COACHING PACKAGES
**Background:** Solid #0A0A0A

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    Clean solid #0A0A0A                                          │
│                                                                 │
│    Package cards have:                                          │
│    - #141414 background                                         │
│    - Border glow on hover                                       │
│    - Gold badge for "Most Popular"                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.coaching-packages {
  background-color: #0A0A0A;
}

.package-card {
  background-color: #141414;
  border: 1px solid #2A2A2A;
}

.package-card.featured {
  border-color: #D4AF37;
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.1);
}
```

**Mobile:** Same, cards stack vertically

---

## 8. NEWSLETTER SIGNUP
**Background:** Landscape/skyline photo fading from right

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████████   │
│    ░░                                       ░░░█            █   │
│    ░░   Weekly Wisdom Newsletter            ░░░█  SKYLINE   █   │
│    ░░                                       ░░░█   PHOTO    █   │
│    ░░   [Email input] [Subscribe]           ░░░█            █   │
│    ░░                                       ░░░█            █   │
│    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████████   │
│                                                                 │
│    Reverse of About section — photo on RIGHT, fades left        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.newsletter-signup {
  background-color: #0A0A0A;
  background-image: 
    linear-gradient(to left, transparent 0%, transparent 30%, #0A0A0A 60%),
    url('/images/skyline-dark.jpg');
  background-size: 100%, 60% auto;
  background-position: center, right center;
  background-repeat: no-repeat;
}
```

**Mobile:** Solid #0A0A0A with subtle gold glow instead (no photo)

```css
@media (max-width: 768px) {
  .newsletter-signup {
    background-image: radial-gradient(
      ellipse at top right,
      rgba(212, 175, 55, 0.08) 0%,
      transparent 50%
    );
  }
}
```

---

## 9. RECENT ARTICLES
**Background:** #141414 (elevated surface)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    Elevated #141414                                             │
│                                                                 │
│    Article cards: #1F1F1F (even lighter surface)                │
│    Creates depth hierarchy                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.recent-articles {
  background-color: #141414;
}

.article-card {
  background-color: #1F1F1F;
  border: 1px solid #2A2A2A;
}
```

**Mobile:** Same

---

## 10. FINAL CTA
**Background:** Wayne photo, heavily blurred and darkened

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│    ▓▓                                                      ▓▓   │
│    ▓▓   Wayne's photo — heavily blurred (10-15px)          ▓▓   │
│    ▓▓   Dark overlay (80%)                                 ▓▓   │
│    ▓▓   Creates atmospheric background                     ▓▓   │
│    ▓▓                                                      ▓▓   │
│    ▓▓        "Your Transformation Starts Now"              ▓▓   │
│    ▓▓        [Take Assessment]  [Book a Call]              ▓▓   │
│    ▓▓                                                      ▓▓   │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│                                                                 │
│    Gold glow behind CTA buttons                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.final-cta {
  position: relative;
  overflow: hidden;
}

.final-cta-bg {
  position: absolute;
  inset: 0;
  background-image: url('/images/wayne-portrait-2.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(12px);
  transform: scale(1.1); /* Prevent blur edge artifacts */
}

.final-cta-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.85);
}

.final-cta-content {
  position: relative;
  z-index: 1;
}

.cta-glow {
  box-shadow: 0 0 60px rgba(212, 175, 55, 0.2);
}
```

**Mobile:** Gold glow only, no photo (simpler, faster)

```css
@media (max-width: 768px) {
  .final-cta {
    background-color: #0A0A0A;
    background-image: radial-gradient(
      ellipse at center,
      rgba(212, 175, 55, 0.1) 0%,
      transparent 60%
    );
  }
  
  .final-cta-bg,
  .final-cta-overlay {
    display: none;
  }
}
```

---

## FOOTER
**Background:** Solid #0A0A0A with gold border-top

```css
footer {
  background-color: #0A0A0A;
  border-top: 1px solid #2A2A2A;
}

/* Optional: subtle gold gradient line */
footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
}
```

---

# OTHER PAGES — Background Plans

## ABOUT VIP TL PAGE

| Section | Background | Mobile |
|---------|------------|--------|
| Hero | #0A0A0A + gold glow center | Same |
| Mission | #141414 | Same |
| Approach | #0A0A0A + noise | Same |
| Who We Serve | #141414 + gold glow | Same |
| Results | #0A0A0A | Same |
| CTA | Nature photo fade (bottom edge) | Gold glow only |

---

## ABOUT COACH WAYNE PAGE

| Section | Background | Mobile |
|---------|------------|--------|
| Hero | Wayne photo fade from left (50%) | Photo top, fades down |
| My Story | #141414 | Same |
| Why I Do This | #0A0A0A + subtle noise | Same |
| Credentials | #141414 | Same |
| Personal | #0A0A0A | Same |
| Philosophy | #141414 + gold glow | Same |
| CTA | #0A0A0A + gold glow | Same |

---

## COACHING OVERVIEW PAGE

| Section | Background | Mobile |
|---------|------------|--------|
| Hero | #0A0A0A + gold glow top | Same |
| How It Works | #141414 | Same |
| Packages | #0A0A0A | Same |
| Comparison Table | #141414 | Same |
| FAQ | #0A0A0A | Same |
| CTA | Skyline photo fade | Gold glow only |

---

## INDIVIDUAL PACKAGE PAGES (Silver, Gold, Platinum)

| Section | Background | Mobile |
|---------|------------|--------|
| Hero | #0A0A0A + package accent glow* | Same |
| What's Included | #141414 | Same |
| The Process | #0A0A0A + noise | Same |
| Who It's For | #141414 | Same |
| Investment | #0A0A0A + gold glow | Same |
| FAQ | #141414 | Same |
| CTA | Wayne photo fade | Gold glow only |

*Package accent colors:
- Silver: subtle cool gray glow
- Gold: gold glow (standard)
- Platinum: subtle white/silver shimmer

---

## SPEAKING PAGE

| Section | Background | Mobile |
|---------|------------|--------|
| Hero | Stage/speaking photo fade from right | Photo top |
| What Wayne Brings | #141414 | Same |
| Signature Talks | #0A0A0A | Same |
| Custom Programs | #141414 + noise | Same |
| Testimonials | #0A0A0A | Same |
| Booking | #141414 + gold glow | Same |

---

## RESOURCES PAGE

| Section | Background | Mobile |
|---------|------------|--------|
| Hero | #0A0A0A + gold glow | Same |
| Self-Assessment (featured) | #141414 + prominent gold glow | Same |
| E-Book | #0A0A0A | Same |
| Video Course | #141414 | Same |
| Newsletter Archive | #0A0A0A | Same |

---

## CONTACT PAGE

| Section | Background | Mobile |
|---------|------------|--------|
| Hero | #0A0A0A | Same |
| Contact Options | #141414 | Same |
| Direct Info | #0A0A0A | Same |
| FAQ | #141414 | Same |
| Map (optional) | Nature photo fade from bottom | Solid #0A0A0A |

---

## NEWSLETTER ARCHIVE PAGE

| Section | Background | Mobile |
|---------|------------|--------|
| Hero | #0A0A0A + gold glow | Same |
| Filter/Search | #141414 (sticky bar) | Same |
| Article Grid | #0A0A0A | Same |

---

## INDIVIDUAL ARTICLE PAGE

| Section | Background | Mobile |
|---------|------------|--------|
| Hero/Header | #0A0A0A | Same |
| Article Content | #141414 (reading surface) | Same |
| Related Articles | #0A0A0A | Same |
| Newsletter CTA | Gold glow | Same |
| Final CTA | #141414 | Same |

---

## BOOK A CALL PAGE

| Section | Background | Mobile |
|---------|------------|--------|
| Hero | #0A0A0A + gold glow | Same |
| What to Expect | #141414 | Same |
| Calendar Widget | #0A0A0A (clean for embed) | Same |
| Testimonials | #141414 | Same |

---

# Technical Implementation

## Noise Texture Generation

Create a 200x200px PNG noise texture or use CSS:

```css
/* SVG noise filter */
.noise-texture {
  filter: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
}
```

Or download a noise PNG and use:
```css
background-image: url('/textures/noise.png');
opacity: 0.03;
```

---

## Tailwind Custom Classes

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'gold-glow': 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, transparent 60%)',
        'gold-glow-subtle': 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.05) 0%, transparent 50%)',
        'noise': "url('/textures/noise.png')",
      },
    },
  },
}
```

Usage:
```html
<section class="bg-background bg-gold-glow">
<section class="bg-surface relative before:absolute before:inset-0 before:bg-noise before:opacity-[0.03]">
```

---

## Photo Asset Requirements

Request from Coach Wayne:

| Photo | Usage | Orientation | Treatment |
|-------|-------|-------------|-----------|
| Portrait 1 | About Teaser, About page hero | Portrait or square | Warm, approachable |
| Portrait 2 | Final CTA backgrounds | Any | Will be blurred heavily |
| Portrait 3 | Speaking page | Landscape (on stage) | Action shot |
| Headshot | Contact, small UI elements | Square | Clean background |
| Lifestyle | General backgrounds | Landscape | Can be slightly out of focus |

**Skyline/Nature photos:**
- Should be relatively dark or have dark tones
- High resolution (min 1920px wide)
- Avoid bright skies or high-contrast scenes

---

## Performance Notes

1. **Lazy load background images** on sections below the fold
2. **Use WebP format** with JPEG fallback for photo backgrounds
3. **Compress aggressively** — blurred/faded photos can handle more compression
4. **Mobile: prefer CSS gradients** over photos when possible
5. **Preload hero video poster** for instant visual

```html
<link rel="preload" as="image" href="/images/hero-poster.webp">
```

---

## Visual Rhythm Summary

```
HOME PAGE FLOW:

[HERO]          → Video background (dramatic)
    ↓
[PROBLEM]       → Solid dark + noise (calm)
    ↓
[VIP]           → Elevated + gold glow (highlight)
    ↓
[ABOUT TEASER]  → Photo fade (personal)
    ↓
[TESTIMONIALS]  → Solid dark (clean for videos)
    ↓
[SERVICES]      → Elevated + noise (texture)
    ↓
[PACKAGES]      → Solid dark (focus on cards)
    ↓
[NEWSLETTER]    → Photo fade (break pattern)
    ↓
[ARTICLES]      → Elevated (card surface)
    ↓
[FINAL CTA]     → Blurred photo + gold glow (dramatic close)
    ↓
[FOOTER]        → Solid dark (grounding)
```

This alternation creates visual breathing room while maintaining the dark luxury aesthetic.

---

*End of Background Design Plan*
