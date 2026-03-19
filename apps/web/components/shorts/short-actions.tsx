"use client"

import { Heart, MessageSquare, Share2, Bookmark, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ShortActionsProps {
  likes: number
  comments: number
  shares: number
  shortId: string
  title: string
  creatorName: string
}

export function ShortActions({ likes, comments, shares, shortId, title, creatorName }: ShortActionsProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(!liked); setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    const url = `https://kwanzastream.ao/shorts/${shortId}`
    const text = `Vê este short de ${creatorName} no Kwanza Stream! 🇦🇴🔥`
    if (navigator.share) navigator.share({ title, url, text })
    else window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank")
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSaved(!saved); toast.success(saved ? "Removido" : "Guardado")
  }

  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

  return (
    <div className="flex flex-col gap-4 items-center">
      <button className="flex flex-col items-center gap-0.5" onClick={handleLike}>
        <div className={`w-10 h-10 rounded-full bg-black/40 flex items-center justify-center ${liked ? "text-red-500" : "text-white"}`}>
          <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
        </div>
        <span className="text-[10px] text-white font-bold">{fmt(likeCount)}</span>
      </button>
      <button className="flex flex-col items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white"><MessageSquare className="w-5 h-5" /></div>
        <span className="text-[10px] text-white font-bold">{fmt(comments)}</span>
      </button>
      <button className="flex flex-col items-center gap-0.5" onClick={handleShare}>
        <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white"><Share2 className="w-5 h-5" /></div>
        <span className="text-[10px] text-white font-bold">{fmt(shares)}</span>
      </button>
      <button className="flex flex-col items-center gap-0.5" onClick={handleSave}>
        <div className={`w-10 h-10 rounded-full bg-black/40 flex items-center justify-center ${saved ? "text-primary" : "text-white"}`}>
          <Bookmark className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
        </div>
      </button>
      <button className="flex flex-col items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white"><MoreHorizontal className="w-5 h-5" /></div>
      </button>
    </div>
  )
}
