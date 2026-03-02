"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft,
    Shield,
    Smartphone,
    Monitor,
    Globe,
    Clock,
    LogOut,
    Loader2,
    CheckCircle,
    AlertTriangle,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { authService } from "@/lib/services"

interface SessionEntry {
    id: string
    device: string
    ip: string
    lastUsed: string
    isCurrent: boolean
}

export default function SecurityPage() {
    const router = useRouter()
    const { user, isLoggedIn, isLoading: authLoading } = useAuth()
    const [sessions, setSessions] = React.useState<SessionEntry[]>([])
    const [loading, setLoading] = React.useState(true)
    const [loggingOutAll, setLoggingOutAll] = React.useState(false)
    const [loggedOutAll, setLoggedOutAll] = React.useState(false)

    React.useEffect(() => {
        if (!authLoading && !isLoggedIn) {
            router.push("/auth")
        }
    }, [authLoading, isLoggedIn, router])

    React.useEffect(() => {
        const fetchSessions = async () => {
            try {
                // Try to get sessions from API, fallback to current session info
                const res = await authService.getMe()
                const u = res.data.user || res.data
                setSessions([
                    {
                        id: "current",
                        device: detectDevice(),
                        ip: "Sessão actual",
                        lastUsed: new Date().toISOString(),
                        isCurrent: true,
                    },
                ])
            } catch {
                setSessions([])
            }
            setLoading(false)
        }
        if (isLoggedIn) fetchSessions()
    }, [isLoggedIn])

    const detectDevice = () => {
        const ua = typeof navigator !== "undefined" ? navigator.userAgent : ""
        if (/mobile/i.test(ua)) return "Telemóvel"
        if (/tablet/i.test(ua)) return "Tablet"
        return "Computador"
    }

    const getDeviceIcon = (device: string) => {
        if (device === "Telemóvel") return <Smartphone className="h-5 w-5" />
        if (device === "Tablet") return <Smartphone className="h-5 w-5" />
        return <Monitor className="h-5 w-5" />
    }

    const handleLogoutAll = async () => {
        setLoggingOutAll(true)
        try {
            await authService.logout()
            setLoggedOutAll(true)
            setTimeout(() => router.push("/auth"), 2000)
        } catch {
            // still redirect
            router.push("/auth")
        }
    }

    const lastLogin = (user as any)?.lastLoginAt
        ? new Date((user as any).lastLoginAt).toLocaleDateString("pt-AO", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        : null

    if (authLoading) return null

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 p-4 md:px-6 flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-black tracking-tight flex items-center gap-2 uppercase">
                    <Shield className="h-5 w-5 text-primary" /> Segurança
                </h1>
            </header>

            <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
                {/* Last Login */}
                {lastLogin && (
                    <Card className="border-white/10 bg-card/50 backdrop-blur">
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="p-2 bg-green-500/10 rounded-full">
                                <CheckCircle className="h-5 w-5 text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold">Último login</p>
                                <p className="text-xs text-muted-foreground">{lastLogin}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Active Sessions */}
                <div className="space-y-3">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                        Sessões Activas
                    </h2>

                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2].map(i => (
                                <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    ) : sessions.length === 0 ? (
                        <Card className="border-white/10 bg-card/50">
                            <CardContent className="p-6 text-center">
                                <p className="text-sm text-muted-foreground">Nenhuma sessão activa encontrada.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        sessions.map(session => (
                            <Card key={session.id} className="border-white/10 bg-card/50 backdrop-blur">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                                        {getDeviceIcon(session.device)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-sm">{session.device}</p>
                                            {session.isCurrent && (
                                                <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-400 border-green-500/30">
                                                    Actual
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                            <Globe className="h-3 w-3" /> {session.ip}
                                        </p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                            <Clock className="h-3 w-3" /> {new Date(session.lastUsed).toLocaleDateString("pt-AO", {
                                                day: "numeric",
                                                month: "short",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Logout All */}
                <div className="space-y-3">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                        Acções de Segurança
                    </h2>

                    <Card className="border-red-500/10 bg-card/50 backdrop-blur">
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-red-500/10 rounded-full mt-0.5">
                                    <AlertTriangle className="h-4 w-4 text-red-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Sair de todos os dispositivos</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                                        Termina todas as sessões activas. Vais precisar de iniciar sessão novamente em todos os dispositivos.
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 h-11"
                                onClick={handleLogoutAll}
                                disabled={loggingOutAll || loggedOutAll}
                            >
                                {loggedOutAll ? (
                                    <><CheckCircle className="h-4 w-4 mr-2" /> Sessões terminadas</>
                                ) : loggingOutAll ? (
                                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> A terminar...</>
                                ) : (
                                    <><LogOut className="h-4 w-4 mr-2" /> Sair de Todos</>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Security Tips */}
                <Card className="border-primary/10 bg-card/50 backdrop-blur">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <Shield className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="font-bold text-sm mb-1">Dicas de Segurança</p>
                                <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                                    <li>• Usa uma senha forte e única para a tua conta</li>
                                    <li>• Não partilhes as tuas credenciais com ninguém</li>
                                    <li>• Se vires uma sessão desconhecida, termina-a imediatamente</li>
                                    <li>• Contacta o suporte se suspeitares de acesso não autorizado</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
