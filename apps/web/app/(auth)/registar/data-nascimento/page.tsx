"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { AuthLayout } from "@/components/auth/auth-layout"
import { ProgressSteps } from "@/components/auth/progress-steps"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { getRegState, setRegState, requireRegStep } from "@/lib/registration-state"

const REG_STEPS = [
  { label: "Telefone" }, { label: "Verificação" }, { label: "Username" },
  { label: "Nascimento" }, { label: "Interesses" }, { label: "Canais" }, { label: "Concluído" },
]

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
const days = Array.from({ length: 31 }, (_, i) => i + 1)

export default function RegistarDataNascimentoPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  useEffect(() => {
    const state = getRegState()
    const redirect = requireRegStep(state, ["username"], "/registar/username")
    if (redirect) { router.replace(redirect); return }
    setReady(true)
  }, [router])

  const age = useMemo(() => {
    if (!day || !month || !year) return null
    const birth = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    const today = new Date()
    let a = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) a--
    return a
  }, [day, month, year])

  const isValid = age !== null && age >= 13
  const isTooYoung = age !== null && age < 13
  const isMinor = age !== null && age >= 13 && age < 18

  const handleContinue = () => {
    const dob = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    setRegState({ dateOfBirth: dob, step: 4 })
    router.push("/registar/interesses")
  }

  if (!ready) return null

  const selectClass = "w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"

  return (
    <AuthLayout>
      <div className="mb-6">
        <ProgressSteps steps={REG_STEPS} currentStep={3} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Data de nascimento</CardTitle>
          <CardDescription>Necessário para verificar a tua idade. Não é partilhada publicamente.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Dia</Label>
              <select value={day} onChange={(e) => setDay(e.target.value)} className={selectClass}>
                <option value="">Dia</option>
                {days.map((d) => <option key={d} value={String(d)}>{d}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Mês</Label>
              <select value={month} onChange={(e) => setMonth(e.target.value)} className={selectClass}>
                <option value="">Mês</option>
                {MONTHS.map((m, i) => <option key={i} value={String(i + 1)}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Ano</Label>
              <select value={year} onChange={(e) => setYear(e.target.value)} className={selectClass}>
                <option value="">Ano</option>
                {years.map((y) => <option key={y} value={String(y)}>{y}</option>)}
              </select>
            </div>
          </div>

          {isTooYoung && (
            <p className="text-sm text-destructive text-center">
              Deves ter pelo menos 13 anos para criar uma conta no Kwanza Stream.
            </p>
          )}

          {isMinor && (
            <p className="text-xs text-amber-500 text-center">
              ⚠️ Conta de menor (13–17 anos): restrições de conteúdo aplicadas automaticamente.
            </p>
          )}

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => router.push("/registar/username")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
            <Button className="flex-1" onClick={handleContinue} disabled={!isValid}>
              Continuar <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
