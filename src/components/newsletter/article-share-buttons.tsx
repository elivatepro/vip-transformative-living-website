"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Copy,
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
  Share2,
  Twitter,
} from "lucide-react";

interface ArticleShareButtonsProps {
  articleUrl: string;
  title: string;
}

const buttonClassName =
  "w-12 h-12 rounded-full bg-[#141414] border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300";

export function ArticleShareButtons({ articleUrl, title }: ArticleShareButtonsProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [canUseNativeShare, setCanUseNativeShare] = useState(false);

  useEffect(() => {
    setCanUseNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const shareLinks = useMemo(() => {
    const encodedUrl = encodeURIComponent(articleUrl);
    const encodedTitle = encodeURIComponent(title);

    return [
      {
        label: "Share on X",
        href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        icon: <Twitter className="w-4 h-4" aria-hidden="true" />,
      },
      {
        label: "Share on LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        icon: <Linkedin className="w-4 h-4" aria-hidden="true" />,
      },
      {
        label: "Share on Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        icon: <Facebook className="w-4 h-4" aria-hidden="true" />,
      },
      {
        label: "Share on WhatsApp",
        href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        icon: <MessageCircle className="w-4 h-4" aria-hidden="true" />,
      },
      {
        label: "Share on Telegram",
        href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
        icon: <Send className="w-4 h-4" aria-hidden="true" />,
      },
      {
        label: "Share by Email",
        href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
        icon: <Mail className="w-4 h-4" aria-hidden="true" />,
      },
    ];
  }, [articleUrl, title]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleNativeShare = async () => {
    if (!canUseNativeShare) return;

    try {
      await navigator.share({
        title,
        text: title,
        url: articleUrl,
      });
    } catch {
      // User can dismiss native share; no error UI needed.
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {canUseNativeShare && (
        <button type="button" onClick={handleNativeShare} className={buttonClassName} aria-label="Share article">
          <Share2 className="w-4 h-4" aria-hidden="true" />
        </button>
      )}

      <button type="button" onClick={handleCopy} className={buttonClassName} aria-label="Copy article link">
        {isCopied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
      </button>

      {shareLinks.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClassName}
          aria-label={item.label}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
