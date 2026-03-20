"use client"
import { useState } from "react"
import { Save, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
export default function TagsPage() {
  const [tags, setTags] = useState(["angola","pt-ao","luanda"])
  const [newTag, setNewTag] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🏷️ Tags Permanentes</h1>
      <p className="text-xs text-muted-foreground">Aparecem em todos os teus streams. Máx: 10. Até 5 adicionais por stream.</p>
      <div className="flex gap-2"><Input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Adicionar tag..." className="bg-white/5" /><Button size="sm" disabled={tags.length >= 10} onClick={() => { if(newTag && tags.length < 10) { setTags([...tags, newTag]); setNewTag("") }}}><Plus className="w-3 h-3" /></Button></div>
      <div className="flex gap-1 flex-wrap">{tags.map(t => <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-[9px] text-primary">{t}<button onClick={() => setTags(tags.filter(x => x !== t))}><X className="w-2.5 h-2.5" /></button></span>)}</div>
      <p className="text-[8px] text-muted-foreground">{tags.length}/10</p>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Tags guardadas!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
