import { Shield, Lock, Eye, FileText } from "lucide-react";
import { Metadata } from "next";
import AdPlaceholder from "@/components/common/AdPlaceholder";

export const metadata: Metadata = {
  title: "Privacy Policy - TakeThe Tools",
  description: "Learn how TakeThe Tools protects your privacy. We process all data locally on your device and never store your files.",
  alternates: {
    canonical: "https://takethetools.com/privacy",
  },
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data Protection",
      icon: Shield,
      content: "At TakeThe Tools, your privacy is our top priority. Most of our tools process files and data directly in your browser using client-side JavaScript. This means your sensitive information never even reaches our servers."
    },
    {
      title: "File Storage",
      icon: Lock,
      content: "We do not store, view, or share any files you upload to our platform. Once you close your browser tab, all temporary data is wiped from your local memory. We are a 'No-Logs' platform for file processing."
    },
    {
      title: "Cookies & Tracking",
      icon: Eye,
      content: "We use minimal cookies for essential site functionality and basic analytics to improve user experience. We do not sell your personal behavior data to third-party advertisers."
    },
    {
      title: "User Rights",
      icon: FileText,
      content: "You have the right to use our tools without creating an account. We do not require any personal identification, email addresses, or payment information for our standard tool suite."
    }
  ];

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <AdPlaceholder type="horizontal" className="mb-12" />
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
            Privacy <span className="text-primary-600">Policy</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Your trust is our most valuable asset. Here is how we keep your data safe and private.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {sections.map((section, index) => (
            <div key={index} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary-100/20 transition-all duration-300">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                <section.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{section.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate max-w-none bg-slate-50 p-10 rounded-3xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Detailed Overview</h2>
          <p className="text-slate-600 mb-4">
            TakeThe Tools operates as a privacy-first utility platform. Our technical architecture is designed to minimize data exposure. By leveraging modern Web APIs (like File API, Canvas, and Web Cryptography), we perform complex operations on your device rather than on our infrastructure.
          </p>
          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Third-Party Services</h3>
          <p className="text-slate-600 mb-4">
            Some tools may use temporary third-party APIs for specific tasks (like IP Lookup or certain advanced conversions). In these cases, we only transmit the necessary data required for the operation and ensure that our partners adhere to strict data processing standards.
          </p>
          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Policy Updates</h3>
          <p className="text-slate-600">
            We may update this policy periodically to reflect changes in our practices or for legal reasons. We encourage you to review this page regularly to stay informed about our commitment to your privacy.
          </p>
          <p className="text-slate-400 text-sm mt-12">Last updated: March 9, 2026</p>
        </div>
      </div>
    </div>
  );
}
