"use client"
import { SearchCategoryPage } from "../search-category-page"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"

const FILTERS = [
  { id: "all", label: "Todos" },{ id: "live", label: "Ao vivo" },{ id: "verified", label: "Verificado" },{ id: "partner", label: "Partner" },
]

const MOCK = [
  { id: "c1", username: "angolangamer", display: "Angola Gamer", bio: "Gaming de Angola para o mundo", followers: 12400, isLive: true, category: "Gaming", badge: "Partner" },
  { id: "c2", username: "kuduroking", display: "Kuduro King", bio: "Kuduro ao vivo todos os dias", followers: 8900, isLive: false, category: "Música", badge: "Afiliado" },
  { id: "c3", username: "chef_mwangole", display: "Chef Mwangolê", bio: "Culinária angolana autêntica", followers: 3200, isLive: false, category: "Culinária" },
]

export default function PesquisaCanaisPage() {
  return (
    <SearchCategoryPage category="canais" title="Canais" filters={FILTERS}>
      {(q, filter) => (
        <div className="space-y-2">
          {MOCK.map(c => (
            <div key={c.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
              <Link href={`/${c.username}`}><Avatar className="w-11 h-11"><AvatarFallback className="bg-primary/20 text-primary">{c.display.slice(0, 2)}</AvatarFallback></Avatar></Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5"><Link href={`/${c.username}`} className="text-sm font-bold truncate hover:underline">{c.display}</Link>{c.badge && <Badge variant="outline" className="text-[8px] shrink-0">{c.badge}</Badge>}{c.isLive && <Badge className="bg-[#CE1126] text-white text-[8px]">LIVE</Badge>}</div>
                <p className="text-[10px] text-muted-foreground truncate">@{c.username} · {(c.followers / 1000).toFixed(1)}k seguidores · {c.category}</p>
                <p className="text-xs text-muted-foreground truncate">{c.bio}</p>
              </div>
              <Button size="sm" variant="outline" className="text-xs shrink-0" onClick={() => toast.success(`Agora segues @${c.username}`)}>Seguir</Button>
            </div>
          ))}
        </div>
      )}
    </SearchCategoryPage>
  )
}
