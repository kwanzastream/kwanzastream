"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, Reply, Flag, Loader2, MessageSquare } from "lucide-react"
import { toast } from "sonner"

export interface Comment { id: string; content: string; createdAt: string; likes: number; isLiked?: boolean; author: { username: string; displayName: string; avatarUrl?: string }; replies?: Comment[] }

interface VodCommentsProps { comments: Comment[]; videoId: string }

export function VodComments({ comments: initial, videoId }: VodCommentsProps) {
  const [comments, setComments] = useState(initial)
  const [input, setInput] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyInput, setReplyInput] = useState("")

  const handleComment = () => {
    if (!input.trim()) return
    const newComment: Comment = { id: `c-${Date.now()}`, content: input.trim(), createdAt: new Date().toISOString(), likes: 0, author: { username: "eu", displayName: "Eu" } }
    setComments(prev => [newComment, ...prev])
    setInput("")
    toast.success("Comentário publicado")
  }

  const handleReply = (parentId: string) => {
    if (!replyInput.trim()) return
    const reply: Comment = { id: `r-${Date.now()}`, content: replyInput.trim(), createdAt: new Date().toISOString(), likes: 0, author: { username: "eu", displayName: "Eu" } }
    setComments(prev => prev.map(c => c.id === parentId ? { ...c, replies: [...(c.replies || []), reply] } : c))
    setReplyInput(""); setReplyTo(null)
  }

  const handleLike = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, likes: c.isLiked ? c.likes - 1 : c.likes + 1, isLiked: !c.isLiked } : c))
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold flex items-center gap-2"><MessageSquare className="w-4 h-4" />Comentários ({comments.length})</h3>

      {/* Input */}
      <div className="flex gap-2">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escreve um comentário..." maxLength={500}
          className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm resize-none min-h-[40px] focus:outline-none focus:border-primary/50" rows={2} />
        <div className="flex flex-col gap-1">
          <Button size="sm" onClick={handleComment} disabled={!input.trim()}>Publicar</Button>
          <span className="text-[9px] text-muted-foreground text-right">{input.length}/500</span>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-3">
        {comments.map(c => (
          <div key={c.id} className="space-y-2">
            <div className="flex gap-2">
              <Avatar className="w-7 h-7 shrink-0"><AvatarImage src={c.author.avatarUrl} /><AvatarFallback className="text-[8px]">{c.author.displayName.slice(0, 2)}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5"><span className="text-xs font-bold">@{c.author.username}</span><span className="text-[10px] text-muted-foreground">há 2h</span></div>
                <p className="text-sm mt-0.5">{c.content}</p>
                <div className="flex items-center gap-3 mt-1">
                  <button className={`flex items-center gap-1 text-[10px] ${c.isLiked ? "text-primary" : "text-muted-foreground"}`} onClick={() => handleLike(c.id)}><ThumbsUp className="w-3 h-3" />{c.likes > 0 ? c.likes : ""}</button>
                  <button className="flex items-center gap-1 text-[10px] text-muted-foreground" onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}><Reply className="w-3 h-3" />Responder</button>
                  <button className="flex items-center gap-1 text-[10px] text-muted-foreground" onClick={() => toast.success("Denúncia enviada")}><Flag className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
            {/* Replies */}
            {c.replies && c.replies.length > 0 && (
              <div className="ml-9 space-y-2 border-l border-white/10 pl-3">
                {c.replies.map(r => (
                  <div key={r.id} className="flex gap-2">
                    <Avatar className="w-5 h-5 shrink-0"><AvatarFallback className="text-[7px]">{r.author.displayName.slice(0, 2)}</AvatarFallback></Avatar>
                    <div><span className="text-[10px] font-bold">@{r.author.username}</span><p className="text-xs mt-0.5">{r.content}</p></div>
                  </div>
                ))}
              </div>
            )}
            {replyTo === c.id && (
              <div className="ml-9 flex gap-2">
                <input value={replyInput} onChange={(e) => setReplyInput(e.target.value)} placeholder="Responder..." className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-2 py-1 text-xs" maxLength={500} />
                <Button size="sm" variant="outline" className="text-[10px] h-6" onClick={() => handleReply(c.id)}>Enviar</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
