# VIP Transformative Living
## Newsletter Page — Complete Design Plan

**Page URL:** `/newsletter`  
**Article URL:** `/newsletter/[slug]`  
**Design Style:** Consistent with site (dark theme, gold accents, Playfair + Inter)

---

# PAGE OVERVIEW

## Purpose
- Showcase latest article prominently (auto-updates)
- Provide browsable archive of all newsletter articles
- Convert visitors to email subscribers
- Establish Coach Wayne as thought leader

## Key Features
- Dynamic hero featuring latest published article
- Category filtering
- Newsletter signup integration
- Clean article grid
- Individual article reading experience

---

# NEWSLETTER ARCHIVE PAGE (`/newsletter`)

## Page Structure

```
1. HEADER (Nav)
2. PAGE HERO
   - Page title + description
   - Newsletter signup (compact)
3. FEATURED LATEST ARTICLE
   - Large, prominent display
   - Auto-populated from latest published
4. CATEGORY FILTER
   - Horizontal tabs/pills
5. ARTICLE GRID
   - Remaining articles
   - Paginated or infinite scroll
6. NEWSLETTER CTA (Mid-page)
   - Signup prompt
7. FOOTER
```

---

## Section 1: PAGE HERO

**Background:** Solid #0A0A0A with subtle noise texture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                            T H E  W E E K L Y                               │
│                               W I S D O M                                   │
│                                                                             │
│                    ────────────── ◆ ──────────────                          │
│                                                                             │
│                  Insights for men who refuse to settle.                     │
│             Delivered weekly. Read by 10,000+ men worldwide.                │
│                                                                             │
│                                                                             │
│              ┌─────────────────────────────────────────────┐               │
│              │                                             │               │
│              │  [Your email]              [Subscribe →]    │               │
│              │                                             │               │
│              └─────────────────────────────────────────────┘               │
│                                                                             │
│                   Join free. Unsubscribe anytime.                          │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

**Title: "THE WEEKLY WISDOM"**
```css
font-family: 'Inter', sans-serif;
font-size: 14px;
font-weight: 600;
letter-spacing: 0.3em;
text-transform: uppercase;
color: #D4AF37;
text-align: center;
```

**Decorative Divider**
```css
/* Gold diamond with lines */
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.divider-line {
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
}
.divider-diamond {
  width: 8px;
  height: 8px;
  background: #D4AF37;
  transform: rotate(45deg);
}
```

**Tagline**
```css
font-family: 'Playfair Display', serif;
font-size: 24px;
font-weight: 400;
font-style: italic;
color: #F5F5F5;
text-align: center;
margin-bottom: 8px;
```

**Subtitle**
```css
font-family: 'Inter', sans-serif;
font-size: 15px;
color: #9CA3AF;
text-align: center;
```

**Email Form**
```css
.subscribe-form {
  display: flex;
  gap: 0;
  max-width: 480px;
  margin: 0 auto;
}

.subscribe-input {
  flex: 1;
  background: #141414;
  border: 1px solid #2A2A2A;
  border-right: none;
  border-radius: 8px 0 0 8px;
  padding: 16px 20px;
  font-size: 15px;
  color: #F5F5F5;
}

.subscribe-input:focus {
  outline: none;
  border-color: #D4AF37;
}

.subscribe-button {
  background: linear-gradient(135deg, #D4AF37, #B8860B);
  color: #0A0A0A;
  font-weight: 600;
  padding: 16px 28px;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  white-space: nowrap;
}
```

**Fine Print**
```css
font-size: 13px;
color: #6B7280;
text-align: center;
margin-top: 12px;
```

---

## Section 2: FEATURED LATEST ARTICLE

