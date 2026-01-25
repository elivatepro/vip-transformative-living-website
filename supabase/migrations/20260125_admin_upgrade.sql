-- Migration to upgrade Admin Panel Schema based on VIPTL-Admin-Panel-Plan.md

-- 1. Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
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

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed_at ON subscribers(subscribed_at);
CREATE INDEX IF NOT EXISTS idx_subscribers_is_active ON subscribers(is_active);

-- 2. E-book Downloads
CREATE TABLE IF NOT EXISTS ebook_downloads (
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

CREATE INDEX IF NOT EXISTS idx_ebook_downloads_email ON ebook_downloads(email);
CREATE INDEX IF NOT EXISTS idx_ebook_downloads_ebook_slug ON ebook_downloads(ebook_slug);
CREATE INDEX IF NOT EXISTS idx_ebook_downloads_downloaded_at ON ebook_downloads(downloaded_at);

-- 3. Contact Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
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

CREATE INDEX IF NOT EXISTS idx_contact_submissions_is_read ON contact_submissions(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_subject ON contact_submissions(subject);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at);

-- 4. Testimonials (Update existing or create)
-- We'll try to ALTER existing table if it exists to add missing columns
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'client_title') THEN
        ALTER TABLE testimonials ADD COLUMN client_title VARCHAR(255);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'client_location') THEN
        ALTER TABLE testimonials ADD COLUMN client_location VARCHAR(100);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'full_story') THEN
        ALTER TABLE testimonials ADD COLUMN full_story TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'has_video') THEN
        ALTER TABLE testimonials ADD COLUMN has_video BOOLEAN DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'video_thumbnail_url') THEN
        ALTER TABLE testimonials ADD COLUMN video_thumbnail_url VARCHAR(500);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'category') THEN
        ALTER TABLE testimonials ADD COLUMN category VARCHAR(50) DEFAULT 'general';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'package_type') THEN
        ALTER TABLE testimonials ADD COLUMN package_type VARCHAR(50);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'display_on_homepage') THEN
        ALTER TABLE testimonials ADD COLUMN display_on_homepage BOOLEAN DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'display_on_coaching') THEN
        ALTER TABLE testimonials ADD COLUMN display_on_coaching BOOLEAN DEFAULT TRUE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'is_published') THEN
        ALTER TABLE testimonials ADD COLUMN is_published BOOLEAN DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'updated_at') THEN
        ALTER TABLE testimonials ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_testimonials_is_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_published ON testimonials(is_published);
CREATE INDEX IF NOT EXISTS idx_testimonials_category ON testimonials(category);
CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);

-- 5. Newsletter Articles (Rename/Map from newsletters)
-- Assuming we stick with 'newsletter_articles' as the new standard. 
-- We can migrate data later or just create the table. 
-- Since 'newsletters' exists, let's create 'newsletter_articles' and user can migrate data if needed, or we just map it.
-- Plan says "newsletter_articles". Let's create it.
CREATE TABLE IF NOT EXISTS newsletter_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url VARCHAR(500),
  featured_image_alt VARCHAR(255),
  category VARCHAR(50) NOT NULL,
  tags TEXT[],
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  reading_time_minutes INT,
  view_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_articles_slug ON newsletter_articles(slug);
