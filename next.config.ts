import type { NextConfig } from "next";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [];

if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);

  remotePatterns.push({
    protocol: supabaseUrl.protocol.replace(":", "") as "http" | "https",
    hostname: supabaseUrl.hostname,
    pathname: "/storage/v1/object/public/**",
  });

  remotePatterns.push({
    protocol: supabaseUrl.protocol.replace(":", "") as "http" | "https",
    hostname: supabaseUrl.hostname,
    pathname: "/storage/v1/render/image/**",
  });
}

const nextConfig: NextConfig = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    qualities: [75, 90],
    remotePatterns,
  },
};

export default nextConfig;
