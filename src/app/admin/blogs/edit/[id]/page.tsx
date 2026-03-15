"use client";

import { useEffect, useState, use } from "react";
import BlogForm from "@/components/admin/BlogForm";
import { Loader2, AlertCircle } from "lucide-react";

interface Props {
    params: Promise<{ id: string }>;
}

export default function EditBlogPage({ params }: Props) {
    const { id } = use(params);
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/admin/blogs/${id}`);
                if (!res.ok) throw new Error("Blog not found");
                const data = await res.json();
                setBlog(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                <p className="text-slate-500 font-medium">Loading blog details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 bg-red-50 text-red-600 rounded-[2rem] border border-red-100 flex items-center gap-3 font-medium">
                <AlertCircle className="w-6 h-6" /> {error}
            </div>
        );
    }

    return <BlogForm initialData={blog} />;
}
