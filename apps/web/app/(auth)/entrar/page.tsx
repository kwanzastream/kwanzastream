"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { toast } from "sonner"
import { Eye, EyeOff, Phone, Mail, ArrowRight, Loader2 } from "lucide-react"

const emailSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
})

const phoneSchema = z.object({
  phone: z.string().min(9, "Número inválido"),
})

type EmailForm = z.infer<typeof emailSchema>
type PhoneForm = z.infer<typeof phoneSchema>

function EntrarContent() {
  const { login, requestOtp, loginWithOtp } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/feed"

  const [showPassword, setShowPassword] = useState(false)
  const [otpStep, setOtpStep] = useState(false)
  const [phoneForOtp, setPhoneForOtp] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const [otpLoading, setOtpLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  const emailForm = useForm<EmailForm>({ resolver: zodResolver(emailSchema) })
  const phoneForm = useForm<PhoneForm>({ resolver: zodResolver(phoneSchema) })

  const handleEmailLogin = async (data: EmailForm) => {
    try {
      await login({ email: data.email, password: data.password })
      toast.success("Bem-vindo de volta!")
      router.push(redirectTo)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Email ou password incorrectos")
    }
  }

  const handleRequestOtp = async (data: PhoneForm) => {
    try {
      setOtpLoading(true)
      let phone = data.phone
      if (phone.startsWith("9")) phone = "+244" + phone
      if (phone.startsWith("244")) phone = "+" + phone
      await requestOtp(phone)
      setPhoneForOtp(phone)
      setOtpStep(true)
      toast.success("Código enviado para " + phone)
      setResendCooldown(60)
      const interval = setInterval(() => {
        setResendCooldown((c) => { if (c <= 1) { clearInterval(interval); return 0 } return c - 1 })
      }, 1000)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Erro ao enviar código")
    } finally {
      setOtpLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) return
    try {
      setOtpLoading(true)
      await loginWithOtp(phoneForOtp, otpCode)
      toast.success("Bem-vindo!")
      router.push(redirectTo)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Código inválido ou expirado")
    } finally {
      setOtpLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/auth/google"
  }

  return (
    <div className="w-full max-w-md px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Kwanza Stream</h1>
        <p className="text-muted-foreground mt-1 text-sm">A plataforma angolana de streaming</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Entra na tua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full" onClick={handleGoogleLogin} type="button">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continuar com Google
          </Button>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">ou</span>
          </div>

          <Tabs defaultValue="telefone">
            <TabsList className="w-full">
              <TabsTrigger value="telefone" className="flex-1"><Phone className="w-3.5 h-3.5 mr-1.5" />Telefone</TabsTrigger>
              <TabsTrigger value="email" className="flex-1"><Mail className="w-3.5 h-3.5 mr-1.5" />Email</TabsTrigger>
            </TabsList>

            <TabsContent value="telefone" className="space-y-3 mt-4">
              {!otpStep ? (
                <form onSubmit={phoneForm.handleSubmit(handleRequestOtp)} className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Número de telefone</Label>
                    <Input id="phone" placeholder="+244 9XX XXX XXX" {...phoneForm.register("phone")} />
                    {phoneForm.formState.errors.phone && <p className="text-xs text-destructive">{phoneForm.formState.errors.phone.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={otpLoading}>
                    {otpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Receber código SMS<ArrowRight className="w-4 h-4 ml-2" /></>}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Código enviado para <span className="font-medium text-foreground">{phoneForOtp}</span>
                  </p>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
                      <InputOTPGroup>{[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button className="w-full" onClick={handleVerifyOtp} disabled={otpCode.length !== 6 || otpLoading}>
                    {otpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verificar código"}
                  </Button>
                  <div className="flex items-center justify-between text-sm">
                    <button type="button" className="text-muted-foreground hover:underline" onClick={() => { setOtpStep(false); setOtpCode("") }}>Mudar número</button>
                    <button type="button" className="text-primary hover:underline disabled:opacity-50" disabled={resendCooldown > 0} onClick={() => handleRequestOtp(phoneForm.getValues())}>
                      {resendCooldown > 0 ? `Reenviar (${resendCooldown}s)` : "Reenviar código"}
                    </button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="email" className="space-y-3 mt-4">
              <form onSubmit={emailForm.handleSubmit(handleEmailLogin)} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="nome@exemplo.com" {...emailForm.register("email")} />
                  {emailForm.formState.errors.email && <p className="text-xs text-destructive">{emailForm.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/recuperar-senha" className="text-xs text-primary hover:underline">Esqueci a password</Link>
                  </div>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" {...emailForm.register("password")} />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword((v) => !v)}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {emailForm.formState.errors.password && <p className="text-xs text-destructive">{emailForm.formState.errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={emailForm.formState.isSubmitting}>
                  {emailForm.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-muted-foreground">
            Não tens conta?{" "}<Link href="/registar" className="text-primary font-medium hover:underline">Criar conta grátis</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function EntrarPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-md px-4 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
    }>
      <EntrarContent />
    </Suspense>
  )
}