CREATE INDEX IF NOT EXISTS idx_newsletter_articles_is_published ON newsletter_articles(is_published);
CREATE INDEX IF NOT EXISTS idx_newsletter_articles_published_at ON newsletter_articles(published_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_articles_category ON newsletter_articles(category);

-- 6. FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'general',
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  show_on_coaching BOOLEAN DEFAULT TRUE,
  show_on_contact BOOLEAN DEFAULT FALSE,
  show_on_resources BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_is_published ON faqs(is_published);
CREATE INDEX IF NOT EXISTS idx_faqs_display_order ON faqs(display_order);

-- 7. Coaching Packages
CREATE TABLE IF NOT EXISTS coaching_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  tagline VARCHAR(255),
  description TEXT NOT NULL,
  price_per_session DECIMAL(10,2),
  total_price DECIMAL(10,2),
  payment_plan_amount DECIMAL(10,2),
  payment_plan_installments INT,
  fast_action_price DECIMAL(10,2),
  fast_action_savings DECIMAL(10,2),
  session_count INT NOT NULL,
  duration_weeks INT NOT NULL,
  features JSONB,
  bonuses JSONB,
  is_featured BOOLEAN DEFAULT FALSE,
  badge_text VARCHAR(50),
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  methodology_name VARCHAR(100),
  methodology_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_coaching_packages_slug ON coaching_packages(slug);
CREATE INDEX IF NOT EXISTS idx_coaching_packages_is_published ON coaching_packages(is_published);

-- 8. Speaking Topics
CREATE TABLE IF NOT EXISTS speaking_topics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  tagline VARCHAR(255),
  description TEXT NOT NULL,
  audience_type VARCHAR(100),
  duration VARCHAR(50),
  format VARCHAR(100),
  key_takeaways JSONB,
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_speaking_topics_slug ON speaking_topics(slug);
CREATE INDEX IF NOT EXISTS idx_speaking_topics_is_published ON speaking_topics(is_published);

-- 9. Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  link_text VARCHAR(100),
  link_url VARCHAR(500),
  type VARCHAR(50) DEFAULT 'info',
  background_color VARCHAR(20),
  text_color VARCHAR(20),
  position VARCHAR(20) DEFAULT 'top',
  is_dismissible BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT FALSE,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  show_on_all_pages BOOLEAN DEFAULT TRUE,
  show_on_pages TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_announcements_is_active ON announcements(is_active);
CREATE INDEX IF NOT EXISTS idx_announcements_start_date ON announcements(start_date);
CREATE INDEX IF NOT EXISTS idx_announcements_end_date ON announcements(end_date);

-- 10. Self Assessment Results
CREATE TABLE IF NOT EXISTS self_assessment_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255),
  first_name VARCHAR(100),
  values_score INT,
  identity_score INT,
  purpose_score INT,
  overall_score INT,
  alignment_level VARCHAR(50),
  responses JSONB,
  recommendations JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_self_assessment_results_email ON self_assessment_results(email);
CREATE INDEX IF NOT EXISTS idx_self_assessment_results_completed_at ON self_assessment_results(completed_at);
CREATE INDEX IF NOT EXISTS idx_self_assessment_results_alignment_level ON self_assessment_results(alignment_level);

-- 11. Site Analytics
CREATE TABLE IF NOT EXISTS site_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  page_path VARCHAR(255) NOT NULL,
  page_views INT DEFAULT 0,
  unique_visitors INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, page_path)
);

CREATE INDEX IF NOT EXISTS idx_site_analytics_date ON site_analytics(date);
CREATE INDEX IF NOT EXISTS idx_site_analytics_page_path ON site_analytics(page_path);

-- 12. Admin Activity Log
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID NOT NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID,
  description TEXT,
  changes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_activity_log_admin_id ON admin_activity_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_entity_type ON admin_activity_log(entity_type);
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_created_at ON admin_activity_log(created_at);

-- Enable RLS
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

-- Policies (Re-apply to ensure)
CREATE POLICY "Public can view published testimonials" ON testimonials FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can view published articles" ON newsletter_articles FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can view published FAQs" ON faqs FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can view published packages" ON coaching_packages FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can view published speaking topics" ON speaking_topics FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can view active announcements" ON announcements FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Anyone can subscribe" ON subscribers FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anyone can download ebook" ON ebook_downloads FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anyone can submit contact form" ON contact_submissions FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anyone can submit assessment" ON self_assessment_results FOR INSERT WITH CHECK (TRUE);

-- Admin policies (Assuming authenticated role is admin for now, or use specific check)
CREATE POLICY "Admin full access to subscribers" ON subscribers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to ebook_downloads" ON ebook_downloads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to contact_submissions" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to newsletter_articles" ON newsletter_articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to coaching_packages" ON coaching_packages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to speaking_topics" ON speaking_topics FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to announcements" ON announcements FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to self_assessment_results" ON self_assessment_results FOR ALL USING (auth.role() = 'authenticated');

-- Functions and Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_subscribers_updated_at ON subscribers;
CREATE TRIGGER update_subscribers_updated_at BEFORE UPDATE ON subscribers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_newsletter_articles_updated_at ON newsletter_articles;
CREATE TRIGGER update_newsletter_articles_updated_at BEFORE UPDATE ON newsletter_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_faqs_updated_at ON faqs;
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_coaching_packages_updated_at ON coaching_packages;
CREATE TRIGGER update_coaching_packages_updated_at BEFORE UPDATE ON coaching_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_speaking_topics_updated_at ON speaking_topics;
CREATE TRIGGER update_speaking_topics_updated_at BEFORE UPDATE ON speaking_topics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_announcements_updated_at ON announcements;
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

