'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Shield, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminGuardProps {
    children: React.ReactNode
}

/**
 * Componente de segurança que protege todas as rotas /admin/*.
 * Verifica se o utilizador está autenticado E tem role ADMIN.
 * Se não tiver permissão, mostra uma página de acesso negado.
 * 
 * Uso: Envolver o conteúdo no layout.tsx do /admin
 */
export function AdminGuard({ children }: AdminGuardProps) {
    const { user, isLoggedIn, isLoading } = useAuth()
    const router = useRouter()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (!isLoading) {
            setChecked(true)
        }
    }, [isLoading])

    // Loading state
    if (isLoading || !checked) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-admin-accent/10 flex items-center justify-center">
                        <Shield className="h-8 w-8 text-admin-accent animate-pulse" style={{ color: 'var(--admin-accent)' }} />
                    </div>
                    <p className="text-sm text-muted-foreground">A verificar permissões...</p>
                </div>
            </div>
        )
    }

    // Not logged in — redirect to auth
    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="max-w-md text-center p-8 rounded-2xl card-surface space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto">
                        <AlertTriangle className="h-8 w-8 text-amber-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-2">Autenticação Necessária</h2>
                        <p className="text-sm text-muted-foreground">
                            Precisas de iniciar sessão para aceder ao painel de administração.
                        </p>
                    </div>
                    <Button
                        className="bg-primary hover:bg-primary/90 rounded-xl w-full"
                        onClick={() => router.push('/auth')}
                    >
                        Iniciar Sessão
                    </Button>
                </div>
            </div>
        )
    }

    // Session timeout — 2h max for admin sessions
    const sessionStart = typeof window !== 'undefined' ? sessionStorage.getItem('ks_admin_session_start') : null
    if (!sessionStart) {
        if (typeof window !== 'undefined') sessionStorage.setItem('ks_admin_session_start', Date.now().toString())
    } else {
        const age = Date.now() - parseInt(sessionStart)
        if (age > 2 * 60 * 60 * 1000) { // 2 hours
            if (typeof window !== 'undefined') sessionStorage.removeItem('ks_admin_session_start')
            router.push('/auth/sessao-expirada?admin=true')
            return null
        }
    }

    // Logged in but NOT admin — access denied
    const adminRoles = ['ADMIN', 'admin', 'super_admin', 'moderator', 'finance', 'support']
    if (!user?.role || !adminRoles.includes(user.role)) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="max-w-md text-center p-8 rounded-2xl card-surface space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto">
                        <Shield className="h-8 w-8 text-red-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-2">Acesso Restrito</h2>
                        <p className="text-sm text-muted-foreground">
                            Não tens permissão para aceder ao painel de administração.
                            Esta área é exclusiva para administradores da plataforma.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="rounded-xl flex-1 border-border bg-transparent"
                            onClick={() => router.push('/feed')}
                        >
                            Ir para o Feed
                        </Button>
                        <Button
                            className="bg-primary hover:bg-primary/90 rounded-xl flex-1"
                            onClick={() => router.push('/')}
                        >
                            Página Inicial
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    // Admin — show content
    return <>{children}</>
}
