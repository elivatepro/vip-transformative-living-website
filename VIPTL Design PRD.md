# Design PRD
## VIP Transformative Living — Visual Design System & UI/UX Specifications

**Version:** 1.0  
**Date:** January 2026

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Component Specifications](#5-component-specifications)
6. [Animation & Motion](#6-animation--motion)
7. [Imagery Guidelines](#7-imagery-guidelines)
8. [Responsive Design](#8-responsive-design)
9. [Accessibility](#9-accessibility-wcag-21-aa)

---

## 1. Design Philosophy

### 1.1 Brand Essence

The design must communicate: **Luxury, Transformation, Authority, Warmth, and Trust.** The visual language should feel premium yet approachable — like a high-end private club that welcomes you personally.

### 1.2 Design Principles

1. **Dark Minimalism** — Charcoal backgrounds with strategic gold accents that shimmer
2. **Bold Typography** — Large, confident headlines that command attention
3. **Video-First** — Moving imagery to convey energy and transformation
4. **Generous Spacing** — Let content breathe — luxury needs whitespace
5. **Photography Forward** — Coach Wayne's professional images, large and impactful
6. **Subtle Motion** — Fade-ins, parallax, smooth scroll, gold shimmer effects

### 1.3 Inspiration References

- **obys.agency** — Award-winning dark mode portfolio
- **eclipsexperience.com** — Black + gold theatrical luxury
- **willventures.co** — Minimalist dark VC site with hidden navigation
- **linear.app** — SaaS dark mode excellence

---

## 2. Color System

### 2.1 Dark Mode (Primary)

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#0A0A0A` | Main page background (NOT pure black) |
| `surface` | `#141414` | Cards, elevated surfaces |
| `surface-elevated` | `#1F1F1F` | Modals, dropdowns, hover states |
| `border` | `#2A2A2A` | Subtle borders, dividers |
| `text-primary` | `#F5F5F5` | Headings, primary text (off-white) |
| `text-secondary` | `#9CA3AF` | Body text, muted content |
| `gold-primary` | `#C5A059` | Primary accent (Metallic Gold) |
| `gold-shimmer` | `#F4E285` | High-light gold for shimmer/gradient |
| `gold-hover` | `#AD8B49` | Deep gold for hover states |

### 2.2 Light Mode (Secondary)

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#FAFAFA` | Main page background |
| `surface` | `#FFFFFF` | Cards, elevated surfaces |
| `text-primary` | `#1A1A1A` | Headings, primary text |
| `text-secondary` | `#6B7280` | Body text, muted content |
| `gold-primary` | `#B8860B` | Darker gold for light backgrounds |

### 2.3 Gold Shimmer Effect (CSS)

```css
.gold-shimmer {
  background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%);
  background-size: 200% 200%;
  animation: shimmer 4s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
```

### 2.4 CSS Variables Setup

```css
:root {
  --background: #0A0A0A;
  --surface: #141414;
  --surface-elevated: #1F1F1F;
  --border: #2A2A2A;
  --text-primary: #F5F5F5;
  --text-secondary: #9CA3AF;
  --gold: #D4AF37;
  --gold-shimmer: #FFD700;
  --gold-hover: #CD7F32;
}

[data-theme='light'] {
  --background: #FAFAFA;
  --surface: #FFFFFF;
  --surface-elevated: #F5F5F5;
  --border: #E5E7EB;
  --text-primary: #1A1A1A;
  --text-secondary: #6B7280;
  --gold: #B8860B;
  --gold-shimmer: #D4AF37;
  --gold-hover: #996515;
}
```

---

## 3. Typography

### 3.1 Font Families

| Use | Font | Fallback | Notes |
|-----|------|----------|-------|
| **Headlines** | Playfair Display | Georgia, serif | Classic, authoritative, luxury feel |
| **Alternative** | Cormorant Garamond | Georgia, serif | More elegant, slightly softer |
| **Body** | Inter | system-ui, sans-serif | Clean, modern, excellent readability |
| **Alternative** | DM Sans | system-ui, sans-serif | Geometric, slightly warmer |

### 3.2 Type Scale

| Element | Size | Weight | Line Height | Notes |
|---------|------|--------|-------------|-------|
| Hero Heading | 72px / 4.5rem | 700 (Bold) | 1.1 | Desktop only |
| H1 | 48px / 3rem | 700 (Bold) | 1.2 | |
| H2 | 36px / 2.25rem | 600 (Semi) | 1.25 | |
| H3 | 28px / 1.75rem | 600 (Semi) | 1.3 | |
| H4 | 24px / 1.5rem | 600 (Semi) | 1.35 | |
| Body Large | 20px / 1.25rem | 400 (Regular) | 1.6 | Lead paragraphs |
| Body | 16px / 1rem | 400 (Regular) | 1.6 | Default text |
| Body Small | 14px / 0.875rem | 400 (Regular) | 1.5 | Captions |
| Label | 14px / 0.875rem | 500 (Medium) | 1.4 | Form labels, buttons |
| Overline | 12px / 0.75rem | 600 + UPPERCASE | 1.2 | Tracking: 0.1em |

### 3.3 Mobile Type Scale

| Element | Mobile Size |
|---------|-------------|
| Hero Heading | 40px / 2.5rem |
| H1 | 32px / 2rem |
| H2 | 28px / 1.75rem |
| H3 | 24px / 1.5rem |
| Body | 16px / 1rem |

---

## 4. Spacing & Layout

### 4.1 Spacing Scale (8px base)

```
xs:  4px   (0.25rem)
sm:  8px   (0.5rem)
md:  16px  (1rem)
lg:  24px  (1.5rem)
xl:  32px  (2rem)
2xl: 48px  (3rem)
3xl: 64px  (4rem)
4xl: 96px  (6rem)
5xl: 128px (8rem)
```

### 4.2 Container Widths

| Container | Width | Use |
|-----------|-------|-----|
| Max content | 1280px | Standard page content |
| Narrow | 768px | Text-heavy content (articles, about) |
| Wide | 1440px | Full-bleed sections |

### 4.3 Side Padding

| Breakpoint | Padding |
|------------|---------|
| Mobile | 24px |
| Tablet | 48px |
| Desktop | 64px |

### 4.4 Section Spacing

| Context | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Between major sections | 128px | 96px | 64px |
| Between sub-sections | 64px | 48px | 32px |
| Between elements | 24px | 24px | 16px |

### 4.5 Grid System

| Breakpoint | Columns | Gutter |
|------------|---------|--------|
| Mobile (<640px) | 4 | 16px |
| Tablet (640-1024px) | 8 | 24px |
| Desktop (>1024px) | 12 | 24px |

---

## 5. Component Specifications

### 5.1 Primary Button

```css
.btn-primary {
  /* Background: Gold gradient with shimmer */
  background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%);
  background-size: 200% 200%;
  
  /* Text */
  color: #0A0A0A;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  /* Sizing */
  padding: 16px 32px;
  border-radius: 4px; /* or 0px for sharp luxury */
  
  /* Hover */
  transition: all 300ms ease-out;
}

.btn-primary:hover {
  transform: scale(1.02);
  filter: brightness(1.1);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
}
```

### 5.2 Secondary Button

```css
.btn-secondary {
  background: transparent;
  border: 1px solid #D4AF37;
  color: #D4AF37;
  /* Same text styling as primary */
}

.btn-secondary:hover {
  background: rgba(212, 175, 55, 0.1);
}
```

### 5.3 Card Component

```css
.card {
  background: #141414;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  padding: 32px;
  transition: all 300ms ease-out;
}

.card:hover {
  border-color: #D4AF37;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
```

### 5.4 Video Player

| Element | Specification |
|---------|---------------|
| Controls | Custom with gold accent color |
| Autoplay | On scroll into view (muted by default) |
| Hover | Testimonial thumbnails play on mouseenter |
| Play button | Gold circle (#D4AF37) with white triangle |
| Progress bar | Gold fill on dark track (#2A2A2A) |
| Border radius | 8px |

### 5.5 Navigation

| State | Specification |
|-------|---------------|
| Default | Fixed, transparent background |
| Scrolled | Solid #0A0A0A with subtle shadow |
| Layout | Logo left, nav links center, CTA button right |
| Mobile | Hamburger menu → full-screen overlay |
| Active link | Gold underline (#D4AF37) |
| Theme toggle | Sun/moon icon in nav |

### 5.6 Form Inputs

```css
.input {
  background: #141414;
  border: 1px solid #2A2A2A;
  border-radius: 4px;
  padding: 16px;
  color: #F5F5F5;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  outline: none;
  border-color: #D4AF37;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.input::placeholder {
  color: #6B7280;
}
```

---

## 6. Animation & Motion

### 6.1 Principles

- Subtle and purposeful — never distracting
- Enhance perceived performance
- Guide user attention
- Respect reduced-motion preferences

### 6.2 Timing Functions

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```

### 6.3 Scroll Animations

| Animation | Specification |
|-----------|---------------|
| Fade-in-up | Elements fade in and slide up 20px on scroll into view |
| Stagger | Sequential elements animate with 100ms delay each |
| Parallax | Hero background moves at 0.5x scroll speed |
| Duration | 600ms |
| Easing | cubic-bezier(0.16, 1, 0.3, 1) |

### 6.4 Micro-interactions

| Interaction | Animation |
|-------------|-----------|
| Button hover | Scale 1.02 + glow (200ms) |
| Link hover | Gold underline slides in from left |
| Card hover | Subtle lift (translateY -4px) + border glow |
| Form focus | Gold border with subtle pulse |

### 6.5 Page Transitions

| Transition | Specification |
|------------|---------------|
| Page change | Fade (300ms) |
| Anchor scroll | Smooth scroll |
| Loading | Gold shimmer bar at top |

### 6.6 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Imagery Guidelines

### 7.1 Photography Style (Recommended)

- **Coach Wayne:** Use specific provided assets like `new mr wayne.jpeg` and `Mr Wayne Middle of street at night.jpeg`.
- **Landscapes:** Use serene, transformative nature shots for backgrounds (e.g., `Serene Alpine Meadow Foggy Mountain.jpg`).
- **Lighting:** Warm, confident, high contrast.

### 7.2 Image Treatment

- **Logos:** Use `VIP Transformative Living Logo Gold Texture.png` for primary branding to ensure the correct gold texture.
- **Backgrounds:** Dark overlays (opacity 60-80%) on landscape images to ensure text readability.

### 7.3 Image Specifications

| Context | Aspect Ratio | Max Width |
|---------|--------------|-----------|
| Hero | 16:9 | 1920px |
| Testimonial photo | 1:1 | 400px |
| Newsletter thumbnail | 16:9 | 800px |
| Coach profile | 3:4 | 600px |

### 7.4 Video Specifications

| Attribute | Specification |
|-----------|---------------|
| Format | MP4 (H.264) with WebM fallback |
| Resolution | 1080p max, with 720p and 480p variants |
| Compression | Optimized for web (target < 5MB for testimonials) |
| Thumbnail | Auto-generated with custom poster option |
| Autoplay | Muted, playsinline attribute |

---

## 8. Responsive Design

### 8.1 Breakpoints

| Name | Width | Columns |
|------|-------|---------|
| Mobile | < 640px | 4 |
| Tablet | 640px - 1024px | 8 |
| Desktop | 1024px - 1280px | 12 |
| Wide | > 1280px | 12 (max-width: 1280px) |

### 8.2 Tailwind Config

```javascript
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
  },
}
```

### 8.3 Mobile-First Approach

> **Design must be EQUALLY PERFECT on mobile and desktop. Mobile is not an afterthought.**

| Consideration | Specification |
|---------------|---------------|
| Touch targets | Minimum 44x44px |
| Text | Minimum 16px to prevent zoom |
| Videos | Full-width with playsinline attribute |
| Navigation | Bottom-anchored CTA for easy thumb reach |
| Forms | Large inputs, clear labels |

### 8.4 Responsive Patterns

| Element | Mobile | Desktop |
|---------|--------|---------|
| Hero headline | 40px, centered | 72px, left-aligned |
| Navigation | Hamburger menu | Horizontal links |
| Testimonials | Vertical scroll | Horizontal carousel |
| Pricing cards | Stacked | Side-by-side |
| Footer | Stacked columns | 4-column grid |

---

## 9. Accessibility (WCAG 2.1 AA)

### 9.1 Color Contrast

| Combination | Ratio | Status |
|-------------|-------|--------|
| Gold on dark (#D4AF37 on #0A0A0A) | 8.5:1 | ✅ Pass |
| Off-white on dark (#F5F5F5 on #0A0A0A) | 17.4:1 | ✅ Pass |
| Muted text on dark (#9CA3AF on #0A0A0A) | 7.1:1 | ✅ Pass |
| Dark text on light (#1A1A1A on #FAFAFA) | 17.9:1 | ✅ Pass |

### 9.2 Minimum Requirements

- **Normal text:** 4.5:1 contrast ratio
- **Large text (24px+):** 3:1 contrast ratio
- **UI components:** 3:1 contrast ratio

### 9.3 Keyboard Navigation

- All interactive elements focusable via Tab
- Visible focus indicator (gold outline, 2px)
- Skip-to-content link at top
- Logical tab order (left-to-right, top-to-bottom)
- Escape key closes modals

### 9.4 Focus Styles

```css
:focus-visible {
  outline: 2px solid #D4AF37;
  outline-offset: 2px;
}

/* Remove for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 9.5 Screen Readers

- Semantic HTML (proper heading hierarchy)
- ARIA labels for interactive elements
- Alt text for all images
- Video captions/transcripts available
- Live regions for dynamic content

### 9.6 Motion Preferences

- Respect `prefers-reduced-motion` media query
- No auto-playing animations that can't be paused
- Videos default to paused with user-initiated play
- Provide pause controls for all animations
