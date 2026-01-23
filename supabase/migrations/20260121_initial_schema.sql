-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Core tables

-- Newsletters
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

-- Testimonials
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

-- Events
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

-- FAQ
CREATE TABLE faq (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT, -- 'coaching', 'pricing', 'general'
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

-- Pricing Tiers
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

-- Row Level Security

-- Enable RLS on all tables
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;

-- Newsletters Policies
CREATE POLICY "Public can view published newsletters" ON newsletters
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admin can view all newsletters" ON newsletters
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can insert newsletters" ON newsletters
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update newsletters" ON newsletters
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete newsletters" ON newsletters
  FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials Policies
CREATE POLICY "Public can view visible testimonials" ON testimonials
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Admin can all testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- Events Policies
CREATE POLICY "Public can view active events" ON events
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can all events" ON events
  FOR ALL USING (auth.role() = 'authenticated');

-- FAQ Policies
CREATE POLICY "Public can view visible faq" ON faq
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Admin can all faq" ON faq
  FOR ALL USING (auth.role() = 'authenticated');

-- Pricing Policies
CREATE POLICY "Public can view active pricing" ON pricing_tiers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can all pricing" ON pricing_tiers
  FOR ALL USING (auth.role() = 'authenticated');

-- Storage Buckets (These usually need to be created via Dashboard or API, but defining policy here if buckets exist)
-- Assuming buckets 'images' and 'videos' are created.

-- Storage Policies (simplified)
-- CREATE POLICY "Public Access Images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
-- CREATE POLICY "Public Access Videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
-- CREATE POLICY "Admin Upload Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
-- CREATE POLICY "Admin Upload Videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos' AND auth.role() = 'authenticated');
