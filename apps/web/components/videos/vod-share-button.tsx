"use client"

import { useState } from "react"
import { Share2, Copy, Check, MessageCircle, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface VodShareButtonProps {
  videoId: string
  title: string
  currentTime?: number // seconds — for timestamp share
}

function formatTimestamp(s: number) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}h${m}m${sec}s`
  return `${m}m${sec}s`
}

export function VodShareButton({ videoId, title, currentTime }: VodShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [withTimestamp, setWithTimestamp] = useState(!!currentTime)

  const baseUrl = typeof window !== "undefined" ? `${window.location.origin}/videos/${videoId}` : `/videos/${videoId}`
  const url = withTimestamp && currentTime ? `${baseUrl}?t=${currentTime}` : baseUrl

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success("Link copiado!")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    const text = withTimestamp && currentTime
      ? `${title} (a partir de ${formatTimestamp(currentTime)}) — ${url}`
      : `${title} — ${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" className="text-xs gap-1" onClick={() => setOpen(!open)}>
        <Share2 className="w-3 h-3" />Partilhar
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-72 bg-popover border border-white/10 rounded-xl shadow-xl z-50 p-3 space-y-3">
            <h4 className="text-xs font-bold">Partilhar vídeo</h4>

            {/* Timestamp toggle */}
            {currentTime && currentTime > 0 && (
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input type="checkbox" checked={withTimestamp} onChange={(e) => setWithTimestamp(e.target.checked)} className="rounded" />
                Incluir timestamp ({formatTimestamp(currentTime)})
              </label>
            )}

            {/* URL preview */}
            <div className="flex items-center gap-2 bg-white/[0.04] rounded-lg p-2">
              <LinkIcon className="w-3 h-3 text-muted-foreground shrink-0" />
              <span className="text-[10px] text-muted-foreground truncate flex-1">{url}</span>
              <button onClick={handleCopy}>{copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}</button>
            </div>

            {/* Share buttons */}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 text-xs gap-1" onClick={handleCopy}>
                <Copy className="w-3 h-3" />Copiar link
              </Button>
              <Button size="sm" className="flex-1 text-xs gap-1 bg-[#25D366] hover:bg-[#25D366]/80 text-white" onClick={handleWhatsApp}>
                <MessageCircle className="w-3 h-3" />WhatsApp
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
