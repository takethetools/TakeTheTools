import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdPlaceholder from "@/components/common/AdPlaceholder";
import { Analytics } from "@vercel/analytics/next";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans`}
        suppressHydrationWarning
      >
        <Header />
        <div className="pt-[72px] md:pt-[88px]">
          <AdPlaceholder type="top-banner" />
        </div>
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
