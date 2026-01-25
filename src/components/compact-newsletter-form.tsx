"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions";
import { Loader2 } from "lucide-react";

interface CompactNewsletterFormProps {
  source?: string;
  className?: string;
  placeholder?: string;
  buttonText?: string;
}

export function CompactNewsletterForm({ 
  source = "newsletter_hero", 
  className = "",
  placeholder = "Your email address",
  buttonText = "Subscribe →"
}: CompactNewsletterFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);
    
    try {
      const result = await subscribeToNewsletter(null, formData);
      setMessage(result.message);
      setIsSuccess(result.success);
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setIsSuccess(false);
    } finally {
      setIsPending(false);
    }
  }

  if (isSuccess) {
    return (
      <div className={`text-center p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] ${className}`}>
        <p className="font-medium">{message}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <form action={handleSubmit} className="flex flex-col sm:flex-row max-w-[480px] mx-auto">
        <input type="hidden" name="source" value={source} />
        <input 
          type="email" 
          name="email"
          required
          placeholder={placeholder}
          className="w-full sm:flex-1 bg-[#141414] border border-[#2A2A2A] sm:border-r-0 rounded-lg sm:rounded-l-lg sm:rounded-r-none px-5 py-4 text-[15px] text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-colors mb-2 sm:mb-0"
        />
        <button 
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[#0A0A0A] font-semibold px-7 py-4 rounded-lg sm:rounded-l-none sm:rounded-r-lg border-none hover:brightness-110 transition-all whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
        >
          {isPending ? <Loader2 className="animate-spin h-5 w-5" /> : buttonText}
        </button>
      </form>
      {message && !isSuccess && (
        <p className="text-red-500 text-sm mt-3 text-center">{message}</p>
      )}
    </div>
  );
}
