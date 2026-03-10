"use client"

import { use } from "react"
import Link from "next/link"
import { ShieldAlert, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BannedPageSearchParams {
    reason?: string
    date?: string
}

export default function BannedPage({
    searchParams,
}: {
    searchParams: Promise<{ reason?: string; date?: string }>
}) {
    const params = use(searchParams)
    const reason = params?.reason || "Violação dos Termos de Serviço"
    const date = params?.date
        ? new Date(params.date).toLocaleDateString("pt-AO", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : null

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Red glow background */}
            <div className="absolute inset-0 -z-10 overflow-hidden opacity-15 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600 rounded-full blur-[150px]" />
            </div>

            <div className="w-full max-w-[460px] space-y-6">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-red-600/20 border border-red-500/30 rounded-xl flex items-center justify-center">
                        <ShieldAlert className="h-5 w-5 text-red-400" />
                    </div>
                    <span className="font-bold text-2xl tracking-tighter">
                        KWANZA <span className="text-red-400">STREAM</span>
                    </span>
                </div>

                <Card className="border-red-500/20 bg-card/60 backdrop-blur-xl">
                    <CardHeader className="text-center space-y-3 pb-4">
                        <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                            <ShieldAlert className="h-8 w-8 text-red-400" />
                        </div>
                        <CardTitle className="text-2xl text-red-400">
                            Conta Suspensa
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="space-y-3">
                            <div className="p-4 bg-red-500/5 border border-red-500/15 rounded-lg space-y-2">
                                <p className="text-sm font-medium text-red-300">Motivo da suspensão:</p>
                                <p className="text-sm text-muted-foreground">{reason}</p>
                            </div>

                            {date && (
                                <p className="text-xs text-muted-foreground text-center">
                                    Suspensa em {date}
                                </p>
                            )}
                        </div>

                        <div className="space-y-3 pt-2">
                            <p className="text-sm text-muted-foreground text-center">
                                Se acreditas que esta suspensão é um erro, podes contactar a equipa de suporte.
                            </p>

                            <a
                                href="mailto:suporte@kwanzastream.com?subject=Apelação de Suspensão de Conta"
                                className="flex items-center justify-center gap-2 w-full"
                            >
                                <Button
                                    variant="outline"
                                    className="w-full h-11 border-red-500/20 hover:bg-red-500/10 hover:text-red-300"
                                >
                                    <Mail className="mr-2 h-4 w-4" />
                                    Contactar Suporte
                                </Button>
                            </a>

                            <Link href="/auth" className="block">
                                <Button
                                    variant="ghost"
                                    className="w-full h-11 text-muted-foreground hover:text-white"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Voltar ao Login
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-muted-foreground">
                    Lê as nossas{" "}
                    <Link href="/legal/comunidade" className="text-primary hover:underline">
                        Diretrizes da Comunidade
                    </Link>{" "}
                    e{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                        Termos de Serviço
                    </Link>
                </p>
            </div>
        </div>
    )
}
