"use client"
import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function IdiomaPage() {
  const [lang, setLang] = useState("pt-ao")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🗣️ Idioma</h1>
      {[{id:"pt-ao",l:"Português (Angola) — PT-AO"},{id:"pt-pt",l:"Português (Portugal) — PT-PT"},{id:"en",l:"English"},{id:"ki",l:"Kikongo"},{id:"km",l:"Kimbundu"},{id:"um",l:"Umbundu"},{id:"other",l:"Outro"}].map(l => <label key={l.id} className="flex items-center gap-2 py-1"><input type="radio" name="lang" checked={lang === l.id} onChange={() => setLang(l.id)} /><span className="text-xs">{l.l}</span></label>)}
      <p className="text-[8px] text-muted-foreground">Impacta: algoritmo de descoberta, filtros de pesquisa</p>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Idioma guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
