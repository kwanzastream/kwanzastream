"use client"

import { usePathname } from "next/navigation"
import { MainGuard } from "@/components/guards/main-guard"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    
    // Hide main sidebar on pages that have their own navigation
    const hideSidebar = pathname.startsWith("/definicoes")

    return (
        <MainGuard>
            <div className="flex min-h-screen">
                {!hideSidebar && <Sidebar />}
                <div className="flex-1 flex flex-col">
                    <Navbar variant="main" />
                    <main className="flex-1 p-4">{children}</main>
                </div>
            </div>
        </MainGuard>
    )
}
