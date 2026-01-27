import React from 'react';
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  ArrowDown,
  ChevronRight, 
  Play, 
  Users, 
  Target, 
  ShieldCheck, 
  Clock, 
  Gem,
  XCircle
} from "lucide-react";
import { BookCallButton } from "@/components/book-call-button";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VipFramework } from "@/components/coaching/vip-framework";
import { createClient } from "@/lib/supabase-server";

export const metadata = {
  title: "1-on-1 Coaching | VIP Transformative Living",
  description: "Personalized coaching for men at a crossroads. Rediscover your purpose and build a life of alignment.",
};

export default async function CoachingPage() {
  const supabase = await createClient();
  
  const [testimonialsResult, faqsResult, packagesResult] = await Promise.all([
    supabase.from('testimonials').select('*').eq('is_published', true).eq('display_on_coaching', true).order('display_order'),
    supabase.from('faqs').select('*').eq('is_published', true).eq('show_on_coaching', true).order('display_order'),
    supabase.from('coaching_packages').select('*').eq('is_published', true).order('display_order')
  ]);

  const testimonials = testimonialsResult.data || [];
  const faqs = faqsResult.data || [];
  const packages = packagesResult.data || [];

  // Categorize testimonials
  const featuredTestimonial = testimonials.find(t => t.is_featured);
  const gridTestimonials = testimonials.filter(t => !t.is_featured);

  return (
    <div className="pt-20 font-sans bg-[#0A0A0A] text-[#F5F5F5]">
      
      {/* 1. HERO — Clear value proposition + CTA */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-[#0A0A0A]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/coach-wayne-in-session.png" 
            alt="Coach Wayne in a coaching session" 
            fill 
            className="object-cover opacity-50"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-16 relative z-10">
          <div className="max-w-[1280px] mx-auto relative">
            <span className="relative text-[#D4AF37] uppercase tracking-[0.3em] text-[12px] font-bold block mb-6 border-l-2 border-[#D4AF37] pl-4">
              ONE-ON-ONE TRANSFORMATIONAL COACHING
            </span>
            {/* Hero Headline: 72px desktop / 40px mobile */}
            <h1 className="relative text-[40px] md:text-[72px] font-serif font-light text-[#F5F5F5] leading-[1.1] mb-8 [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
              Real Change Requires <br className="hidden md:block" /> Real Partnership
            </h1>
            {/* Hero Subheadline: 18px desktop / 17px mobile */}
            <p className="relative text-[17px] md:text-[18px] text-[#D1D5DB] font-light leading-relaxed mb-10 max-w-2xl [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">
              You&apos;ve tried figuring it out alone. You&apos;ve read the books. You&apos;ve listened 
              to the podcasts. And yet here you are — still stuck, still searching, still 
              knowing there&apos;s more.
              <br/><br/>
              <span className="text-[#F5F5F5] font-medium [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">What if the missing piece isn&apos;t more information... but the right guide?</span>
            </p>
            
            <div className="relative flex flex-col sm:flex-row gap-6 items-center mb-12">
              <BookCallButton 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto font-bold tracking-wide"
              >
                Book Your Free Discovery Call
              </BookCallButton>
              <Button 
                variant="link" 
                size="lg" 
                className="text-[#F5F5F5] hover:text-[#D4AF37] group text-[16px] font-medium"
                asChild
              >
                <Link href="#problem" className="flex items-center gap-2">
                  See How It Works <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="relative flex flex-wrap gap-x-8 gap-y-4 text-[14px] text-[#6B7280]">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D4AF37]" /> 25+ Years Experience</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D4AF37]" /> Hundreds of Men Transformed</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D4AF37]" /> No-Pressure Conversation</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM — Why coaching (not books, not figuring it out alone) */}
      <Section id="problem" className="bg-[#141414] relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-[12px] font-bold">THE HARD TRUTH</span>
              {/* Section Headline (H1): 48px desktop / 32px mobile */}
              <h2 className="text-[32px] md:text-[48px] font-serif font-light mt-4 mb-8 text-[#F5F5F5] leading-tight">
                Why You&apos;re Still Stuck <br className="hidden md:block" /> (It&apos;s Not Your Fault)
              </h2>
            </div>

            <div className="space-y-12">
              {/* Body Text: 18px (Lead) */}
              <div className="prose prose-invert max-w-none text-[17px] md:text-[18px] text-[#9CA3AF] leading-relaxed">
                <p>You&apos;re intelligent. Resourceful. Driven.</p>
                <p>So you did what successful people do — you tried to solve it yourself.</p>
                <p>You bought the books. <em>&quot;Think and Grow Rich.&quot; &quot;The 7 Habits.&quot; &quot;Atomic Habits.&quot;</em> You listened to podcasts on your commute. You journaled. You meditated. You set goals.</p>
                <p>And some of it helped. For a while.</p>
                <p className="text-[#F5F5F5] font-medium pt-4">But here&apos;s what nobody tells you:</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "BOOKS GIVE YOU KNOWLEDGE",
                    desc: "But knowledge without accountability fades. You read something powerful, feel motivated for a week, then life takes over and you're back where you started.",
                    icon: "📚"
                  },
                  {
                    title: "PODCASTS GIVE YOU INSPIRATION",
                    desc: "But inspiration without implementation is entertainment. You feel good listening, but feeling good isn't the same as changing.",
                    icon: "🎧"
                  },
                  {
                    title: "SELF-REFLECTION GIVES YOU AWARENESS",
                    desc: "But awareness without an outside perspective keeps you circling the same patterns. You can't see your own blind spots—that's why they're called blind spots.",
                    icon: "💭"
                  },
                  {
                    title: "FRIENDS GIVE YOU SUPPORT",
                    desc: "But friends tell you what you want to hear, not what you need to hear. They're too close to challenge you. Too invested in keeping you comfortable.",
                    icon: "👥"
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-[#141414] border border-[#2A2A2A] p-8 rounded-xl hover:border-[#D4AF37] transition-all duration-300">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    {/* Component Header (H4): 20px desktop / 18px mobile */}
                    <h4 className="text-[#F5F5F5] font-bold mb-4 tracking-wide text-[18px] md:text-[20px]">{item.title}</h4>
                    {/* Body Small: 14px */}
                    <p className="text-[#9CA3AF] text-[14px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.2)] p-8 md:p-12 rounded-2xl text-center space-y-6">
                {/* Sub-Section Headline (H2): 36px desktop / 28px mobile */}
                <h3 className="text-[28px] md:text-[36px] font-serif font-light text-[#F5F5F5]">The Missing Piece</h3>
                <p className="text-[#9CA3AF] text-[18px] max-w-2xl mx-auto leading-relaxed">
                  What actually creates lasting transformation? <br/>
                  <span className="text-[#D4AF37] font-bold text-[24px] mt-4 block">Partnership.</span>
                </p>
                <div className="text-[#9CA3AF] space-y-2 max-w-xl mx-auto text-left md:text-center text-[16px]">
                  <p>Someone who sees your potential even when you can&apos;t.</p>
                  <p>Someone who holds you accountable when it&apos;s uncomfortable.</p>
                  <p>Someone who challenges your stories and excuses with compassion.</p>
                  <p>Someone who&apos;s walked the path and knows the way through.</p>
                </div>
                <p className="text-[#F5F5F5] text-[20px] font-medium pt-4 italic font-serif">
                  That&apos;s what coaching provides. Not information. Transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. THE DIFFERENCE — What makes Coach Wayne's approach unique */}
      <Section className="bg-[#0A0A0A] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="container mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-[12px] font-bold">WHY COACH WAYNE</span>
            {/* H1 */}
            <h2 className="text-[32px] md:text-[48px] font-serif font-light mt-4 mb-6 text-[#F5F5F5] leading-tight">Not Another Life Coach</h2>
            <p className="text-[#9CA3AF] text-[17px] md:text-[18px] max-w-2xl mx-auto font-light">
              There are thousands of coaches. Here&apos;s why the men who work with me 
              get results others don&apos;t.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1280px] mx-auto">
            {[
              {
                title: "LIVED EXPERIENCE",
                subtitle: "I'VE BEEN WHERE YOU ARE",
                desc: "This isn't theory for me. I've stood at the crossroads you're facing. I've felt the emptiness of external success without internal fulfillment. I've done the deep work of transformation—not because I read about it, but because I lived it.",
                icon: <Users className="w-8 h-8 text-[#D4AF37]" />
              },
              {
                title: "PROVEN FRAMEWORK",
                subtitle: "A SYSTEM THAT WORKS",
                desc: "The VIP Framework isn't something I invented to sound clever. It emerged from patterns I observed over decades of coaching—the common thread connecting every man who achieved lasting transformation. Values. Identity. Purpose.",
                icon: <Target className="w-8 h-8 text-[#D4AF37]" />
              },
              {
                title: "HONEST PARTNERSHIP",
                subtitle: "I'LL TELL YOU WHAT OTHERS WON'T",
                desc: "I'm not here to be your cheerleader. I'm not here to validate your excuses or tell you what you want to hear. I'm here to be the honest mirror you need. To challenge your limiting beliefs with compassion.",
                icon: <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
              },
              {
                title: "FOCUSED ON MEN",
                subtitle: "I UNDERSTAND MEN'S CHALLENGES",
                desc: "Men face unique pressures that generic coaching doesn't address. The expectation to 'have it all together.' The stigma around asking for help. The identity wrapped up in providing and performing. I specialize in these specific challenges.",
                icon: <Gem className="w-8 h-8 text-[#D4AF37]" />
              },
              {
                title: "RESULTS-ORIENTED",
                subtitle: "TRANSFORMATION, NOT JUST CONVERSATION",
                desc: "Some coaches will listen to you vent for months without moving you forward. That's not coaching—that's expensive friendship. Every session with me has a purpose. Every conversation moves you closer to your goals.",
                icon: <Clock className="w-8 h-8 text-[#D4AF37]" />
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#141414] border border-[#2A2A2A] p-8 rounded-xl hover:border-[#D4AF37] transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase block mb-2">{item.title}</span>
                {/* H4 */}
                <h4 className="text-[#F5F5F5] font-bold text-[18px] md:text-[20px] mb-4 leading-tight">{item.subtitle}</h4>
                {/* Body Sm */}
                <p className="text-[#9CA3AF] text-[14px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. THE VIP FRAMEWORK — The methodology explained */}
      <Section className="bg-[#141414] relative overflow-hidden py-24 md:py-32">
        {/* Centered gold glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-[12px] font-bold">THE METHODOLOGY</span>
            {/* H1 */}
            <h2 className="text-[32px] md:text-[48px] font-serif font-light mt-4 mb-6 text-[#F5F5F5] leading-tight">
              The VIP Framework: <br className="hidden md:block" /> Where Lasting Transformation Begins
            </h2>
            <p className="text-[#9CA3AF] text-[17px] md:text-[18px] max-w-3xl mx-auto font-light leading-relaxed">
              After 25 years of coaching, I&apos;ve identified the three elements that 
              determine whether change lasts or fades. When all three align, 
              breakthrough becomes inevitable.
            </p>
          </div>

          <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual Representation - NEW COMPONENT */}
            <div className="order-2 lg:order-1 flex justify-center">
              <VipFramework />
            </div>

            <div className="space-y-12 order-1 lg:order-2">
              <div className="space-y-4">
                {/* H3: 24px desktop / 22px mobile */}
                <h3 className="text-[22px] md:text-[24px] font-serif font-bold text-[#D4AF37] flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(212,175,55,0.1)] text-xs">V</span>
                  VALUES: What Drives You
                </h3>
                <p className="text-[#9CA3AF] text-[16px] leading-relaxed italic">
                  Most men operate on inherited values—what their parents valued, what society rewards. 
                  We excavate your authentic values. Not what you think you should value, but what actually lights you up.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-[22px] md:text-[24px] font-serif font-bold text-[#D4AF37] flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(212,175,55,0.1)] text-xs">I</span>
                  IDENTITY: Who You Truly Are
                </h3>
                <p className="text-[#9CA3AF] text-[16px] leading-relaxed italic">
                  We strip away the masks. Coach Wayne helps you challenge the stories you tell yourself 
                  about who you are. What remains is your authentic self—the person you were before the 
                  world told you who you should be.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-[22px] md:text-[24px] font-serif font-bold text-[#D4AF37] flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(212,175,55,0.1)] text-xs">P</span>
                  PURPOSE: Why You Exist
                </h3>
                <p className="text-[#9CA3AF] text-[16px] leading-relaxed italic">
                  Purpose emerges when values and identity align. This isn&apos;t about finding a new 
                  job title. It&apos;s about discovering the thread that connects everything you do 
                  with meaning.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 max-w-4xl mx-auto bg-[#141414] border border-[#2A2A2A] p-10 rounded-2xl shadow-lg">
             <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                 {/* H4 */}
                 <h4 className="text-[18px] md:text-[20px] font-bold text-[#F5F5F5] mb-4">Why the Framework Works</h4>
                 <p className="text-[#9CA3AF] text-[14px] leading-relaxed mb-6">
                   Most coaching addresses symptoms like career unhappiness or relationship struggles. 
                   The VIP Framework addresses roots. When you address the root, the symptoms resolve themselves.
                 </p>
               </div>
               <div className="space-y-3">
                 <div className="flex gap-3 text-sm"><XCircle className="w-5 h-5 text-red-500 shrink-0" /> <span className="text-[#9CA3AF] text-[14px]">Symptom focused coaching is temporary</span></div>
                 <div className="flex gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> <span className="text-[#F5F5F5] text-[14px]">Root level transformation is permanent</span></div>
               </div>
             </div>
          </div>
        </div>
      </Section>

      {/* 5. WHO THIS IS FOR / NOT FOR */}
      <Section className="bg-[#0A0A0A] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="container mx-auto px-6 md:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Who it is for */}
            <div>
              <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-[12px] font-bold block mb-4">IS THIS YOU?</span>
              {/* H1 */}
              <h2 className="text-[32px] md:text-[48px] font-serif font-light mb-10 text-[#F5F5F5] leading-tight">Who Coaching Is For</h2>
              <div className="space-y-6">
                {[
                  "You've achieved external success but feel internal emptiness",
                  "You're at a significant crossroads (Career, Relationship, Midlife)",
                  "You know you're capable of more but can't see the path",
                  "You're tired of figuring it out alone",
                  "You're willing to do the work and be challenged",
                  "You're ready to invest in yourself"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start bg-[#141414] p-4 rounded-lg border border-[#2A2A2A]">
                    <CheckCircle2 className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
                    <p className="text-[#9CA3AF] font-medium text-[16px]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Who it is NOT for */}
            <div>
              <span className="text-red-500 uppercase tracking-[0.2em] text-[12px] font-bold block mb-4">PLEASE READ</span>
              {/* H1 */}
              <h2 className="text-[32px] md:text-[48px] font-serif font-light mb-10 text-[#F5F5F5] leading-tight">Who This Isn&apos;t For</h2>
              <div className="space-y-6">
                {[
                  { t: "You want someone to fix you", d: "I'm not a therapist. You're not broken, you're stuck. There's a difference." },
                  { t: "You want quick fixes and shortcuts", d: "Real transformation takes time and work. No '5-minute life hacks' here." },
                  { t: "You're not willing to be honest", d: "If you're going to hide behind comfortable stories, we won't make progress." },
                  { t: "You just want someone to vent to", d: "I'm not a sounding board. We process feelings to move forward, not just talk." },
                  { t: "You expect me to tell you what to do", d: "I provide frameworks and challenges. The answers come from within you." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start bg-[rgba(239,68,68,0.05)] p-4 rounded-lg border border-[rgba(239,68,68,0.1)]">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#F5F5F5] font-bold text-[14px] mb-1">{item.t}</p>
                      <p className="text-[#9CA3AF] text-[12px] leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. HOW IT WORKS — The coaching journey step-by-step */}
      <Section className="bg-[#141414] relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />
        <div className="container mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-[12px] font-bold">THE JOURNEY</span>
            {/* H1 */}
            <h2 className="text-[32px] md:text-[48px] font-serif font-light mt-4 mb-6 text-[#F5F5F5] leading-tight">How Coaching Works</h2>
            <p className="text-[#9CA3AF] text-[18px] font-light">From First Call to Lasting Transformation</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {[
              {
                step: "01",
                title: "DISCOVERY CALL",
                subtitle: "Free — 30 Minutes",
                desc: "A no-pressure conversation where we explore whether coaching is the right path for you. You're interviewing me just as much as I'm learning about you.",
                results: ["Clarity on fit", "One actionable insight", "Zero obligation"]
              },
              {
                step: "02",
                title: "ASSESSMENT & ONBOARDING",
                subtitle: "Before Session 1",
                desc: "We set the foundation. You'll complete the comprehensive VIP Assessment and a detailed intake questionnaire so we hit the ground running.",
                results: ["Baseline measurements", "Clear goal mapping", "Your roadmap"]
              },
              {
                step: "03",
                title: "WEEKLY COACHING SESSIONS",
                subtitle: "60 Minutes Weekly",
                desc: "Deep work using the VIP Framework. Every session is structured: Opening (check-in), Core Work (deep transformation), and Closing (integration).",
                results: ["Direct challenges", "Accountability", "Framework application"]
              },
              {
                step: "04",
                title: "INTEGRATION & COMPLETION",
                subtitle: "For Life",
                desc: "We consolidate your learning and create a personal 'operating system' for continued growth. You'll leave equipped for life.",
                results: ["Authentic identity", "Independence", "Lasting change"]
              }
            ].map((item, i) => (
              <div key={i} className="relative pl-16 md:pl-24 group">
                {/* Timeline line */}
                {i < 3 && <div className="absolute left-6 md:left-9 top-12 bottom-[-48px] w-[1.5px] bg-[rgba(212,175,55,0.2)]" />}
                
                <div className="absolute left-0 top-0 w-12 h-12 md:w-18 md:h-18 rounded-full bg-[#141414] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif font-bold text-xl md:text-2xl z-10 group-hover:scale-110 transition-transform shadow-lg">
                  {item.step}
                </div>
                
                <div className="bg-[#1F1F1F] border border-[#2A2A2A] p-8 rounded-2xl group-hover:border-[#D4AF37] transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h4 className="text-[#D4AF37] font-bold text-[12px] tracking-widest uppercase mb-1">{item.title}</h4>
                      {/* H3 equivalent */}
                      <p className="text-[#F5F5F5] font-serif text-[22px] md:text-[24px] font-bold">{item.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-[#9CA3AF] leading-relaxed mb-6 text-[16px]">{item.desc}</p>
                  <div className="flex flex-wrap gap-4">
                    {item.results.map((res, j) => (
                      <span key={j} className="text-[10px] font-bold uppercase tracking-wider text-[#F5F5F5] bg-white/5 px-3 py-1.5 rounded-full flex items-center gap-2">
                        <Check className="w-3 h-3 text-[#D4AF37]" /> {res}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
             <BookCallButton variant="primary" size="lg" className="text-[16px] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                Start Your Journey Now
             </BookCallButton>
          </div>
        </div>
      </Section>

      {/* 8. VIDEO TESTIMONIALS — Social proof (the closer) */}
      <Section className="bg-[#0A0A0A] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="container mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-[12px] font-bold">REAL TRANSFORMATIONS</span>
            {/* H1 */}
            <h2 className="text-[32px] md:text-[48px] font-serif font-light mt-4 mb-6 text-[#F5F5F5] leading-tight">Don&apos;t Take My Word for It</h2>
            <p className="text-[#9CA3AF] text-[18px] max-w-2xl mx-auto font-light leading-relaxed">
              Hear directly from men who were where you are—and see where they are now.
            </p>
          </div>

          <div className="max-w-[1280px] mx-auto space-y-20">
            {/* Featured Testimonial */}
            {featuredTestimonial && (
              <div className="grid lg:grid-cols-2 gap-12 items-center bg-[#1F1F1F] p-8 md:p-12 rounded-[2.5rem] border border-[#2A2A2A] shadow-xl">
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                  <Image 
                    src={featuredTestimonial.video_thumbnail_url || "/images/sunrise-mountains.jpg"} 
                    alt="Testimonial Thumbnail" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-black fill-current translate-x-1" />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="text-[#D4AF37] text-2xl">⭐⭐⭐⭐⭐</div>
                  <blockquote className="text-[#F5F5F5] text-[20px] md:text-[24px] font-serif italic leading-relaxed">
                    &quot;{featuredTestimonial.quote}&quot;
                  </blockquote>
                  <div>
                    <p className="text-[#F5F5F5] font-bold text-[18px]">{featuredTestimonial.client_name}</p>
                    {featuredTestimonial.client_title && (
                      <p className="text-[#D4AF37] text-[14px] tracking-widest uppercase font-bold">
                        {featuredTestimonial.client_title}{featuredTestimonial.client_location ? `, ${featuredTestimonial.client_location}` : ''}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Testimonial Grid */}
            {gridTestimonials.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridTestimonials.map((item) => (
                  <div key={item.id} className="bg-[#141414] border border-[#2A2A2A] p-8 rounded-2xl flex flex-col justify-between group hover:border-[#D4AF37] transition-all">
                    <div className="space-y-6">
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-black">
                         <div className="absolute inset-0 flex items-center justify-center">
                           <Play className="w-10 h-10 text-[#D4AF37] opacity-80" />
                         </div>
                      </div>
                      <p className="text-[#9CA3AF] text-[14px] leading-relaxed">&quot;{item.quote}&quot;</p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-[#2A2A2A]">
                      <p className="text-[#F5F5F5] font-bold text-[14px]">{item.client_name}</p>
                      {item.client_title && (
                        <p className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase">{item.client_title}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* 9. THE PACKAGES — Three tiers with full details */}
      <Section id="packages" className="bg-[#0A0A0A] relative overflow-hidden py-24 md:py-32">
        {/* gold corner glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-[12px] font-bold">COACHING PROGRAMS</span>
            {/* H1 */}
            <h2 className="text-[32px] md:text-[48px] font-serif font-light mt-4 mb-6 text-[#F5F5F5] leading-tight">Choose Your Path</h2>
            <p className="text-[#9CA3AF] text-[18px] max-w-2xl mx-auto font-light">
              Not sure which is right? We&apos;ll figure it out together on your Discovery Call.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-[1280px] mx-auto">
            {packages.map((pkg) => {
              const features = typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features || [];
              const isFeatured = pkg.is_featured;
              
              return (
                <div 
                  key={pkg.id} 
                  className={`
                    flex flex-col p-8 rounded-2xl transition-all relative
                    ${isFeatured ? 'bg-[#1F1F1F] border-2 border-[#D4AF37] shadow-2xl transform lg:-translate-y-6' : 'bg-[#141414] border border-[#2A2A2A] hover:border-[#D4AF37]'}
                  `}
                >
                  {isFeatured && (
                    <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-bold px-4 py-1 rounded-bl-xl rounded-tr-xl">
                      {pkg.badge_text || 'MOST POPULAR'}
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border ${isFeatured ? 'text-[#D4AF37] border-[#D4AF37]' : 'text-[#6B7280] border-[#2A2A2A]'}`}>
                      {pkg.name}
                    </span>
                  </div>
                  
                  {/* H3 */}
                  <h3 className="text-[22px] md:text-[24px] font-serif font-bold text-[#F5F5F5] mb-2">{pkg.tagline}</h3>
                  <p className="text-[14px] font-bold text-[#D4AF37] mb-8 uppercase tracking-wide">
                    {pkg.slug === 'silver' ? 'When you need clarity NOW.' : 
                     pkg.slug === 'gold' ? 'Find work that fits who you\'ve become.' : 'The full journey.'}
                  </p>
                  
                  <div className="mb-10 pb-10 border-b border-[#2A2A2A]">
                    <p className="text-[14px] text-[#9CA3AF] leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {features.map((feat: string, i: number) => (
                      <li key={i} className="flex gap-3 text-[12px] text-[#9CA3AF]">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0" /> {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-8">
                    {pkg.price_per_session ? (
                      <p className="text-3xl font-bold text-[#F5F5F5]">${pkg.price_per_session} <span className="text-sm text-[#6B7280] font-normal">/ session</span></p>
                    ) : (
                      <p className="text-3xl font-bold text-[#F5F5F5]">${pkg.total_price.toLocaleString()} <span className="text-sm text-[#6B7280] font-normal">total</span></p>
                    )}
                    
                    {pkg.fast_action_price && (
                      <p className="text-[10px] text-[#D4AF37] font-bold mt-1 tracking-widest uppercase">
                        Fast Action: ${pkg.fast_action_price.toLocaleString()}
                        {pkg.price_per_session ? '/session' : '*'}
                        {pkg.slug !== 'silver' && ' | Payment Plans'}
                      </p>
                    )}
                  </div>

                  <BookCallButton 
                    variant={isFeatured ? "primary" : "secondary"} 
                    className={`w-full h-14 ${!isFeatured && 'border-[#2A2A2A] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors'} ${isFeatured && 'shadow-[0_0_20px_rgba(212,175,55,0.4)]'}`}
                  >
                    Book Discovery Call
                  </BookCallButton>
                </div>
              );
            })}
          </div>

          <div className="mt-20 max-w-2xl mx-auto text-center">
            <p className="text-[#6B7280] text-xs">
              *Fast Action discount applied when you book within 24 hours of your Discovery Call. <br/>
              Not sure which one to choose? That&apos;s what the free 30-minute Discovery Call is for.
            </p>
          </div>
        </div>
      </Section>

      {/* 11. FREQUENTLY ASKED QUESTIONS */}
      <Section className="bg-[#141414] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="container mx-auto px-6 md:px-16 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-[12px] font-bold">OBJECTION HANDLING</span>
              {/* H1 */}
              <h2 className="text-[32px] md:text-[48px] font-serif font-light mt-4 text-[#F5F5F5] leading-tight">Questions You Might Be Asking</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((item, i) => (
                <AccordionItem key={item.id} value={`item-${i}`} className="bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl px-6">
                  {/* H4 approx */}
                  <AccordionTrigger className="text-[#F5F5F5] hover:text-[#D4AF37] text-left font-bold text-[18px] py-6 hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-[#9CA3AF] leading-relaxed pb-6 text-[16px]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>

      {/* 12. ABOUT COACH WAYNE (Mini Bio) */}
      <Section className="bg-[#0A0A0A] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="container mx-auto px-6 md:px-16 relative z-10">
          <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-center">
             <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-[rgba(212,175,55,0.2)] shadow-2xl">
                <Image 
                  src="/images/wayne-street-night.jpg" 
                  alt="Coach Wayne" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
             </div>
             <div className="space-y-8">
               <div>
                <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] font-bold block mb-4">YOUR GUIDE</span>
                {/* H1 */}
                <h2 className="text-[32px] md:text-[48px] font-serif font-light text-[#F5F5F5] mb-6 leading-tight">A Note from Coach Wayne</h2>
               </div>
               <div className="prose prose-invert prose-lg text-[#9CA3AF] leading-relaxed text-[17px] md:text-[18px]">
                 <p>If you&apos;ve read this far, something on this page resonated with you. Maybe you saw yourself in the pain points. Maybe the testimonials gave you hope.</p>
                 <p>I get it. I&apos;ve been where you are. I spent years as &quot;successful&quot; on the outside while feeling empty on the inside. I found myself asking the same question you might be asking: <span className="text-[#F5F5F5] font-serif italic">&quot;Is this really it?&quot;</span></p>
                 <p>The journey from that question to living with clarity, purpose, and genuine fulfillment—is what I now help other men navigate. I know what it feels like to be stuck. And I know what&apos;s possible on the other side.</p>
               </div>
               <div className="pt-4">
                 <p className="text-[#F5F5F5] font-serif text-[20px] mb-8">— Wayne</p>
                 <BookCallButton variant="primary" size="lg" className="shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                   Book a Conversation with Wayne
                 </BookCallButton>
               </div>
             </div>
          </div>
        </div>
      </Section>

      {/* 13. FINAL CTA — Last push with urgency/scarcity */}
      <Section className="relative overflow-hidden py-32 md:py-48">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/sunrise-mountains.jpg" 
            alt="Mountains background" 
            fill 
            className="object-cover blur-[2px] opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />
        </div>
        
        <div className="container mx-auto px-6 md:px-16 relative z-10 text-center space-y-12">
           <div className="max-w-3xl mx-auto space-y-6">
             {/* Hero Headline equivalent */}
             <h2 className="text-[40px] md:text-[72px] font-serif font-light text-[#F5F5F5] leading-tight">Your Transformation Starts with One Conversation</h2>
             <p className="text-[17px] md:text-[18px] text-[#9CA3AF] font-light leading-relaxed">
               The Discovery Call is free. It&apos;s 30 minutes. No pressure. No obligation. 
               Just an honest conversation about where you are and whether coaching can help you get there.
             </p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <BookCallButton variant="primary" size="lg" className="text-[16px] shadow-[0_0_40px_rgba(212,175,55,0.4)] w-full sm:w-auto font-bold tracking-wide">
                Book Your Free Discovery Call
              </BookCallButton>
              <div className="flex flex-col items-center sm:items-start gap-2">
                <p className="text-[#9CA3AF] text-sm">Not quite ready for a call?</p>
                <Button variant="link" className="text-[#D4AF37] p-0 h-auto text-[18px] group font-bold" asChild>
                  <Link href="https://viptl-self-assessment-website.vercel.app/">
                    Take the Free Assessment <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
           </div>

           <div className="pt-24 max-w-4xl mx-auto text-left border-t border-[#2A2A2A] pt-16">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  {/* H3 */}
                  <h4 className="text-[#F5F5F5] font-serif text-[24px] font-bold mb-6">My Commitment to You</h4>
                  <p className="text-[#9CA3AF] text-[14px] leading-relaxed mb-6">
                    I don&apos;t offer gimmicky money-back guarantees. Transformation requires commitment. Instead, I offer something better: Honest Partnership.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                   <div className="flex gap-4">
                     <ShieldCheck className="w-6 h-6 text-[#D4AF37] shrink-0" />
                     <div>
                       <p className="text-[#F5F5F5] font-bold text-[14px]">Honest Assessment</p>
                       <p className="text-[#9CA3AF] text-[12px]">If coaching isn&apos;t right for you, I&apos;ll tell you on the call. I won&apos;t waste your time.</p>
                     </div>
                   </div>
                   <div className="flex gap-4">
                     <Clock className="w-6 h-6 text-[#D4AF37] shrink-0" />
                     <div>
                       <p className="text-[#F5F5F5] font-bold text-[14px]">Satisfaction Check</p>
                       <p className="text-[#9CA3AF] text-[12px]">If after our first paid session it isn&apos;t a fit, we part ways and I refund that session.</p>
                     </div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </Section>

    </div>
  );
}
