import { Gavel, CheckCircle, Scale, AlertCircle } from "lucide-react";
import { Metadata } from "next";
import AdPlaceholder from "@/components/common/AdPlaceholder";

export const metadata: Metadata = {
  title: "Terms of Service - TakeThe Tools",
  description: "Read the Terms of Service for TakeThe Tools. Understand your rights and responsibilities when using our free online tools.",
  alternates: {
    canonical: "https://takethetools.com/terms",
  },
};

export default function TermsPage() {
  const points = [
    {
      title: "Free of Charge",
      icon: CheckCircle,
      content: "TakeThe Tools is provided free for all users. You may use our tools for personal or commercial projects without any hidden costs or subscription requirements."
    },
    {
      title: "Fair Use Policy",
      icon: Scale,
      content: "While we offer unlimited access, we ask all users to avoid any automated scraping or high-frequency requests that might degrade the service for others."
    },
    {
      title: "Liability Limitation",
      icon: AlertCircle,
      content: "Our tools are provided 'as is'. We are not responsible for any data loss, file errors, or business disruptions that may result from tool usage."
    },
    {
      title: "Governing Law",
      icon: Gavel,
      content: "By using this platform, you agree to comply with international copyright laws and all applicable local regulations regarding digital content."
    }
  ];

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <AdPlaceholder type="horizontal" className="mb-12" />
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
            Terms of <span className="text-primary-600">Service</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Please read these terms carefully before using our platform. Your use of the site implies acceptance of these terms.
          </p>
        </div>

        <div className="space-y-6 mb-20">
          {points.map((point, index) => (
            <div key={index} className="flex gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm items-start">
              <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary-500/30">
                <point.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{point.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {point.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">User Responsibilities</h2>
          <p className="text-slate-600 mb-6">
            User is solely responsible for the content of the files they process through TakeThe Tools. You represent and warrant that you own or have the necessary licenses to the content you upload and that its use does not violate any third-party rights.
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6">Prohibited Activities</h2>
          <ul className="list-disc pl-6 text-slate-600 space-y-4">
            <li>Attempting to bypass platform security measures or re-engineer the client-side logic.</li>
            <li>Uploading malware, malicious code, or illegal content.</li>
            <li>Using the site in any way that violates applicable laws or regulations.</li>
            <li>Redistributing our tools as part of a paid service without explicit written permission.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6">Termination of Use</h2>
          <p className="text-slate-600 mb-6">
            We reserve the right to block access to the platform for any IP address or user that we believe is violating these terms or causing harm to our service infrastructure.
          </p>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center text-slate-400 text-sm">
            <p>TakeThe Tools &copy; 2026</p>
            <p>Last modified: March 8, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
