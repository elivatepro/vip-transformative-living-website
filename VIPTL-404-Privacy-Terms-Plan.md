# VIP Transformative Living
## 404, Privacy Policy & Terms Pages — Design Plan + Content

---

# PAGE 1: 404 NOT FOUND

**URL:** Any invalid route  
**Goal:** Turn a dead end into an opportunity — guide visitors back with warmth and purpose

---

## 404 Page Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                                  404                                        │
│                                                                             │
│                     Looks Like You've Wandered                              │
│                         Off the Path                                        │
│                                                                             │
│                  The page you're looking for doesn't exist,                 │
│                   but your transformation journey can                       │
│                          still begin here.                                  │
│                                                                             │
│                                                                             │
│         ┌─────────────────┐       ┌─────────────────┐                      │
│         │                 │       │                 │                      │
│         │  Go Home        │       │  Book a Call    │                      │
│         │       →         │       │       →         │                      │
│         │                 │       │                 │                      │
│         └─────────────────┘       └─────────────────┘                      │
│                                                                             │
│                                                                             │
│   ───────────────────────────────────────────────────────────────────────  │
│                                                                             │
│                          Or explore these:                                  │
│                                                                             │
│       [About Coach Wayne]    [Coaching Programs]    [Free Assessment]       │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 404 Page Design Specifications

### Background
```css
.page-404 {
  min-height: 100vh;
  background: #0A0A0A;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Subtle gold glow in background */
.page-404::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
  pointer-events: none;
}
```

### 404 Number
```css
.error-code {
  font-family: 'Playfair Display', serif;
  font-size: 180px;
  font-weight: 400;
  color: transparent;
  -webkit-text-stroke: 1px #D4AF37;
  line-height: 1;
  margin-bottom: 24px;
  opacity: 0.6;
}

@media (max-width: 640px) {
  .error-code {
    font-size: 120px;
  }
}
```

### Headline & Subtext
```css
.error-headline {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-weight: 400;
  color: #F5F5F5;
  margin-bottom: 16px;
  max-width: 500px;
}

.error-subtext {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #9CA3AF;
  line-height: 1.6;
  max-width: 400px;
  margin-bottom: 40px;
}

@media (max-width: 640px) {
  .error-headline {
    font-size: 28px;
  }
}
```

### Primary Action Buttons
```css
.error-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
  flex-wrap: wrap;
  justify-content: center;
}

.error-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #D4AF37, #B8860B);
  color: #0A0A0A;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.error-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
}

.error-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: transparent;
  color: #D4AF37;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #D4AF37;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.error-btn-secondary:hover {
  background: rgba(212, 175, 55, 0.1);
}
```

### Secondary Links
```css
.error-links {
  border-top: 1px solid #2A2A2A;
  padding-top: 32px;
}

.error-links-label {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 16px;
}

.error-links-list {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
}

.error-link {
  font-size: 14px;
  color: #9CA3AF;
  text-decoration: none;
  transition: color 0.3s ease;
}

.error-link:hover {
  color: #D4AF37;
}
```

---

## 404 Page Component

**File:** `app/not-found.tsx`

```tsx
// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      {/* 404 Number */}
      <span className="font-serif text-[120px] md:text-[180px] font-normal text-transparent [-webkit-text-stroke:1px_#D4AF37] leading-none mb-6 opacity-60">
        404
      </span>
      
      {/* Headline */}
      <h1 className="font-serif text-[28px] md:text-[36px] text-[#F5F5F5] mb-4 max-w-[500px]">
        Looks Like You've Wandered Off the Path
      </h1>
      
      {/* Subtext */}
      <p className="text-[#9CA3AF] text-base leading-relaxed max-w-[400px] mb-10">
        The page you're looking for doesn't exist, but your transformation journey can still begin here.
      </p>
      
      {/* Primary Actions */}
      <div className="flex gap-4 mb-12 flex-wrap justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(212,175,55,0.3)] transition-all"
        >
          Go Home
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        
        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-[#D4AF37] text-sm font-semibold border border-[#D4AF37] rounded-lg hover:bg-[rgba(212,175,55,0.1)] transition-all"
        >
          Book a Call
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
      
      {/* Secondary Links */}
      <div className="border-t border-[#2A2A2A] pt-8">
        <p className="text-sm text-[#6B7280] mb-4">Or explore these:</p>
        <div className="flex gap-8 flex-wrap justify-center">
          <Link href="/about" className="text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition-colors">
            About Coach Wayne
          </Link>
          <Link href="/coaching" className="text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition-colors">
            Coaching Programs
          </Link>
          <Link href="/assessment" className="text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition-colors">
            Free Assessment
          </Link>
        </div>
      </div>
    </main>
  );
}
```

