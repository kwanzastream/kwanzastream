"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Check, X } from "lucide-react"
import Link from "next/link"

function VerificarEmailContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get("token")

    const [status, setStatus] = useState<"loading" | "success" | "error" | "idle">(
        token ? "loading" : "idle"
    )

    useEffect(() => {
        if (!token) return
        api
            .post("/api/auth/verify-email", { token })
            .then(() => setStatus("success"))
            .catch(() => setStatus("error"))
    }, [token])

    return (
        <div className="w-full max-w-md px-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Kwanza Stream</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Verificação de email</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    {status === "loading" && (
                        <>
                            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                            <p className="text-sm text-muted-foreground">A verificar o teu email...</p>
                        </>
                    )}
                    {status === "success" && (
                        <>
                            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                                <Check className="w-6 h-6 text-green-500" />
                            </div>
                            <p className="text-sm">Email verificado com sucesso!</p>
                            <Button className="w-full" onClick={() => router.push("/feed")}>Ir para o feed</Button>
                        </>
                    )}
                    {status === "error" && (
                        <>
                            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                                <X className="w-6 h-6 text-destructive" />
                            </div>
                            <p className="text-sm text-muted-foreground">Link inválido ou expirado.</p>
                            <Link href="/entrar"><Button variant="outline" className="w-full">Voltar para entrar</Button></Link>
                        </>
                    )}
                    {status === "idle" && (
                        <p className="text-sm text-muted-foreground">Verifica o teu email para o link de confirmação.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default function VerificarEmailPage() {
    return (
        <Suspense fallback={
            <div className="w-full max-w-md px-4 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <VerificarEmailContent />
        </Suspense>
    )
}
