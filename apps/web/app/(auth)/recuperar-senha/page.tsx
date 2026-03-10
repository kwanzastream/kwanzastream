"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ArrowLeft, Loader2, Check } from "lucide-react"
import Link from "next/link"

type RecoverStep = "email" | "sent"

const emailSchema = z.object({
    email: z.string().email("Email inválido"),
})

export default function RecuperarSenhaPage() {
    const [step, setStep] = useState<RecoverStep>("email")

    const form = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    })

    const onSubmit = async (data: { email: string }) => {
        try {
            await api.post("/api/auth/request-password-reset", { email: data.email })
            setStep("sent")
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Erro ao enviar email")
        }
    }

    return (
        <div className="w-full max-w-md px-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Kwanza Stream</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{step === "email" ? "Recuperar password" : "Email enviado"}</CardTitle>
                    <CardDescription>
                        {step === "email" ? "Envia-te um link para redefinir a password" : "Verifica a tua caixa de email"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {step === "email" && (
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label>Email</Label>
                                <Input type="email" placeholder="nome@exemplo.com" {...form.register("email")} />
                                {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enviar link de recuperação"}
                            </Button>
                            <Link href="/entrar" className="flex items-center justify-center text-sm text-muted-foreground hover:underline">
                                <ArrowLeft className="w-3.5 h-3.5 mr-1" />Voltar para entrar
                            </Link>
                        </form>
                    )}

                    {step === "sent" && (
                        <div className="text-center space-y-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                <Check className="w-6 h-6 text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Enviámos um link de recuperação para <span className="font-medium text-foreground">{form.getValues("email")}</span>. Verifica a tua caixa de entrada e spam.
                            </p>
                            <Button variant="outline" className="w-full" onClick={() => setStep("email")}>Tentar outro email</Button>
                            <Link href="/entrar" className="block text-sm text-primary hover:underline">Voltar para entrar</Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
