"use client"
import { Star } from "lucide-react"

export interface ReviewData { id: string; username: string; rating: number; text: string; date: string }

export function ReviewCard({ review }: { review: ReviewData }) {
  return (
    <div className="p-3 rounded-xl border border-white/10 space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold">@{review.username}</span>
        <div className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />)}</div>
      </div>
      <p className="text-xs text-muted-foreground">{review.text}</p>
      <p className="text-[8px] text-muted-foreground">{review.date}</p>
    </div>
  )
}
