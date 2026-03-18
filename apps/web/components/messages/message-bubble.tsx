"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Trash2, Copy, Flag, Check, CheckCheck } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { pt } from "date-fns/locale"
import { useState } from "react"
import { toast } from "sonner"

export interface Message {
  id: string
  content: string
  senderId: string
  createdAt: string
  isRead: boolean
  isDelivered?: boolean
  attachmentUrl?: string
  attachmentType?: string
  sender: { id: string; username: string; displayName: string; avatarUrl?: string }
}

interface MessageBubbleProps {
  message: Message
  isMine: boolean
  showAvatar?: boolean
  showTimestamp?: boolean
  onDelete?: (id: string) => void
  onReport?: (id: string) => void
}

export function MessageBubble({ message: msg, isMine, showAvatar = true, showTimestamp = true, onDelete, onReport }: MessageBubbleProps) {
  const [showMenu, setShowMenu] = useState(false)

  const handleCopy = () => { navigator.clipboard.writeText(msg.content); toast.success("Copiado"); setShowMenu(false) }

  // Read state: ✓ sent · ✓✓ delivered · ✓✓ blue read
  const readIcon = isMine ? (
    msg.isRead ? <CheckCheck className="w-3 h-3 text-blue-400" />
    : msg.isDelivered ? <CheckCheck className="w-3 h-3 text-muted-foreground" />
    : <Check className="w-3 h-3 text-muted-foreground" />
  ) : null

  return (
    <div className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}>
      {!isMine && showAvatar && (
        <Avatar className="w-6 h-6 shrink-0"><AvatarImage src={msg.sender?.avatarUrl} /><AvatarFallback className="text-[8px]">{msg.sender?.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
      )}
      {!isMine && !showAvatar && <div className="w-6 shrink-0" />}

      <div className="relative group max-w-[75%]" onContextMenu={(e) => { e.preventDefault(); setShowMenu(!showMenu) }}>
        {/* Attachment */}
        {msg.attachmentUrl && (
          <img src={msg.attachmentUrl} alt="Anexo" className={`max-w-full rounded-xl mb-1 ${isMine ? "rounded-br-sm" : "rounded-bl-sm"}`} loading="lazy" />
        )}

        <div className={`px-3.5 py-2 rounded-2xl text-sm ${isMine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"}`}>
          {msg.content}
          {showTimestamp && (
            <div className={`flex items-center gap-1 mt-0.5 ${isMine ? "justify-end" : ""}`}>
              <p className={`text-[10px] ${isMine ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                {formatDistanceToNow(new Date(msg.createdAt), { locale: pt, addSuffix: true })}
              </p>
              {readIcon}
            </div>
          )}
        </div>

        {/* Context menu */}
        {showMenu && (
          <div className={`absolute ${isMine ? "right-0" : "left-0"} top-full mt-1 bg-popover border border-white/10 rounded-xl shadow-xl z-50 py-1 min-w-[140px]`}>
            <button className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted flex items-center gap-2" onClick={handleCopy}><Copy className="w-3 h-3" />Copiar</button>
            {isMine && onDelete && <button className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted flex items-center gap-2 text-red-400" onClick={() => { onDelete(msg.id); setShowMenu(false) }}><Trash2 className="w-3 h-3" />Eliminar</button>}
            {!isMine && onReport && <button className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted flex items-center gap-2 text-amber-400" onClick={() => { onReport(msg.id); setShowMenu(false) }}><Flag className="w-3 h-3" />Denunciar</button>}
          </div>
        )}

        {/* Hover delete for own messages */}
        {isMine && onDelete && (
          <button className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => onDelete(msg.id)}>
            <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
          </button>
        )}
      </div>
    </div>
  )
}
