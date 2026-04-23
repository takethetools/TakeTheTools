import { Mail, MessageSquare, Twitter, Github, Send, Phone, Clock, Globe, HeartHandshake, Bug, Lightbulb, Users } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { Metadata } from "next";
import ManualAdUnit from "@/components/common/ManualAdUnit";

export const metadata: Metadata = {
  title: "Contact Us - TakeThe Tools | Free Online Tools Support",
  description: "Contact the TakeThe Tools team for support, bug reports, and general feedback. We respond within 24 hours.",
  keywords: "contact takethe tools, online tools support, bug report, tool request",
  openGraph: {
    title: "Contact Us - TakeThe Tools",
    description: "Get in touch with our team for support, feedback, or tool requests. We'd love to hear from you.",
    type: "website",
    url: "https://takethetools.com/contact",
  },
  alternates: {
    canonical: "https://takethetools.com/contact",
  },
};

export default function ContactPage() {
  const contactChannels = [
    {
      icon: Mail,
      title: "Email Support",
      value: "support@takethetools.com",
      description: "General inquiries & support",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Bug,
      title: "Bug Reports",
      value: "bugs@takethetools.com",
      description: "Found a broken tool? Let us know",
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 Hours",
      description: "Mon – Fri, 9 AM – 6 PM UTC",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  const reasons = [
    { icon: Bug, text: "Report a broken or incorrect tool" },
    { icon: Lightbulb, text: "Request a new tool to be added" },
    { icon: MessageSquare, text: "General feedback or suggestions" },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
              Get in <span className="text-primary-600">Touch</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Have a question, feedback, or a tool request? We'd love to hear from you.
              Our team typically responds within 24 hours.
            </p>
            <div className="mt-12 flex justify-center">
              <ManualAdUnit adSlot="2317951509" adFormat="auto" />
            </div>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {contactChannels.map((channel, i) => (
              <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary-100/20 transition-all duration-300 text-center">
                <div className={`w-14 h-14 ${channel.bg} ${channel.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <channel.icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{channel.title}</p>
                <p className="font-bold text-slate-900 text-sm mb-1">{channel.value}</p>
                <p className="text-xs text-slate-400">{channel.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — Why Contact + Socials */}
            <div className="space-y-12">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Why people reach out</h2>
                <div className="space-y-4">
                  {reasons.map((reason, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                        <reason.icon className="w-5 h-5" />
                      </div>
                      <p className="text-slate-600 font-medium">{reason.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Follow us</h2>
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="flex items-center gap-3 p-4 bg-sky-50 text-sky-600 rounded-2xl hover:bg-sky-100 transition-all font-bold text-sm">
                    <Twitter className="w-5 h-5" /> Twitter / X
                  </a>
                  <a href="#" className="flex items-center gap-3 p-4 bg-slate-100 text-slate-900 rounded-2xl hover:bg-slate-200 transition-all font-bold text-sm">
                    <Github className="w-5 h-5" /> GitHub
                  </a>
                  <a href="#" className="flex items-center gap-3 p-4 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition-all font-bold text-sm">
                    <MessageSquare className="w-5 h-5" /> Discord
                  </a>
                  <a href="#" className="flex items-center gap-3 p-4 bg-green-50 text-green-600 rounded-2xl hover:bg-green-100 transition-all font-bold text-sm">
                    <Globe className="w-5 h-5" /> Newsletter
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>

          <div className="mt-16 flex justify-center">
            <ManualAdUnit adSlot="2317951509" adFormat="horizontal" />
          </div>

          {/* SEO Section */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-slate-50 rounded-3xl">
              <p className="text-4xl font-bold text-primary-600 mb-2">6h</p>
              <p className="text-slate-500 font-medium">Average Response Time</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl">
              <p className="text-4xl font-bold text-primary-600 mb-2">100+</p>
              <p className="text-slate-500 font-medium">Tools Available</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl">
              <p className="text-4xl font-bold text-primary-600 mb-2">Free</p>
              <p className="text-slate-500 font-medium">Always No Cost</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
