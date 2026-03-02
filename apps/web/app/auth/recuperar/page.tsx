"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KeyRound, ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react"
import Link from "next/link"

type Step = "request" | "reset" | "done"

function RecuperarContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const tokenFromUrl = searchParams.get("token")

    const [step, setStep] = React.useState<Step>(tokenFromUrl ? "reset" : "request")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [error, setError] = React.useState("")

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

    const handleRequestReset = async () => {
        if (!email.trim()) return
        setLoading(true)
        setError("")
        try {
            const res = await fetch(`${apiUrl}/api/auth/request-password-reset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            setMessage(data.message || "Verifica o teu email.")
        } catch {
            setError("Erro de ligação. Tenta novamente.")
        }
        setLoading(false)
    }

    const handleResetPassword = async () => {
        if (password.length < 8) {
            setError("A senha deve ter pelo menos 8 caracteres.")
            return
        }
        if (password !== confirmPassword) {
            setError("As senhas não coincidem.")
            return
        }
        setLoading(true)
        setError("")
        try {
            const res = await fetch(`${apiUrl}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: tokenFromUrl, password }),
            })
            const data = await res.json()
            if (res.ok && data.success) {
                setStep("done")
            } else {
                setError(data.error || "Token inválido ou expirado.")
            }
        } catch {
            setError("Erro de ligação. Tenta novamente.")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-white/10 bg-card/50 backdrop-blur">
                <CardContent className="p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <KeyRound className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-xl font-black text-white">
                            {step === "request" ? "Recuperar Conta" : step === "reset" ? "Nova Senha" : "Senha Alterada!"}
                        </h1>
                    </div>

                    {/* Step: Request */}
                    {step === "request" && !message && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground text-center">
                                Insere o email associado à tua conta. Enviaremos um link para repor a tua senha.
                            </p>
                            <div className="space-y-2">
                                <label className="text-xs font-bold">Email</label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="teu@email.com"
                                    className="bg-white/5 border-white/10 h-12"
                                    onKeyDown={e => e.key === "Enter" && handleRequestReset()}
                                />
                            </div>
                            {error && <p className="text-xs text-red-400 text-center">{error}</p>}
                            <Button
                                onClick={handleRequestReset}
                                disabled={loading || !email.trim()}
                                className="w-full bg-primary hover:bg-primary/90 font-bold h-12"
                            >
                                {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> A enviar...</> : <><Mail className="h-4 w-4 mr-2" /> Enviar Link</>}
                            </Button>
                        </div>
                    )}

                    {/* Step: Request sent message */}
                    {step === "request" && message && (
                        <div className="space-y-4 text-center">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                <Mail className="h-8 w-8 text-green-400" />
                            </div>
                            <p className="text-sm text-muted-foreground">{message}</p>
                            <p className="text-xs text-muted-foreground">Verifica a tua caixa de entrada (e spam).</p>
                        </div>
                    )}

                    {/* Step: Reset */}
                    {step === "reset" && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground text-center">
                                Define a tua nova senha. Deve ter pelo menos 8 caracteres.
                            </p>
                            <div className="space-y-2">
                                <label className="text-xs font-bold">Nova Senha</label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Mínimo 8 caracteres"
                                    className="bg-white/5 border-white/10 h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold">Confirmar Senha</label>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="Repete a senha"
                                    className="bg-white/5 border-white/10 h-12"
                                    onKeyDown={e => e.key === "Enter" && handleResetPassword()}
                                />
                            </div>
                            {error && <p className="text-xs text-red-400 text-center">{error}</p>}
                            <Button
                                onClick={handleResetPassword}
                                disabled={loading || !password || !confirmPassword}
                                className="w-full bg-primary hover:bg-primary/90 font-bold h-12"
                            >
                                {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> A processar...</> : "Alterar Senha"}
                            </Button>
                        </div>
                    )}

                    {/* Step: Done */}
                    {step === "done" && (
                        <div className="space-y-4 text-center">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="h-8 w-8 text-green-400" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                A tua senha foi alterada com sucesso. Já podes iniciar sessão.
                            </p>
                            <Link href="/auth">
                                <Button className="w-full bg-primary hover:bg-primary/90 font-bold h-12">
                                    Ir para Login
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Back link */}
                    {step !== "done" && (
                        <div className="text-center">
                            <Link href="/auth" className="text-xs text-muted-foreground hover:text-white transition-colors inline-flex items-center gap-1">
                                <ArrowLeft className="h-3 w-3" /> Voltar ao Login
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default function RecuperarPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        }>
            <RecuperarContent />
        </Suspense>
    )
}
