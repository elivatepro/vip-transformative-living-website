# VIP Transformative Living
## Admin Panel — Complete Development Plan

**Purpose:** Content management and data oversight for Coach Wayne  
**Tech Stack:** Next.js 14+ (App Router) + Supabase (Auth, Database, Storage)  
**User:** Single admin (Coach Wayne) — personalized experience  
**Route:** `/admin` (protected)

---

# TABLE OF CONTENTS

1. [Database Schema](#database-schema)
2. [Authentication](#authentication)
3. [Admin Panel Structure](#admin-panel-structure)
4. [Dashboard Page](#dashboard-page)
5. [Subscribers Page](#subscribers-page)
6. [E-book Downloads Page](#ebook-downloads-page)
7. [Contact Messages Page](#contact-messages-page)
8. [Testimonials Page](#testimonials-page)
9. [Newsletter Articles Page](#newsletter-articles-page)
10. [FAQs Page](#faqs-page)
11. [Packages Page](#packages-page)
12. [Speaking Topics Page](#speaking-topics-page)
13. [Announcements Page](#announcements-page)
14. [Self-Assessment Results Page](#self-assessment-results-page)
15. [Settings Page](#settings-page)
16. [Design System](#design-system)
17. [Responsive Behavior](#responsive-behavior)
18. [Component Library](#component-library)

---

# DATABASE SCHEMA

## Supabase Tables

### 1. `subscribers`
Newsletter email subscribers.

```sql
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  source VARCHAR(50) DEFAULT 'website', -- 'website', 'ebook', 'manual'
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_subscribed_at ON subscribers(subscribed_at);
CREATE INDEX idx_subscribers_is_active ON subscribers(is_active);
```

---

### 2. `ebook_downloads`
E-book download requests/leads.

```sql
CREATE TABLE ebook_downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  ebook_slug VARCHAR(100) NOT NULL, -- 'breaking-free', 'warrior-brain', etc.
  ebook_title VARCHAR(255) NOT NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ebook_downloads_email ON ebook_downloads(email);
CREATE INDEX idx_ebook_downloads_ebook_slug ON ebook_downloads(ebook_slug);
CREATE INDEX idx_ebook_downloads_downloaded_at ON ebook_downloads(downloaded_at);
```

---

### 3. `contact_submissions`
Contact form submissions.

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(100) NOT NULL, -- 'coaching', 'speaking', 'media', 'partnership', 'general'
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  notes TEXT, -- Admin notes
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_contact_submissions_is_read ON contact_submissions(is_read);
CREATE INDEX idx_contact_submissions_subject ON contact_submissions(subject);
CREATE INDEX idx_contact_submissions_submitted_at ON contact_submissions(submitted_at);
```

---

### 4. `testimonials`
Client testimonials (text and video).

```sql
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_title VARCHAR(255), -- 'Business Owner', 'VP of Operations', etc.
  client_location VARCHAR(100), -- 'Chicago, IL'
  
  -- Content
  quote TEXT NOT NULL, -- Main testimonial quote
  full_story TEXT, -- Longer version if available
  
  -- Video
  has_video BOOLEAN DEFAULT FALSE,
  video_url VARCHAR(500), -- YouTube embed URL
  video_thumbnail_url VARCHAR(500), -- Custom thumbnail or auto from YouTube
  
  -- Categorization
  category VARCHAR(50) DEFAULT 'general', -- 'career', 'relationships', 'identity', 'purpose', 'general'
  package_type VARCHAR(50), -- 'silver', 'gold', 'platinum'
  
  -- Display settings
  is_featured BOOLEAN DEFAULT FALSE, -- Show on homepage
  display_on_homepage BOOLEAN DEFAULT FALSE,
  display_on_coaching BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0, -- For manual ordering
  
  -- Status
  is_published BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_testimonials_is_featured ON testimonials(is_featured);
CREATE INDEX idx_testimonials_is_published ON testimonials(is_published);
CREATE INDEX idx_testimonials_category ON testimonials(category);
CREATE INDEX idx_testimonials_display_order ON testimonials(display_order);
```

---

### 5. `newsletter_articles`
Newsletter/blog articles displayed on the site.

```sql
CREATE TABLE newsletter_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Content
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT, -- Short preview (2-3 sentences)
  content TEXT NOT NULL, -- Full article (Markdown or HTML)
  
  -- Media
  featured_image_url VARCHAR(500),
  featured_image_alt VARCHAR(255),
  
  -- Categorization
  category VARCHAR(50) NOT NULL, -- 'career', 'relationships', 'health', 'mindset', 'purpose'
  tags TEXT[], -- Array of tags
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  
  -- Settings
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  reading_time_minutes INT, -- Auto-calculated or manual
  
  -- Analytics (optional - can track internally)
  view_count INT DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_newsletter_articles_slug ON newsletter_articles(slug);
CREATE INDEX idx_newsletter_articles_is_published ON newsletter_articles(is_published);
CREATE INDEX idx_newsletter_articles_published_at ON newsletter_articles(published_at);
CREATE INDEX idx_newsletter_articles_category ON newsletter_articles(category);
```

---

### 6. `faqs`
FAQ questions and answers.

```sql
CREATE TABLE faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  question TEXT NOT NULL,
  answer TEXT NOT NULL, -- Can include Markdown formatting
  
  -- Categorization
  category VARCHAR(50) DEFAULT 'general', -- 'coaching', 'process', 'investment', 'general'
  
  -- Display
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  
  -- Page targeting (where to show this FAQ)
  show_on_coaching BOOLEAN DEFAULT TRUE,
  show_on_contact BOOLEAN DEFAULT FALSE,
  show_on_resources BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_is_published ON faqs(is_published);
CREATE INDEX idx_faqs_display_order ON faqs(display_order);
```

---

### 7. `coaching_packages`
Coaching package information (pricing, features, etc.).

```sql
CREATE TABLE coaching_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Info
  name VARCHAR(100) NOT NULL, -- 'Silver', 'Gold', 'Platinum'
  slug VARCHAR(50) NOT NULL UNIQUE, -- 'silver', 'gold', 'platinum'
  tagline VARCHAR(255), -- 'Rapid Relief', 'Career Breakthrough', etc.
  description TEXT NOT NULL,
  
  -- Pricing
  price_per_session DECIMAL(10,2), -- For Silver
  total_price DECIMAL(10,2), -- Full price
  payment_plan_amount DECIMAL(10,2), -- Per installment
  payment_plan_installments INT, -- Number of installments
  fast_action_price DECIMAL(10,2), -- Discounted price
  fast_action_savings DECIMAL(10,2), -- Amount saved
  
  -- Details
  session_count INT NOT NULL,
  duration_weeks INT NOT NULL,
  
  -- Features (JSON array for flexibility)
  features JSONB, -- [{"text": "8 weekly sessions", "included": true}, ...]
  bonuses JSONB, -- [{"title": "E-book", "description": "..."}]
  
  -- Display
  is_featured BOOLEAN DEFAULT FALSE, -- "Most Popular" badge
  badge_text VARCHAR(50), -- 'Most Popular', 'Best Value', etc.
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  
  -- Methodology
  methodology_name VARCHAR(100), -- 'S.C.O.R.E.', 'Career Blueprint', etc.
  methodology_description TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_coaching_packages_slug ON coaching_packages(slug);
CREATE INDEX idx_coaching_packages_is_published ON coaching_packages(is_published);
```

---

### 8. `speaking_topics`
Speaking engagement topics/presentations.

```sql
CREATE TABLE speaking_topics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Info
  title VARCHAR(255) NOT NULL, -- 'Leadership by VIP'
  slug VARCHAR(100) NOT NULL UNIQUE,
  tagline VARCHAR(255), -- Short one-liner
  description TEXT NOT NULL,
  
  -- Details
  audience_type VARCHAR(100), -- 'Corporate', 'Community', 'Faith-based', etc.
  duration VARCHAR(50), -- '45-90 minutes'
  format VARCHAR(100), -- 'Keynote', 'Workshop', 'Half-day training'
  
  -- Takeaways (array)
  key_takeaways JSONB, -- ["Takeaway 1", "Takeaway 2", ...]
  
  -- Display
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_speaking_topics_slug ON speaking_topics(slug);
CREATE INDEX idx_speaking_topics_is_published ON speaking_topics(is_published);
```

---

### 9. `announcements`
Site-wide banners and announcements.

```sql
CREATE TABLE announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Content
  message TEXT NOT NULL, -- The announcement text
  link_text VARCHAR(100), -- 'Learn More', 'Book Now', etc.
  link_url VARCHAR(500), -- Where the link goes
  
  -- Styling
  type VARCHAR(50) DEFAULT 'info', -- 'info', 'promo', 'urgent', 'event'
  background_color VARCHAR(20), -- Hex color override
  text_color VARCHAR(20),
  
  -- Display Settings
  position VARCHAR(20) DEFAULT 'top', -- 'top', 'bottom'
  is_dismissible BOOLEAN DEFAULT TRUE,
  
  -- Scheduling
  is_active BOOLEAN DEFAULT FALSE,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  
  -- Targeting (which pages to show on)
  show_on_all_pages BOOLEAN DEFAULT TRUE,
  show_on_pages TEXT[], -- ['/', '/coaching', '/contact']
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_announcements_is_active ON announcements(is_active);
CREATE INDEX idx_announcements_start_date ON announcements(start_date);
CREATE INDEX idx_announcements_end_date ON announcements(end_date);
```

---

### 10. `self_assessment_results`
Results from the self-assessment tool (future use).

```sql
CREATE TABLE self_assessment_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Contact Info (optional)
  email VARCHAR(255),
  first_name VARCHAR(100),
  
  -- Scores
  values_score INT,
  identity_score INT,
  purpose_score INT,
  overall_score INT,
  alignment_level VARCHAR(50), -- 'low', 'moderate', 'high', 'aligned'
  
  -- Detailed Responses (stored as JSON)
  responses JSONB,
  
  -- Recommendations generated
  recommendations JSONB,
  
  -- Metadata
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_self_assessment_results_email ON self_assessment_results(email);
CREATE INDEX idx_self_assessment_results_completed_at ON self_assessment_results(completed_at);
CREATE INDEX idx_self_assessment_results_alignment_level ON self_assessment_results(alignment_level);
```

---

### 11. `site_analytics` (optional - for internal tracking)
Basic site analytics if not using external service.

```sql
CREATE TABLE site_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  date DATE NOT NULL,
  page_path VARCHAR(255) NOT NULL,
  
  -- Metrics
  page_views INT DEFAULT 0,
  unique_visitors INT DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(date, page_path)
);

-- Indexes
CREATE INDEX idx_site_analytics_date ON site_analytics(date);
CREATE INDEX idx_site_analytics_page_path ON site_analytics(page_path);
```

---

### 12. `admin_activity_log`
Track admin actions for accountability.

```sql
CREATE TABLE admin_activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  admin_id UUID NOT NULL, -- Reference to Supabase auth user
  action VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'publish', etc.
  entity_type VARCHAR(100) NOT NULL, -- 'testimonial', 'article', etc.
  entity_id UUID,
  
  -- Details
  description TEXT,
  changes JSONB, -- Before/after for updates
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_admin_activity_log_admin_id ON admin_activity_log(admin_id);
CREATE INDEX idx_admin_activity_log_entity_type ON admin_activity_log(entity_type);
CREATE INDEX idx_admin_activity_log_created_at ON admin_activity_log(created_at);
```

---

## Database Functions & Triggers

### Auto-update `updated_at` timestamp
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_subscribers_updated_at BEFORE UPDATE ON subscribers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_articles_updated_at BEFORE UPDATE ON newsletter_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coaching_packages_updated_at BEFORE UPDATE ON coaching_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_speaking_topics_updated_at BEFORE UPDATE ON speaking_topics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Auto-generate slug from title
```sql
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$ language 'plpgsql';
```

### Calculate reading time
```sql
CREATE OR REPLACE FUNCTION calculate_reading_time(content TEXT)
RETURNS INT AS $$
DECLARE
    word_count INT;
    reading_speed INT := 200; -- Average words per minute
BEGIN
    word_count := array_length(regexp_split_to_array(content, '\s+'), 1);
    RETURN CEIL(word_count::FLOAT / reading_speed);
END;
$$ language 'plpgsql';
```

---

## Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ebook_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaching_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE speaking_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE self_assessment_results ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view published testimonials" ON testimonials
    FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public can view published articles" ON newsletter_articles
    FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public can view published FAQs" ON faqs
    FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public can view published packages" ON coaching_packages
    FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public can view published speaking topics" ON speaking_topics
    FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public can view active announcements" ON announcements
    FOR SELECT USING (is_active = TRUE);

-- Public insert access for forms
CREATE POLICY "Anyone can subscribe" ON subscribers
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Anyone can download ebook" ON ebook_downloads
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Anyone can submit contact form" ON contact_submissions
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Anyone can submit assessment" ON self_assessment_results
    FOR INSERT WITH CHECK (TRUE);

-- Admin full access (authenticated users)
CREATE POLICY "Admin full access to subscribers" ON subscribers
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to ebook_downloads" ON ebook_downloads
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to contact_submissions" ON contact_submissions
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to testimonials" ON testimonials
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to newsletter_articles" ON newsletter_articles
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to faqs" ON faqs
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to coaching_packages" ON coaching_packages
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to speaking_topics" ON speaking_topics
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to announcements" ON announcements
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to self_assessment_results" ON self_assessment_results
    FOR ALL USING (auth.role() = 'authenticated');
```

---

---

# AUTHENTICATION

## Supabase Auth Setup

Single admin user (Coach Wayne) with email/password authentication.

### Login Flow
```
1. User navigates to /admin
2. If not authenticated → Redirect to /admin/login
3. User enters email + password
4. Supabase validates credentials
5. On success → Redirect to /admin/dashboard
6. Session persisted via Supabase auth cookies
```

### Middleware Protection
```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect /admin routes (except login)
  if (req.nextUrl.pathname.startsWith('/admin') && 
      !req.nextUrl.pathname.startsWith('/admin/login')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  // Redirect authenticated users away from login page
  if (req.nextUrl.pathname === '/admin/login' && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

### Login Page Design
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│                    ┌─────────────────────┐                      │
│                    │                     │                      │
│                    │   VIP TRANSFORMATIVE│                      │
│                    │       LIVING        │                      │
│                    │                     │                      │
│                    │   ─────────────     │                      │
│                    │                     │                      │
│                    │   Admin Portal      │                      │
│                    │                     │                      │
│                    │   ┌───────────────┐ │                      │
│                    │   │ Email         │ │                      │
│                    │   └───────────────┘ │                      │
│                    │                     │                      │
│                    │   ┌───────────────┐ │                      │
│                    │   │ Password      │ │                      │
│                    │   └───────────────┘ │                      │
│                    │                     │                      │
│                    │   [   Sign In    ]  │                      │
│                    │                     │                      │
│                    │   Forgot password?  │                      │
│                    │                     │                      │
│                    └─────────────────────┘                      │
│                                                                 │
│                                                                 │
│                    ← Back to website                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Background: #0A0A0A
Card: #141414 with subtle border
Accent: Gold (#D4AF37)
```

---

---

# ADMIN PANEL STRUCTURE

## Route Structure
```
/admin
├── /login                 → Login page
├── /dashboard             → Overview & metrics (default)
├── /subscribers           → Newsletter subscribers
├── /ebook-downloads       → E-book download leads
├── /messages              → Contact form submissions
├── /testimonials          → Manage testimonials
│   ├── /new               → Create testimonial
│   └── /[id]/edit         → Edit testimonial
├── /articles              → Newsletter articles
│   ├── /new               → Create article
│   └── /[id]/edit         → Edit article
├── /faqs                  → FAQ management
├── /packages              → Coaching packages
├── /speaking              → Speaking topics
├── /announcements         → Site announcements
├── /assessments           → Self-assessment results
└── /settings              → Admin settings
```

---

## Layout Structure

### Desktop Layout (1024px+)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  HEADER (Fixed)                                                             │
│  Logo                              Search         Notifications    Profile  │
├──────────────┬──────────────────────────────────────────────────────────────┤
│              │                                                              │
│  SIDEBAR     │  MAIN CONTENT AREA                                           │
│  (Fixed)     │                                                              │
│              │  Page Title                              [Action Button]     │
│  Dashboard   │  ───────────────────────────────────────────────────────     │
│  ──────────  │                                                              │
│              │                                                              │
│  DATA        │  ┌─────────────────────────────────────────────────────┐    │
│  Subscribers │  │                                                     │    │
│  Downloads   │  │                                                     │    │
│  Messages    │  │                     CONTENT                         │    │
│  Assessments │  │                                                     │    │
│  ──────────  │  │                                                     │    │
│              │  │                                                     │    │
│  CONTENT     │  └─────────────────────────────────────────────────────┘    │
│  Testimonials│                                                              │
│  Articles    │                                                              │
│  FAQs        │                                                              │
│  Packages    │                                                              │
│  Speaking    │                                                              │
│  ──────────  │                                                              │
│              │                                                              │
│  SITE        │                                                              │
│  Announce-   │                                                              │
│  ments       │                                                              │
│  ──────────  │                                                              │
│              │                                                              │
│  Settings    │                                                              │
│              │                                                              │
├──────────────┴──────────────────────────────────────────────────────────────┤
│  © 2026 VIP TL Admin                                        v1.0.0          │
└─────────────────────────────────────────────────────────────────────────────┘

Sidebar width: 260px
Main content: calc(100% - 260px)
Header height: 64px
```

### Mobile Layout (<1024px)
```
┌─────────────────────────────────────┐
│  ☰   VIPTL Admin        🔔  👤      │  ← Header with hamburger
├─────────────────────────────────────┤
│                                     │
│  Page Title                         │
│  ─────────────────────────────────  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │         CONTENT             │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│                                     │  ← Slide-out drawer
│  SIDEBAR CONTENT                    │     (overlay)
│  ...                                │
│                                     │
└─────────────────────────────────────┘
```

---

---

# DASHBOARD PAGE

**Route:** `/admin/dashboard`

## Purpose
Quick overview of key metrics and recent activity. Personalized greeting for Coach Wayne.

## Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Good morning, Wayne                                    January 25, 2026    │
│  Here's what's happening with VIP Transformative Living                     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ 👥          │  │ 📘          │  │ 💬          │  │ 📊          │        │
│  │             │  │             │  │             │  │             │        │
│  │    1,247    │  │     89      │  │      5      │  │    342      │        │
│  │             │  │             │  │             │  │             │        │
│  │ Subscribers │  │  E-book     │  │  Unread     │  │ Assessments │        │
│  │ +23 this wk │  │  Downloads  │  │  Messages   │  │ This Month  │        │
│  │             │  │  +12 this wk│  │             │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────┐  ┌────────────────────────────────┐│
│  │                                    │  │                                ││
│  │  SUBSCRIBER GROWTH                 │  │  RECENT MESSAGES               ││
│  │  ─────────────────                 │  │  ────────────────              ││
│  │                                    │  │                                ││
│  │  [Line chart showing growth        │  │  ● John D. - Coaching inquiry  ││
│  │   over past 30 days]               │  │    2 hours ago                 ││
│  │                                    │  │                                ││
│  │         📈                         │  │  ● Sarah M. - Speaking request ││
│  │        /                           │  │    5 hours ago                 ││
│  │       /                            │  │                                ││
│  │      /                             │  │  ● Mike R. - General question  ││
│  │  ___/                              │  │    Yesterday                   ││
│  │                                    │  │                                ││
│  │  Jan 1        Jan 15        Jan 25 │  │  [View All →]                  ││
│  │                                    │  │                                ││
│  └────────────────────────────────────┘  └────────────────────────────────┘│
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────┐  ┌────────────────────────────────┐│
│  │                                    │  │                                ││
│  │  QUICK ACTIONS                     │  │  CONTENT STATUS                ││
│  │  ─────────────                     │  │  ──────────────                ││
│  │                                    │  │                                ││
│  │  [+ New Article    ]               │  │  📝 12 Published Articles      ││
│  │                                    │  │   2 Drafts                     ││
│  │  [+ New Testimonial]               │  │                                ││
│  │                                    │  │  ⭐ 8 Published Testimonials   ││
│  │  [+ New Announcement]              │  │   3 Featured                   ││
│  │                                    │  │                                ││
│  │  [Export Subscribers]              │  │  ❓ 15 Published FAQs          ││
│  │                                    │  │                                ││
│  └────────────────────────────────────┘  └────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Metric Cards Data

| Card | Primary Metric | Secondary Metric |
|------|----------------|------------------|
| Subscribers | Total count | Change this week (↑23) |
| E-book Downloads | Total count | Downloads this week |
| Unread Messages | Count of is_read=false | Red badge if > 0 |
| Assessments | Completions this month | Optional: trend |

## Chart: Subscriber Growth
- Line chart showing daily subscriber count for past 30 days
- X-axis: Dates
- Y-axis: Cumulative subscribers
- Gold line color (#D4AF37)
- Subtle grid lines

## Quick Actions
Direct links to most common tasks:
- New Article → `/admin/articles/new`
- New Testimonial → `/admin/testimonials/new`
- New Announcement → `/admin/announcements`
- Export Subscribers → Triggers CSV download

---

---

# SUBSCRIBERS PAGE

**Route:** `/admin/subscribers`

## Purpose
View, search, filter, and export newsletter subscribers.

## Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Newsletter Subscribers                                   [Export CSV ↓]   │
│  1,247 total subscribers                                                    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────┐  ┌──────────┐  ┌──────────┐               │
│  │ 🔍 Search by email or name  │  │ Source ▼ │  │ Status ▼ │               │
│  └─────────────────────────────┘  └──────────┘  └──────────┘               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  □  EMAIL                 NAME           SOURCE      DATE        ● │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │  □  john@example.com      John Doe       Website     Jan 24, 2026  ● │   │
│  │  □  mike@example.com      Mike Smith     E-book      Jan 23, 2026  ● │   │
│  │  □  sarah@example.com     Sarah Jones    Website     Jan 22, 2026  ○ │   │
│  │  □  david@example.com     —              Website     Jan 21, 2026  ● │   │
│  │  □  robert@example.com    Robert Brown   E-book      Jan 20, 2026  ● │   │
│  │  ...                                                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ← Previous    Page 1 of 125    Next →        Showing 10 per page [▼]      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

● = Active (green)
○ = Unsubscribed (gray)
```

## Features

### Search
- Real-time search by email or name
- Debounced (300ms) to prevent excessive queries

### Filters
- **Source:** All, Website, E-book, Manual
- **Status:** All, Active, Unsubscribed

### Table Columns
| Column | Description |
|--------|-------------|
| Checkbox | For bulk selection |
| Email | Subscriber email |
| Name | First name if provided |
| Source | Where they signed up |
| Date | Subscription date |
| Status | Active/Unsubscribed indicator |

### Actions
- **Export CSV:** Download filtered results as CSV
- **Bulk Actions:** Select multiple → Delete (with confirmation)

### Row Actions (on hover or via menu)
- View details (modal)
- Delete subscriber (with confirmation)

### Pagination
- 10, 25, 50, 100 per page options
- Previous/Next navigation
- Page number display

---

---

# E-BOOK DOWNLOADS PAGE

**Route:** `/admin/ebook-downloads`

## Purpose
View leads who downloaded e-books.

## Layout
Similar to Subscribers page with these differences:

### Table Columns
| Column | Description |
|--------|-------------|
| Email | Lead email |
| Name | Full name |
| E-book | Which e-book downloaded |
| Date | Download date |

### Filters
- **E-book:** All, Breaking Free, Warrior Brain, etc.
- **Date Range:** Last 7 days, 30 days, 90 days, Custom

### Features
- Export to CSV
- View download trends by e-book (small chart)

---

---

# CONTACT MESSAGES PAGE

**Route:** `/admin/messages`

## Purpose
Inbox-style interface for contact form submissions.

## Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Contact Messages                                        [Mark All Read]    │
│  5 unread messages                                                          │
│                                                                             │
├────────────────────────┬────────────────────────────────────────────────────┤
│                        │                                                    │
│  INBOX                 │  MESSAGE DETAIL                                    │
│  ──────                │                                                    │
│                        │  From: John Doe                                    │
│  ● John Doe            │  Email: john@example.com                           │
│    Coaching inquiry    │  Phone: (555) 123-4567                             │
│    2 hours ago         │  Subject: Coaching inquiry                         │
│                        │  Received: January 25, 2026 at 10:30 AM            │
│  ● Sarah Miller        │                                                    │
│    Speaking request    │  ────────────────────────────────────────────────  │
│    5 hours ago         │                                                    │
│                        │  Hi Coach Wayne,                                   │
│  ○ Mike Roberts        │                                                    │
│    General question    │  I've been following your content for a few months │
│    Yesterday           │  and I'm really resonating with the VIP Framework. │
│                        │  I'm at a crossroads in my career and think I      │
│  ○ David Chen          │  might benefit from coaching.                      │
│    Partnership         │                                                    │
│    Jan 22              │  Could we schedule a call to discuss?              │
│                        │                                                    │
│  ○ Emily Watson        │  Thanks,                                           │
│    Media inquiry       │  John                                              │
│    Jan 20              │                                                    │
│                        │  ────────────────────────────────────────────────  │
│  ──────                │                                                    │
│                        │  ADMIN NOTES                                       │
│  [Archived]            │  ┌────────────────────────────────────────────┐   │
│                        │  │ Add a note about this message...           │   │
│                        │  └────────────────────────────────────────────┘   │
│                        │                                                    │
│                        │  [Reply via Email]  [Archive]  [Delete]            │
│                        │                                                    │
└────────────────────────┴────────────────────────────────────────────────────┘

● = Unread (gold dot)
○ = Read
```

## Features

### Inbox List (Left Panel)
- Sorted by date (newest first)
- Unread messages have gold indicator
- Shows: Name, Subject, Time ago
- Click to view details

### Message Detail (Right Panel)
- Full message content
- Contact information
- Admin notes field (saved per message)
- Action buttons

### Actions
- **Reply via Email:** Opens mailto: link with pre-filled To address
- **Archive:** Moves to archived (hidden from main view)
- **Delete:** Permanently removes (with confirmation)

### Filters
- **Status:** All, Unread, Read, Archived
- **Subject:** All, Coaching, Speaking, Media, Partnership, General

---

---

# TESTIMONIALS PAGE

**Route:** `/admin/testimonials`

## Purpose
CRUD interface for managing testimonials.

## List View
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Testimonials                                           [+ New Testimonial] │
│  8 published · 2 drafts                                                     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                    │
│  │ All (10) │  │ Featured │  │ Video    │  │ Drafts   │                    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘                    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ⋮⋮  ┌─────┐  James K.                    Career    ★ Featured     │   │
│  │      │ ▶️  │  Business Owner, Chicago      Gold      ● Published   │   │
│  │      └─────┘  "Coach Wayne helped me see what I couldn't..."        │   │
│  │               ───────────────────────────────────    [Edit] [···]   │   │
│  │                                                                     │   │
│  │  ⋮⋮  ┌─────┐  Marcus T.                   Career    ☆              │   │
│  │      │     │  VP of Operations             Gold      ● Published   │   │
│  │      └─────┘  "I was a successful executive who'd lost his fire..." │   │
│  │               ───────────────────────────────────    [Edit] [···]   │   │
│  │                                                                     │   │
│  │  ⋮⋮  ┌─────┐  David R.                    Identity  ☆              │   │
│  │      │ ▶️  │  Entrepreneur                 Platinum  ○ Draft       │   │
│  │      └─────┘  "I thought coaching was just expensive advice..."     │   │
│  │               ───────────────────────────────────    [Edit] [···]   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ⋮⋮ = Drag handle for reordering                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Features

### List Features
- **Drag & Drop Reordering:** Change display order
- **Quick Filters:** All, Featured, Video, Drafts
- **Visual Indicators:** Video icon, Featured star, Status badge

### Row Actions (··· menu)
- Edit
- Toggle Featured
- Toggle Published
- Duplicate
- Delete

---

## Create/Edit View

**Route:** `/admin/testimonials/new` or `/admin/testimonials/[id]/edit`

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ← Back to Testimonials                      [Save Draft]  [Publish]        │
│                                                                             │
│  New Testimonial                                                            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CLIENT INFORMATION                                                         │
│  ─────────────────                                                          │
│                                                                             │
│  Client Name *                          Client Title                        │
│  ┌─────────────────────────────┐       ┌─────────────────────────────┐     │
│  │ James K.                    │       │ Business Owner              │     │
│  └─────────────────────────────┘       └─────────────────────────────┘     │
│                                                                             │
│  Location                               Package Type                        │
│  ┌─────────────────────────────┐       ┌─────────────────────────────┐     │
│  │ Chicago, IL                 │       │ Gold                      ▼ │     │
│  └─────────────────────────────┘       └─────────────────────────────┘     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TESTIMONIAL CONTENT                                                        │
│  ───────────────────                                                        │
│                                                                             │
│  Quote * (Main testimonial - displayed on cards)                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Coach Wayne helped me see what I couldn't see in myself. I went     │   │
│  │ from feeling stuck to leading with clarity and confidence.          │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  143 / 300 characters recommended                                          │
│                                                                             │
│  Full Story (Optional - expanded view)                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ I came to Wayne at rock bottom. My marriage was falling apart...    │   │
│  │                                                                     │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  VIDEO (Optional)                                                           │
│  ───────────────                                                            │
│                                                                             │
│  □ This testimonial has a video                                             │
│                                                                             │
│  YouTube URL                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ https://www.youtube.com/watch?v=...                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Preview:  ┌──────────────────┐                                            │
│            │                  │                                            │
│            │    [▶️ Video]     │                                            │
│            │                  │                                            │
│            └──────────────────┘                                            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CATEGORIZATION & DISPLAY                                                   │
│  ────────────────────────                                                   │
│                                                                             │
│  Category                                                                   │
│  ○ General  ○ Career  ○ Relationships  ○ Identity  ○ Purpose               │
│                                                                             │
│  Display Settings                                                           │
│  ☑ Show on Coaching page                                                    │
│  ☐ Show on Homepage                                                         │
│  ☐ Mark as Featured (shows with star, prioritized)                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                                              [Delete]  [Save Draft] [Publish]│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Form Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| client_name | text | Yes | Full name displayed |
| client_title | text | No | Professional title |
| client_location | text | No | City, State |
| package_type | select | No | Silver/Gold/Platinum |
| quote | textarea | Yes | Main testimonial (300 char recommended) |
| full_story | textarea | No | Longer version |
| has_video | checkbox | No | Enables video fields |
| video_url | url | If has_video | YouTube URL |
| category | radio | Yes | General, Career, etc. |
| show_on_coaching | checkbox | No | Default: true |
| show_on_homepage | checkbox | No | Default: false |
| is_featured | checkbox | No | Adds to featured list |

---

---

# NEWSLETTER ARTICLES PAGE

**Route:** `/admin/articles`

## Purpose
Create and manage newsletter articles that display on the website.

## List View
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Newsletter Articles                                        [+ New Article] │
│  12 published · 2 drafts                                                    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ All (14) │  │ Published│  │ Drafts   │  │ Career   │  │ Mindset  │ ...  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌───────┐  The Question Every Stuck Professional Avoids           │   │
│  │  │ IMG   │  Career · 5 min read · 1,234 views                       │   │
│  │  └───────┘  Published Jan 16, 2026                   ● Published    │   │
│  │             ─────────────────────────────────────    [Edit] [···]   │   │
│  │                                                                     │   │
│  │  ┌───────┐  Why Your Partner Can't Fix Your Emptiness              │   │
│  │  │ IMG   │  Relationships · 4 min read · 892 views                  │   │
│  │  └───────┘  Published Jan 9, 2026                    ● Published    │   │
│  │             ─────────────────────────────────────    [Edit] [···]   │   │
│  │                                                                     │   │
│  │  ┌───────┐  Redefining Success After 40 (Draft)                    │   │
│  │  │ IMG   │  Purpose · — min read                                    │   │
│  │  └───────┘  Last edited Jan 24, 2026                 ○ Draft       │   │
│  │             ─────────────────────────────────────    [Edit] [···]   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Create/Edit View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ← Back to Articles                         [Preview]  [Save Draft] [Publish]│
│                                                                             │
│  New Article                                                                │
│                                                                             │
├────────────────────────────────────────────────────┬────────────────────────┤
│                                                    │                        │
│  ARTICLE CONTENT                                   │  SETTINGS              │
│  ───────────────                                   │  ────────              │
│                                                    │                        │
│  Title *                                           │  Status                │
│  ┌────────────────────────────────────────────┐   │  ○ Draft               │
│  │ The Question Every Stuck Professional...   │   │  ○ Published           │
│  └────────────────────────────────────────────┘   │                        │
│                                                    │  ────────              │
│  Slug                                              │                        │
│  ┌────────────────────────────────────────────┐   │  Category *            │
│  │ the-question-every-stuck-professional      │   │  ┌──────────────────┐ │
│  └────────────────────────────────────────────┘   │  │ Career         ▼ │ │
│  viptransformativeliving.com/newsletter/[slug]    │  └──────────────────┘ │
│                                                    │                        │
│  Excerpt (for previews) *                          │  ────────              │
│  ┌────────────────────────────────────────────┐   │                        │
│  │ There's a question that could unlock       │   │  Featured Image        │
│  │ everything for you. But you're probably... │   │  ┌──────────────────┐ │
│  └────────────────────────────────────────────┘   │  │                  │ │
│  145 / 200 characters                              │  │   [Upload or     │ │
│                                                    │  │    paste URL]    │ │
│  Content *                                         │  │                  │ │
│  ┌────────────────────────────────────────────┐   │  └──────────────────┘ │
│  │ [B] [I] [H1] [H2] ["] [🔗] [📷] [—]        │   │                        │
│  ├────────────────────────────────────────────┤   │  Image Alt Text        │
│  │                                            │   │  ┌──────────────────┐ │
│  │ Most professionals I work with have a      │   │  │                  │ │
│  │ question they've been avoiding. It's not   │   │  └──────────────────┘ │
│  │ complicated. It's not even original.       │   │                        │
│  │                                            │   │  ────────              │
│  │ But it's terrifying:                       │   │                        │
│  │                                            │   │  SEO                   │
│  │ **"What do I actually want?"**             │   │                        │
│  │                                            │   │  Meta Title            │
│  │ Not what you should want...                │   │  ┌──────────────────┐ │
│  │                                            │   │  │                  │ │
│  │                                            │   │  └──────────────────┘ │
│  │                                            │   │  55 / 60 characters   │
│  │                                            │   │                        │
│  └────────────────────────────────────────────┘   │  Meta Description      │
│                                                    │  ┌──────────────────┐ │
│  Word count: 847 · Est. reading time: 4 min       │  │                  │ │
│                                                    │  └──────────────────┘ │
│                                                    │  145 / 160 characters │
│                                                    │                        │
└────────────────────────────────────────────────────┴────────────────────────┘
```

## Editor Features
- Rich text editor (Markdown or WYSIWYG)
- Bold, Italic, Headers (H2, H3)
- Block quotes
- Links
- Images (upload or URL)
- Horizontal divider
- Preview mode
- Auto-save drafts

---

---

# FAQS PAGE

**Route:** `/admin/faqs`

## Purpose
Manage FAQ questions and answers with drag-drop reordering.

## Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  FAQs                                                          [+ New FAQ] │
│  15 published FAQs                                                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Filter by category:  [All ▼]                                              │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ABOUT COACHING                                               [+ Add FAQ]   │
│  ───────────────                                                            │
│                                                                             │
│  ⋮⋮  How is this different from therapy?                    [Edit] [···]   │
│  ⋮⋮  How is this different from other coaching?             [Edit] [···]   │
│  ⋮⋮  I've tried coaching before and it didn't work...       [Edit] [···]   │
│                                                                             │
│  ABOUT THE PROCESS                                            [+ Add FAQ]   │
│  ─────────────────                                                          │
│                                                                             │
│  ⋮⋮  How do sessions work?                                  [Edit] [···]   │
│  ⋮⋮  What if I need to reschedule?                          [Edit] [···]   │
│  ⋮⋮  What happens between sessions?                         [Edit] [···]   │
│  ⋮⋮  How long until I see results?                          [Edit] [···]   │
│                                                                             │
│  ABOUT INVESTMENT                                             [+ Add FAQ]   │
│  ────────────────                                                           │
│                                                                             │
│  ⋮⋮  Why does coaching cost this much?                      [Edit] [···]   │
│  ⋮⋮  Do you offer refunds?                                  [Edit] [···]   │
│  ⋮⋮  Can I upgrade from Silver to Gold?                     [Edit] [···]   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Features
- Grouped by category
- Drag-drop reordering within categories
- Inline edit or modal edit
- Toggle published/unpublished
- Specify which pages to display on

## Edit Modal
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Edit FAQ                                               [✕]     │
│                                                                 │
│  ───────────────────────────────────────────────────────────── │
│                                                                 │
│  Question *                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ How is this different from therapy?                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Answer *                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Therapy typically focuses on healing past trauma...     │   │
│  │                                                         │   │
│  │ I'm not a therapist, and coaching isn't a replacement   │   │
│  │ for therapy...                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│  Supports Markdown formatting                                   │
│                                                                 │
│  Category                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ About Coaching                                        ▼ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Show on pages:                                                 │
│  ☑ Coaching page                                                │
│  ☐ Contact page                                                 │
│  ☐ Resources page                                               │
│                                                                 │
│  ───────────────────────────────────────────────────────────── │
│                                                                 │
│                            [Cancel]  [Save]                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

---

# PACKAGES PAGE

**Route:** `/admin/packages`

## Purpose
Edit coaching package details, pricing, and features.

## Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Coaching Packages                                                          │
│  Edit pricing and package details                                           │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────┐ │
│  │                       │ │         ★             │ │                   │ │
│  │       SILVER          │ │        GOLD           │ │     PLATINUM      │ │
│  │                       │ │                       │ │                   │ │
│  │   Rapid Relief        │ │  Career Breakthrough  │ │ Complete Transform│ │
│  │                       │ │                       │ │                   │ │
│  │   $200/session        │ │       $2,400          │ │      $3,600       │ │
│  │   Up to 4 sessions    │ │      8 weeks          │ │     12 weeks      │ │
│  │                       │ │                       │ │                   │ │
│  │   ● Published         │ │   ● Published         │ │   ● Published     │ │
│  │                       │ │                       │ │                   │ │
│  │      [Edit]           │ │       [Edit]          │ │      [Edit]       │ │
│  │                       │ │                       │ │                   │ │
│  └───────────────────────┘ └───────────────────────┘ └───────────────────┘ │
│                                                                             │
│  Note: Package structure is fixed. You can edit pricing, descriptions,     │
│  and features but cannot add or remove packages.                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Edit Modal
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Edit Gold Package                                                  [✕]     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  BASIC INFO                                                                 │
│  ──────────                                                                 │
│                                                                             │
│  Tagline                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Career Breakthrough                                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Description                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ For men ready to transform their career trajectory with clarity...  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PRICING                                                                    │
│  ───────                                                                    │
│                                                                             │
│  Total Price              Payment Plan Amount       # of Installments       │
│  ┌─────────────────┐     ┌─────────────────┐      ┌─────────────────┐      │
│  │ $ 2,400         │     │ $ 1,250         │      │ 2               │      │
│  └─────────────────┘     └─────────────────┘      └─────────────────┘      │
│                                                                             │
│  Fast Action Price        Fast Action Savings                               │
│  ┌─────────────────┐     ┌─────────────────┐                               │
│  │ $ 2,200         │     │ $ 200           │  (auto-calculated)            │
│  └─────────────────┘     └─────────────────┘                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FEATURES (drag to reorder)                                                 │
│  ──────────────────────────                                                 │
│                                                                             │
│  ⋮⋮  ☑ 8 weekly one-on-one sessions (60 min each)              [✕]        │
│  ⋮⋮  ☑ Comprehensive career assessment                         [✕]        │
│  ⋮⋮  ☑ Zone of Genius identification                           [✕]        │
│  ⋮⋮  ☑ Impact Statement creation                                [✕]        │
│  ⋮⋮  ☑ Email support between sessions                           [✕]        │
│                                                                             │
│  [+ Add Feature]                                                            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  BONUSES                                                                    │
│  ───────                                                                    │
│                                                                             │
│  ⋮⋮  Access to resume & LinkedIn experts                       [✕]        │
│  ⋮⋮  "Five Years to Freedom" E-book                             [✕]        │
│                                                                             │
│  [+ Add Bonus]                                                              │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DISPLAY SETTINGS                                                           │
│  ────────────────                                                           │
│                                                                             │
│  ☑ Mark as Featured ("Most Popular" badge)                                 │
│  Badge text: ┌────────────────┐                                            │
│              │ Most Popular   │                                            │
│              └────────────────┘                                            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                                              [Cancel]  [Save Changes]       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

---

# SPEAKING TOPICS PAGE

**Route:** `/admin/speaking`

## Purpose
Manage speaking engagement topics.

## Layout
Similar to FAQs but for speaking topics:

- List of topics with drag-drop reordering
- Edit modal for each topic
- Fields: title, tagline, description, audience type, duration, format, key takeaways
- Toggle featured/published

---

---

# ANNOUNCEMENTS PAGE

**Route:** `/admin/announcements`

## Purpose
Create and schedule site-wide announcements/banners.

## Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Site Announcements                                     [+ New Announcement]│
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ACTIVE ANNOUNCEMENTS                                                       │
│  ────────────────────                                                       │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🟢 PROMO                                                            │   │
│  │                                                                     │   │
│  │ "New Year Special: Book your Discovery Call this week and get 20%   │   │
│  │  off any coaching package!"                                         │   │
│  │                                                                     │   │
│  │ Link: Book Now → /book                                              │   │
│  │ Showing: All pages · Until: Jan 31, 2026                            │   │
│  │                                                          [Edit] [✕] │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  SCHEDULED                                                                  │
│  ─────────                                                                  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🟡 EVENT                                                            │   │
│  │                                                                     │   │
│  │ "Join Coach Wayne's free webinar: 'Breaking Free in 2026'"          │   │
│  │                                                                     │   │
│  │ Starts: Feb 1, 2026 · Ends: Feb 15, 2026                            │   │
│  │                                                          [Edit] [✕] │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  INACTIVE                                                                   │
│  ────────                                                                   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ⚪ INFO                                                              │   │
│  │ "Welcome to the new VIP TL website!"                                │   │
│  │ Ended: Jan 15, 2026                               [Reactivate] [✕] │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Create/Edit Modal

Fields:
- Message text
- Link text & URL
- Type (Info, Promo, Urgent, Event)
- Position (Top, Bottom)
- Is dismissible (checkbox)
- Start date
- End date (optional)
- Show on specific pages OR all pages

---

---

# SELF-ASSESSMENT RESULTS PAGE

**Route:** `/admin/assessments`

## Purpose
View self-assessment completions (future feature — placeholder for now).

## Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Self-Assessment Results                                    [Export CSV ↓]  │
│  342 completions this month                                                 │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ALIGNMENT DISTRIBUTION                                             │   │
│  │                                                                     │   │
│  │  ████████████████████░░░░░░░░░░  High (45%)                        │   │
│  │  ██████████████░░░░░░░░░░░░░░░░  Moderate (35%)                    │   │
│  │  ████████░░░░░░░░░░░░░░░░░░░░░░  Low (20%)                         │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Recent Results                                                             │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  EMAIL              NAME        V    I    P   OVERALL   DATE        │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │  john@email.com     John D.     72   68   81    74      Jan 25      │   │
│  │  mike@email.com     —           65   70   60    65      Jan 24      │   │
│  │  sarah@email.com    Sarah M.    80   85   78    81      Jan 24      │   │
│  │  ...                                                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Note: Email is only captured if user opts to receive results by email.    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

---

# SETTINGS PAGE

**Route:** `/admin/settings`

## Purpose
Admin profile and preferences.

## Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Settings                                                                   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROFILE                                                                    │
│  ───────                                                                    │
│                                                                             │
│  Name                               Email                                   │
│  ┌─────────────────────────┐       ┌─────────────────────────────────────┐ │
│  │ Wayne Dawson            │       │ wayne@viptransformativeliving.com   │ │
│  └─────────────────────────┘       └─────────────────────────────────────┘ │
│                                                                             │
│  [Update Profile]                                                           │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SECURITY                                                                   │
│  ────────                                                                   │
│                                                                             │
│  [Change Password]                                                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DATA EXPORT                                                                │
│  ───────────                                                                │
│                                                                             │
│  Export all subscriber data    [Download CSV]                               │
│  Export all contact messages   [Download CSV]                               │
│  Export all e-book downloads   [Download CSV]                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ACTIVITY LOG                                                               │
│  ────────────                                                               │
│                                                                             │
│  View recent admin activity    [View Log →]                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

---

# DESIGN SYSTEM

## Color Palette (Admin Panel)

The admin panel uses a variation of the main site palette optimized for productivity:

```css
/* Backgrounds */
--admin-bg-primary: #0F0F0F;        /* Main background */
--admin-bg-secondary: #171717;       /* Sidebar, cards */
--admin-bg-tertiary: #1F1F1F;        /* Elevated elements */
--admin-bg-hover: #262626;           /* Hover states */

/* Borders */
--admin-border: #2A2A2A;
--admin-border-hover: #3A3A3A;

/* Text */
--admin-text-primary: #F5F5F5;
--admin-text-secondary: #A3A3A3;
--admin-text-muted: #737373;

/* Accent (Gold) */
--admin-accent: #D4AF37;
--admin-accent-hover: #E5C35A;
--admin-accent-muted: rgba(212, 175, 55, 0.1);

/* Status Colors */
--admin-success: #22C55E;
--admin-warning: #F59E0B;
--admin-error: #EF4444;
--admin-info: #3B82F6;
```

## Typography

```css
/* Font */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Sizes */
--admin-text-xs: 12px;
--admin-text-sm: 13px;
--admin-text-base: 14px;
--admin-text-lg: 16px;
--admin-text-xl: 18px;
--admin-text-2xl: 20px;
--admin-text-3xl: 24px;

/* Page title: 24px, weight 600 */
/* Section headers: 14px, weight 600, uppercase, letter-spacing 0.05em */
/* Body text: 14px, weight 400 */
/* Labels: 13px, weight 500 */
/* Captions: 12px, weight 400, muted color */
```

## Spacing

```css
--admin-space-1: 4px;
--admin-space-2: 8px;
--admin-space-3: 12px;
--admin-space-4: 16px;
--admin-space-5: 20px;
--admin-space-6: 24px;
--admin-space-8: 32px;
--admin-space-10: 40px;
--admin-space-12: 48px;
```

## Component Styles

### Buttons
```css
/* Primary Button */
.admin-btn-primary {
  background: #D4AF37;
  color: #0F0F0F;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  transition: all 0.2s ease;
}
.admin-btn-primary:hover {
  background: #E5C35A;
}

/* Secondary Button */
.admin-btn-secondary {
  background: #262626;
  color: #F5F5F5;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 6px;
  border: 1px solid #3A3A3A;
}
.admin-btn-secondary:hover {
  background: #2A2A2A;
  border-color: #4A4A4A;
}

/* Ghost Button */
.admin-btn-ghost {
  background: transparent;
  color: #A3A3A3;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
}
.admin-btn-ghost:hover {
  background: #262626;
  color: #F5F5F5;
}
```

### Cards
```css
.admin-card {
  background: #171717;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  padding: 20px;
}
```

### Form Inputs
```css
.admin-input {
  background: #171717;
  border: 1px solid #2A2A2A;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  color: #F5F5F5;
  width: 100%;
  transition: border-color 0.2s ease;
}
.admin-input:focus {
  outline: none;
  border-color: #D4AF37;
}
.admin-input::placeholder {
  color: #737373;
}
```

### Tables
```css
.admin-table {
  width: 100%;
  border-collapse: collapse;
}
.admin-table th {
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #737373;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 12px 16px;
  border-bottom: 1px solid #2A2A2A;
}
.admin-table td {
  padding: 16px;
  border-bottom: 1px solid #1F1F1F;
  font-size: 14px;
  color: #F5F5F5;
}
.admin-table tr:hover {
  background: #1A1A1A;
}
```

### Badges
```css
.admin-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}
.admin-badge-success {
  background: rgba(34, 197, 94, 0.1);
  color: #22C55E;
}
.admin-badge-warning {
  background: rgba(245, 158, 11, 0.1);
  color: #F59E0B;
}
.admin-badge-error {
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}
.admin-badge-info {
  background: rgba(212, 175, 55, 0.1);
  color: #D4AF37;
}
```

---

---

# RESPONSIVE BEHAVIOR

## Breakpoints

```css
/* Mobile: < 768px */
/* Tablet: 768px - 1023px */
/* Desktop: >= 1024px */
```

## Layout Changes

### Desktop (≥1024px)
- Fixed sidebar (260px width)
- Main content fills remaining space
- Multi-column layouts for forms
- Tables show all columns

### Tablet (768px - 1023px)
- Collapsible sidebar (icon-only by default, expands on hover)
- Or: Sidebar as overlay
- Forms still multi-column where appropriate
- Tables may hide some columns

### Mobile (<768px)
- Sidebar hidden (hamburger menu to open as overlay)
- Single-column layouts
- Tables become card-based lists
- Modals become full-screen
- Bottom sheet for some actions

## Mobile Table Alternative

Instead of horizontal tables on mobile, use card layout:

```
┌─────────────────────────────────────┐
│  john@example.com                   │
│  John Doe                           │
│  Source: Website                    │
│  Subscribed: Jan 24, 2026       ●   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  mike@example.com                   │
│  Mike Smith                         │
│  Source: E-book                     │
│  Subscribed: Jan 23, 2026       ●   │
└─────────────────────────────────────┘
```

---

---

# COMPONENT LIBRARY

## Required Components

### Layout
- `AdminLayout` — Main layout wrapper with sidebar
- `AdminSidebar` — Navigation sidebar
- `AdminHeader` — Top header with search, notifications, profile
- `PageHeader` — Page title with action buttons

### Data Display
- `DataTable` — Sortable, filterable table with pagination
- `DataCard` — Mobile-friendly alternative to table rows
- `StatCard` — Metric display card for dashboard
- `Chart` — Line/bar chart component (use Recharts or Chart.js)
- `Badge` — Status badges
- `Avatar` — User/client avatars
- `EmptyState` — Empty state placeholder

### Forms
- `Input` — Text input
- `Textarea` — Multi-line input
- `Select` — Dropdown select
- `Checkbox` — Checkbox input
- `Radio` — Radio button group
- `Switch` — Toggle switch
- `DatePicker` — Date selection
- `FileUpload` — Image/file upload
- `RichTextEditor` — Markdown/WYSIWYG editor

### Feedback
- `Modal` — Dialog/modal
- `Drawer` — Slide-out panel
- `Toast` — Notification toasts
- `Alert` — Inline alerts
- `ConfirmDialog` — Confirmation modal

### Navigation
- `Tabs` — Tab navigation
- `Breadcrumb` — Breadcrumb navigation
- `Pagination` — Page navigation
- `DropdownMenu` — Action menu

### Utility
- `Skeleton` — Loading skeleton
- `Spinner` — Loading spinner
- `Tooltip` — Hover tooltips
- `SearchInput` — Search with icon

---

# IMPLEMENTATION NOTES

## Data Fetching

Use React Query (TanStack Query) or SWR for:
- Caching
- Background refetching
- Optimistic updates
- Error handling

```typescript
// Example with React Query
const { data: subscribers, isLoading } = useQuery({
  queryKey: ['subscribers', filters],
  queryFn: () => fetchSubscribers(filters),
});
```

## State Management

For most cases, React Query + React Context is sufficient:
- React Query for server state
- Context for UI state (sidebar open, current theme)
- Local state for form inputs

## File Structure

```
/app
  /admin
    /layout.tsx           → Admin layout wrapper
    /page.tsx             → Redirect to /admin/dashboard
    /login
      /page.tsx           → Login page
    /dashboard
      /page.tsx           → Dashboard
    /subscribers
      /page.tsx           → Subscribers list
    /ebook-downloads
      /page.tsx           → E-book downloads
    /messages
      /page.tsx           → Contact messages
    /testimonials
      /page.tsx           → Testimonials list
      /new/page.tsx       → Create testimonial
      /[id]/edit/page.tsx → Edit testimonial
    /articles
      /page.tsx           → Articles list
      /new/page.tsx       → Create article
      /[id]/edit/page.tsx → Edit article
    /faqs
      /page.tsx           → FAQs management
    /packages
      /page.tsx           → Package editing
    /speaking
      /page.tsx           → Speaking topics
    /announcements
      /page.tsx           → Announcements
    /assessments
      /page.tsx           → Assessment results
    /settings
      /page.tsx           → Settings

/components
  /admin
    /layout
      AdminLayout.tsx
      AdminSidebar.tsx
      AdminHeader.tsx
      PageHeader.tsx
    /ui
      DataTable.tsx
      StatCard.tsx
      ...
    /forms
      TestimonialForm.tsx
      ArticleForm.tsx
      ...

/lib
  /supabase
    client.ts             → Supabase client
    admin.ts              → Admin-specific queries
  /hooks
    useSubscribers.ts
    useTestimonials.ts
    ...
```

---

*End of Admin Panel Development Plan*
