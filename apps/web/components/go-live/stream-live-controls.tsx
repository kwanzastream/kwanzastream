"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  SwitchCamera, Mic, MicOff, MessageSquare, Users, Zap,
  MoreVertical, Square, Share2, Settings, Eye, Clock
} from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

interface StreamLiveControlsProps {
  onToggleCamera: () => void
  onToggleMic: () => void
  onOpenChat: () => void
  onOpenViewers: () => void
  onOpenSalos: () => void
  onEndStream: () => void
  onShare: () => void
  isMuted: boolean
  viewerCount: number
  salosTotal: number
  duration: number // seconds
  className?: string
}

export function StreamLiveControls({
  onToggleCamera, onToggleMic, onOpenChat, onOpenViewers, onOpenSalos,
  onEndStream, onShare, isMuted, viewerCount, salosTotal, duration, className = "",
}: StreamLiveControlsProps) {
  const formatDuration = (s: number) => {
    const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const sec = s % 60
    return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Badge className="bg-[#CE1126] border-none animate-pulse text-[10px] font-bold gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white" /> AO VIVO
          </Badge>
          <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
            <Clock className="w-3 h-3" /> {formatDuration(duration)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs flex items-center gap-1"><Eye className="w-3 h-3" /> {viewerCount}</span>
          {salosTotal > 0 && (
            <span className="text-xs text-[#F9D616] flex items-center gap-1 font-bold">
              <Zap className="w-3 h-3" /> {salosTotal.toLocaleString("pt-AO")}
            </span>
          )}
        </div>
      </div>

      {/* Main controls */}
      <div className="flex items-center justify-center gap-3">
        <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20" onClick={onToggleCamera}>
          <SwitchCamera className="w-5 h-5" />
        </Button>

        <Button size="icon" variant="ghost"
          className={`w-12 h-12 rounded-full ${isMuted ? "bg-red-600 hover:bg-red-700" : "bg-white/10 hover:bg-white/20"}`}
          onClick={onToggleMic}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>

        <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20" onClick={onOpenChat}>
          <MessageSquare className="w-5 h-5" />
        </Button>

        <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20" onClick={onOpenViewers}>
          <Users className="w-5 h-5" />
        </Button>

        <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full bg-[#F9D616]/20 hover:bg-[#F9D616]/30 text-[#F9D616]" onClick={onOpenSalos}>
          <Zap className="w-5 h-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black/90 border-white/20 text-white">
            <DropdownMenuItem onClick={onShare} className="text-xs gap-2"><Share2 className="w-3.5 h-3.5" />Partilhar</DropdownMenuItem>
            <DropdownMenuItem className="text-xs gap-2"><Settings className="w-3.5 h-3.5" />Qualidade</DropdownMenuItem>
            <DropdownMenuItem onClick={onEndStream} className="text-xs gap-2 text-red-400 focus:text-red-400">
              <Square className="w-3.5 h-3.5" />Encerrar stream
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
