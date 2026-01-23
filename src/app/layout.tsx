import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { AppShell } from "@/components/layout/app-shell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VIP Transformative Living | Coach Wayne Dawson",
  description: "Transformative life coaching for men navigating pivotal crossroads. Discover your purpose, power, and prosperity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen`}
      >
        <Script src="https://link.tkportalsghl.com/js/form_embed.js" strategy="lazyOnload" />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
