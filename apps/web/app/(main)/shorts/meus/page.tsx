"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShortCard, type ShortData } from "@/components/shorts/short-card"
import { Button } from "@/components/ui/button"
import { Smartphone, Trash2, Pencil, BarChart3, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const MOCK: ShortData[] = [
  { id: "s1", title: "Kuduro dance challenge 🔥💃", duration: 28, viewCount: 245000, likes: 18000, createdAt: new Date(Date.now() - 3600000).toISOString(), category: "Dança", creator: { username: "eu", displayName: "Eu" } },
  { id: "s11", title: "Tutorial de kizomba 💃", duration: 55, viewCount: 34000, likes: 2800, createdAt: new Date(Date.now() - 172800000).toISOString(), category: "Dança", creator: { username: "eu", displayName: "Eu" } },
]

export default function MeusShortsPage() {
  const router = useRouter()
  const [shorts, setShorts] = useState(MOCK)
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    if (deleting === id) { setShorts(prev => prev.filter(s => s.id !== id)); setDeleting(null); toast.success("Short eliminado") }
    else { setDeleting(id); setTimeout(() => setDeleting(null), 3000) }
  }

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2"><Smartphone className="w-5 h-5" />Meus Shorts</h1>
        <Button size="sm" className="text-xs gap-1" onClick={() => router.push("/shorts/criar")}><Smartphone className="w-3 h-3" />Criar short</Button>
      </div>

      {shorts.length === 0 ? (
        <div className="text-center py-16"><Smartphone className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Ainda não criaste nenhum short</p><Button className="mt-4 gap-2" onClick={() => router.push("/shorts/criar")}><Smartphone className="w-4 h-4" />Criar primeiro short</Button></div>
      ) : (
        <div className="space-y-4">
          {shorts.map(s => (
            <div key={s.id} className="flex gap-4 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              <div className="w-20 shrink-0"><ShortCard short={s} /></div>
              <div className="flex-1 min-w-0 space-y-2">
                <h3 className="text-sm font-bold truncate">{s.title}</h3>
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" />{s.viewCount.toLocaleString()} views</span>
                  <span>❤️ {s.likes.toLocaleString()}</span>
                  <span>{s.duration}s</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Button variant="outline" size="sm" className="text-[10px] h-6 gap-1" onClick={() => toast("Editar título — em breve")}><Pencil className="w-2.5 h-2.5" />Editar</Button>
                  <Button variant="outline" size="sm" className="text-[10px] h-6 gap-1" onClick={() => { const url = `https://kwanzastream.ao/shorts/${s.id}`; window.open(`https://wa.me/?text=${encodeURIComponent(`Vê o meu short: ${s.title}\n${url}`)}`, "_blank") }}><MessageCircle className="w-2.5 h-2.5" />WhatsApp</Button>
                  <Button variant="outline" size="sm" className="text-[10px] h-6 gap-1" onClick={() => toast.success("Short promovido!")}><BarChart3 className="w-2.5 h-2.5" />Promover</Button>
                  <Button variant="outline" size="sm" className={`text-[10px] h-6 gap-1 ${deleting === s.id ? "border-destructive text-destructive" : ""}`} onClick={() => handleDelete(s.id)}><Trash2 className="w-2.5 h-2.5" />{deleting === s.id ? "Confirmar?" : "Eliminar"}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
