"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

type Step = 'phone' | 'otp'

export default function AuthPage() {
  const [step, setStep] = React.useState<Step>('phone')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [otp, setOtp] = React.useState("")
  const [isNewUser, setIsNewUser] = React.useState(false)
  const [devCode, setDevCode] = React.useState<string | null>(null)

  const router = useRouter()
  const { requestOtp, verifyOtp, isLoggedIn } = useAuth()

  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      router.push('/feed')
    }
  }, [isLoggedIn, router])

  const formatPhone = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '')
    // Add +244 prefix if not present
    if (digits.startsWith('244')) {
      return `+${digits}`
    }
    return `+244${digits}`
  }

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const formattedPhone = formatPhone(phone)
      const result = await requestOtp(formattedPhone)
      setIsNewUser(result.isNewUser)
      setDevCode(result.code || null)
      setStep('otp')
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Erro ao enviar código")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const formattedPhone = formatPhone(phone)
      await verifyOtp(formattedPhone, otp)
      router.push('/feed')
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Código inválido")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 angola-pattern relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-secondary rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-[420px] space-y-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="flex items-center gap-2 mb-4 group transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg border-2 border-white/10">
              K
            </div>
            <span className="font-bold text-3xl tracking-tighter">
              KWANZA <span className="text-secondary">STREAM</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            {step === 'phone' ? 'Entrar na tua conta' : 'Verificar código'}
          </h1>
          <p className="text-muted-foreground">
            {step === 'phone'
              ? 'Insere o teu número de telefone para continuar'
              : `Enviámos um código para ${phone}`}
          </p>
        </div>

        <Card className="border-white/10 bg-card/50 backdrop-blur-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">
              {step === 'phone' ? 'Número de Telefone' : 'Código de Verificação'}
            </CardTitle>
            <CardDescription>
              {step === 'phone'
                ? 'Receberás um SMS com um código de verificação'
                : isNewUser ? 'Bem-vindo! Uma nova conta será criada.' : 'Insere o código de 6 dígitos'}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {devCode && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
                <strong>[DEV]</strong> Código: <code className="bg-yellow-500/20 px-2 py-0.5 rounded">{devCode}</code>
              </div>
            )}

            {step === 'phone' ? (
              <form onSubmit={handleRequestOtp} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center px-3 rounded-md bg-white/5 border border-white/10 text-sm font-bold text-muted-foreground">
                      +244
                    </div>
                    <div className="relative flex-1">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="9XX XXX XXX"
                        className="pl-10 h-11 border-white/10 bg-white/5"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                        required
                        autoFocus
                      />
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || phone.length < 9}
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      A enviar...
                    </>
                  ) : (
                    <>
                      Continuar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="otp">Código</Label>
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    placeholder="000000"
                    className="h-14 text-center text-2xl tracking-[0.5em] font-mono border-white/10 bg-white/5"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    autoFocus
                    maxLength={6}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-11 border-white/10"
                    onClick={() => {
                      setStep('phone')
                      setOtp('')
                      setDevCode(null)
                    }}
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || otp.length !== 6}
                    className="flex-1 h-11 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Verificar'
                    )}
                  </Button>
                </div>
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={handleRequestOtp}
                  disabled={isLoading}
                >
                  Não recebi o código? Reenviar
                </button>
              </form>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-center text-xs text-muted-foreground w-full">
              Ao continuar, aceitas os{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Termos
              </Link>{" "}
              e{" "}
              <Link href="/legal/privacidade" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
