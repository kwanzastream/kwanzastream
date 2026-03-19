"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Pencil, Image, Loader2, Check } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function EditClipPage() {
  const { id } = useParams()
  const router = useRouter()
  const [title, setTitle] = useState("Clutch 1v4 incrível! 🔥")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!title.trim() || title.length < 3) { toast.error("Título deve ter pelo menos 3 caracteres"); return }
    setSaving(true)
    // In production: PUT /api/clips/:id { title }
    setTimeout(() => { setSaving(false); toast.success("Clip atualizado!"); router.push("/clips/meus") }, 1000)
  }

  return (
    <div className="max-w-lg mx-auto py-4 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href="/clips/meus"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><Pencil className="w-5 h-5" />Editar Clip</h1></div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground">Título</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} />
        <p className="text-[9px] text-muted-foreground text-right">{title.length}/100</p>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground">Thumbnail</label>
        <div className="aspect-video rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/30 transition-all">
          <Image className="w-8 h-8 text-muted-foreground/30" />
          <p className="text-xs text-muted-foreground">Escolher frame ou fazer upload</p>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-muted-foreground">
        <p><strong>Nota:</strong> O conteúdo do clip (início/fim) e o canal de origem não podem ser alterados após a criação.</p>
      </div>

      <Button className="w-full gap-2" onClick={handleSave} disabled={saving}>
        {saving ? <><Loader2 className="w-4 h-4 animate-spin" />A guardar...</> : <><Check className="w-4 h-4" />Guardar alterações</>}
      </Button>
    </div>
  )
}
