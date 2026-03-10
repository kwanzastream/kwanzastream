import { AdminGuard } from "@/components/admin-guard"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopbar } from "@/components/admin/admin-topbar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminGuard>
            <div className="flex min-h-screen">
                <AdminSidebar />
                <div className="flex-1 flex flex-col">
                    <AdminTopbar />
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </AdminGuard>
    )
}
