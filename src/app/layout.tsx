import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { AppShell } from "@/components/layout/app-shell";
import { BackgroundEffects } from "@/components/ui/background-effects";

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
  description: "For driven men navigating life's pivotal crossroads. Align your Values, Identity, and Purpose to achieve breakthrough. Guided by Coach Wayne Dawson.",
  icons: {
    icon: '/images/Icon-White.png',
    shortcut: '/images/Icon-White.png',
    apple: '/images/Icon-White.png',
  },
  openGraph: {
    title: "VIP Transformative Living | Coach Wayne Dawson",
    description: "Transformative life coaching for men. Discover your purpose, power, and prosperity.",
    url: 'https://viptansformativeliving.com',
    siteName: 'VIP Transformative Living',
    locale: 'en_US',
    type: 'website',
  },
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
        <BackgroundEffects />
        <Script
          id="chatway"
          src="https://cdn.chatway.app/widget.js?id=mPMVCDgWzran"
          strategy="afterInteractive"
          async
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
