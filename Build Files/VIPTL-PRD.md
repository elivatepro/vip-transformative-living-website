# Product Requirements Document
## VIP Transformative Living — Website Redesign

**Version:** 1.0  
**Date:** January 2026  
**Prepared for:** Coach Wayne Dawson  
**Prepared by:** Boko (Technical Consultant)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Target Audience](#3-target-audience)
4. [Product & Service Offerings](#4-product--service-offerings)
5. [Functional Requirements](#5-functional-requirements)
6. [Pages & Information Architecture](#6-pages--information-architecture)
7. [Admin Dashboard Requirements](#7-admin-dashboard-requirements)
8. [Integration Requirements](#8-integration-requirements)
9. [Content Requirements](#9-content-requirements)
10. [Success Metrics](#10-success-metrics)
11. [Timeline & Milestones](#11-timeline--milestones)
12. [Appendix](#12-appendix)

---

## 1. Executive Summary

VIP Transformative Living (VIP TL) is a life coaching business founded by Wayne Dawson, serving men navigating significant life transitions. This document outlines the requirements for a complete website redesign that will modernize the digital presence, improve user experience, and create a premium, conversion-optimized platform.

### 1.1 Project Goals

- Create a modern, luxury-aesthetic website with dark mode and shimmering gold accents
- Reposition brand messaging to be inclusive (removing age/race-specific language)
- Feature the Self-Assessment tool as the primary lead generation mechanism
- Build a simple admin dashboard for Coach Wayne to manage content
- Optimize for speed using Supabase for media storage and streaming
- Integrate GoHighLevel calendar for booking

### 1.2 Key Stakeholders

| Role | Name | Responsibility |
|------|------|----------------|
| Business Owner | Wayne Dawson | Approval, Content |
| Developer | Boko | Design, Development |

---

## 2. Project Overview

### 2.1 Current State

The existing website is built on GoHighLevel with a dated design, inconsistent branding, and limited functionality. Key issues include:

- Outdated visual design that doesn't reflect premium positioning
- Race and age-specific language limiting audience reach
- No content management capability for Coach Wayne
- Slow media loading due to unoptimized assets
- Inconsistent user experience across pages

### 2.2 Future State

A modern, fast, luxury-aesthetic website that positions VIP TL as a premium coaching brand with:

- Dark mode design with shimmering gold accents (light mode option available)
- Inclusive messaging focused on life stage, not demographics
- Self-Assessment tool as the primary conversion mechanism
- Admin dashboard for easy content management
- Fast-loading media via Supabase CDN
- Seamless GoHighLevel calendar integration

### 2.3 Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend Framework | Next.js 14+ (App Router) |
| Database & Media | Supabase (PostgreSQL + Storage) |
| Authentication | Supabase Auth (Email/Password) |
| Hosting | Vercel |
| CRM & Calendar | GoHighLevel (Calendar widget integration) |
| Forms | Custom forms with webhook to GHL |
| Analytics | GoHighLevel Analytics |

---

## 3. Target Audience

### 3.1 Audience Repositioning

The brand will shift from demographic-specific messaging ("Black men over 40") to psychographic and life-stage focused messaging that is inclusive while still resonating with the core audience.

### 3.2 Primary Audience Profile

- **Life Stage:** Men navigating significant life transitions (midlife, career pivots, relationship changes)
- **Mindset:** Driven, accomplished individuals seeking greater purpose and fulfillment
- **Pain Points:** Feeling stuck, lacking clarity, unfulfilled despite external success
- **Goals:** Alignment of values, identity, and purpose for breakthrough transformation

### 3.3 Recommended Positioning Statements

- **Option A (Recommended):** "For driven men navigating life's pivotal crossroads — career shifts, relationship evolution, or rediscovering purpose."
- **Option B:** "For accomplished men ready to write their next chapter with clarity, confidence, and intention."
- **Option C:** "For men who've achieved success and now seek significance — aligning their values, identity, and purpose."

### 3.4 Secondary Audience

"The women who love them" — partners, spouses, and family members seeking to support men in their lives through transformation.

---

## 4. Product & Service Offerings

### 4.1 Free Resources

| Resource | Description |
|----------|-------------|
| Self-Assessment | External tool (featured prominently as primary CTA) |
| Discovery Call | 30-minute free consultation via GHL calendar |
| E-Book | "Breaking Free: Discovering Your Purpose, Power And Prosperity In Midlife" |
| Newsletter | Weekly content covering career, relationships, health, finance |

### 4.2 Paid Products

**VIDEO COURSE: Breaking Free! — $47** (79% discount from $225)
- 10-module video course
- Bonuses: E-book, Resource Checklist, Cheat Sheet, Mind Map
- Free Discovery Call included

### 4.3 Coaching Packages

#### SILVER: The 5-Step Rapid Relief Breakthrough Blueprint

| Attribute | Details |
|-----------|---------|
| **Price** | $200/session (max 4 sessions) |
| **Fast Action** | $150/session (within 24hrs of Discovery Call) |
| **Duration** | Up to 4 weeks |
| **For** | Men dealing with crisis/problem needing rapid relief strategies |
| **Method** | S.C.O.R.E (Situation, Causes, Outcomes, Resources, Effects) |
| **Includes** | VIP Signature 5-Step Crisis Relief Method, Rapid Assessment |
| **Bonus** | "Breaking Free" E-book |

#### GOLD: The Career Transition Efficiency Blueprint

| Attribute | Details |
|-----------|---------|
| **Price** | $2,400 (pay-in-full) |
| **Payment Plan** | $1,250 x 2 |
| **Fast Action** | $2,200 (within 24hrs of Discovery Call) |
| **Duration** | 8 weeks (1hr/week) |
| **For** | Men seeking career advancement with clarity and confidence |
| **Includes** | Online Assessment, Career Goal Clarification, Job Satisfaction Survey, Obstacle Uncovering, Job/Career Crafting, Zone of Genius Identification, Impact Statement Creation |
| **Bonuses** | Resume/LinkedIn expert access, "Five Years to Freedom" E-book |

#### PLATINUM: The Power, Prosperity and Purpose Transformational Blueprint

| Attribute | Details |
|-----------|---------|
| **Price** | $3,600 (pay-in-full) |
| **Payment Plan** | $1,300 x 3 |
| **Fast Action** | $3,300 (within 24hrs of Discovery Call) |
| **Duration** | 12 weeks (1hr/week) |
| **For** | Men seeking complete transformation in performance, self-esteem, quality of life |
| **7-Step Process** | 1. Online Assessment → 2. Goal Clarification → 3. Boundary Removal → 4. New Behaviors/Skills → 5. Values Reframing → 6. Identity Transformation → 7. Application/Testing |
| **Bonuses** | "Warrior Brain" E-book, "Change Your Money Beliefs" E-book |

### 4.4 Speaking Services

Keynote speaking for corporate clients, non-profits, and private enterprises.

- **Signature Talk:** "Leadership by VIP"
- **Community Talk:** "Dear Father, From MVP to VIP"

---

## 5. Functional Requirements

### 5.1 Public Website Features

| ID | Feature | Priority |
|----|---------|----------|
| FR-001 | Dark/Light mode toggle with system preference detection | P1 - Must Have |
| FR-002 | Video autoplay on scroll/hover with custom player | P1 - Must Have |
| FR-003 | GHL calendar widget embed for booking | P1 - Must Have |
| FR-004 | Custom forms with webhook to GHL | P1 - Must Have |
| FR-005 | Newsletter archive with category filtering | P1 - Must Have |
| FR-006 | Testimonials carousel with video support | P1 - Must Have |
| FR-007 | Pricing page with tier comparison | P1 - Must Have |
| FR-008 | Events/workshops listing | P2 - Should Have |
| FR-009 | SEO optimization (meta, schema, sitemap) | P1 - Must Have |
| FR-010 | Mobile-responsive design (equal to desktop) | P1 - Must Have |

---

## 6. Pages & Information Architecture

### 6.1 Site Map

```
/                           → Home
/about                      → About VIP TL
/about/coach-wayne          → About Coach Wayne
/coaching                   → Coaching Overview
/coaching/pricing           → Pricing Plans
/coaching/silver            → Silver Package
/coaching/gold              → Gold Package
/coaching/platinum          → Platinum Package
/speaking                   → Keynote Speaking
/newsletter                 → Newsletter Archive
/newsletter/[slug]          → Individual Newsletter
/resources                  → Free Resources (E-book, Course)
/events                     → Events & Workshops
/contact                    → Contact Page
/book                       → Booking Page (GHL Calendar)
/admin                      → Admin Dashboard (protected)
```

### 6.2 Homepage Structure

1. **Hero Section:** Full-screen background (`Serene Alpine Meadow Foggy Mountain.jpg`) with dark overlay. Headline + Self-Assessment CTA.
2. **Problem/Solution:** Pain points → VIP Framework introduction.
3. **About Teaser:** Intro to Coach Wayne using `new mr wayne.jpeg` or `Mr Wayne Middle of street at night.jpeg`.
4. **Video Testimonials:** Carousel with autoplay on hover.
5. **Services Overview:** Three pillars (Career, Relationships, Health)
6. **Coaching Packages:** Quick comparison with CTA to pricing
7. **Newsletter Signup:** Email capture with value proposition
8. **Recent Newsletters:** 2-3 latest articles
9. **Final CTA:** Self-Assessment or Book a Call

---

## 7. Admin Dashboard Requirements

### 7.1 Authentication

- Simple email/password login via Supabase Auth
- Single admin user (Coach Wayne)
- Protected routes with middleware

### 7.2 Content Management Features

| Section | Capabilities |
|---------|-------------|
| Newsletters | Create, edit, delete, publish/unpublish, category assignment, rich text editor |
| Testimonials | Add text/video testimonials, client name, title, photo upload, visibility toggle |
| Events | Create events with date, time, location, description, registration link |
| FAQ | Add/edit FAQ items, reorder, category grouping |
| Pricing | Update prices, features, bonuses for each tier |
| Media | Upload images/videos to Supabase, media library view |

### 7.3 UX Requirements for Admin

- Extremely simple and intuitive interface
- Visual preview before publishing
- Drag-and-drop for media uploads
- Clear save/publish status indicators
- Mobile-friendly for quick edits on the go

---

## 8. Integration Requirements

### 8.1 GoHighLevel Integration

| Integration | Method | Purpose |
|-------------|--------|---------|
| Calendar Booking | Embed widget | Discovery call scheduling |
| Contact Form | Webhook to GHL | Lead capture to CRM |
| Newsletter Signup | Webhook to GHL | Add to email list |
| E-book Download | Webhook to GHL | Lead capture + delivery |
| Payments | External Link | Direct to GHL checkout pages |
| Analytics | Script Embed | GHL tracking |

### 8.2 Supabase Configuration

- **Database:** PostgreSQL for all content (newsletters, testimonials, events, FAQ, pricing)
- **Storage:** Buckets for images and videos with CDN delivery
- **Auth:** Admin authentication for dashboard access
- **Row Level Security:** Public read for content, authenticated write for admin

### 8.3 External Links

- **Self-Assessment Tool:** https://viptl-self-assessment-website.vercel.app/
- **Course Checkout:** GHL checkout links (existing)
- **Social Media:** Facebook, LinkedIn, Instagram, X

---

## 9. Content Requirements

### 9.1 Content Migration

- All existing blog posts → Newsletters (relabeled)
- All existing testimonials (text and video)
- Coach Wayne biography and story
- All pricing and package information

### 9.2 New Content Needed

- Refreshed copy with inclusive positioning (removing age/race specifics)
- New hero section messaging
- VIP Framework explanation content
- FAQ content
- Speaking services page content

### 9.3 Media Assets Required

- **Photos of Coach Wayne:** `new mr wayne.jpeg`, `Mr Wayne Middle of street at night.jpeg` (Provided)
- **Backgrounds:** `Serene Alpine Meadow Foggy Mountain.jpg`, `Grassland Near Rocky Mountains.jpg` (Provided)
- **Logos:** `VIP Transformative Living Logo Gold Texture.png` (Provided)
- **Hero Video:** (Optional/Placeholder until finalized)
- **Testimonial Videos:** (Existing)

---

## 10. Success Metrics

### 10.1 Performance Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Performance Score | > 90 |
| Largest Contentful Paint (LCP) | < 2.5 seconds |
| First Input Delay (FID) | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Mobile Responsiveness | 100% functional on all devices |

### 10.2 Business Metrics (Post-Launch)

- Self-Assessment completion rate increase
- Discovery call booking rate increase
- Newsletter signup rate
- Time on site increase
- Bounce rate decrease

---

## 11. Timeline & Milestones

Development begins immediately with active building.

| Phase | Deliverables | Duration |
|-------|--------------|----------|
| Phase 1 | Design system, homepage, core pages | Week 1-2 |
| Phase 2 | Admin dashboard, Supabase setup | Week 2-3 |
| Phase 3 | GHL integration, forms, testing | Week 3-4 |
| Phase 4 | Content migration, polish, launch | Week 4-5 |

---

## 12. Appendix

### 12.1 VIP Framework

- **V** = Values — What drives you
- **I** = Identity — Who you truly are
- **P** = Purpose — Why you exist

*Alignment of these three creates TRANSFORMATIVE BREAKTHROUGH.*

### 12.2 S.C.O.R.E Method (Silver Package)

- **S** = Situation/Symptoms — Define the current state
- **C** = Causes — The "why" behind the situation
- **O** = Outcomes — Desired resource state, preferred action
- **R** = Resources — Internal strength, external skills
- **E** = Effects — Desired ideals after change

### 12.3 Contact Information

- **Business:** VIP Transformative Living LLC
- **Address:** 1451 W. Cypress Creek Road, Suite 300, Fort Lauderdale, FL 33309
- **Phone:** (954) 799-9860
- **Email:** waynedawson@viptransformativeliving.com
- **Hours:** Mon-Fri 9:00am - 5:00pm ET

### 12.4 Social Media

- **Facebook:** facebook.com/VIPTLcoach
- **LinkedIn:** linkedin.com/in/wayne-dawson-tranformational-coach
- **Instagram:** instagram.com/coachwayne.vip
- **X/Twitter:** twitter.com/WayneDVIP
