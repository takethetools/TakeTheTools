"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Wrench,
    FileText,
    FolderTree,
    Search,
    LayoutTemplate,
    BarChart3,
    Settings,
    LogOut,
    ChevronRight,
    Menu,
    X,
    Shield
} from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

const MENU_ITEMS = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Wrench, label: "Manage Tools", href: "/admin/tools" },
    { icon: FileText, label: "Manage Blogs", href: "/admin/blogs" },
    { icon: FolderTree, label: "Manage Categories", href: "/admin/categories" },
    { icon: Search, label: "SEO Manager", href: "/admin/seo" },
    { icon: LayoutTemplate, label: "Ads Manager", href: "/admin/ads" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Don't show admin layout for login page
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                "fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 transition-transform duration-300 lg:static lg:translate-x-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    {/* Logo Section */}
                    <div className="p-8 border-b border-slate-800">
                        <Link href="/admin" className="flex items-center gap-3 text-white">
                            <div className="p-2 bg-primary-600 rounded-lg">
                                <Shield className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-display font-bold tracking-tight">CMS Admin</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                        {MENU_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={clsx(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                                        isActive
                                            ? "bg-primary-600 text-white shadow-lg shadow-primary-900/20"
                                            : "hover:bg-slate-800 hover:text-white"
                                    )}
                                >
                                    <item.icon className={clsx("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-primary-400")} />
                                    <span className="font-medium">{item.label}</span>
                                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Section */}
                    <div className="p-6 border-t border-slate-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-400 group"
                        >
                            <LogOut className="w-5 h-5 group-hover:text-red-400" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
                    <button
                        className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6 text-slate-600" />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-900">TakeTheTools Admin</p>
                            <p className="text-xs text-slate-500">Super Administrator</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600">
                            AD
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8 lg:p-12">
                    {children}
                </main>
            </div>
        </div>
    );
}