---

## 404 Mobile Layout

```
┌───────────────────────────────┐
│                               │
│             404               │
│                               │
│    Looks Like You've          │
│    Wandered Off the Path      │
│                               │
│    The page you're looking    │
│    for doesn't exist, but     │
│    your transformation        │
│    journey can still begin    │
│    here.                      │
│                               │
│   ┌─────────────────────────┐│
│   │      Go Home    →       ││
│   └─────────────────────────┘│
│                               │
│   ┌─────────────────────────┐│
│   │     Book a Call  →      ││
│   └─────────────────────────┘│
│                               │
│   ─────────────────────────── │
│                               │
│      Or explore these:        │
│                               │
│     About Coach Wayne         │
│     Coaching Programs         │
│     Free Assessment           │
│                               │
└───────────────────────────────┘
```

---

# PAGE 2: PRIVACY POLICY

**URL:** `/privacy` or `/privacy-policy`  
**Goal:** Legal compliance + maintain brand trust

---

## Privacy Policy Page Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                           LEGAL                                             │
│                                                                             │
│                       Privacy Policy                                        │
│                                                                             │
│                  Last updated: January 27, 2026                             │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   TABLE OF CONTENTS                    │   1. Introduction                  │
│                                        │                                    │
│   1. Introduction                      │   Your privacy is important to     │
│   2. Information We Collect            │   us. This Privacy Policy explains │
│   3. How We Use Your Information       │   how VIP Transformative Living... │
│   4. Information Sharing               │                                    │
│   5. Cookies & Tracking                │   2. Information We Collect        │
│   6. Data Security                     │                                    │
│   7. Your Rights                       │   We collect information you       │
│   8. Third-Party Services              │   provide directly to us...        │
│   9. Children's Privacy                │                                    │
│   10. Changes to This Policy           │   ...                              │
│   11. Contact Us                       │                                    │
│                                        │                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Privacy Policy Design Specifications

### Page Header
```css
.legal-header {
  background: #0A0A0A;
  padding: 80px 24px;
  text-align: center;
  border-bottom: 1px solid #2A2A2A;
}

.legal-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 16px;
}

.legal-title {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 400;
  color: #F5F5F5;
  margin-bottom: 12px;
}

.legal-updated {
  font-size: 14px;
  color: #6B7280;
}

@media (max-width: 768px) {
  .legal-header {
    padding: 60px 24px;
  }
  
  .legal-title {
    font-size: 36px;
  }
}
```

### Content Layout
```css
.legal-content {
  background: #0A0A0A;
  padding: 64px 24px;
}

.legal-container {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 64px;
}

@media (max-width: 900px) {
  .legal-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

### Table of Contents (Sidebar)
```css
.legal-toc {
  position: sticky;
  top: 100px;
  align-self: start;
}

.legal-toc-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6B7280;
  margin-bottom: 16px;
}

.legal-toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.legal-toc-item {
  margin-bottom: 12px;
}

.legal-toc-link {
  font-size: 14px;
  color: #9CA3AF;
  text-decoration: none;
  transition: color 0.3s ease;
}

.legal-toc-link:hover,
.legal-toc-link.active {
  color: #D4AF37;
}

@media (max-width: 900px) {
  .legal-toc {
    position: static;
    background: #141414;
    padding: 24px;
    border-radius: 12px;
  }
}
```

### Main Content
```css
.legal-body {
  color: #D1D5DB;
  line-height: 1.8;
}

