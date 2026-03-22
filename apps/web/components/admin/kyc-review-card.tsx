"use client"
import { Button } from "@/components/ui/button"
interface KycReviewCardProps { id: string; username: string; name: string; biNumber: string; birthDate: string; biValid: boolean; selfieMatch: number; onApprove: () => void; onReject: () => void }
export function KycReviewCard({ id, username, name, biNumber, birthDate, biValid, selfieMatch, onApprove, onReject }: KycReviewCardProps) {
  return (
    <div className="p-4 rounded-xl border border-white/10 space-y-3">
      <div className="flex items-center justify-between"><p className="text-sm font-semibold">@{username}</p><span className="text-[9px] text-muted-foreground">ID: {id}</span></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-24 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-muted-foreground">📄 BI (frente)</div>
        <div className="h-24 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-muted-foreground">🤳 Selfie com BI</div>
      </div>
      <div className="space-y-1 text-xs"><p>Nome: <strong>{name}</strong></p><p>BI: <strong>{biNumber}</strong></p><p>Nascimento: {birthDate}</p></div>
      <div className="space-y-1 text-[10px]">
        <p className={biValid ? "text-green-400" : "text-red-400"}>{biValid ? "✅" : "❌"} BI angolano (formato válido)</p>
        <p className={selfieMatch > 0.8 ? "text-green-400" : "text-yellow-400"}>✅ Selfie match: {(selfieMatch * 100).toFixed(0)}%</p>
      </div>
      <div className="flex gap-2"><Button size="sm" onClick={onApprove} className="text-[10px] h-7">✅ Aprovar KYC</Button><Button size="sm" variant="destructive" onClick={onReject} className="text-[10px] h-7">❌ Rejeitar</Button></div>
    </div>
  )
}
