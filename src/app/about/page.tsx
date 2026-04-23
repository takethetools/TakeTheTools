import { Shield, Zap, Globe, Heart, Rocket, Target, Users, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";
import ManualAdUnit from "@/components/common/ManualAdUnit";

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
              Welcome to TakeThe Tools, your all-in-one destination for high-performance, free, and secure online tools. We're on a mission to simplify the way you work with files and data.
            </p>
            <div className="mt-12 flex justify-center">
              <ManualAdUnit adSlot="2317951509" adFormat="auto" />
            </div>
          </div>

          {/* Our Story / Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are</h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  At TakeThe Tools, we realized that the internet is full of tools that are either too expensive, filled with intrusive ads, or compromise user privacy. We decided to change that.
                </p>
                <p>
                  Our team of developers and designers came together to build a platform that prioritizes **speed, simplicity, and security**. Whether you're converting a PDF, optimizing an image, or formatting code, we provide the best-in-class experience.
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

          {/* Core Values */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
              <p className="text-slate-500 max-w-xl mx-auto">The principles that guide everything we build at TakeThe Tools.</p>
              <div className="mt-8 flex justify-center">
                <ManualAdUnit adSlot="2317951509" adFormat="horizontal" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className={`w-14 h-14 ${v.bg} ${v.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <v.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{v.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats / Trust */}
          <div className="bg-slate-900 rounded-[40px] p-12 md:p-20 text-center text-white mb-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 blur-[100px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/20 blur-[100px] -ml-32 -mb-32"></div>

            <h2 className="text-3xl md:text-5xl font-bold mb-12 relative z-10">Trusted by Global Users</h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">100+</p>
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
                <p className="text-slate-400 font-medium">Availability</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Have Suggestions?</h2>
            <p className="text-slate-600 mb-10 max-w-xl mx-auto italic text-lg">
              "We're constantly evolving and adding new tools based on user feedback. If there's a tool you need, we'll build it for you."
            </p>
            <div className="mb-12 flex justify-center">
              <ManualAdUnit adSlot="2317951509" adFormat="auto" />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/tools" className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
                Explore All Tools
              </a>
              <a href="/contact" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                Contact Us
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