.legal-body h2 {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 400;
  color: #F5F5F5;
  margin-top: 48px;
  margin-bottom: 16px;
  padding-top: 24px;
  border-top: 1px solid #2A2A2A;
}

.legal-body h2:first-child {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.legal-body h3 {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #F5F5F5;
  margin-top: 32px;
  margin-bottom: 12px;
}

.legal-body p {
  font-size: 16px;
  margin-bottom: 16px;
}

.legal-body ul,
.legal-body ol {
  margin-bottom: 16px;
  padding-left: 24px;
}

.legal-body li {
  margin-bottom: 8px;
}

.legal-body a {
  color: #D4AF37;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.legal-body a:hover {
  color: #e5c35a;
}
```

---

## Privacy Policy Content

```markdown
# Privacy Policy

**Last updated: January 27, 2026**

---

## 1. Introduction

Your privacy is important to us. This Privacy Policy explains how VIP Transformative Living ("we," "our," or "us") collects, uses, shares, and protects your personal information when you visit our website, use our services, or interact with us.

By using our website or services, you agree to the collection and use of information in accordance with this policy.

---

## 2. Information We Collect

### Information You Provide

We collect information you provide directly to us, including:

- **Contact Information:** Name, email address, phone number
- **Booking Information:** Appointment dates, times, and any notes you share when scheduling a discovery call
- **Communication Data:** Messages, emails, or feedback you send us
- **Assessment Responses:** Answers to self-assessment questionnaires (if applicable)
- **Payment Information:** Billing details processed through secure third-party payment processors (we do not store full credit card numbers)

### Information Collected Automatically

When you visit our website, we may automatically collect:

- **Device Information:** Browser type, operating system, device type
- **Usage Data:** Pages visited, time spent, links clicked
- **Location Data:** General geographic location based on IP address
- **Cookies and Tracking Technologies:** See Section 5 for details

---

## 3. How We Use Your Information

We use the information we collect to:

- Provide, maintain, and improve our coaching services
- Schedule and manage discovery calls and coaching sessions
- Communicate with you about appointments, updates, and relevant content
- Send newsletters and marketing communications (with your consent)
- Respond to your questions and requests
- Analyze website usage to improve user experience
- Comply with legal obligations

We will never sell your personal information to third parties.

---

## 4. Information Sharing

We may share your information in the following circumstances:

### Service Providers

We work with trusted third-party services that help us operate our business:

- **Calendly:** For appointment scheduling
- **Zoom:** For video conferencing
- **Supabase:** For secure data storage
- **Vercel:** For website hosting
- **Email Service Providers:** For newsletters and communications

These providers are contractually obligated to protect your data and use it only for the services they provide to us.

### Legal Requirements

We may disclose your information if required by law, court order, or government request, or to protect our rights, privacy, safety, or property.

### Business Transfers

If VIP Transformative Living is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.

---

## 5. Cookies and Tracking Technologies

### What Are Cookies?

Cookies are small text files stored on your device when you visit a website. They help us understand how you use our site and improve your experience.

### Types of Cookies We Use

- **Essential Cookies:** Required for basic website functionality
- **Analytics Cookies:** Help us understand site usage (e.g., Google Analytics)
- **Marketing Cookies:** Used to deliver relevant advertisements (if applicable)

### Managing Cookies

You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.

### Do Not Track

We currently do not respond to "Do Not Track" browser signals, as there is no industry standard for this feature.

---

## 6. Data Security

We implement appropriate technical and organizational measures to protect your personal information, including:

- Encryption of data in transit (SSL/TLS)
- Secure data storage with access controls
- Regular security assessments
- Limited employee access to personal data

However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.

---

## 7. Your Rights

Depending on your location, you may have the following rights regarding your personal data:

- **Access:** Request a copy of the personal data we hold about you
- **Correction:** Request correction of inaccurate or incomplete data
- **Deletion:** Request deletion of your personal data (subject to legal requirements)
- **Opt-Out:** Unsubscribe from marketing communications at any time
- **Data Portability:** Request your data in a portable format

To exercise any of these rights, please contact us at the email address below.

### California Residents (CCPA)

California residents have additional rights under the California Consumer Privacy Act, including the right to know what personal information is collected and the right to opt out of the sale of personal information. We do not sell personal information.

### European Residents (GDPR)

If you are located in the European Economic Area, you have additional rights under GDPR, including the right to lodge a complaint with a supervisory authority.

---

## 8. Third-Party Services

Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.

### Third-Party Tools We Use

| Service | Purpose | Privacy Policy |
|---------|---------|----------------|
| Calendly | Scheduling | calendly.com/privacy |
| Zoom | Video calls | zoom.us/privacy |
| Google Analytics | Website analytics | policies.google.com/privacy |

---

## 9. Children's Privacy

Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will take steps to delete it promptly.

---

## 10. Changes to This Policy

We may update this Privacy Policy from time to time. When we make changes, we will:

- Update the "Last updated" date at the top of this page
- Notify you via email for significant changes (if you have opted into communications)
- Post the updated policy on our website

We encourage you to review this policy periodically.

---

## 11. Contact Us

If you have any questions about this Privacy Policy or our data practices, please contact us:

**VIP Transformative Living**

Email: privacy@viptransformativeliving.com

Address: [Your Business Address]

We will respond to your inquiry within 30 days.
```

---

# PAGE 3: TERMS AND CONDITIONS

**URL:** `/terms` or `/terms-and-conditions`  
**Goal:** Legal protection + set clear expectations

---

## Terms Page Structure

Same layout as Privacy Policy:
- Header with title and last updated date
- Table of contents sidebar
- Main content area

---

## Terms and Conditions Content

```markdown
# Terms and Conditions

**Last updated: January 27, 2026**

---

## 1. Agreement to Terms

Welcome to VIP Transformative Living. These Terms and Conditions ("Terms") govern your use of our website located at viptransformativeliving.com (the "Site") and any coaching services, programs, or products offered by VIP Transformative Living ("Services").

By accessing our Site or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Site or Services.

---

## 2. Services Description

VIP Transformative Living provides life coaching services designed to help men gain clarity on their values, identity, and purpose. Our Services may include:

- One-on-one coaching sessions (virtual or in-person)
- Discovery calls
- Group coaching programs
- Online courses and workshops
- Self-assessment tools
- Downloadable resources and content

### Coaching Disclaimer

Our coaching services are for personal development and educational purposes only. Coaching is not therapy, counseling, or medical treatment. If you are experiencing mental health issues, please seek help from a licensed mental health professional.

---

## 3. Eligibility

To use our Services, you must:

- Be at least 18 years of age
- Have the legal capacity to enter into binding agreements
- Provide accurate and complete information when requested
- Use the Services for personal, non-commercial purposes

---

## 4. Booking and Scheduling

### Discovery Calls

Discovery calls are complimentary consultations to determine if coaching is right for you. They do not obligate you to purchase any services.

### Scheduling

Appointments are scheduled through our booking system (Calendly). By booking an appointment, you agree to:

- Provide accurate contact information
- Attend at the scheduled time
- Give at least 24 hours notice for cancellations or rescheduling

### Cancellation Policy

- **More than 24 hours notice:** Reschedule without penalty
- **Less than 24 hours notice:** Session may be forfeited or subject to a fee
- **No-shows:** Session will be forfeited

We understand life happens. Please communicate with us if you need to make changes.

---

## 5. Fees and Payment

### Pricing

Coaching program fees are communicated during the discovery call and outlined in any coaching agreement you enter into. Prices are subject to change but will not affect existing agreements.

### Payment Terms

- Payment is due as outlined in your coaching agreement
- We accept major credit cards and other specified payment methods
- All fees are in USD unless otherwise stated

### Refunds

Due to the personalized nature of coaching services:

- **Unused sessions:** May be refunded at our discretion, minus a reasonable administrative fee
- **Completed sessions:** Are non-refundable
- **Digital products:** Are non-refundable once accessed

Please review the specific refund terms in your coaching agreement.

---

## 6. Intellectual Property

### Our Content

All content on our Site, including text, graphics, logos, images, videos, and software, is the property of VIP Transformative Living or our licensors and is protected by copyright and other intellectual property laws.

You may:

- View and download content for personal, non-commercial use
- Share links to our content

You may not:

- Reproduce, distribute, or modify our content without permission
- Use our content for commercial purposes
- Remove any copyright or proprietary notices

### Your Content

If you submit content to us (e.g., testimonials, feedback), you grant us a non-exclusive, royalty-free license to use, reproduce, and display that content for marketing and promotional purposes.

---

## 7. Confidentiality

### Our Commitment

We treat all information shared during coaching sessions as confidential. We will not disclose your personal information to third parties without your consent, except:

- When required by law
- To protect safety (yours or others')
- With service providers bound by confidentiality agreements

### Your Responsibility

You agree not to record, share, or distribute coaching session content without our written consent.

---

## 8. Code of Conduct

When using our Services, you agree to:

- Treat our team and other participants with respect
- Engage honestly and in good faith
- Take responsibility for your own actions and decisions
- Maintain confidentiality of other participants in group settings

We reserve the right to terminate services if you violate this code of conduct.

---

## 9. Limitation of Liability

### No Guarantees

While we strive to provide valuable coaching services, we cannot guarantee specific results. Your outcomes depend on many factors, including your commitment, effort, and circumstances.

### Limitation

To the fullest extent permitted by law, VIP Transformative Living shall not be liable for:

- Indirect, incidental, special, or consequential damages
- Loss of profits, revenue, or data
- Personal injury or property damage
- Any damages exceeding the amount you paid for Services

### Indemnification

You agree to indemnify and hold harmless VIP Transformative Living from any claims, damages, or expenses arising from your use of our Services or violation of these Terms.

---

## 10. Disclaimers

### No Professional Advice

Our Services do not constitute professional medical, psychological, legal, or financial advice. Always consult qualified professionals for such matters.

### "As Is" Basis

Our Site and Services are provided "as is" without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.

### External Links

Our Site may contain links to third-party websites. We are not responsible for their content or practices.

---

## 11. Privacy

Your use of our Services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our [Privacy Policy](/privacy) for information on how we collect, use, and protect your data.

---

## 12. Dispute Resolution

### Informal Resolution

If you have a concern or dispute, please contact us first. We will work in good faith to resolve issues informally.

### Governing Law

These Terms are governed by the laws of [Your State/Country], without regard to conflict of law principles.

### Arbitration

Any disputes that cannot be resolved informally shall be resolved through binding arbitration in [Your City, State], rather than in court.

### Class Action Waiver

You agree to resolve disputes with us on an individual basis and waive the right to participate in class actions.

---

## 13. Changes to Terms

We may update these Terms from time to time. When we do:

- We will update the "Last updated" date
- Continued use of our Services after changes constitutes acceptance

We encourage you to review these Terms periodically.

---

## 14. Termination

### By You

You may stop using our Services at any time. Paid services are subject to the refund policy above.

### By Us

We reserve the right to suspend or terminate your access to our Services at any time, with or without cause or notice, including for violation of these Terms.

### Effect of Termination

Upon termination, your right to use our Services ceases immediately. Provisions that by their nature should survive (e.g., intellectual property, limitation of liability) will remain in effect.

---

## 15. Miscellaneous

### Entire Agreement

These Terms, together with our Privacy Policy and any coaching agreements, constitute the entire agreement between you and VIP Transformative Living.

### Severability

If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in effect.

### Waiver

Our failure to enforce any right or provision does not constitute a waiver of that right or provision.

### Assignment

You may not assign your rights under these Terms. We may assign our rights without restriction.

---

## 16. Contact Us

If you have questions about these Terms, please contact us:

**VIP Transformative Living**

Email: legal@viptransformativeliving.com

Address: [Your Business Address]

---

*By using our Site or Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.*
```

---

# PAGE COMPONENTS

## Legal Page Template Component

**File:** `app/(legal)/layout.tsx`

```tsx
// app/(legal)/layout.tsx

import Link from 'next/link';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {children}
      
      {/* Footer Navigation */}
      <footer className="border-t border-[#2A2A2A] py-8 px-6">
        <div className="max-w-4xl mx-auto flex justify-center gap-8 text-sm text-[#6B7280]">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors">
            ← Back to Home
          </Link>
          <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </footer>
    </div>
  );
}
```

## Privacy Policy Page

**File:** `app/(legal)/privacy/page.tsx`

```tsx
// app/(legal)/privacy/page.tsx

