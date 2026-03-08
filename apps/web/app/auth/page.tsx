"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Phone,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  MessageSquare,
  AtSign,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { authService } from "@/lib/services"
import { OtpCooldownTimer } from "@/components/otp-cooldown-timer"
import { cn } from "@/lib/utils"

type AuthMode = "signin" | "signup"
type Step = "form" | "otp"

export default function AuthPage() {
  const [mode, setMode] = React.useState<AuthMode>("signin")
  const [step, setStep] = React.useState<Step>("form")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  // Sign Up fields
  const [fullName, setFullName] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const [ageConfirmed, setAgeConfirmed] = React.useState(false)

  // Sign In fields
  const [identifier, setIdentifier] = React.useState("")
  const [loginPassword, setLoginPassword] = React.useState("")
  const [showLoginPassword, setShowLoginPassword] = React.useState(false)

  // OTP fields
  const [otp, setOtp] = React.useState("")
  const [devCode, setDevCode] = React.useState<string | null>(null)
  const [cooldownSeconds, setCooldownSeconds] = React.useState(0)
  const [isCooldownActive, setIsCooldownActive] = React.useState(false)
  const [isNewUser, setIsNewUser] = React.useState(false)

  const router = useRouter()
  const { requestOtp, verifyOtp, isLoggedIn, refreshUser } = useAuth()

  React.useEffect(() => {
    if (isLoggedIn) router.push("/feed")
  }, [isLoggedIn, router])

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "")
    return digits.startsWith("244") ? `+${digits}` : `+244${digits}`
  }

  // ===== Sign Up Handler =====
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.")
      setIsLoading(false)
      return
    }

    try {
      const formattedPhone = formatPhone(phone)
      await authService.register({
        displayName: fullName,
        username,
        phone: formattedPhone,
        email,
        password,
        termsAccepted,
        ageConfirmed,
      })
      await refreshUser()
      router.push("/onboarding")
    } catch (err: any) {
      const errorData = err.response?.data
      if (err.response?.status === 403) {
        const params = new URLSearchParams({
          reason: errorData?.reason || "",
          date: errorData?.bannedAt || "",
        })
        router.push(`/banned?${params.toString()}`)
        return
      }
      if (err.response?.status === 429) {
        setError("Muitas tentativas. Aguarda alguns minutos e tenta novamente.")
        return
      }
      setError(
        errorData?.details?.[0]?.message ||
        errorData?.error ||
        "Erro ao criar conta"
      )
    } finally {
      setIsLoading(false)
    }
  }

  // ===== Sign In (Password) Handler =====
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Detect identifier type: email (@), phone (only digits), or username
      let loginIdentifier = identifier.trim()
      const isEmail = loginIdentifier.includes("@")
      const isPhone = /^\+?[0-9]{9,15}$/.test(loginIdentifier.replace(/\s/g, ""))

      if (!isEmail && isPhone) {
        loginIdentifier = formatPhone(loginIdentifier.replace(/\s/g, ""))
      }
      // For email and username, pass as-is

      await authService.login(loginIdentifier, loginPassword)
      await refreshUser()
      router.push("/feed")
    } catch (err: any) {
      const errorData = err.response?.data
      if (err.response?.status === 403) {
        const params = new URLSearchParams({
          reason: errorData?.reason || "",
          date: errorData?.bannedAt || "",
        })
        router.push(`/banned?${params.toString()}`)
        return
      }
      setError(errorData?.error || "Credenciais inválidas.")
    } finally {
      setIsLoading(false)
    }
  }

  // ===== OTP Handlers (both modes) =====
  const handleRequestOtp = async () => {
    if (isCooldownActive) return
    setIsLoading(true)
    setError("")

    try {
      const formattedPhone = formatPhone(phone || identifier)
      const result = await requestOtp(formattedPhone, termsAccepted, ageConfirmed)
      setIsNewUser(result.isNewUser)
      setDevCode(result.code || null)
      setStep("otp")
      setCooldownSeconds(60)
      setIsCooldownActive(true)
    } catch (err: any) {
      const errorData = err.response?.data
      if (err.response?.status === 429 && errorData?.cooldownRemaining) {
        setCooldownSeconds(errorData.cooldownRemaining)
        setIsCooldownActive(true)
        setStep("otp")
      }
      if (err.response?.status === 403) {
        const params = new URLSearchParams({
          reason: errorData?.reason || "",
          date: errorData?.bannedAt || "",
        })
        router.push(`/banned?${params.toString()}`)
        return
      }
      setError(errorData?.error || "Erro ao enviar código")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const formattedPhone = formatPhone(phone || identifier)
      await verifyOtp(formattedPhone, otp)
      router.push("/feed")
    } catch (err: any) {
      if (err.response?.status === 403) {
        const errorData = err.response?.data
        const params = new URLSearchParams({
          reason: errorData?.reason || "",
          date: errorData?.bannedAt || "",
        })
        router.push(`/banned?${params.toString()}`)
        return
      }
      setError(err.response?.data?.error || "Código inválido")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCooldownComplete = React.useCallback(() => {
    setIsCooldownActive(false)
    setCooldownSeconds(0)
  }, [])

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode)
    setStep("form")
    setError("")
  }

  // ===== OTP Verification Screen (shared) =====
  if (step === "otp") {
    return (
      <AuthShell title="Verificar código" subtitle={`Enviámos um código para ${phone || identifier}`}>
        <Card className="border-border surface-1 backdrop-blur-xl rounded-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Código de Verificação</CardTitle>
            <CardDescription>
              {isNewUser ? "Bem-vindo! Uma nova conta será criada." : "Insere o código de 6 dígitos"}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {error && <ErrorBanner message={error} />}
            {devCode && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
                <strong>[DEV]</strong> Código: <code className="bg-yellow-500/20 px-2 py-0.5 rounded">{devCode}</code>
              </div>
            )}
            <form onSubmit={handleVerifyOtp} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="otp">Código</Label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  placeholder="000000"
                  className="h-14 text-center text-2xl tracking-[0.5em] font-mono border-border surface-4 rounded-xl"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                  autoFocus
                  maxLength={6}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-11 border-border rounded-xl"
                  onClick={() => {
                    setStep("form")
                    setOtp("")
                    setDevCode(null)
                  }}
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="flex-1 h-11 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-xl"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verificar"}
                </Button>
              </div>
              {isCooldownActive ? (
                <OtpCooldownTimer initialSeconds={cooldownSeconds} onComplete={handleCooldownComplete} />
              ) : (
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={handleRequestOtp}
                  disabled={isLoading}
                >
                  Não recebi o código? Reenviar
                </button>
              )}
            </form>
          </CardContent>
        </Card>
      </AuthShell>
    )
  }

  // ===== Main Auth Screen =====
  return (
    <AuthShell
      title={mode === "signin" ? "Entrar na tua conta" : "Criar uma conta"}
      subtitle={mode === "signin" ? "Escolhe como entrar" : "Junta-te à maior comunidade Angolana de creators"}
    >
      {/* Tab Switcher */}
      <div className="flex rounded-xl overflow-hidden border border-border surface-4 p-1">
        <button
          onClick={() => switchMode("signin")}
          className={cn(
            "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all",
            mode === "signin"
              ? "bg-primary text-white shadow-lg"
              : "text-muted-foreground hover:text-white"
          )}
        >
          Entrar
        </button>
        <button
          onClick={() => switchMode("signup")}
          className={cn(
            "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all",
            mode === "signup"
              ? "bg-primary text-white shadow-lg"
              : "text-muted-foreground hover:text-white"
          )}
        >
          Registar
        </button>
      </div>

      <Card className="border-border surface-1 backdrop-blur-xl rounded-2xl">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl">
            {mode === "signin" ? "Iniciar Sessão" : "Criar Conta"}
          </CardTitle>
          <CardDescription>
            {mode === "signin"
              ? "Usa o teu telefone, email, username ou OTP"
              : "Preenche os campos para criar a tua conta"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && <ErrorBanner message={error} />}

          {/* ========== SIGN IN ========== */}
          {mode === "signin" && (
            <form onSubmit={handleSignIn} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="identifier">Telefone, Email ou Username</Label>
                <div className="relative">
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="912345678, email@ex.com ou username"
                    className="pl-10 h-11 border-border surface-4 rounded-xl"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    autoFocus
                  />
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="loginPassword">Senha</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Esqueci a senha
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="loginPassword"
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-11 border-border surface-4 rounded-xl"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    tabIndex={-1}
                  >
                    {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !identifier || !loginPassword}
                className="w-full h-11 bg-primary hover:bg-primary/90 font-semibold rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> A entrar...
                  </>
                ) : (
                  <>
                    Entrar <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {/* OTP Option */}
              <div className="relative my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground">ou</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-border surface-4 hover:bg-white/10 rounded-xl"
                onClick={() => {
                  setPhone(identifier.replace(/\D/g, ""))
                  handleRequestOtp()
                }}
                disabled={isLoading || !identifier}
              >
                <MessageSquare className="mr-2 h-4 w-4 text-green-400" />
                Entrar com OTP (SMS)
              </Button>

              {/* Social Login — Visual Placeholders */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <button
                  type="button"
                  className="flex items-center justify-center h-11 rounded-xl border border-border surface-4 hover:bg-white/10 transition-all group"
                  title="Google (em breve)"
                >
                  <svg className="h-5 w-5 opacity-50 group-hover:opacity-80" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center h-11 rounded-xl border border-border surface-4 hover:bg-white/10 transition-all group"
                  title="Facebook (em breve)"
                >
                  <svg className="h-5 w-5 text-blue-500 opacity-50 group-hover:opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center h-11 rounded-xl border border-border surface-4 hover:bg-white/10 transition-all group"
                  title="Instagram (em breve)"
                >
                  <svg className="h-5 w-5 text-pink-500 opacity-50 group-hover:opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground/50">Login social em breve</p>
            </form>
          )}

          {/* ========== SIGN UP ========== */}
          {mode === "signup" && (
            <form onSubmit={handleSignUp} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Nome completo</Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Ex: Elsio Costa"
                    className="pl-10 h-11 border-border surface-4 rounded-xl"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    autoFocus
                    maxLength={50}
                  />
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username">Nome de utilizador</Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="ex: elsio_costa"
                    className="pl-10 h-11 border-border surface-4 lowercase rounded-xl"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 30))}
                    required
                    minLength={3}
                    maxLength={30}
                  />
                  <AtSign className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-[10px] text-muted-foreground">Apenas letras, números e _ (mín. 3 caracteres)</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <div className="flex gap-2">
                  <div className="flex items-center justify-center px-3 rounded-xl surface-4 border border-border text-sm font-semibold text-muted-foreground">
                    +244
                  </div>
                  <div className="relative flex-1">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9XX XXX XXX"
                      className="pl-10 h-11 border-border surface-4 rounded-xl"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
                      required
                    />
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    className="pl-10 h-11 border-border surface-4 rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Senha (mín. 8 caracteres)</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-11 border-border surface-4 rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={cn(
                      "pl-10 pr-10 h-11 border-border surface-4 rounded-xl",
                      confirmPassword && password !== confirmPassword && "border-red-500/50"
                    )}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-400">As senhas não coincidem.</p>
                )}
              </div>

              {/* Legal compliance */}
              <div className="space-y-3 pt-1">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                    className="mt-0.5"
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none">
                    Li e aceito os{" "}
                    <Link href="/terms" className="text-primary hover:underline" target="_blank">
                      Termos de Serviço
                    </Link>{" "}
                    e a{" "}
                    <Link href="/legal/privacidade" className="text-primary hover:underline" target="_blank">
                      Política de Privacidade
                    </Link>
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="age"
                    checked={ageConfirmed}
                    onCheckedChange={(checked) => setAgeConfirmed(checked === true)}
                    className="mt-0.5"
                  />
                  <label htmlFor="age" className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none">
                    <ShieldCheck className="inline h-3.5 w-3.5 mr-1 text-primary" />
                    Confirmo que tenho 13 anos ou mais
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !fullName ||
                  username.length < 3 ||
                  phone.length < 9 ||
                  !email ||
                  !password ||
                  password !== confirmPassword ||
                  !termsAccepted ||
                  !ageConfirmed
                }
                className="w-full h-11 bg-primary hover:bg-primary/90 font-semibold rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> A criar conta...
                  </>
                ) : (
                  <>
                    Criar Conta <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {/* OTP Registration option */}
              <div className="relative my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground">ou</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-border surface-4 hover:bg-white/10 rounded-xl"
                onClick={() => {
                  if (phone.length >= 9) handleRequestOtp()
                  else setError("Insere o número de telefone primeiro.")
                }}
                disabled={isLoading}
              >
                <MessageSquare className="mr-2 h-4 w-4 text-green-400" />
                Registar com OTP (SMS)
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-center text-xs text-muted-foreground w-full">
            A tua informação está protegida com encriptação de ponta a ponta
          </p>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}

// ===== Shared Components =====
function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center p-4 md:p-6 angola-pattern relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/3 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-secondary rounded-full blur-[100px]" />
      </div>
      <div className="w-full max-w-[440px] space-y-4 md:space-y-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="flex items-center gap-2 mb-2 md:mb-4 group transition-transform hover:scale-105">
            <Image src="/kwanza-logo.png" alt="Kwanza Stream" width={48} height={48} className="rounded-xl shadow-lg" />
            <span className="font-bold text-2xl md:text-3xl tracking-tighter">
              KWANZA <span className="text-secondary">STREAM</span>
            </span>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      {message}
    </div>
  )
}
