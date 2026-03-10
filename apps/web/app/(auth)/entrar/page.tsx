"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Phone, Mail, Lock, Key } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [loginMethod, setLoginMethod] = React.useState<"otp" | "password">("otp")
  const [contact, setContact] = React.useState("")
  const [contactType, setContactType] = React.useState<"phone" | "email">("phone")
  const [otp, setOtp] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [step, setStep] = React.useState<"contact" | "verify">("contact")

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginMethod === "otp") {
      // Simular envio de OTP
      setStep("verify")
    } else {
      // Simular login com senha
      router.push("/app")
    }
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular verificação de OTP
    router.push("/app")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <Link href="/auth">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Entrar</CardTitle>
              <CardDescription>
                Acede à tua conta Kwanza Stream
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === "contact" ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Método de Login</Label>
                    <RadioGroup
                      value={loginMethod}
                      onValueChange={(value) => setLoginMethod(value as "otp" | "password")}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="otp" id="otp" />
                        <Label htmlFor="otp" className="flex items-center gap-2 cursor-pointer">
                          <Key className="w-4 h-4" />
                          Código (OTP)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="password" id="password" />
                        <Label htmlFor="password" className="flex items-center gap-2 cursor-pointer">
                          <Lock className="w-4 h-4" />
                          Senha
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Como queres entrar?</Label>
                    <RadioGroup
                      value={contactType}
                      onValueChange={(value) => setContactType(value as "phone" | "email")}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone" />
                        <Label htmlFor="phone" className="flex items-center gap-2 cursor-pointer">
                          <Phone className="w-4 h-4" />
                          Telefone
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email" />
                        <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer">
                          <Mail className="w-4 h-4" />
                          Email
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">
                      {contactType === "phone" ? "Número de Telefone" : "Email"}
                    </Label>
                    <div className="relative">
                      {contactType === "phone" ? (
                        <>
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="contact"
                            type="tel"
                            placeholder="+244 923 456 789"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </>
                      ) : (
                        <>
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="contact"
                            type="email"
                            placeholder="exemplo@email.com"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {loginMethod === "password" && (
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full" size="lg">
                    {loginMethod === "otp" ? "Enviar Código" : "Entrar"}
                  </Button>

                  {loginMethod === "password" && (
                    <Link href="/auth/recuperar" className="block text-center text-sm text-primary hover:underline">
                      Esqueci-me da senha
                    </Link>
                  )}
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Código de Verificação</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviamos um código para {contact}
                    </p>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="text-center text-2xl tracking-widest"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Verificar e Entrar
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setStep("contact")}
                  >
                    Voltar
                  </Button>
                </form>
              )}

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Não tens conta?{" "}
                <Link href="/auth/registro" className="text-primary hover:underline font-medium">
                  Criar Conta
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
