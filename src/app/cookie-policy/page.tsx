import { Cookie, Shield, Eye, ShieldCheck, Info } from "lucide-react";
import { Metadata } from "next";
import AdPlaceholder from "@/components/common/AdPlaceholder";

export const metadata: Metadata = {
    title: "Cookie Policy - TakeThe Tools",
    description: "Read our Cookie Policy to understand how TakeThe Tools uses cookies to improve your experience and ensure compliance.",
    alternates: {
        canonical: "https://takethetools.com/cookie-policy",
    },
};

export default function CookiePolicyPage() {
    const cookieTypes = [
        {
            title: "Essential Cookies",
            icon: Shield,
            content: "These are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences or logging in."
        },
        {
            title: "Analytics Cookies",
            icon: Eye,
            content: "These allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular."
        },
        {
            title: "Marketing Cookies",
            icon: ShieldCheck,
            content: "These may be set through our site by our advertising partners (like Google AdSense). They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites."
        }
    ];

    return (
        <div className="pt-10 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <AdPlaceholder type="horizontal" className="mb-12" />

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 font-medium text-sm mb-6 border border-primary-100">
                        <Cookie className="w-4 h-4 fill-current" />
                        <span>Cookies & Privacy</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
                        Cookie <span className="text-primary-600">Policy</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        This policy explains how we use cookies and similar technologies to provide a better, more secure experience.
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-12 mb-16">
                    <div className="prose prose-slate max-w-none">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">What are Cookies?</h2>
                        <p className="text-slate-600 mb-8">
                            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-8">How We Use Cookies</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {cookieTypes.map((type, index) => (
                                <div key={index} className="flex flex-col p-6 bg-slate-50 rounded-3xl border border-slate-100 items-start">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 mb-4 shadow-sm">
                                        <type.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">{type.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {type.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Managing Your Preferences</h2>
                        <p className="text-slate-600 mb-6">
                            You can manage your cookie preferences at any time by clicking the "Cookie Settings" link in our website's footer or through the persistent consent banner that appears on your first visit. You can also control cookies through your browser settings.
                        </p>

                        <div className="bg-primary-50 p-8 rounded-3xl border border-primary-100 flex gap-4">
                            <div className="shrink-0 text-primary-600 mt-1">
                                <Info className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-2">Important for EU/EEA Users</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    In compliance with GDPR, we default all non-essential cookies to 'Denied' until you explicitly provide consent. We also support Google Consent Mode v2 to protect your data while ensuring compatibility with our ad partners.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center text-slate-400 text-sm">
                    <p>TakeThe Tools &copy; 2026. All rights reserved.</p>
                    <p className="mt-1">Last updated: March 9, 2026</p>
                </div>
            </div>
        </div>
    );
}
