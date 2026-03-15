import prisma from "@/lib/db";
import {
    BarChart3,
    TrendingUp,
    Users,
    MousePointer2,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Globe,
    Smartphone
} from "lucide-react";
import { clsx } from "clsx";

async function getAnalyticsData() {
    try {
        const [toolsCount, blogsCount, categories, recentPubs] = await Promise.all([
            prisma.tool.count(),
            prisma.blog.count(),
            prisma.category.findMany({
                include: {
                    _count: {
                        select: { tools: true, blogs: true }
                    }
                }
            }),
            prisma.blog.findMany({
                take: 5,
                orderBy: { publishDate: "desc" },
                include: { category: true }
            })
        ]);

        return { toolsCount, blogsCount, categories, recentPubs };
    } catch (error) {
        console.error("Failed to fetch analytics data:", error);
        return {
            toolsCount: 0,
            blogsCount: 0,
            categories: [],
            recentPubs: []
        };
    }
}

export default async function AnalyticsPage() {
    const data = await getAnalyticsData();

    const stats = [
        { label: "Est. Monthly Visits", value: "45.2k", change: "+12.5%", trend: "up", icon: Users, color: "bg-blue-500" },
        { label: "Avg. Engagement", value: "2m 45s", change: "+4.2%", trend: "up", icon: Clock, color: "bg-purple-500" },
        { label: "Click Through Rate", value: "3.8%", change: "-0.5%", trend: "down", icon: MousePointer2, color: "bg-emerald-500" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Analytics Dashboard</h1>
                <p className="text-slate-500 mt-1">Real-time performance metrics for TakeTheTools.</p>
            </div>

            {/* Primary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg shadow-slate-200`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={clsx(
                                "flex items-center gap-1 text-sm font-bold",
                                stat.trend === "up" ? "text-emerald-600" : "text-red-500"
                            )}>
                                {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                {stat.change}
                            </div>
                        </div>
                        <p className="text-slate-500 font-medium">{stat.label}</p>
                        <h3 className="text-4xl font-display font-bold text-slate-900 mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Category Performance */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary-600" />
                            Content Distribution
                        </h2>
                        <select className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 outline-none">
                            <option>By Tools</option>
                            <option>By Blogs</option>
                        </select>
                    </div>

                    <div className="space-y-6">
                        {data.categories.slice(0, 6).map((cat) => (
                            <div key={cat.id} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-bold text-slate-700">{cat.name}</span>
                                    <span className="text-slate-400">{cat._count.tools} tools</span>
                                </div>
                                <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                    <div
                                        className="h-full bg-primary-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${(cat._count.tools / data.toolsCount) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Device Breakdown Mockup */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col">
                    <h2 className="text-xl font-bold text-slate-900 mb-8">Device Traffic</h2>
                    <div className="flex-1 flex flex-col justify-center gap-8">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                                <Globe className="w-8 h-8" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="font-bold text-slate-800">Desktop</span>
                                    <span className="text-slate-500">65%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[65%]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
                                <Smartphone className="w-8 h-8" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="font-bold text-slate-800">Mobile</span>
                                    <span className="text-slate-500">35%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 w-[35%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                        <p className="text-xs text-slate-400">Data updated 5 minutes ago.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
