-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Newsletters Table
create table if not exists public.newsletters (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text,
  category text check (category in ('Purpose', 'Identity', 'Values', 'Career', 'Relationships', 'Health', 'Finance')),
  is_published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Testimonials Table
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  title text,
  quote text,
  video_url text,
  photo_url text,
  is_featured boolean default false,
  is_visible boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default now()
);

-- Events Table
create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  event_date timestamp with time zone not null,
  event_time text,
  location text,
  registration_url text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Row Level Security (RLS)
alter table public.newsletters enable row level security;
alter table public.testimonials enable row level security;
alter table public.events enable row level security;

-- Policies (Public Read, Admin Write)
-- Note: Adjust 'authenticated' role or user specific checks as per your auth setup
create policy "Public can view published newsletters" on public.newsletters
  for select using (is_published = true);

create policy "Admins can do everything with newsletters" on public.newsletters
  for all using (auth.role() = 'authenticated'); -- Simplified for single admin

create policy "Public can view visible testimonials" on public.testimonials
  for select using (is_visible = true);

create policy "Admins can do everything with testimonials" on public.testimonials
  for all using (auth.role() = 'authenticated');

create policy "Public can view active events" on public.events
  for select using (is_active = true);

create policy "Admins can do everything with events" on public.events
  for all using (auth.role() = 'authenticated');
