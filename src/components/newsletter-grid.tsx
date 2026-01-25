"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  published_at: string;
  formattedDate?: string;
  image_url?: string;
  reading_time?: string;
}

interface NewsletterGridProps {
  initialArticles: Article[];
  categories: string[];
}

export function NewsletterGrid({ initialArticles, categories }: NewsletterGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredArticles = activeCategory === "All" 
    ? initialArticles 
    : initialArticles.filter(article => {
        const cat = article.category.toLowerCase();
        const active = activeCategory.toLowerCase();
        
        if (active.includes("career") && active.includes("purpose")) {
            return cat === "career" || cat === "purpose";
        }
        if (active.includes("identity") || active.includes("confidence")) {
            return cat === "identity" || cat === "values";
        }
        if (active.includes("relationships") || active.includes("legacy")) {
            return cat === "relationships";
        }
        if (active.includes("mindset") || active.includes("growth")) {
            return cat === "mindset";
        }
        
        return cat === active;
    });

  const displayedArticles = filteredArticles.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="space-y-12">
      {/* Category Filter */}
      <div className="bg-[#0A0A0A] border-b border-[#1A1A1A] py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setVisibleCount(6);
              }}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300
                ${activeCategory === category
                  ? "bg-[#D4AF37] border-[#D4AF37] text-[#0A0A0A]"
                  : "bg-transparent border-[#2A2A2A] text-[#9CA3AF] hover:text-[#F5F5F5] hover:border-[#4A4A4A]"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      <div className="bg-[#0A0A0A] px-4 md:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 border border-[#2A2A2A] rounded-xl bg-[#141414]">
              <div className="text-4xl mb-6">📝</div>
              <h3 className="text-2xl font-serif text-[#F5F5F5] mb-2">No articles yet</h3>
              <p className="text-[#9CA3AF] mb-8">
                {activeCategory === "All" 
                  ? "The first article is coming soon." 
                  : `No articles found in ${activeCategory}.`}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {displayedArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`/newsletter/${article.slug}`} className="group block h-full">
                      <div className="h-full bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#3A3A3A] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50">
                        {/* Image Container */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#1A1A1A]">
                          {article.image_url ? (
                            <img 
                              src={article.image_url} 
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
                                <span className="text-[#2A2A2A] font-serif text-4xl opacity-20">VIP</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="text-[11px] font-bold tracking-widest uppercase text-[#D4AF37] mb-3">
                            {article.category}
                          </div>
                          
                          <h3 className="font-serif text-xl text-[#F5F5F5] leading-snug mb-3 line-clamp-2 group-hover:text-white transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center gap-3 text-[13px] text-[#6B7280]">
                            <span>{article.formattedDate || new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            <span className="w-1 h-1 rounded-full bg-[#4B5563]" />
                            <span>{article.reading_time || "5 min"}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Load More Button */}
          {filteredArticles.length > visibleCount && (
            <div className="text-center mt-12">
              <button 
                onClick={handleLoadMore}
                className="px-8 py-4 rounded-lg border border-[#D4AF37] text-[#D4AF37] font-semibold text-sm hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300"
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
