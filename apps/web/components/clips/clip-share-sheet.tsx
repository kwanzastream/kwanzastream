"use client"

import { useState } from "react"
import { Share2, Copy, Check, MessageCircle, Download, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ClipShareSheetProps {
  clipId: string
  title: string
  creatorName: string
}

export function ClipShareSheet({ clipId, title, creatorName }: ClipShareSheetProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const url = typeof window !== "undefined" ? `${window.location.origin}/clips/${clipId}` : `/clips/${clipId}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true); toast.success("Link copiado!")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    const text = `Vê este clip de ${creatorName} no Kwanza Stream! 🇦🇴🔥\n${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
  }

  const handleDownload = () => {
    toast.success("A descarregar clip...") // In production: trigger download of clip video
  }

  return (
    <div className="relative">
      <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => setOpen(!open)}>
        <Share2 className="w-3 h-3" />Partilhar
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-64 bg-popover border border-white/10 rounded-xl shadow-xl z-50 p-3 space-y-2">
            <h4 className="text-xs font-bold">Partilhar clip</h4>
            <div className="flex items-center gap-2 bg-white/[0.04] rounded-lg p-2">
              <span className="text-[9px] text-muted-foreground truncate flex-1">{url}</span>
              <button onClick={handleCopy}>{copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-muted-foreground" />}</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" className="text-xs gap-1 bg-[#25D366] hover:bg-[#25D366]/80 text-white" onClick={handleWhatsApp}><MessageCircle className="w-3 h-3" />WhatsApp</Button>
              <Button size="sm" variant="outline" className="text-xs gap-1" onClick={handleCopy}><Copy className="w-3 h-3" />Copiar</Button>
              <Button size="sm" variant="outline" className="text-xs gap-1" onClick={handleDownload}><Download className="w-3 h-3" />Download</Button>
              <Button size="sm" variant="outline" className="text-xs gap-1" onClick={() => { handleDownload(); toast("Partilha manualmente no Instagram/TikTok") }}><Instagram className="w-3 h-3" />Insta/TikTok</Button>
            </div>
            <p className="text-[8px] text-muted-foreground text-center">Instagram/TikTok: descarrega e partilha manualmente</p>
          </div>
        </>
      )}
    </div>
  )
}
