import type { Metadata } from "next";
// Git Sync: 2026-03-14 - UI & Ads Optimization Complete
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/common/CookieConsent";
import ManualAdUnit from "@/components/common/ManualAdUnit";
import BackToTop from "@/components/common/BackToTop";
import React from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const siteConfig = {
  siteName: "TakeThe Tools",
  siteDescription: "High-performance, free online tools for image conversion, PDF management, developer utilities, and file converters. Fast, secure, and browser-based.",
  adSenseId: "ca-pub-3148286057781421",
  twitterHandle: "takethetools",
};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const siteName = siteConfig.siteName;
  const description = siteConfig.siteDescription;

  return {
    metadataBase: new URL("https://takethetools.com"),
    title: {
      default: `${siteName} - All-in-One Online Tools Platform`,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: ["online tools", "webp to png", "pdf merge", "image compressor", "json formatter", "file converter", "developer tools"],
    authors: [{ name: `${siteName} Team` }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: `${siteName} - All-in-One Online Tools Platform`,
      description,
      url: "https://takethetools.com",
      siteName: siteName,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${siteName} - Free Online Tools`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} - All-in-One Online Tools Platform`,
      description,
      images: ["/og-image.png"],
      creator: siteConfig.twitterHandle ? `@${siteConfig.twitterHandle}` : "@takethetools",
    },
    alternates: {
      canonical: "https://takethetools.com",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "google-adsense-account": siteConfig.adSenseId,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteName = siteConfig.siteName;
  const adSenseId = siteConfig.adSenseId;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": "https://takethetools.com",
    "logo": "https://takethetools.com/logo.webp",
    "sameAs": siteConfig.twitterHandle ? [`https://twitter.com/${siteConfig.twitterHandle}`] : ["https://twitter.com/takethetools"]
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="adsense-init"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link
          rel="preload"
          href="/logo.webp"
          as="image"
          type="image/webp"
        />
        <Script
          id="google-consent-mode"
          strategy="beforeInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Default consent mode to 'denied' for compliance
            if (!localStorage.getItem('cookie-consent')) {
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500
              });
            } else {
              try {
                const parsed = JSON.parse(localStorage.getItem('cookie-consent'));
                gtag('consent', 'default', {
                  'ad_storage': parsed.marketing ? 'granted' : 'denied',
                  'ad_user_data': parsed.marketing ? 'granted' : 'denied',
                  'ad_personalization': parsed.marketing ? 'granted' : 'denied',
                  'analytics_storage': parsed.analytics ? 'granted' : 'denied'
                });
              } catch (e) {
                console.error("Error parsing consent", e);
              }
            }
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans`}
        suppressHydrationWarning
      >
        <Header />

        <main className="flex-grow">
          <div className="pt-[80px] md:pt-[104px]">
            {/* Top Ad Banner */}
            <div className="container mx-auto px-4 py-3 flex justify-center">
              <ManualAdUnit adSlot="3171595105" adFormat="auto" />
            </div>
          </div>

          {children}

          <div className="container mx-auto px-4 py-3 flex justify-center">
            <ManualAdUnit adSlot="3171595105" adFormat="auto" />
          </div>
        </main>

        <Footer />

        <CookieConsent />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
