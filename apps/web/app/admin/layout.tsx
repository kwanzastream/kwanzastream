import { AdminGuard } from '@/components/admin-guard'

/**
 * Layout exclusivo para /admin/*.
 * Envolve todas as páginas do painel admin com o AdminGuard 
 * que verifica autenticação e role ADMIN.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdminGuard>{children}</AdminGuard>
}
