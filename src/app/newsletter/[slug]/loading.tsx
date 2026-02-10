import { Loader } from "@/components/ui/loader";

export default function NewsletterArticleLoading() {
  return (
    <div className="min-h-screen pt-20 bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="text-center">
        <Loader size="lg" className="mx-auto" />
        <p className="mt-6 text-[#9CA3AF] text-sm tracking-wide uppercase">Loading newsletter...</p>
      </div>
    </div>
  );
}
