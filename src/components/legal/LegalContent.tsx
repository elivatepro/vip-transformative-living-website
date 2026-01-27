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
      // Find all section elements
      const sections = content.map(s => document.getElementById(s.id));
      // Offset for sticky header/comfortable viewing
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
      <div className="px-6 py-16 bg-[#0A0A0A]">
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
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`text-sm transition-colors block ${
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
                  className="prose prose-invert prose-gold max-w-none [&>h3]:text-[#F5F5F5] [&>h3]:font-sans [&>h3]:font-semibold [&>h3]:text-lg [&>h3]:mt-8 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:mb-2 [&>a]:text-[#D4AF37] [&>a]:underline [&>a]:underline-offset-2 [&>a:hover]:text-[#e5c35a]"
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
