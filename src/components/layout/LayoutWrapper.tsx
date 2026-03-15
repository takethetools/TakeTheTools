"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function LayoutWrapper({
    children,
    hideOnAdmin = false
}: {
    children: React.ReactNode;
    hideOnAdmin?: boolean;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin && hideOnAdmin) {
        return null;
    }

    return <>{children}</>;
}
