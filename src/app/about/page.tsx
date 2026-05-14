import { Shield, Zap, Globe, Rocket, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - TakeThe Tools | Our Mission & Story",
  description: "Learn about TakeThe Tools, our mission to provide free, high-performance online tools, and our commitment to user privacy and security.",
  keywords: "about takethe tools, our mission, online tools platform, privacy first tools",
  openGraph: {
    title: "About Us - TakeThe Tools",
    description: "Discover the story behind TakeThe Tools and our mission to simplify digital tasks for everyone.",
    type: "website",
    url: "https://takethetools.com/about",
  },
  alternates: {
    canonical: "https://takethetools.com/about",
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays with you. Most of our tools process files directly in your browser, ensuring maximum security and privacy.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built with modern technology like Next.js 15 and optimized algorithms to ensure your tasks are completed in seconds.",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: Globe,
      title: "Always Free",
      description: "We believe powerful digital tools should be accessible to everyone, everywhere, without any hidden costs.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  const missions = [
    {
      title: "Empowering Creativity",
      description: "Providing the tools you need to convert, edit, and optimize your files without technical barriers.",
    },
    {
      title: "Simplifying Workflows",
      description: "Reducing the time spent on repetitive digital tasks so you can focus on what really matters.",
    },
    {
      title: "Global Accessibility",
      description: "A platform designed for users worldwide, regardless of their device or internet speed.",
    },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 font-medium text-sm mb-6 border border-primary-100">
              <Rocket className="w-4 h-4 fill-current" />
              <span>Our Story & Mission</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-bold text-slate-900 mb-8 tracking-tight">
              Making Digital Tasks <span className="text-primary-600">Effortless</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Welcome to TakeThe Tools — your all-in-one destination for free, fast, and secure online tools. We are on a mission to simplify the way you work with files and data, one tool at a time.
            </p>
          </div>

          {/* Our Story — HUMAN STORY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are</h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  TakeTheTools was built by a frontend developer who got tired of one thing: needing five different websites just to compress an image, convert a PDF, and format some JSON — all in the same afternoon.
                </p>
                <p>
                  Most of those websites were slow, full of aggressive ads, or quietly uploaded your files to some unknown server. That felt wrong. So we built TakeTheTools — a single platform where your files stay on your device, the tools actually work, and everything is free.
                </p>
                <p>
                  We are a small, independent team based in Pakistan, passionate about building useful software for the web. Every tool on this platform is hand-built and tested before it goes live. We are not a corporation — we are developers who use these tools ourselves.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary-100 rounded-3xl -z-10 transform rotate-3"></div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
                <div className="space-y-6">
                  {missions.map((m, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="shrink-0 mt-1">
                        <CheckCircle2 className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{m.title}</h4>
                        <p className="text-slate-500 text-sm">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Why We Built This */}
          <div className="bg-slate-50 rounded-3xl border border-slate-100 p-10 mb-32">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why We Built TakeTheTools</h2>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                The internet already has tools for everything — but most of them come with a catch. Some require you to create an account just to download your own file. Others have paywalls for features that should be basic. And almost all of them display so many ads that finding the actual tool feels like a game.
              </p>
              <p>
                We wanted something different. A platform where you land, use the tool, and leave — no sign-ups, no hidden limits, no file storage on our end. Just tools that work.
              </p>
              <p>
                Today, TakeTheTools offers <strong>200+ free tools</strong> across image processing, PDF editing, developer utilities, text tools, security tools, and more — all running directly in your browser. We keep building because we keep finding problems worth solving.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                The principles that guide everything we build at TakeThe Tools.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 ${v.bg} ${v.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <v.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{v.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{v.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats / Trust */}
          <div className="bg-slate-900 rounded-[40px] p-12 md:p-20 text-center text-white mb-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 blur-[100px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/20 blur-[100px] -ml-32 -mb-32"></div>

            <h2 className="text-3xl md:text-5xl font-bold mb-12 relative z-10">
              Built for the Real Web
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">200+</p>
                <p className="text-slate-400 font-medium">Tools Available</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">100%</p>
                <p className="text-slate-400 font-medium">Free Forever</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">Browser</p>
                <p className="text-slate-400 font-medium">Side Processing</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">24/7</p>
                <p className="text-slate-400 font-medium">Always Online</p>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-slate-50 rounded-3xl border border-slate-100 p-10 mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Commitment to You</h2>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                We will never sell your data. We will never charge you for tools that should be free. And we will never stop improving based on what our users actually need.
              </p>
              <p>
                If you find a bug, notice something wrong, or just want to suggest a new tool — our contact page is always open. We read every message personally. That is the kind of platform we want to be.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Have Suggestions?</h2>
            <p className="text-slate-600 mb-10 max-w-xl mx-auto text-lg">
              We are constantly adding new tools based on what our users need. If there is a tool you cannot find anywhere else, tell us — we will build it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/tools"
                className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
              >
                Explore All Tools
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}