**Background:** #141414 (elevated surface)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   L A T E S T                                                               │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                     │  │
│   │  ┌────────────────────────────────┬────────────────────────────┐   │  │
│   │  │                                │                            │   │  │
│   │  │                                │                            │   │  │
│   │  │                                │   CAREER & PURPOSE         │   │  │
│   │  │                                │                            │   │  │
│   │  │                                │   The Question Every       │   │  │
│   │  │      FEATURED IMAGE            │   Stuck Professional       │   │  │
│   │  │                                │   Avoids                   │   │  │
│   │  │      Aspect ratio: 4:3         │                            │   │  │
│   │  │      or 16:10                  │   ─────────────────────    │   │  │
│   │  │                                │                            │   │  │
│   │  │      Rounded corners: 12px     │   There's a question that  │   │  │
│   │  │                                │   could unlock everything  │   │  │
│   │  │      Hover: subtle scale       │   for you. But you're      │   │  │
│   │  │      (1.02) + brightness       │   probably avoiding it.    │   │  │
│   │  │                                │   Here's why—and what to   │   │  │
│   │  │         gradient fade →        │   do about it.             │   │  │
│   │  │                                │                            │   │  │
│   │  │                                │   ─────────────────────    │   │  │
│   │  │                                │                            │   │  │
│   │  │                                │   5 min read               │   │  │
│   │  │                                │   January 20, 2026         │   │  │
│   │  │                                │                            │   │  │
│   │  │                                │   [Read Article →]         │   │  │
│   │  │                                │                            │   │  │
│   │  └────────────────────────────────┴────────────────────────────┘   │  │
│   │                                                                     │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Layout Specifications

**Container**
```css
.featured-article {
  background: #141414;
  padding: 80px 64px;
}

.featured-article-inner {
  max-width: 1280px;
  margin: 0 auto;
}
```

**Section Label: "LATEST"**
```css
font-family: 'Inter', sans-serif;
font-size: 12px;
font-weight: 600;
letter-spacing: 0.2em;
text-transform: uppercase;
color: #D4AF37;
margin-bottom: 24px;
```

**Article Card Container**
```css
.featured-card {
  display: grid;
  grid-template-columns: 1.2fr 1fr; /* Image slightly larger */
  gap: 0;
  background: #0A0A0A;
  border: 1px solid #2A2A2A;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s ease;
}

.featured-card:hover {
  border-color: #3A3A3A;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}
```

**Image Side**
```css
.featured-image-container {
  position: relative;
  overflow: hidden;
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.featured-card:hover .featured-image {
  transform: scale(1.03);
}

/* Gradient fade to content side */
.featured-image-container::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100px;
  background: linear-gradient(to right, transparent, #0A0A0A);
}
```

**Content Side**
```css
.featured-content {
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

**Category Badge**
```css
.category-badge {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #D4AF37;
  background: rgba(212, 175, 55, 0.1);
  padding: 6px 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  width: fit-content;
}
```

**Article Title**
```css
.featured-title {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-weight: 400;
  line-height: 1.2;
  color: #F5F5F5;
  margin-bottom: 20px;
}

.featured-card:hover .featured-title {
  color: #FFFFFF;
}
```

**Divider**
```css
.content-divider {
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #D4AF37, transparent);
  margin-bottom: 20px;
}
```

**Excerpt**
```css
.featured-excerpt {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: #9CA3AF;
  margin-bottom: 24px;
}
```

**Meta Info**
```css
.featured-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
}

.meta-separator {
  width: 4px;
  height: 4px;
  background: #4B5563;
  border-radius: 50%;
}
```

**Read Button**
```css
.read-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #D4AF37;
  text-decoration: none;
  transition: gap 0.3s ease;
}

.read-button:hover {
  gap: 12px;
}

.read-button-arrow {
  transition: transform 0.3s ease;
}

.read-button:hover .read-button-arrow {
  transform: translateX(4px);
}
```

---

## Section 3: CATEGORY FILTER

**Background:** Solid #0A0A0A

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌────────┐ ┌────────────────┐ ┌──────────────┐ ┌────────────┐ ┌────────┐│
│   │  All   │ │ Career & Purpose│ │ Relationships│ │  Identity  │ │ Mindset││
│   │   ●    │ │                │ │              │ │            │ │        ││
│   └────────┘ └────────────────┘ └──────────────┘ └────────────┘ └────────┘│
│                                                                             │
│      ↑ Active state                                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

**Container**
```css
.category-filter {
  background: #0A0A0A;
  padding: 40px 64px;
  border-bottom: 1px solid #1A1A1A;
}

