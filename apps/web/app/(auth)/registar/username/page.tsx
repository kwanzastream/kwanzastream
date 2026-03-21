"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth/auth-layout"
import { ProgressSteps } from "@/components/auth/progress-steps"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, X, Loader2, ArrowRight, RefreshCw } from "lucide-react"
import { getRegState, setRegState, requireRegStep } from "@/lib/registration-state"

import { isReservedUsername } from "@/lib/reserved-usernames"

const REG_STEPS = [
  { label: "Telefone" }, { label: "Verificação" }, { label: "Email" },
  { label: "Username" }, { label: "Nascimento" }, { label: "Interesses" },
  { label: "Canais" }, { label: "Concluído" },
]

type UsernameStatus = "idle" | "checking" | "available" | "taken" | "invalid" | "reserved"

export default function RegistarUsernamePage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [status, setStatus] = useState<UsernameStatus>("idle")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const state = getRegState()
    const redirect = requireRegStep(state, ["phoneVerified"], "/registar/telefone")
    // Also allow email verified (email registration path)
    if (redirect && !state?.emailVerified && !state?.email) { router.replace("/registar/email-obrigatorio"); return }
    setReady(true)
  }, [router])

  const checkUsername = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    const sanitized = value.toLowerCase().replace(/[^a-z0-9_-]/g, "")
    setUsername(sanitized)
    setStatus("idle")
    setSuggestions([])

    if (sanitized.length < 3) { setStatus("idle"); return }
    if (sanitized.length > 25) { setStatus("invalid"); return }
    if (isReservedUsername(sanitized)) { setStatus("reserved"); return }
    if (!/^[a-z0-9_-]+$/.test(sanitized)) { setStatus("invalid"); return }

    setStatus("checking")
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await api.get(`/api/users/check-username/${sanitized}`)
        if (res.data.available) {
          setStatus("available")
        } else {
          setStatus("taken")
          setSuggestions([
            `${sanitized}${Math.floor(Math.random() * 99)}`,
            `${sanitized}_ao`,
            `${sanitized}_live`,
          ])
        }
      } catch {
        setStatus("idle")
      }
    }, 500)
  }

  const randomUsername = () => {
    const words = ["kwanza", "angola", "stream", "live", "creator", "ao"]
    const word = words[Math.floor(Math.random() * words.length)]
    const num = Math.floor(Math.random() * 999)
    checkUsername(`${word}${num}`)
  }

  const handleContinue = () => {
    setRegState({ username, displayName: displayName || username, step: 4 })
    router.push("/registar/data-nascimento")
  }

  if (!ready) return null

  return (
    <AuthLayout showBackLink backHref="/registar/email-obrigatorio" backLabel="Voltar">
      <div className="mb-6">
        <ProgressSteps steps={REG_STEPS} currentStep={3} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Escolhe o teu username</CardTitle>
          <CardDescription>Este será o URL do teu canal: kwanzastream.ao/@nome</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Username */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label>Nome de utilizador</Label>
              <button type="button" onClick={randomUsername} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Aleatório
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
              <Input
                className="pl-7 pr-10"
                placeholder="nome_unico"
                value={username}
                onChange={(e) => checkUsername(e.target.value)}
                maxLength={25}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {status === "checking" && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                {status === "available" && <Check className="w-4 h-4 text-green-500" />}
                {(status === "taken" || status === "reserved") && <X className="w-4 h-4 text-destructive" />}
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground">3–25 caracteres. Letras, números, underscores e hífens.</p>

            {status === "available" && (
              <p className="text-xs text-green-500">✅ Disponível — kwanzastream.ao/@{username}</p>
            )}
            {status === "taken" && (
              <div className="space-y-1">
                <p className="text-xs text-destructive">❌ Já existe. Sugestões:</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((s) => (
                    <button key={s} type="button" onClick={() => checkUsername(s)} className="text-xs px-2 py-0.5 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors">
                      @{s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {status === "reserved" && <p className="text-xs text-destructive">⚠️ Nome reservado</p>}
            {status === "invalid" && <p className="text-xs text-destructive">⚠️ Formato inválido</p>}
          </div>

          {/* Display name */}
          <div className="space-y-1.5">
            <Label>Nome a apresentar <span className="text-muted-foreground font-normal text-xs">(opcional)</span></Label>
            <Input placeholder="Como queres ser chamado" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={50} />
          </div>

          <Button className="w-full" onClick={handleContinue} disabled={status !== "available"}>
            Continuar <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
