"use client"
import { Button } from "@/components/ui/button"
interface AdminActionButtonProps { label: string; variant?: "default" | "destructive" | "outline"; icon?: string; onClick: () => void; requireConfirm?: boolean }
export function AdminActionButton({ label, variant = "default", icon, onClick, requireConfirm }: AdminActionButtonProps) {
  const handleClick = () => { if (requireConfirm) { if (confirm(`Confirmas: ${label}?`)) onClick() } else onClick() }
  return <Button variant={variant as any} size="sm" onClick={handleClick} className="gap-1 text-[10px] h-7">{icon && <span>{icon}</span>}{label}</Button>
}
