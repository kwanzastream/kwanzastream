"use client"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
interface AdminConfirmModalProps { open: boolean; title: string; message: string; onConfirm: () => void; onCancel: () => void; destructive?: boolean; requireReason?: boolean; reason?: string; onReasonChange?: (v: string) => void }
export function AdminConfirmModal({ open, title, message, onConfirm, onCancel, destructive, requireReason, reason, onReasonChange }: AdminConfirmModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onCancel}>
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 max-w-sm w-full space-y-3" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between"><h3 className="text-sm font-semibold">{title}</h3><button onClick={onCancel}><X className="w-4 h-4" /></button></div>
        <p className="text-xs text-muted-foreground">{message}</p>
        {requireReason && <textarea value={reason} onChange={e => onReasonChange?.(e.target.value)} placeholder="Motivo obrigatório..." className="w-full px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[60px] focus:outline-none focus:border-primary" />}
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={onCancel} className="text-[10px] h-7">Cancelar</Button>
          <Button variant={destructive ? "destructive" : "default"} size="sm" onClick={onConfirm} disabled={requireReason && !reason} className="text-[10px] h-7">Confirmar</Button>
        </div>
      </div>
    </div>
  )
}
