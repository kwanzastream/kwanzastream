"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
export default function CriarExtensaoConsolePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [type, setType] = useState("panel")
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <Link href="/developers/console/extensoes" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Extensões</Link>
      <h1 className="text-xl font-bold">Criar Extensão</h1>
      <div><label className="text-xs text-muted-foreground">Nome</label><input value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" /></div>
      <div><label className="text-xs text-muted-foreground">Descrição</label><input value={desc} onChange={e => setDesc(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" /></div>
      <div><label className="text-xs text-muted-foreground">Tipo</label>
        <div className="flex gap-2 mt-1">{["panel", "overlay", "component"].map(t => (
          <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-lg border text-xs capitalize ${type === t ? "border-primary bg-primary/5" : "border-white/10"}`}>{t}</button>
        ))}</div></div>
      <Button onClick={() => { toast.success("Extensão criada (placeholder v2)"); router.push("/developers/console/extensoes") }} className="w-full">Criar extensão</Button>
    </div>
  )
}
