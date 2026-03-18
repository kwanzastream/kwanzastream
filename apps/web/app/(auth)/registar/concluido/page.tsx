"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Tv } from "lucide-react"
import { getRegState, clearRegState } from "@/lib/registration-state"
import { WhatsAppShareButton } from "@/components/public/whatsapp-share-button"

export default function RegistarConcluidoPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [interests, setInterests] = useState(0)

  useEffect(() => {
    const state = getRegState()
    setUsername(state?.username || "utilizador")
    setInterests(state?.interests?.length || 0)
    // Clean up registration state
    clearRegState()
  }, [])

  return (
    <AuthLayout>
      <Card>
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            {/* Celebration */}
            <div className="relative">
              {/* Confetti-like dots */}
              <div className="absolute -top-4 left-1/4 w-2 h-2 rounded-full bg-[#CE1126] animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="absolute -top-2 right-1/4 w-2 h-2 rounded-full bg-[#F9D616] animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="absolute top-0 left-1/3 w-1.5 h-1.5 rounded-full bg-[#009739] animate-bounce" style={{ animationDelay: "0.4s" }} />
              <div className="absolute -top-3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#CE1126] animate-bounce" style={{ animationDelay: "0.6s" }} />

              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#CE1126] via-[#F9D616] to-[#009739] flex items-center justify-center mx-auto shadow-lg">
                <span className="text-3xl">🇦🇴</span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Bem-vindo, @{username}! 🎉</h1>
              <p className="text-muted-foreground mt-1">
                A tua conta foi criada com sucesso. Estás pronto para descobrir Angola ao vivo.
              </p>
            </div>

            {interests > 0 && (
              <p className="text-sm text-muted-foreground">
                {interests} categorias seleccionadas · Feed personalizado pronto
              </p>
            )}

            <div className="space-y-3">
              <Button className="w-full h-12 text-base font-semibold" onClick={() => router.push("/feed")}>
                Explorar a plataforma <ArrowRight className="w-4.5 h-4.5 ml-2" />
              </Button>

              <Button variant="outline" className="w-full gap-2" asChild>
                <Link href="/dashboard/inicio/checklist">
                  <Tv className="w-4 h-4" /> Configurar o meu canal
                </Link>
              </Button>

              <div className="pt-2">
                <WhatsAppShareButton
                  url="https://kwanzastream.ao"
                  text={`Juntei-me ao Kwanza Stream! 🇦🇴 A plataforma de streaming de Angola. Junta-te também: kwanzastream.ao`}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
