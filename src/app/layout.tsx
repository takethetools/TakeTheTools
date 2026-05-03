import type { Metadata } from "next";
// Git Sync: 2026-03-14 - UI & Ads Optimization Complete
// import { Inter, Outfit } from "next/font/google"; // loaded via CSS
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/common/CookieConsent";
import ManualAdUnit from "@/components/common/ManualAdUnit";
import BackToTop from "@/components/common/BackToTop";
import React from "react";
import { AD_SLOTS } from "@/lib/ad-slots";

// Fonts loaded via CSS in globals.css for build compatibility
const inter = { variable: "--font-inter" };
const outfit = { variable: "--font-outfit" };

const siteConfig = {
  siteName: "TakeTheTools",
  siteDescription:
    "High-performance, free online tools for image conversion, PDF management, developer utilities, and file converters. Fast, secure, and browser-based.",
  adSenseId: "ca-pub-3148286057781421",
  twitterHandle: "takethetools",
};

export const dynamic = "force-static";

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
    keywords: [
      "online tools",
      "free online tools",
      "webp to png converter",
      "image compressor online",
      "pdf merge free",
      "json formatter",
      "file converter online",
      "developer tools online",
      "word counter",
      "image converter free",
      "pdf tools free",
      "text tools online",
    ],
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
      creator: siteConfig.twitterHandle
        ? `@${siteConfig.twitterHandle}`
        : "@takethetools",
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

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: "https://takethetools.com",
      logo: "https://takethetools.com/logo.webp",
      contactPoint: {
        "@type": "ContactPoint",
        email: "takethetools7@gmail.com",
        contactType: "customer support"
      },
      sameAs: [
        "https://twitter.com/takethetools",
        "https://github.com/takethetools"
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: "https://takethetools.com",
      description: siteConfig.siteDescription,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://takethetools.com/api/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];

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
        <link rel="preload" href="/logo.webp" as="image" type="image/webp" />
        <Script
          id="google-funding-choices"
          src="https://fundingchoicesmessages.google.com/i/pub-3148286057781421?ers=1"
          strategy="afterInteractive"
        />
        <Script id="google-fc-present" strategy="afterInteractive">
          {`(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`}
        </Script>
        <Script id="google-consent-mode" strategy="beforeInteractive">
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
        <Script
          id="google-analytics"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NWRHEQGRZW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NWRHEQGRZW');
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
              <ManualAdUnit adSlot={AD_SLOTS.IN_CONTENT_AUTO} adFormat="auto" />
            </div>
          </div>

          {children}

          <div className="container mx-auto px-4 py-3 flex justify-center">
            <ManualAdUnit adSlot={AD_SLOTS.IN_CONTENT_AUTO} adFormat="auto" />
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
