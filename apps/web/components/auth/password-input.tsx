"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  showStrength?: boolean
  error?: string
  autoComplete?: string
}

function getStrength(password: string): { score: number; label: string; color: string } {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[0-9]/.test(password)) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  if (score <= 1) return { score: 1, label: "Fraca", color: "bg-red-500" }
  if (score === 2) return { score: 2, label: "Razoável", color: "bg-orange-500" }
  if (score === 3) return { score: 3, label: "Boa", color: "bg-yellow-500" }
  if (score >= 4) return { score: 4, label: "Forte", color: "bg-green-500" }
  return { score: 0, label: "", color: "" }
}

export function PasswordInput({
  value,
  onChange,
  label = "Password",
  placeholder = "Mínimo 8 caracteres",
  showStrength = false,
  error,
  autoComplete = "new-password",
}: PasswordInputProps) {
  const [show, setShow] = useState(false)
  const strength = useMemo(() => showStrength && value.length > 0 ? getStrength(value) : null, [value, showStrength])

  return (
    <div className="space-y-1.5">
      {label && <Label>{label}</Label>}
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="pr-10"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setShow((v) => !v)}
          tabIndex={-1}
          aria-label={show ? "Esconder password" : "Mostrar password"}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {strength && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-colors ${level <= strength.score ? strength.color : "bg-muted"}`}
              />
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Força: <span className="font-medium">{strength.label}</span>
          </p>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
