import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/common/CookieConsent";
import GoogleAdSense from "@/components/common/GoogleAdSense";
import ManualAdUnit from "@/components/common/ManualAdUnit";
import React from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://takethetools.com"),
  title: {
    default: "TakeThe Tools - All-in-One Online Tools Platform",
    template: "%s | TakeThe Tools",
  },
  description: "High-performance, free online tools for image conversion, PDF management, developer utilities, and file converters. Fast, secure, and browser-based.",
  keywords: ["online tools", "webp to png", "pdf merge", "image compressor", "json formatter", "file converter", "developer tools"],
  authors: [{ name: "TakeThe Tools Team" }],
  creator: "TakeThe Tools",
  publisher: "TakeThe Tools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "TakeThe Tools - All-in-One Online Tools Platform",
    description: "Free online tools for image conversion, PDF editing, developer utilities, and file converters.",
    url: "https://takethetools.com",
    siteName: "TakeThe Tools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TakeThe Tools - All-in-One Online Tools Platform",
    description: "Free online tools for image conversion, PDF editing, developer utilities, and file converters.",
    creator: "@takethetools",
  },
  alternates: {
    canonical: "/",
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
  verification: {
    google: "R5hXPJ6P5ccuvameesuglIvAJ0PGxB-g2LFxLzEr5vw",
  },
  other: {
    "google-adsense-account": "ca-pub-2006415668111484",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TakeThe Tools",
  "url": "https://takethetools.com",
  "logo": "https://takethetools.com/logo.webp",
  "sameAs": [
    "https://twitter.com/takethetools"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAdSense publisherId="ca-pub-2006415668111484" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans`}
        suppressHydrationWarning
      >
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
        <Header />
        <div className="pt-[80px] md:pt-[104px]">
          {/* Top Ad Banner — Shows on all pages */}
          <div className="container mx-auto px-4 py-3 flex justify-center">
            <ManualAdUnit adSlot="3171595105" adFormat="horizontal" />
          </div>
          <main className="flex-grow">{children}</main>
          {/* Bottom Ad Banner — Shows on all pages */}
          <div className="container mx-auto px-4 py-3 flex justify-center">
            <ManualAdUnit adSlot="3171595105" adFormat="horizontal" />
          </div>
        </div>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