import LegalContent from '@/components/legal/LegalContent';
import { privacyContent } from '@/content/privacy';

export const metadata = {
  title: 'Privacy Policy | VIP Transformative Living',
  description: 'Learn how VIP Transformative Living collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <LegalContent
      label="Legal"
      title="Privacy Policy"
      lastUpdated="January 27, 2026"
      content={privacyContent}
    />
  );
}
```

## Terms Page

**File:** `app/(legal)/terms/page.tsx`

```tsx
// app/(legal)/terms/page.tsx

import LegalContent from '@/components/legal/LegalContent';
import { termsContent } from '@/content/terms';

export const metadata = {
  title: 'Terms & Conditions | VIP Transformative Living',
  description: 'Review the terms and conditions for using VIP Transformative Living services.',
};

export default function TermsPage() {
  return (
    <LegalContent
      label="Legal"
      title="Terms & Conditions"
      lastUpdated="January 27, 2026"
      content={termsContent}
    />
  );
}
```

## Reusable Legal Content Component

**File:** `components/legal/LegalContent.tsx`

```tsx
// components/legal/LegalContent.tsx

'use client';

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  title: string;
  content: string;
}

interface Props {
  label: string;
  title: string;
  lastUpdated: string;
  content: Section[];
}

export default function LegalContent({ label, title, lastUpdated, content }: Props) {
  const [activeSection, setActiveSection] = useState('');
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = content.map(s => document.getElementById(s.id));
      const scrollPos = window.scrollY + 150;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(content[i].id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);
  
  return (
    <>
      {/* Header */}
      <header className="bg-[#0A0A0A] py-20 px-6 text-center border-b border-[#2A2A2A]">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#D4AF37] mb-4 block">
          {label}
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-[#F5F5F5] mb-3">
          {title}
        </h1>
        <p className="text-sm text-[#6B7280]">
          Last updated: {lastUpdated}
        </p>
      </header>
      
      {/* Content */}
      <div className="px-6 py-16">
        <div className="max-w-[900px] mx-auto grid md:grid-cols-[220px_1fr] gap-16">
          
          {/* Table of Contents */}
          <nav className="md:sticky md:top-24 md:self-start bg-[#141414] md:bg-transparent p-6 md:p-0 rounded-lg">
            <h2 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6B7280] mb-4">
              Table of Contents
            </h2>
            <ul className="space-y-3">
              {content.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`text-sm transition-colors ${
                      activeSection === section.id
                        ? 'text-[#D4AF37]'
                        : 'text-[#9CA3AF] hover:text-[#D4AF37]'
                    }`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Main Content */}
          <main className="text-[#D1D5DB] leading-[1.8]">
            {content.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={index > 0 ? 'mt-12 pt-8 border-t border-[#2A2A2A]' : ''}
              >
                <h2 className="font-serif text-2xl text-[#F5F5F5] mb-4">
                  {section.title}
                </h2>
                <div
                  className="prose prose-invert prose-gold max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </section>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}
```

---

# SUMMARY

| Page | URL | Purpose |
|------|-----|---------|
| **404** | Any invalid route | Guide lost visitors back with warmth |
| **Privacy Policy** | `/privacy` | Legal compliance, build trust |
| **Terms & Conditions** | `/terms` | Legal protection, set expectations |

## Design Consistency

All three pages follow the VIPTL design system:
- Background: #0A0A0A / #141414
- Gold accent: #D4AF37
- Typography: Playfair Display (headings) + Inter (body)
- Subtle animations and hover states
- Mobile responsive

---

*End of 404, Privacy & Terms Design Plan*