.category-filter-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
```

**Filter Pills**
```css
.filter-pill {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #9CA3AF;
  background: transparent;
  border: 1px solid #2A2A2A;
  border-radius: 100px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-pill:hover {
  color: #F5F5F5;
  border-color: #4A4A4A;
}

.filter-pill.active {
  color: #0A0A0A;
  background: #D4AF37;
  border-color: #D4AF37;
}
```

**Categories**
- All
- Career & Purpose
- Relationships & Legacy  
- Identity & Confidence
- Mindset & Growth

---

## Section 4: ARTICLE GRID

**Background:** Solid #0A0A0A

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐      │
│   │                   │  │                   │  │                   │      │
│   │  ┌─────────────┐  │  │  ┌─────────────┐  │  │  ┌─────────────┐  │      │
│   │  │             │  │  │  │             │  │  │  │             │  │      │
│   │  │    IMAGE    │  │  │  │    IMAGE    │  │  │  │    IMAGE    │  │      │
│   │  │             │  │  │  │             │  │  │  │             │  │      │
│   │  └─────────────┘  │  │  └─────────────┘  │  │  └─────────────┘  │      │
│   │                   │  │                   │  │                   │      │
│   │  CATEGORY         │  │  CATEGORY         │  │  CATEGORY         │      │
│   │                   │  │                   │  │                   │      │
│   │  Article Title    │  │  Article Title    │  │  Article Title    │      │
│   │  Here Today       │  │  Here Today       │  │  Here Today       │      │
│   │                   │  │                   │  │                   │      │
│   │  Brief excerpt    │  │  Brief excerpt    │  │  Brief excerpt    │      │
│   │  text here...     │  │  text here...     │  │  text here...     │      │
│   │                   │  │                   │  │                   │      │
│   │  5 min · Jan 15   │  │  4 min · Jan 8    │  │  6 min · Jan 1    │      │
│   │                   │  │                   │  │                   │      │
│   └───────────────────┘  └───────────────────┘  └───────────────────┘      │
│                                                                             │
│   ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐      │
│   │       ...         │  │       ...         │  │       ...         │      │
│   └───────────────────┘  └───────────────────┘  └───────────────────┘      │
│                                                                             │
│                                                                             │
│                         [Load More Articles]                                │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Grid Specifications

**Container**
```css
.articles-section {
  background: #0A0A0A;
  padding: 64px;
}

.articles-grid {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

@media (max-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
```

### Article Card

```css
.article-card {
  background: #141414;
  border: 1px solid #2A2A2A;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.article-card:hover {
  border-color: #3A3A3A;
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

**Card Image**
```css
.card-image-container {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.article-card:hover .card-image {
  transform: scale(1.05);
}
```

**Card Content**
```css
.card-content {
  padding: 24px;
}

.card-category {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 12px;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.3;
  color: #F5F5F5;
  margin-bottom: 12px;
  
  /* Limit to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card:hover .card-title {
  color: #FFFFFF;
}

.card-excerpt {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #9CA3AF;
  margin-bottom: 16px;
  
  /* Limit to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #6B7280;
}
```

**Load More Button**
```css
.load-more-container {
  text-align: center;
  margin-top: 48px;
}

.load-more-button {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #D4AF37;
  background: transparent;
  border: 1px solid #D4AF37;
  border-radius: 8px;
  padding: 16px 32px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more-button:hover {
  background: #D4AF37;
  color: #0A0A0A;
}
```

---

## Section 5: MID-PAGE NEWSLETTER CTA

**Background:** #141414 with gold glow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│      ·····································                                  │
│      ·                                   ·                                  │
│      ·         ( subtle gold glow )      ·                                  │
│      ·                                   ·                                  │
│      ·····································                                  │
│                                                                             │
│                                                                             │
│                      Don't Miss an Issue                                    │
│                                                                             │
│           Get The Weekly Wisdom delivered straight to your inbox.           │
│                 Join 10,000+ men on the journey.                            │
│                                                                             │
│                                                                             │
│              ┌─────────────────────────────────────────────┐               │
│              │                                             │               │
│              │  [Your email]              [Subscribe →]    │               │
│              │                                             │               │
│              └─────────────────────────────────────────────┘               │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

```css
.newsletter-cta {
  background: #141414;
  padding: 80px 64px;
  text-align: center;
  position: relative;
}

/* Gold glow behind content */
.newsletter-cta::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 300px;
  background: radial-gradient(
    ellipse at center,
    rgba(212, 175, 55, 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.cta-headline {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 400;
  color: #F5F5F5;
  margin-bottom: 16px;
  position: relative;
}

.cta-description {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #9CA3AF;
  margin-bottom: 32px;
  position: relative;
}
```

---

## Section 6: EMPTY STATE

When no articles exist or filter returns no results:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                              ┌─────────┐                                    │
│                              │   📝    │                                    │
│                              └─────────┘                                    │
│                                                                             │
│                         No articles yet                                     │
│                                                                             │
│                The first article is coming soon.                            │
│                Subscribe to be notified when it drops.                      │
│                                                                             │
│                         [Subscribe →]                                       │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

---

# INDIVIDUAL ARTICLE PAGE (`/newsletter/[slug]`)

## Page Structure

```
1. HEADER (Nav)
2. ARTICLE HEADER
   - Category
   - Title
   - Meta (date, reading time)
   - Featured image (optional)
3. ARTICLE CONTENT
   - Rich text body
4. ARTICLE FOOTER
   - Author info
   - Share buttons
5. NEWSLETTER CTA
6. RELATED ARTICLES
7. FOOTER
```

---

## Article Header

**Background:** #0A0A0A

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                            CAREER & PURPOSE                                 │
│                                                                             │
│                                                                             │
│                          The Question Every                                 │
│                         Stuck Professional                                  │
│                              Avoids                                         │
│                                                                             │
│                                                                             │
│                    ────────────── ◆ ──────────────                          │
│                                                                             │
│                     January 20, 2026 · 5 min read                           │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

```css
.article-header {
  background: #0A0A0A;
  padding: 120px 64px 64px;
  text-align: center;
}

.article-category {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 24px;
}

.article-title {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 400;
  line-height: 1.2;
  color: #F5F5F5;
  max-width: 800px;
  margin: 0 auto 32px;
}

.article-meta {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #6B7280;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 32px;
  }
}
```

---

## Featured Image (Optional)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│      ┌─────────────────────────────────────────────────────────────┐       │
│      │                                                             │       │
│      │                                                             │       │
│      │                                                             │       │
│      │                    FEATURED IMAGE                           │       │
│      │                    (16:9 aspect ratio)                      │       │
│      │                    Rounded corners: 16px                    │       │
│      │                    Max width: 1000px                        │       │
│      │                                                             │       │
│      │                                                             │       │
│      │                                                             │       │
│      └─────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

```css
.article-featured-image {
  max-width: 1000px;
  margin: 0 auto 64px;
  padding: 0 64px;
}

.article-featured-image img {
  width: 100%;
  border-radius: 16px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

---

## Article Content

**Background:** #0A0A0A  
**Content area:** Slightly elevated or same background

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│      ┌─────────────────────────────────────────────────────────────┐       │
│      │                                                             │       │
│      │   Most professionals I work with have a question they've    │       │
│      │   been avoiding. It's not complicated. It's not even        │       │
│      │   original. But it's terrifying:                            │       │
│      │                                                             │       │
│      │   "What do I actually want?"                                │       │
│      │                                                             │       │
│      │   Not what you should want based on your education, your    │       │
│      │   parents' expectations, or society's definition of         │       │
│      │   success. What you—the person reading this—actually want.  │       │
│      │                                                             │       │
│      │   ## Why We Avoid This Question                             │       │
│      │                                                             │       │
│      │   There are three reasons most men dodge this question      │       │
│      │   like it's a subpoena...                                   │       │
│      │                                                             │       │
│      │   1. **Fear of the answer.** What if you discover...        │       │
│      │                                                             │       │
│      │   2. **Guilt about wanting more.** You have a good life...  │       │
│      │                                                             │       │
│      │   3. **No permission to want.** Somewhere along the way...  │       │
│      │                                                             │       │
│      │   > "The question isn't whether you're stuck. The question  │       │
│      │   > is what you're pretending not to know."                 │       │
│      │                                                             │       │
│      │   ...                                                       │       │
│      │                                                             │       │
│      └─────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Typography Specifications

```css
.article-content {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

/* Paragraphs */
.article-content p {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.8;
  color: #D1D5DB;
  margin-bottom: 28px;
}

/* Headings */
.article-content h2 {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 400;
  color: #F5F5F5;
  margin-top: 48px;
  margin-bottom: 24px;
}

.article-content h3 {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #F5F5F5;
  margin-top: 40px;
  margin-bottom: 20px;
}

/* Bold text */
.article-content strong {
  font-weight: 600;
  color: #F5F5F5;
}

/* Italic text */
.article-content em {
  font-style: italic;
}

/* Links */
.article-content a {
  color: #D4AF37;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.article-content a:hover {
  color: #E5C35A;
}

/* Block quotes */
.article-content blockquote {
  margin: 40px 0;
  padding: 24px 32px;
  border-left: 3px solid #D4AF37;
  background: #141414;
  border-radius: 0 8px 8px 0;
}

.article-content blockquote p {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-style: italic;
  color: #E5E7EB;
  margin-bottom: 0;
}

/* Lists */
.article-content ul,
.article-content ol {
  margin-bottom: 28px;
  padding-left: 24px;
}

.article-content li {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.8;
  color: #D1D5DB;
  margin-bottom: 12px;
}

.article-content ul li::marker {
  color: #D4AF37;
}

.article-content ol li::marker {
  color: #D4AF37;
  font-weight: 600;
}

/* Horizontal rule / divider */
.article-content hr {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, #3A3A3A, transparent);
  margin: 48px 0;
}

/* Images within content */
.article-content img {
  width: 100%;
  border-radius: 12px;
  margin: 32px 0;
}

.article-content figcaption {
  font-size: 14px;
  color: #6B7280;
  text-align: center;
  margin-top: -24px;
  margin-bottom: 32px;
}
```

---

## Article Footer

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│      ┌─────────────────────────────────────────────────────────────┐       │
│      │                                                             │       │
│      │   ┌──────────┐                                              │       │
│      │   │          │   Written by                                 │       │
│      │   │  WAYNE   │   Coach Wayne Dawson                         │       │
│      │   │  PHOTO   │                                              │       │
│      │   │          │   Transformational coach helping men         │       │
│      │   └──────────┘   discover their values, identity, and       │       │
│      │                  purpose for 25+ years.                     │       │
│      │                                                             │       │
│      │                  [Learn More About Wayne →]                 │       │
│      │                                                             │       │
│      └─────────────────────────────────────────────────────────────┘       │
│                                                                             │
│      ───────────────────────────────────────────────────────────────       │
│                                                                             │
│                             Share this article                              │
│                                                                             │
│                    [Twitter]  [LinkedIn]  [Copy Link]                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Specifications

```css
.article-footer {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

/* Author Card */
.author-card {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  background: #141414;
  border: 1px solid #2A2A2A;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 48px;
}

.author-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.author-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6B7280;
  margin-bottom: 4px;
}

.author-name {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  color: #F5F5F5;
  margin-bottom: 8px;
}

.author-bio {
  font-size: 15px;
  color: #9CA3AF;
  line-height: 1.6;
  margin-bottom: 12px;
}

.author-link {
  font-size: 14px;
  font-weight: 500;
  color: #D4AF37;
}

/* Share Section */
.share-section {
  text-align: center;
  padding-top: 48px;
  border-top: 1px solid #2A2A2A;
}

.share-label {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 16px;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.share-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #141414;
  border: 1px solid #2A2A2A;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  transition: all 0.3s ease;
}

.share-button:hover {
  background: #D4AF37;
  border-color: #D4AF37;
  color: #0A0A0A;
}
```

---

## Newsletter CTA (After Article)

Same as mid-page CTA on archive page.

---

## Related Articles

**Background:** #141414

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   KEEP READING                                                              │
│                                                                             │
│   ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐      │
│   │                   │  │                   │  │                   │      │
│   │   [Article Card]  │  │   [Article Card]  │  │   [Article Card]  │      │
│   │                   │  │                   │  │                   │      │
│   └───────────────────┘  └───────────────────┘  └───────────────────┘      │
│                                                                             │
│                           [View All Articles →]                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Logic for Related Articles
1. Same category as current article (priority)
2. If not enough, fill with recent articles
3. Exclude current article
4. Show 3 articles

---

---

# RESPONSIVE DESIGN

## Mobile Layout: Archive Page

### Hero (Mobile)
```
┌─────────────────────────────────────┐
│                                     │
│       T H E  W E E K L Y            │
│          W I S D O M                │
│                                     │
│       ───────── ◆ ─────────         │
│                                     │
│    Insights for men who             │
│    refuse to settle.                │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ [Your email]                  │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │       [Subscribe →]           │ │
│  └───────────────────────────────┘ │
│                                     │
│    Join free. Unsubscribe anytime.  │
│                                     │
└─────────────────────────────────────┘

- Stacked email input + button
- Centered text
- Reduced font sizes
```

### Featured Article (Mobile)
```
┌─────────────────────────────────────┐
│                                     │
│  L A T E S T                        │
│                                     │
│  ┌───────────────────────────────┐ │
│  │                               │ │
│  │                               │ │
│  │       FEATURED IMAGE          │ │
│  │       (full width)            │ │
│  │                               │ │
│  │                               │ │
│  └───────────────────────────────┘ │
│                                     │
│  CAREER & PURPOSE                   │
│                                     │
│  The Question Every                 │
│  Stuck Professional                 │
│  Avoids                             │
│                                     │
│  There's a question that could      │
│  unlock everything for you...       │
│                                     │
│  5 min read · January 20, 2026      │
│                                     │
│  [Read Article →]                   │
│                                     │
└─────────────────────────────────────┘

- Image stacked above content
- Full-width card
- Reduced title size (28px)
```

### Category Filter (Mobile)
```
┌─────────────────────────────────────┐
│                                     │
│  ┌─────┐ ┌────────┐ ┌──────────┐   │
│  │ All │ │ Career │ │ Relation │ → │
│  └─────┘ └────────┘ └──────────┘   │
│                                     │
│  Horizontal scroll with fade        │
│                                     │
└─────────────────────────────────────┘
```

### Article Grid (Mobile)
```
┌─────────────────────────────────────┐
│                                     │
│  ┌───────────────────────────────┐ │
│  │         [Article Card]        │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │         [Article Card]        │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │         [Article Card]        │ │
│  └───────────────────────────────┘ │
│                                     │
│        [Load More Articles]         │
│                                     │
└─────────────────────────────────────┘

- Single column layout
- Cards full width
```

---

## Mobile Layout: Article Page

```
┌─────────────────────────────────────┐
│                                     │
│         CAREER & PURPOSE            │
│                                     │
│      The Question Every             │
│      Stuck Professional             │
│            Avoids                   │
│                                     │
│      ───────── ◆ ─────────          │
│                                     │
│   January 20, 2026 · 5 min read     │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐ │
│  │                               │ │
│  │       FEATURED IMAGE          │ │
│  │                               │ │
│  └───────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│   Most professionals I work with    │
│   have a question they've been      │
│   avoiding. It's not complicated.   │
│   It's not even original. But       │
│   it's terrifying:                  │
│                                     │
│   "What do I actually want?"        │
│                                     │
│   ...                               │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐ │
│  │ ┌────┐  Written by            │ │
│  │ │ WD │  Coach Wayne Dawson    │ │
│  │ └────┘                        │ │
│  │  Transformational coach...    │ │
│  │                               │ │
│  │  [Learn More →]               │ │
│  └───────────────────────────────┘ │
│                                     │
│         Share this article          │
│    [Twitter] [LinkedIn] [Copy]      │
│                                     │
└─────────────────────────────────────┘

Mobile typography:
- Title: 28-32px
- Body: 17px
- Line height: 1.75
```

---

---

# ANIMATIONS & INTERACTIONS

## Page Load
```css
/* Staggered fade-in for hero elements */
.hero-title { animation: fadeInUp 0.6s ease forwards; animation-delay: 0.1s; }
.hero-tagline { animation: fadeInUp 0.6s ease forwards; animation-delay: 0.2s; }
.hero-form { animation: fadeInUp 0.6s ease forwards; animation-delay: 0.3s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Article Cards
```css
/* Hover effects */
.article-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: #3A3A3A;
}

/* Image zoom on hover */
.article-card:hover .card-image {
  transform: scale(1.05);
}
```

## Featured Article
```css
/* Subtle scale on hover */
.featured-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.featured-card:hover {
  transform: scale(1.01);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}
```

## Filter Pills
```css
.filter-pill {
  transition: all 0.3s ease;
}

/* Active state transition */
.filter-pill.active {
  animation: pillActivate 0.3s ease;
}

@keyframes pillActivate {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
```

## Scroll Animations
```javascript
// Use Intersection Observer for scroll-based animations
// Elements fade in as they enter viewport

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe article cards
document.querySelectorAll('.article-card').forEach(card => {
  observer.observe(card);
});
```

---

---

# COMPONENT CHECKLIST

## Archive Page Components
- [ ] `NewsletterHero` — Page intro with signup form
- [ ] `FeaturedArticle` — Large featured latest post
- [ ] `CategoryFilter` — Horizontal filter pills
- [ ] `ArticleGrid` — Grid of article cards
- [ ] `ArticleCard` — Individual article preview card
- [ ] `NewsletterCTA` — Mid-page signup block
- [ ] `LoadMoreButton` — Pagination/infinite scroll trigger
- [ ] `EmptyState` — No articles state

## Article Page Components
- [ ] `ArticleHeader` — Title, category, meta
- [ ] `ArticleFeaturedImage` — Hero image
- [ ] `ArticleContent` — Rich text body (MDX or HTML)
- [ ] `AuthorCard` — Coach Wayne info
- [ ] `ShareButtons` — Social sharing
- [ ] `RelatedArticles` — 3 related posts

## Shared Components
- [ ] `CategoryBadge` — Styled category label
- [ ] `ReadingTime` — Minutes display
- [ ] `DateDisplay` — Formatted date

---

---

# BACKGROUND RHYTHM

Following the site's background alternation pattern:

| Section | Background |
|---------|------------|
| Page Hero | #0A0A0A + noise texture |
| Featured Article | #141414 |
| Category Filter | #0A0A0A |
| Article Grid | #0A0A0A |
| Newsletter CTA | #141414 + gold glow |
| Footer | #0A0A0A |

---

---

# SEO CONSIDERATIONS

## Archive Page (`/newsletter`)
```html
<title>The Weekly Wisdom | VIP Transformative Living</title>
<meta name="description" content="Insights for men who refuse to settle. Weekly articles on career, relationships, identity, and purpose from Coach Wayne Dawson." />
```

## Article Page (`/newsletter/[slug]`)
```html
<title>{article.title} | VIP Transformative Living</title>
<meta name="description" content="{article.excerpt}" />

<!-- Open Graph -->
<meta property="og:type" content="article" />
<meta property="og:title" content="{article.title}" />
<meta property="og:description" content="{article.excerpt}" />
<meta property="og:image" content="{article.featured_image_url}" />
<meta property="article:published_time" content="{article.published_at}" />
<meta property="article:author" content="Coach Wayne Dawson" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{article.title}" />
<meta name="twitter:description" content="{article.excerpt}" />
<meta name="twitter:image" content="{article.featured_image_url}" />
```

---

---

# IMPLEMENTATION NOTES

## Data Fetching

### Archive Page
```typescript
// Fetch latest published article for hero
const latestArticle = await supabase
  .from('newsletter_articles')
  .select('*')
  .eq('is_published', true)
  .order('published_at', { ascending: false })
  .limit(1)
  .single();

// Fetch remaining articles (excluding latest)
const articles = await supabase
  .from('newsletter_articles')
  .select('*')
  .eq('is_published', true)
  .neq('id', latestArticle.id)
  .order('published_at', { ascending: false })
  .range(0, 11); // 12 per page
```

### Article Page
```typescript
// Fetch article by slug
const article = await supabase
  .from('newsletter_articles')
  .select('*')
  .eq('slug', params.slug)
  .eq('is_published', true)
  .single();

// Fetch related articles
const relatedArticles = await supabase
  .from('newsletter_articles')
  .select('*')
  .eq('is_published', true)
  .eq('category', article.category)
  .neq('id', article.id)
  .order('published_at', { ascending: false })
  .limit(3);
```

## Newsletter Subscription

```typescript
// Handle subscription
async function handleSubscribe(email: string) {
  const { error } = await supabase
    .from('subscribers')
    .insert({
      email,
      source: 'website',
      subscribed_at: new Date().toISOString(),
    });
    
  if (error?.code === '23505') {
    // Already subscribed
    return { success: true, message: 'You're already subscribed!' };
  }
  
  return { success: true, message: 'Welcome to the list!' };
}
```

---

*End of Newsletter Page Design Plan*
