"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Smile, X, Loader2 } from "lucide-react"
import { DM_LIMITS, validateAttachment, formatFileSize } from "@/lib/dm-limits"
import { toast } from "sonner"

interface MessageInputProps {
  onSend: (content: string, attachment?: File) => Promise<void>
  disabled?: boolean
  placeholder?: string
}

export function MessageInput({ onSend, disabled = false, placeholder = "Escreve uma mensagem..." }: MessageInputProps) {
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [attachment, setAttachment] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const lastSentRef = useRef(0)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const { valid, error } = validateAttachment(file)
    if (!valid) { toast.error(error); return }
    setAttachment(file)
    setPreview(URL.createObjectURL(file))
  }

  const removeAttachment = () => { setAttachment(null); if (preview) URL.revokeObjectURL(preview); setPreview(null) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if ((!input.trim() && !attachment) || sending || disabled) return

    // Rate limit: 1 msg/sec (correction #2 — enforce from DM_LIMITS)
    const now = Date.now()
    if (now - lastSentRef.current < 1000 / DM_LIMITS.messagesPerSecond) {
      toast.error("Espera um momento antes de enviar outra mensagem")
      return
    }

    if (input.length > DM_LIMITS.textMaxChars) {
      toast.error(`Mensagem muito longa (máx ${DM_LIMITS.textMaxChars} caracteres)`)
      return
    }

    setSending(true)
    lastSentRef.current = now
    try {
      await onSend(input.trim(), attachment || undefined)
      setInput("")
      removeAttachment()
    } catch {
      toast.error("Erro ao enviar")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="border-t border-border/50 p-3">
      {/* Attachment preview */}
      {preview && attachment && (
        <div className="relative mb-2 inline-block">
          <img src={preview} alt="Anexo" className="h-20 rounded-lg border border-white/10" />
          <button onClick={removeAttachment} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center"><X className="w-3 h-3" /></button>
          <span className="absolute bottom-1 right-1 bg-black/70 px-1 rounded text-[9px] text-white">{formatFileSize(attachment.size)}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input ref={fileRef} type="file" accept={DM_LIMITS.attachmentTypes.join(",")} className="hidden" onChange={handleAttach} />
        <Button type="button" variant="ghost" size="icon" className="w-8 h-8 shrink-0" onClick={() => fileRef.current?.click()} disabled={disabled}>
          <Paperclip className="w-4 h-4" />
        </Button>
        <Input
          placeholder={placeholder} value={input} onChange={(e) => setInput(e.target.value)}
          className="flex-1" disabled={disabled || sending} autoFocus
          maxLength={DM_LIMITS.textMaxChars}
        />
        <span className={`text-[9px] shrink-0 ${input.length > DM_LIMITS.textMaxChars * 0.9 ? "text-amber-400" : "text-muted-foreground"}`}>
          {input.length > 0 ? `${input.length}/${DM_LIMITS.textMaxChars}` : ""}
        </span>
        <Button type="submit" size="icon" className="w-8 h-8 shrink-0" disabled={(!input.trim() && !attachment) || sending || disabled}>
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </form>
    </div>
  )
}
