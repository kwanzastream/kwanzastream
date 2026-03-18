"use client"
import { SearchCategoryPage } from "../search-category-page"
import { Hash, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const MOCK = [
  { id: "1", name: "gaming-angola", streams: 15, channels: 45 },
  { id: "2", name: "kuduro-ao-vivo", streams: 4, channels: 12 },
  { id: "3", name: "girabola", streams: 8, channels: 23 },
]

export default function PesquisaTagsPage() {
  return (
    <SearchCategoryPage category="tags" title="Tags">
      {(q) => (
        <div className="space-y-2">
          {MOCK.map(t => (
            <div key={t.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10">
              <Hash className="w-5 h-5 text-primary shrink-0" />
              <div className="flex-1 min-w-0"><p className="text-sm font-bold">#{t.name}</p><p className="text-[10px] text-muted-foreground">{t.streams} streams · {t.channels} canais</p></div>
              <Button size="sm" variant="outline" className="text-xs shrink-0" onClick={() => toast.success(`Agora segues #${t.name}`)}>Seguir</Button>
            </div>
          ))}
        </div>
      )}
    </SearchCategoryPage>
  )
}
