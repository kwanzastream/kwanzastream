"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, ChevronLeft } from "lucide-react"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function CriarAppPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState("other")
  const [website, setWebsite] = useState("")
  const [redirect, setRedirect] = useState("")
  const [creating, setCreating] = useState(false)

  const handleCreate = async () => {
    if (!name) return toast.error("Nome obrigatório")
    setCreating(true)
    try {
      const res = await api.post("/api/developer/apps", { name, description: desc, category, websiteUrl: website || undefined, redirectUris: redirect ? [redirect] : [] })
      toast.success("App criada! Client ID: " + res.data.clientId)
      router.push(`/developers/console/apps/${res.data.id}`)
    } catch { toast.error("Erro. Inicia sessão primeiro.") }
    finally { setCreating(false) }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <Link href="/developers/console/apps" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Apps</Link>
      <h1 className="text-xl font-bold">Criar nova app</h1>
      <div className="space-y-3">
        <div><label className="text-xs text-muted-foreground">Nome *</label><input value={name} onChange={e => setName(e.target.value)} maxLength={50} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" placeholder="A minha app" /></div>
        <div><label className="text-xs text-muted-foreground">Descrição</label><input value={desc} onChange={e => setDesc(e.target.value)} maxLength={200} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" /></div>
        <div><label className="text-xs text-muted-foreground">Categoria</label>
          <div className="flex gap-2 mt-1 flex-wrap">{["bot", "overlay", "dashboard", "mobile", "other"].map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-lg border text-xs capitalize ${category === c ? "border-primary bg-primary/5" : "border-white/10"}`}>{c}</button>
          ))}</div></div>
        <div><label className="text-xs text-muted-foreground">Website</label><input value={website} onChange={e => setWebsite(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" placeholder="https://..." /></div>
        <div><label className="text-xs text-muted-foreground">Redirect URI</label><input value={redirect} onChange={e => setRedirect(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" placeholder="https://myapp.ao/callback" /></div>
      </div>
      <Button onClick={handleCreate} disabled={creating} className="w-full gap-1.5">{creating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}Criar app</Button>
    </div>
  )
}
