"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface OtpResendTimerProps {
  onResend: () => Promise<void>
  onWhatsApp?: () => void
  cooldownSeconds?: number
  autoStart?: boolean
}

export function OtpResendTimer({ onResend, onWhatsApp, cooldownSeconds = 60, autoStart = true }: OtpResendTimerProps) {
  const [countdown, setCountdown] = useState(autoStart ? cooldownSeconds : 0)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(timer); return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [countdown])

  const handleResend = useCallback(async () => {
    setIsResending(true)
    try {
      await onResend()
      setCountdown(cooldownSeconds)
    } finally {
      setIsResending(false)
    }
  }, [onResend, cooldownSeconds])

  return (
    <div className="space-y-2 text-center">
      <div className="flex items-center justify-center gap-2">
        {countdown > 0 ? (
          <span className="text-sm text-muted-foreground">
            Reenviar em <span className="font-mono font-medium text-foreground">{countdown}s</span>
          </span>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResend}
            disabled={isResending}
            className="text-primary hover:text-primary/80"
          >
            {isResending ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : null}
            Reenviar código
          </Button>
        )}
      </div>

      {onWhatsApp && countdown > 20 && (
        <button
          type="button"
          onClick={onWhatsApp}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          SMS não chegou? <span className="text-green-500 font-medium">Receber por WhatsApp</span>
        </button>
      )}
    </div>
  )
}
