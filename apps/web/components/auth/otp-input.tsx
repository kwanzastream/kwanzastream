"use client"

import { useRef, useCallback } from "react"

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  onComplete?: (code: string) => void
  length?: number
  disabled?: boolean
}

export function OtpInput({ value, onChange, onComplete, length = 6, disabled }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const focusInput = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, length - 1))
    inputsRef.current[clampedIndex]?.focus()
  }, [length])

  const handleChange = (index: number, digit: string) => {
    if (!/^\d?$/.test(digit)) return

    const arr = value.split("")
    // Pad to length
    while (arr.length < length) arr.push("")
    arr[index] = digit

    const newValue = arr.join("").slice(0, length)
    onChange(newValue)

    // Auto-advance
    if (digit && index < length - 1) {
      focusInput(index + 1)
    }

    // Auto-submit on complete
    if (digit && newValue.replace(/\s/g, "").length === length) {
      onComplete?.(newValue)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      focusInput(index - 1)
    }
    if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1)
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      focusInput(index + 1)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
    onChange(pasted)
    if (pasted.length === length) {
      onComplete?.(pasted)
    } else {
      focusInput(pasted.length)
    }
  }

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value.slice(-1))}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className="w-11 h-13 text-center text-lg font-bold rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
          aria-label={`Dígito ${i + 1} de ${length}`}
        />
      ))}
    </div>
  )
}
