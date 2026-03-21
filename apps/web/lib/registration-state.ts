"use client"

const REG_KEY = "ks_reg"

export interface RegState {
  phone?: string
  phoneVerified?: boolean
  email?: string
  emailVerified?: boolean
  tempToken?: string
  username?: string
  displayName?: string
  password?: string
  dateOfBirth?: string
  interests?: string[]
  method: "phone" | "email" | "google"
  step: number
}

export function getRegState(): RegState | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(REG_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setRegState(partial: Partial<RegState>) {
  if (typeof window === "undefined") return
  const current = getRegState() || { method: "phone" as const, step: 0 }
  sessionStorage.setItem(REG_KEY, JSON.stringify({ ...current, ...partial }))
}

export function clearRegState() {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(REG_KEY)
}

/** Guard: redirect if prerequisite state is missing */
export function requireRegStep(
  state: RegState | null,
  requiredFields: (keyof RegState)[],
  fallbackPath: string
): string | null {
  if (!state) return fallbackPath
  for (const field of requiredFields) {
    if (!state[field]) return fallbackPath
  }
  return null
}
