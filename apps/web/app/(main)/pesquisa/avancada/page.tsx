"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Search, Sparkles } from "lucide-react"
import Link from "next/link"
import { ANGOLA_PROVINCES } from "@/lib/angola-provinces"

const CATEGORIES = ["Gaming", "Música", "IRL", "Culinária", "Desporto", "Tecnologia", "Arte", "Educação"]
const LANGUAGES = ["PT-AO", "PT-PT", "EN", "KI", "KM", "UM"]

export default function PesquisaAvancadaPage() {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [tipo, setTipo] = useState("tudo")
  const [categoria, setCategoria] = useState("")
  const [data, setData] = useState("")
  const [durMin, setDurMin] = useState("")
  const [durMax, setDurMax] = useState("")
  const [lingua, setLingua] = useState("")
  const [provincia, setProvincia] = useState("")
  const [soAoVivo, setSoAoVivo] = useState(false)
  const [verificado, setVerificado] = useState(false)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (tipo !== "tudo") params.set("tipo", tipo)
    if (categoria) params.set("categoria", categoria)
    if (data) params.set("data", data)
    if (durMin) params.set("durMin", durMin)
    if (durMax) params.set("durMax", durMax)
    if (lingua) params.set("lingua", lingua)
    if (provincia) params.set("provincia", provincia)
    if (soAoVivo) params.set("live", "1")
    if (verificado) params.set("verificado", "1")
    router.push(`/pesquisa/tudo?${params.toString()}`)
  }

  return (
    <div className="max-w-lg mx-auto py-4 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href="/pesquisa"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><Sparkles className="w-5 h-5" />Pesquisa avançada</h1></div>

      {/* Query */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground">Termos de pesquisa</label>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="O que procuras..." />
      </div>

      {/* Content type */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground">Tipo de conteúdo</label>
        <div className="flex flex-wrap gap-2">
          {["tudo", "streams", "videos", "clips", "canais", "shorts"].map(t => (
            <button key={t} onClick={() => setTipo(t)} className={`px-3 py-1.5 rounded-full text-xs border ${tipo === t ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>
              {t === "tudo" ? "Tudo" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground">Categoria</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm">
          <option value="">Todas</option>
          {CATEGORIES.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}
        </select>
      </div>

      {/* Date */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground">Data</label>
        <div className="flex flex-wrap gap-2">
          {[{ id: "", label: "Qualquer" }, { id: "hoje", label: "Hoje" }, { id: "semana", label: "Esta semana" }, { id: "mes", label: "Este mês" }].map(d => (
            <button key={d.id} onClick={() => setData(d.id)} className={`px-3 py-1.5 rounded-full text-xs border ${data === d.id ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>{d.label}</button>
          ))}
        </div>
      </div>

      {/* Duration */}
      {(tipo === "videos" || tipo === "clips" || tipo === "tudo") && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground">Duração (minutos)</label>
          <div className="flex gap-2 items-center"><Input type="number" placeholder="Min" value={durMin} onChange={(e) => setDurMin(e.target.value)} className="w-24" /><span className="text-muted-foreground">→</span><Input type="number" placeholder="Max" value={durMax} onChange={(e) => setDurMax(e.target.value)} className="w-24" /></div>
        </div>
      )}

      {/* Language */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground">Língua</label>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setLingua("")} className={`px-3 py-1.5 rounded-full text-xs border ${!lingua ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>Todas</button>
          {LANGUAGES.map(l => (
            <button key={l} onClick={() => setLingua(l)} className={`px-3 py-1.5 rounded-full text-xs border ${lingua === l ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>{l}</button>
          ))}
        </div>
      </div>

      {/* Province */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground">Província</label>
        <select value={provincia} onChange={(e) => setProvincia(e.target.value)} className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm">
          <option value="">Todas</option>
          {ANGOLA_PROVINCES.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}
        </select>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-xl border border-white/10"><span className="text-sm">Só ao vivo</span><Switch checked={soAoVivo} onCheckedChange={setSoAoVivo} /></div>
        <div className="flex items-center justify-between p-3 rounded-xl border border-white/10"><span className="text-sm">Apenas verificados</span><Switch checked={verificado} onCheckedChange={setVerificado} /></div>
      </div>

      <Button className="w-full gap-2" onClick={handleSearch}><Search className="w-4 h-4" />Pesquisar</Button>
    </div>
  )
}
