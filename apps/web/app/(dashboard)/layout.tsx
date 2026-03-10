import { DashboardGuard } from "@/components/guards/dashboard-guard"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DashboardGuard>
            <div className="flex min-h-screen">
                <DashboardSidebar />
                <div className="flex-1 flex flex-col">
                    <DashboardNav />
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </DashboardGuard>
    )
}
