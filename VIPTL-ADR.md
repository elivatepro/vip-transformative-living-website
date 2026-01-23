# Architecture Decision Records
## VIP Transformative Living — Technical Decisions & Rationale

**Version:** 1.0  
**Date:** January 2026

---

## Table of Contents

- [ADR-001: Frontend Framework Selection](#adr-001-frontend-framework-selection)
- [ADR-002: Database & Media Storage](#adr-002-database--media-storage)
- [ADR-003: GoHighLevel Integration Strategy](#adr-003-gohighlevel-integration-strategy)
- [ADR-004: Admin Authentication](#adr-004-admin-authentication)
- [ADR-005: CSS & Styling Approach](#adr-005-css--styling-approach)
- [ADR-006: Video Storage & Streaming](#adr-006-video-storage--streaming)
- [ADR-007: Self-Assessment Tool Integration](#adr-007-self-assessment-tool-integration)
- [Summary](#summary-of-decisions)

---

## ADR-001: Frontend Framework Selection

**Status:** ✅ ACCEPTED  
**Date:** January 2026

### Context

We need to select a frontend framework for rebuilding the VIP Transformative Living website. The site requires excellent SEO, fast performance, dynamic content management, and the ability to integrate with GoHighLevel.

### Decision

**We will use Next.js 14+ with the App Router.**

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Next.js 14+** ✅ | SSR/SSG, excellent SEO, Vercel deploy, React ecosystem, App Router | Learning curve for App Router |
| Astro | Fast, content-focused, islands architecture | Less mature for dynamic apps, smaller ecosystem |
| Remix | Great data loading, progressive enhancement | Smaller community, less Vercel optimization |
| SvelteKit | Excellent DX, small bundle size, fast | Smaller ecosystem, fewer component libraries |

### Rationale

1. **SEO Excellence:** Server-side rendering ensures all content is indexable by search engines
2. **Vercel Integration:** Native deployment platform with edge functions, analytics, and optimal performance
3. **React Ecosystem:** Access to Tailwind, shadcn/ui, Framer Motion, and countless component libraries
4. **App Router:** Server components reduce JavaScript sent to client, improving performance
5. **Image Optimization:** Built-in next/image handles responsive images automatically

### Consequences

- **Positive:** Fast build times, excellent developer experience, strong community support
- **Negative:** Need to learn App Router patterns if unfamiliar

---

## ADR-002: Database & Media Storage

**Status:** ✅ ACCEPTED  
**Date:** January 2026

### Context

We need a database for content management (newsletters, testimonials, events, FAQ, pricing) and storage for images/videos with CDN delivery for fast loading.

### Decision

**We will use Supabase (PostgreSQL + Storage + Auth).**

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Supabase** ✅ | All-in-one (DB, storage, auth), generous free tier, PostgreSQL | Newer platform, less mature than AWS |
| PlanetScale + Cloudflare R2 | Serverless MySQL, excellent scaling | Two services to manage, MySQL limitations |
| Firebase | Google ecosystem, real-time, easy auth | NoSQL limitations, vendor lock-in, pricing unpredictable |
| Contentful/Sanity | Purpose-built CMS, great editing UX | Expensive, overkill for this project, still need separate storage |

### Rationale

1. **Unified Platform:** Database, storage, and auth in one service simplifies architecture
2. **PostgreSQL:** Relational database with strong typing, perfect for structured content
3. **CDN Storage:** Built-in CDN for images and videos ensures fast global delivery
4. **Row Level Security:** Fine-grained access control for admin operations
5. **Cost:** Free tier covers expected 50-80 monthly visitors easily

### Schema Design

```sql
-- Core tables
CREATE TABLE newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL, -- 'career', 'relationships', 'health', 'finance'
  featured_image TEXT,
  published_at TIMESTAMPTZ,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  title TEXT, -- e.g., "Actor", "Fire Chief"
  quote TEXT,
  video_url TEXT,
  photo_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  registration_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE faq (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT, -- 'coaching', 'pricing', 'general'
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

CREATE TABLE pricing_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- 'silver', 'gold', 'platinum'
  tagline TEXT,
  price DECIMAL(10,2),
  price_display TEXT, -- e.g., "$200/session"
  duration TEXT, -- e.g., "8 weeks"
  features JSONB, -- array of feature strings
  bonuses JSONB, -- array of bonus items
  payment_options JSONB, -- payment plan details
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0
);
```

### Storage Buckets

```
/images
  /hero
  /testimonials
  /newsletters
  /coach
/videos
  /testimonials
  /hero
```

### Consequences

- **Positive:** Single vendor, great DX, type-safe queries with generated types
- **Negative:** Vendor lock-in (mitigated by standard PostgreSQL)

---

## ADR-003: GoHighLevel Integration Strategy

**Status:** ✅ ACCEPTED  
**Date:** January 2026

### Context

GoHighLevel (GHL) is used for CRM, payments, email marketing, and analytics. We need to integrate the website forms and booking with GHL while keeping the site independent.

### Decision

**Hybrid approach: Calendar widget embed + Custom forms with webhooks.**

### Integration Points

| Feature | Method | Implementation |
|---------|--------|----------------|
| Calendar Booking | Embed Widget | iframe with custom styling wrapper on `/book` page |
| Contact Form | Webhook | Custom form → API route → GHL webhook |
| Newsletter Signup | Webhook | Email input → API route → GHL with tag 'newsletter' |
| E-book Download | Webhook | Form → API route → GHL triggers delivery automation |
| Payments | External Link | Direct links to GHL checkout pages (existing URLs) |
| Analytics | Script Embed | GHL tracking script in `layout.tsx` |

### Webhook Implementation

```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  
  // Honeypot check
  if (data.website) {
    return Response.json({ success: true }); // Fake success for bots
  }
  
  // Send to GHL webhook
  await fetch(process.env.GHL_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      message: data.message,
      source: 'website_contact_form',
      tags: ['website_lead']
    })
  });
  
  return Response.json({ success: true });
}
```

### Calendar Embed

```tsx
// components/BookingCalendar.tsx
export function BookingCalendar() {
  return (
    <div className="calendar-wrapper rounded-lg overflow-hidden">
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/[CALENDAR_ID]"
        style={{ width: '100%', height: '700px', border: 'none' }}
        scrolling="no"
      />
    </div>
  );
}
```

### Rationale

1. **Custom Forms:** Match site design perfectly, better UX than GHL embeds
2. **Webhooks:** Reliable data delivery to GHL, can add validation/honeypot for spam
3. **Calendar Embed:** Complex functionality best left to GHL, styled via wrapper
4. **Payment Links:** No PCI compliance burden, GHL handles all payment processing

### Consequences

- **Positive:** Beautiful forms, spam protection, GHL handles complex flows
- **Negative:** Need to maintain webhook endpoints, GHL API changes could break

---

## ADR-004: Admin Authentication

**Status:** ✅ ACCEPTED  
**Date:** January 2026

### Context

The admin dashboard needs authentication for Coach Wayne to manage content. Only one user needs access.

### Decision

**Supabase Auth with email/password.**

### Rationale

1. Already using Supabase for database, no additional services needed
2. Simple email/password is sufficient for single admin user
3. Easy integration with Next.js middleware for route protection
4. Session management handled automatically

### Implementation

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  // Protect admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }
  
  return res;
}

export const config = {
  matcher: ['/admin/:path*']
};
```

### Row Level Security

```sql
-- Only authenticated admin can write
CREATE POLICY "Admin can manage newsletters" ON newsletters
  FOR ALL USING (auth.role() = 'authenticated');

-- Public can read published content
CREATE POLICY "Public can read published newsletters" ON newsletters
  FOR SELECT USING (is_published = true);
```

### Consequences

- **Positive:** Simple, secure, no additional cost
- **Negative:** No OAuth options (not needed for single user)

---

## ADR-005: CSS & Styling Approach

**Status:** ✅ ACCEPTED  
**Date:** January 2026

### Decision

**Tailwind CSS + CSS Variables for theming + Framer Motion for animations.**

### Rationale

- **Tailwind:** Rapid development, utility-first, excellent with Next.js
- **CSS Variables:** Easy dark/light mode toggle without class duplication
- **Framer Motion:** Declarative animations, great for scroll effects

### Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        'surface-elevated': 'var(--surface-elevated)',
        border: 'var(--border)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        gold: 'var(--gold)',
        'gold-shimmer': 'var(--gold-shimmer)',
        'gold-hover': 'var(--gold-hover)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

### Consequences

- **Positive:** Fast development, consistent styling, easy theming
- **Negative:** HTML can get verbose with many utility classes

---

## ADR-006: Video Storage & Streaming

**Status:** ✅ ACCEPTED  
**Date:** January 2026

### Context

Videos (testimonials, hero section) need fast loading with autoplay on scroll/hover functionality.

### Decision

**Supabase Storage with multiple resolution variants + Intersection Observer for autoplay.**

### Implementation

#### Upload Process
1. Admin uploads video
2. Server creates 480p, 720p, 1080p variants (via ffmpeg or external service)
3. All variants stored in Supabase Storage

#### Video Component

```tsx
// components/VideoPlayer.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoplayOnScroll?: boolean;
  autoplayOnHover?: boolean;
}

export function VideoPlayer({ 
  src, 
  poster, 
  autoplayOnScroll = false,
  autoplayOnHover = false 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const [isPlaying, setIsPlaying] = useState(false);

  // Autoplay on scroll
  useEffect(() => {
    if (autoplayOnScroll && videoRef.current) {
      if (isInView) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isInView, autoplayOnScroll]);

  // Hover handlers
  const handleMouseEnter = () => {
    if (autoplayOnHover && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (autoplayOnHover && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-lg overflow-hidden"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        className="w-full h-full object-cover"
      />
      {/* Custom controls overlay */}
    </div>
  );
}
```

### Video Specifications

| Attribute | Specification |
|-----------|---------------|
| Format | MP4 (H.264) primary, WebM fallback |
| Resolutions | 480p, 720p, 1080p |
| Max file size | 5MB for testimonials, 20MB for hero |
| Autoplay | Muted, playsinline, respects prefers-reduced-motion |

### Consequences

- **Positive:** Fast loading via CDN, responsive video sizes
- **Negative:** Storage costs for multiple variants (minimal at expected traffic)

---

## ADR-007: Self-Assessment Tool Integration

**Status:** ✅ ACCEPTED  
**Date:** January 2026

### Context

The Self-Assessment tool exists as a separate Vercel app (https://viptl-self-assessment-website.vercel.app/). It serves as the primary lead generation mechanism.

### Decision

**External link integration (NOT embedded). Featured prominently as primary CTA.**

### Rationale

1. Separate app allows independent updates without main site deployment
2. Assessment has its own complex state management
3. Link in new tab keeps main site context for user return
4. Assessment visuals already match gold theme (same design system)

### CTA Placement

| Location | Implementation |
|----------|----------------|
| Hero section | Primary CTA button |
| Navigation | Visible on all pages |
| Footer | Secondary link |
| About page | Featured section |
| Sticky mobile CTA | Bottom bar on mobile |

### Implementation

```tsx
// components/AssessmentCTA.tsx
export function AssessmentCTA({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) {
  return (
    <a
      href="https://viptl-self-assessment-website.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className={variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
    >
      Take the Free Assessment
    </a>
  );
}
```

### Consequences

- **Positive:** Decoupled systems, independent deployments
- **Negative:** Two separate domains (minor UX consideration)

---

## Summary of Decisions

| ADR | Topic | Decision |
|-----|-------|----------|
| 001 | Frontend Framework | Next.js 14+ (App Router) |
| 002 | Database & Storage | Supabase (PostgreSQL + Storage + Auth) |
| 003 | GHL Integration | Calendar embed + Custom forms with webhooks |
| 004 | Authentication | Supabase Auth (email/password) |
| 005 | Styling | Tailwind CSS + CSS Variables + Framer Motion |
| 006 | Video Handling | Supabase Storage + Intersection Observer |
| 007 | Self-Assessment | External link (separate Vercel app) |

---

**All decisions are final and ready for implementation.**
