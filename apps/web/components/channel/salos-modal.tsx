"use client"

import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface SalosModalProps {
  open: boolean
  onClose: () => void
  username: string
  channelId: string
}

const QUICK_AMOUNTS = [50, 200, 500, 1000, 5000]
const MIN_AMOUNT = 50
const MAX_AMOUNT = 10000
const MAX_MESSAGE = 150

export function SalosModal({ open, onClose, username, channelId }: SalosModalProps) {
  const [amount, setAmount] = useState(200)
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const balance = 5000 // TODO: fetch from wallet API

  const isValid = amount >= MIN_AMOUNT && amount <= MAX_AMOUNT && amount <= balance

  const handleSend = async () => {
    if (!isValid) return
    setIsSending(true)
    try {
      // POST /api/salos/send
      await new Promise(r => setTimeout(r, 1000))
      toast.success(`${amount.toLocaleString("pt-AO")} Salos enviados para @${username}! 🎉`)
      onClose()
      setAmount(200)
      setMessage("")
    } catch (err: any) {
      toast.error(err?.message || "Erro ao enviar Salos")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" /> Enviar Salos
          </DialogTitle>
          <DialogDescription>Envia Salos para apoiar @{username}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Quick amounts */}
          <div>
            <Label className="text-xs text-muted-foreground">Valor rápido</Label>
            <div className="flex gap-1.5 mt-1.5">
              {QUICK_AMOUNTS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAmount(v)}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    amount === v
                      ? "bg-amber-400/20 text-amber-400 border-2 border-amber-400/50"
                      : "bg-muted border-2 border-transparent hover:bg-muted/80"
                  }`}
                >
                  {v >= 1000 ? `${v / 1000}k` : v}
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          <div className="space-y-1.5">
            <Label>Valor (Kz)</Label>
            <Input
              type="number"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="text-lg font-bold"
            />
            <p className="text-[11px] text-muted-foreground">Mínimo {MIN_AMOUNT} Kz · Máximo {MAX_AMOUNT.toLocaleString("pt-AO")} Kz</p>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label>Mensagem <span className="text-muted-foreground font-normal">(opcional)</span></Label>
              <span className="text-[10px] text-muted-foreground">{message.length}/{MAX_MESSAGE}</span>
            </div>
            <Input
              placeholder="Escreve uma mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE))}
              maxLength={MAX_MESSAGE}
            />
          </div>

          {/* Preview */}
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-sm text-muted-foreground">Vais enviar</p>
            <p className="text-2xl font-bold text-amber-400 flex items-center justify-center gap-1">
              <Zap className="w-5 h-5" /> {amount.toLocaleString("pt-AO")} Kz
            </p>
            <p className="text-sm text-muted-foreground">para @{username}</p>
          </div>

          {/* Balance check */}
          {amount > balance ? (
            <div className="text-center space-y-2">
              <p className="text-sm text-destructive">Saldo insuficiente ({balance.toLocaleString("pt-AO")} Kz)</p>
              <Link href="/salos/comprar" className="text-sm text-primary hover:underline">
                Carregar Salos →
              </Link>
            </div>
          ) : (
            <p className="text-xs text-center text-muted-foreground">
              Saldo: {balance.toLocaleString("pt-AO")} Kz
            </p>
          )}

          {/* Send */}
          <Button className="w-full" onClick={handleSend} disabled={!isValid || isSending}>
            {isSending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
            Enviar {amount.toLocaleString("pt-AO")} Salos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
