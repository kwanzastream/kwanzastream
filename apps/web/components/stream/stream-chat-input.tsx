"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Smile, Lock, Clock } from "lucide-react"
import Link from "next/link"

interface StreamChatInputProps {
  isAuthenticated: boolean
  isConnected: boolean
  sendMessage: (msg: string) => void
  username: string
  chatMode?: "normal" | "followers" | "subscribers" | "slow" | "readonly"
  slowModeSeconds?: number
}

export function StreamChatInput({
  isAuthenticated, isConnected, sendMessage, username,
  chatMode = "normal", slowModeSeconds = 0,
}: StreamChatInputProps) {
  const [input, setInput] = useState("")
  const [slowCooldown, setSlowCooldown] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Slow mode countdown
  useEffect(() => {
    if (slowCooldown <= 0) return
    timerRef.current = setInterval(() => {
      setSlowCooldown(c => {
        if (c <= 1) { clearInterval(timerRef.current!); return 0 }
        return c - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [slowCooldown])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !isConnected || slowCooldown > 0) return
    sendMessage(input.trim())
    setInput("")
    if (chatMode === "slow" && slowModeSeconds > 0) {
      setSlowCooldown(slowModeSeconds)
    }
  }

  // Read-only mode
  if (chatMode === "readonly") {
    return (
      <div className="p-3 border-t border-white/10 text-center">
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" /> Chat em modo leitura
        </p>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="p-3 border-t border-white/10 text-center space-y-2">
        <p className="text-xs text-muted-foreground">Entra ou regista-te para participar no chat</p>
        <div className="flex gap-2">
          <Link href={`/entrar?redirectTo=/stream/${username}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-xs h-8">Entrar</Button>
          </Link>
          <Link href={`/registar?redirectTo=/stream/${username}`} className="flex-1">
            <Button size="sm" className="w-full text-xs h-8">Registar</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 border-t border-white/10">
      {/* Slow mode indicator */}
      {slowCooldown > 0 && (
        <div className="flex items-center gap-1.5 text-[10px] text-amber-400 mb-1.5">
          <Clock className="w-3 h-3" />
          <span>Modo lento: espera {slowCooldown}s</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Escreve uma mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 500))}
            maxLength={500}
            className="h-9 text-sm bg-white/5 border-white/10 pr-8"
            disabled={!isConnected || slowCooldown > 0}
          />
          <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors">
            <Smile className="w-4 h-4" />
          </button>
        </div>
        <Button
          type="submit"
          size="icon"
          className="h-9 w-9 shrink-0"
          disabled={!input.trim() || !isConnected || slowCooldown > 0}
        >
          <Send className="w-3.5 h-3.5" />
        </Button>
      </form>

      {input.length > 400 && (
        <p className="text-[10px] text-muted-foreground text-right mt-0.5">{input.length}/500</p>
      )}
    </div>
  )
}
