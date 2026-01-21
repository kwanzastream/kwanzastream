"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Phone, Mail, User, Building2, Video } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = React.useState<"contact" | "otp" | "profile">("contact")
  const [contact, setContact] = React.useState("")
  const [contactType, setContactType] = React.useState<"phone" | "email">("phone")
  const [otp, setOtp] = React.useState("")
  const [profileType, setProfileType] = React.useState<"viewer" | "creator" | "institution">("viewer")

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular envio de OTP
    setStep("otp")
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular verificação de OTP
    setStep("profile")
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular criação de conta
    router.push("/onboarding")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={false} />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <Link href="/auth">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>

          {step === "contact" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Criar Conta</CardTitle>
                <CardDescription>
                  Começa a tua jornada na Kwanza Stream
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Como queres registar-te?</Label>
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

                  <Button type="submit" className="w-full" size="lg">
                    Enviar Código de Verificação
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Já tens conta?{" "}
                  <Link href="/auth/login" className="text-primary hover:underline font-medium">
                    Entrar
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {step === "otp" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Verificar Código</CardTitle>
                <CardDescription>
                  Enviamos um código para {contactType === "phone" ? contact : contact}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Código de Verificação</Label>
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
                    Verificar
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
              </CardContent>
            </Card>
          )}

          {step === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Escolher Perfil</CardTitle>
                <CardDescription>
                  Seleciona o tipo de conta que melhor te descreve
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <RadioGroup
                    value={profileType}
                    onValueChange={(value) => setProfileType(value as "viewer" | "creator" | "institution")}
                    className="space-y-4"
                  >
                    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-primary cursor-pointer">
                      <RadioGroupItem value="viewer" id="viewer" className="mt-1" />
                      <Label htmlFor="viewer" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-5 h-5 text-primary" />
                          <span className="font-bold">Espectador</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Assistir lives, enviar Salos e participar da comunidade
                        </p>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-primary cursor-pointer">
                      <RadioGroupItem value="creator" id="creator" className="mt-1" />
                      <Label htmlFor="creator" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <Video className="w-5 h-5 text-secondary" />
                          <span className="font-bold">Criador</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Fazer lives, ganhar dinheiro e construir uma audiência
                        </p>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-primary cursor-pointer">
                      <RadioGroupItem value="institution" id="institution" className="mt-1" />
                      <Label htmlFor="institution" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="w-5 h-5 text-accent" />
                          <span className="font-bold">Instituição</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Igrejas, escolas, marcas e organizações
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>

                  <Button type="submit" className="w-full" size="lg">
                    Continuar
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setStep("otp")}
                  >
                    Voltar
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
