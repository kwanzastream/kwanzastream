"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthLayout } from "@/components/auth/auth-layout"
import { ProgressSteps } from "@/components/auth/progress-steps"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Eye } from "lucide-react"
import { getRegState, setRegState, requireRegStep } from "@/lib/registration-state"

const REG_STEPS = [
  { label: "Telefone" }, { label: "Verificação" }, { label: "Username" },
  { label: "Nascimento" }, { label: "Interesses" }, { label: "Canais" }, { label: "Concluído" },
]

const MOCK_CHANNELS = [
  { username: "gamerAO", displayName: "Gamer Angola", category: "Gaming", followers: 12500, isLive: true },
  { username: "kuduroking", displayName: "Kuduro King", category: "Música", followers: 8200, isLive: false },
  { username: "girabola_tv", displayName: "Girabola TV", category: "Futebol", followers: 25000, isLive: true },
  { username: "cozinha_angolana", displayName: "Cozinha Angolana", category: "Culinária", followers: 5600, isLive: false },
  { username: "tech_luanda", displayName: "Tech Luanda", category: "Tech", followers: 3400, isLive: true },
  { username: "comedia_ao", displayName: "Comédia AO", category: "Comédia", followers: 9100, isLive: false },
  { username: "irl_angola", displayName: "IRL Angola", category: "IRL", followers: 7800, isLive: true },
  { username: "semba_live", displayName: "Semba Live", category: "Música", followers: 6500, isLive: false },
]

export default function RegistarCanaisSugeridosPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [followed, setFollowed] = useState<Set<string>>(new Set())

  useEffect(() => {
    const state = getRegState()
    const redirect = requireRegStep(state, ["interests"], "/registar/interesses")
    if (redirect) { router.replace(redirect); return }
    setReady(true)
  }, [router])

  if (!ready) return null

  const toggleFollow = (username: string) => {
    setFollowed((prev) => {
      const next = new Set(prev)
      if (next.has(username)) next.delete(username)
      else next.add(username)
      return next
    })
  }

  const followAll = () => setFollowed(new Set(MOCK_CHANNELS.map((c) => c.username)))

  const handleContinue = () => {
    setRegState({ step: 6 })
    router.push("/registar/concluido")
  }

  return (
    <AuthLayout>
      <div className="mb-6">
        <ProgressSteps steps={REG_STEPS} currentStep={5} />
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Canais sugeridos</CardTitle>
              <CardDescription>Baseado nos teus interesses. Segue pelo menos 1 canal.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={followAll} className="text-xs shrink-0">
              Seguir todos
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {MOCK_CHANNELS.map((channel) => {
            const isFollowed = followed.has(channel.username)
            return (
              <div key={channel.username} className="flex items-center gap-3 p-2.5 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                  {channel.displayName.charAt(0)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-sm truncate">{channel.displayName}</span>
                    {channel.isLive && (
                      <span className="flex items-center gap-0.5 text-[10px] text-red-500 font-bold">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        AO VIVO
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{channel.category}</span>
                    <span className="flex items-center gap-0.5"><Users className="w-3 h-3" />{(channel.followers / 1000).toFixed(1)}k</span>
                  </div>
                </div>

                {/* Follow button */}
                <Button
                  variant={isFollowed ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFollow(channel.username)}
                  className="text-xs h-8 shrink-0"
                >
                  {isFollowed ? "A seguir ✓" : "Seguir"}
                </Button>
              </div>
            )
          })}

          <div className="pt-2 space-y-2">
            <Button className="w-full" onClick={handleContinue}>
              {followed.size > 0 ? `Continuar (${followed.size} a seguir)` : "Continuar"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            {followed.size === 0 && (
              <button type="button" onClick={handleContinue} className="block w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors">
                Saltar por agora
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
