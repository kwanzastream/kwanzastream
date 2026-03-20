"use client"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function AdsBloqueiosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/ads"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Categorias Bloqueadas</h1></div>
      {["Política","Álcool","Jogos de azar","Tabaco","Concorrentes","Dating/Encontros","Criptomoedas"].map(c => <label key={c} className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked={c === "Política" || c === "Tabaco"} /><span className="text-xs">{c}</span></label>)}
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Bloqueios guardados!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
