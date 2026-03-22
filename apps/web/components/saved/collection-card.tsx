"use client"
import Link from "next/link"
interface CollectionCardProps { id: string; name: string; itemCount: number; updatedAt: string; isPublic: boolean; onDelete?: (id: string) => void }
export function CollectionCard({ id, name, itemCount, updatedAt, isPublic, onDelete }: CollectionCardProps) {
  return (
    <div className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors group">
      <div className="w-full h-20 rounded-lg bg-white/5 flex items-center justify-center text-2xl mb-3">📁</div>
      <p className="text-xs font-semibold">{name}</p>
      <p className="text-[10px] text-muted-foreground">{itemCount} itens · {isPublic ? "Pública" : "Privada"} · {updatedAt}</p>
      <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link href={`/guardados/colecoes/${id}`} className="text-[9px] text-primary hover:underline">Ver</Link>
        <Link href={`/guardados/colecoes/${id}/editar`} className="text-[9px] text-muted-foreground hover:underline">Editar</Link>
        {onDelete && <button onClick={() => onDelete(id)} className="text-[9px] text-red-400 hover:underline">Eliminar</button>}
      </div>
    </div>
  )
}
