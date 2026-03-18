"use client"

import { useState, useRef, forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"

const COUNTRIES = [
  { code: "+244", flag: "🇦🇴", name: "Angola", pattern: /^9\d{8}$/ },
  { code: "+351", flag: "🇵🇹", name: "Portugal", pattern: /^9\d{8}$/ },
  { code: "+55",  flag: "🇧🇷", name: "Brasil", pattern: /^\d{10,11}$/ },
  { code: "+258", flag: "🇲🇿", name: "Moçambique", pattern: /^8\d{8}$/ },
  { code: "+238", flag: "🇨🇻", name: "Cabo Verde", pattern: /^\d{7}$/ },
]

interface PhoneInputProps {
  value: string
  onChange: (fullNumber: string, isValid: boolean) => void
  label?: string
  error?: string
  disabled?: boolean
}

export function PhoneInput({ value, onChange, label = "Número de telefone", error, disabled }: PhoneInputProps) {
  const [country, setCountry] = useState(COUNTRIES[0])
  const [showDropdown, setShowDropdown] = useState(false)
  const [localNumber, setLocalNumber] = useState(value.replace(/^\+\d+/, ""))
  const inputRef = useRef<HTMLInputElement>(null)

  const formatDisplay = (num: string) => {
    const digits = num.replace(/\D/g, "").slice(0, 9)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
  }

  const handleChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 9)
    setLocalNumber(digits)
    const full = country.code + digits
    const valid = country.pattern.test(digits)
    onChange(full, valid)
  }

  const selectCountry = (c: typeof COUNTRIES[number]) => {
    setCountry(c)
    setShowDropdown(false)
    const valid = c.pattern.test(localNumber)
    onChange(c.code + localNumber, valid)
    inputRef.current?.focus()
  }

  return (
    <div className="space-y-1.5">
      {label && <Label>{label}</Label>}
      <div className="flex gap-2">
        {/* Country selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            disabled={disabled}
            className="flex items-center gap-1 h-10 px-2.5 rounded-md border border-input bg-background text-sm hover:bg-accent transition-colors whitespace-nowrap"
          >
            <span>{country.flag}</span>
            <span className="text-muted-foreground">{country.code}</span>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </button>
          {showDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 min-w-[180px] py-1">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => selectCountry(c)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors ${c.code === country.code ? "bg-accent/50" : ""}`}
                >
                  <span>{c.flag}</span>
                  <span className="flex-1 text-left">{c.name}</span>
                  <span className="text-muted-foreground text-xs">{c.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone number */}
        <Input
          ref={inputRef}
          type="tel"
          inputMode="tel"
          placeholder="9XX XXX XXX"
          value={formatDisplay(localNumber)}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          className="flex-1"
          autoComplete="tel"
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {country.code === "+244" && (
        <p className="text-[11px] text-muted-foreground">Unitel (92X/93X/94X) ou Movicel (91X)</p>
      )}
    </div>
  )
}
