"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { OtpInput } from "./otp-input"
import { OtpResendTimer } from "./otp-resend-timer"

interface OtpPageWrapperProps {
  /** The masked contact — e.g. "+244 9** *** 789" or "k***a@gmail.com" */
  maskedContact: string
  /** "SMS" or "email" — controls the copy */
  channel: "sms" | "email"
  /** Verify callback — receives the 6-digit code */
  onVerify: (code: string) => Promise<void>
  /** Resend callback */
  onResend: () => Promise<void>
  /** WhatsApp fallback */
  onWhatsApp?: () => void
  /** Optional back action */
  onBack?: () => void
  /** Error message */
  error?: string
  /** Max attempts info */
  attemptsLeft?: number
}

export function OtpPageWrapper({
  maskedContact,
  channel,
  onVerify,
  onResend,
  onWhatsApp,
  onBack,
  error,
  attemptsLeft,
}: OtpPageWrapperProps) {
  const [code, setCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [localError, setLocalError] = useState("")

  const handleComplete = async (otpCode: string) => {
    setIsVerifying(true)
    setLocalError("")
    try {
      await onVerify(otpCode)
    } catch (err: any) {
      setLocalError(err?.message || "Código inválido ou expirado")
      setCode("")
    } finally {
      setIsVerifying(false)
    }
  }

  const displayError = error || localError

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold">Verifica o teu {channel === "sms" ? "número" : "email"}</h2>
        <p className="text-sm text-muted-foreground">
          Enviámos um código {channel === "sms" ? "SMS" : "por email"} para{" "}
          <span className="font-medium text-foreground">{maskedContact}</span>
        </p>
      </div>

      {/* OTP Input */}
      <div className="py-2">
        <OtpInput
          value={code}
          onChange={setCode}
          onComplete={handleComplete}
          disabled={isVerifying}
        />
      </div>

      {/* Error */}
      {displayError && (
        <div className="text-center">
          <p className="text-sm text-destructive">{displayError}</p>
          {attemptsLeft !== undefined && attemptsLeft > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {attemptsLeft} {attemptsLeft === 1 ? "tentativa restante" : "tentativas restantes"}
            </p>
          )}
        </div>
      )}

      {/* Verify button (fallback if auto-submit fails) */}
      <Button
        className="w-full"
        onClick={() => handleComplete(code)}
        disabled={code.length !== 6 || isVerifying}
      >
        {isVerifying ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Verificar código
      </Button>

      {/* Resend */}
      <OtpResendTimer onResend={onResend} onWhatsApp={channel === "sms" ? onWhatsApp : undefined} />

      {/* Back */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="block mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Alterar {channel === "sms" ? "número" : "email"}
        </button>
      )}
    </div>
  )
}
