"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react"
import Link from "next/link"

function VerificarEmailContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get("token")

    const [status, setStatus] = React.useState<"loading" | "success" | "error">("loading")
    const [message, setMessage] = React.useState("")

    React.useEffect(() => {
        if (!token) {
            setStatus("error")
            setMessage("Token de verificação não encontrado.")
            return
        }

        const verify = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
                const res = await fetch(`${apiUrl}/api/auth/verify-email`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                })

                const data = await res.json()

                if (res.ok && data.success) {
                    setStatus("success")
                    setMessage(data.message || "Email verificado com sucesso!")
                } else {
                    setStatus("error")
                    setMessage(data.error || "Token inválido ou expirado.")
                }
            } catch {
                setStatus("error")
                setMessage("Erro de ligação. Tenta novamente.")
            }
        }

        verify()
    }, [token])

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-white/10 bg-card/50 backdrop-blur">
                <CardContent className="p-8 text-center space-y-6">
                    {status === "loading" && (
                        <>
                            <Loader2 className="h-16 w-16 text-primary mx-auto animate-spin" />
                            <h2 className="text-xl font-bold text-white">A verificar email...</h2>
                            <p className="text-sm text-muted-foreground">Aguarda um momento.</p>
                        </>
                    )}

                    {status === "success" && (
                        <>
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="h-10 w-10 text-green-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Email Verificado! ✅</h2>
                            <p className="text-sm text-muted-foreground">{message}</p>
                            <Link href="/feed">
                                <Button className="w-full bg-primary hover:bg-primary/90 font-bold h-12">
                                    Ir para o Feed
                                </Button>
                            </Link>
                        </>
                    )}

                    {status === "error" && (
                        <>
                            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                                <XCircle className="h-10 w-10 text-red-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Verificação Falhou</h2>
                            <p className="text-sm text-muted-foreground">{message}</p>
                            <Link href="/auth">
                                <Button variant="outline" className="w-full border-white/10 font-bold h-12">
                                    Voltar ao Login
                                </Button>
                            </Link>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default function VerificarEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        }>
            <VerificarEmailContent />
        </Suspense>
    )
}
