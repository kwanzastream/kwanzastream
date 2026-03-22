"use client"
import { Button } from "@/components/ui/button"
interface PaymentApprovalRowProps { id: string; username: string; amount: number; method: string; account: string; createdAt: string; onApprove: () => void; onReject: () => void }
export function PaymentApprovalRow({ id, username, amount, method, account, createdAt, onApprove, onReject }: PaymentApprovalRowProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
      <div className="flex-1"><p className="text-sm font-semibold">@{username}</p><p className="text-[10px] text-muted-foreground">{method} · {account} · {createdAt}</p></div>
      <p className="text-sm font-bold">{amount.toLocaleString("pt-AO")} Kz</p>
      <div className="flex gap-1"><Button size="sm" onClick={onApprove} className="text-[10px] h-6">✅</Button><Button size="sm" variant="destructive" onClick={onReject} className="text-[10px] h-6">❌</Button></div>
    </div>
  )
}
