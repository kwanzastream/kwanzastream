"use client"

import { useState, useEffect } from "react"
import { Loader2, ChevronLeft, Plus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioScheduleSlot } from "@/components/dashboard/radio/radio-schedule-slot"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

const DAYS = [
  { value: 1, label: "Segunda" }, { value: 2, label: "Terça" }, { value: 3, label: "Quarta" },
  { value: 4, label: "Quinta" }, { value: 5, label: "Sexta" }, { value: 6, label: "Sábado" },
  { value: 0, label: "Domingo" },
]
const HOURS = Array.from({ length: 24 }, (_, i) => i)
const DURATIONS = [
  { value: 60, label: "1h" }, { value: 120, label: "2h" }, { value: 180, label: "3h" }, { value: 240, label: "4h" },
]

export default function SchedulePage() {
  const [loading, setLoading] = useState(true)
  const [slots, setSlots] = useState<any[]>([])
  const [programName, setProgramName] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [newDay, setNewDay] = useState(3)
  const [newHour, setNewHour] = useState(20)
  const [newDuration, setNewDuration] = useState(120)
  const [notify, setNotify] = useState(true)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    api.get("/api/creator/radio")
      .then(res => {
        setSlots(res.data.schedule || [])
        setProgramName(res.data.config?.programName || "")
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleAdd = async () => {
    setAdding(true)
    try {
      const res = await api.post("/api/creator/radio/schedule", {
        dayOfWeek: newDay, startHour: newHour, durationMin: newDuration, notifyFollowers: notify,
      })
      setSlots([...slots, res.data.slot])
      setShowAdd(false)
      toast.success("Programa agendado!")
    } catch { toast.error("Erro ao agendar") }
    finally { setAdding(false) }
  }

  const handleRemove = async (id: string) => {
    try {
      await api.delete(`/api/creator/radio/schedule/${id}`)
      setSlots(slots.filter(s => s.id !== id))
      toast.success("Slot removido")
    } catch { toast.error("Erro") }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  const FULL_DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/dashboard/radio" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Schedule do Rádio</h2>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowAdd(!showAdd)}>
          <Plus className="w-3.5 h-3.5" />Adicionar
        </Button>
      </div>

      {/* Week view */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Esta semana</h3>
        {FULL_DAYS.map((day, i) => {
          const daySlots = slots.filter(s => s.dayOfWeek === i)
          return (
            <div key={i}>
              {daySlots.length > 0 ? (
                daySlots.map(s => (
                  <RadioScheduleSlot key={s.id} {...s} programName={programName} onRemove={handleRemove} />
                ))
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5">
                  <div className="w-20 text-xs font-medium text-muted-foreground/50">{day}</div>
                  <span className="text-xs text-muted-foreground/50">— Sem programa</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-2"><Calendar className="w-4 h-4" />Adicionar programa</h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] text-muted-foreground">Dia</label>
              <select value={newDay} onChange={e => setNewDay(Number(e.target.value))} className="w-full mt-1 px-2 py-1.5 rounded-lg bg-background border border-white/10 text-sm">
                {DAYS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground">Hora (WAT)</label>
              <select value={newHour} onChange={e => setNewHour(Number(e.target.value))} className="w-full mt-1 px-2 py-1.5 rounded-lg bg-background border border-white/10 text-sm">
                {HOURS.map(h => <option key={h} value={h}>{String(h).padStart(2, '0')}:00</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground">Duração</label>
              <select value={newDuration} onChange={e => setNewDuration(Number(e.target.value))} className="w-full mt-1 px-2 py-1.5 rounded-lg bg-background border border-white/10 text-sm">
                {DURATIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input type="checkbox" checked={notify} onChange={e => setNotify(e.target.checked)} className="rounded" />
            Notificar seguidores (15min antes)
          </label>
          <Button size="sm" onClick={handleAdd} disabled={adding} className="gap-1.5">
            {adding && <Loader2 className="w-3 h-3 animate-spin" />}
            Agendar
          </Button>
        </div>
      )}

      <p className="text-[10px] text-muted-foreground">Schedule aparece em /radio/canal/:username e no schedule global.</p>
    </div>
  )
}
