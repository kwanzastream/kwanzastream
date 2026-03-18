"use client"
import { SearchCategoryPage } from "../search-category-page"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

const MOCK = [
  { id: "u1", username: "viewer_001", display: "Viewer 001", isOnline: true },
  { id: "u2", username: "fan_kuduro", display: "Fan Kuduro", isOnline: false },
]

export default function PesquisaUtilizadoresPage() {
  return (
    <SearchCategoryPage category="utilizadores" title="Utilizadores">
      {(q) => (
        <div className="space-y-2">
          {MOCK.map(u => (
            <Link key={u.id} href={`/${u.username}`} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
              <div className="relative"><Avatar className="w-10 h-10"><AvatarFallback className="bg-primary/20 text-primary text-xs">{u.display.slice(0, 2)}</AvatarFallback></Avatar>{u.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />}</div>
              <div className="flex-1"><p className="text-sm font-bold">{u.display}</p><p className="text-[10px] text-muted-foreground">@{u.username}</p></div>
            </Link>
          ))}
        </div>
      )}
    </SearchCategoryPage>
  )
}
