"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ClipCard, type ClipData } from "@/components/clips/clip-card"
import { Button } from "@/components/ui/button"
import { Scissors, Trash2, Pencil, BarChart3, Smartphone, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const MOCK: ClipData[] = [
  { id: "c1", title: "Clutch 1v4 incrível! 🔥", duration: 28, viewCount: 45000, shares: 1200, createdAt: new Date(Date.now() - 3600000).toISOString(), category: "Gaming", sourceStreamId: "s1", creator: { username: "eu", displayName: "Eu" } },
  { id: "c5", title: "Play da semana 🎮", duration: 22, viewCount: 8900, shares: 450, createdAt: new Date(Date.now() - 259200000).toISOString(), category: "Gaming", sourceStreamId: "s2", creator: { username: "eu", displayName: "Eu" } },
]

export default function MeusClipsPage() {
  const router = useRouter()
  const [clips, setClips] = useState(MOCK)
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    if (deleting === id) { setClips(prev => prev.filter(c => c.id !== id)); setDeleting(null); toast.success("Clip eliminado") }
    else { setDeleting(id); setTimeout(() => setDeleting(null), 3000) }
  }

  const handleWhatsApp = (clip: ClipData) => {
    const url = `https://kwanzastream.ao/clips/${clip.id}`
    window.open(`https://wa.me/?text=${encodeURIComponent(`Vê o meu clip: ${clip.title}\n${url}`)}`, "_blank")
  }

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2"><Scissors className="w-5 h-5" />Meus Clips</h1>
        <Button size="sm" className="text-xs gap-1" onClick={() => router.push("/clips/criar")}><Scissors className="w-3 h-3" />Criar clip</Button>
      </div>

      {clips.length === 0 ? (
        <div className="text-center py-16"><Scissors className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Ainda não criaste nenhum clip</p><Button className="mt-4 gap-2" onClick={() => router.push("/clips/criar")}><Scissors className="w-4 h-4" />Criar primeiro clip</Button></div>
      ) : (
        <div className="space-y-4">
          {clips.map(c => (
            <div key={c.id} className="flex gap-4 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              <div className="w-32 shrink-0"><ClipCard clip={c} /></div>
              <div className="flex-1 min-w-0 space-y-2">
                <h3 className="text-sm font-bold truncate">{c.title}</h3>
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" />{c.viewCount.toLocaleString()} views</span>
                  <span>{c.shares} partilhas</span>
                  <span>Stream: {c.sourceStreamId}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Link href={`/clips/editar/${c.id}`}><Button variant="outline" size="sm" className="text-[10px] h-6 gap-1"><Pencil className="w-2.5 h-2.5" />Editar</Button></Link>
                  <Button variant="outline" size="sm" className="text-[10px] h-6 gap-1" onClick={() => handleWhatsApp(c)}><MessageCircle className="w-2.5 h-2.5" />WhatsApp</Button>
                  <Button variant="outline" size="sm" className="text-[10px] h-6 gap-1" onClick={() => toast.success("Convertido para Short!")}><Smartphone className="w-2.5 h-2.5" />→ Short</Button>
                  <Button variant="outline" size="sm" className={`text-[10px] h-6 gap-1 ${deleting === c.id ? "border-destructive text-destructive" : ""}`} onClick={() => handleDelete(c.id)}><Trash2 className="w-2.5 h-2.5" />{deleting === c.id ? "Confirmar?" : "Eliminar"}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
