"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import api from "./api"

export type UserRole = "USER" | "STREAMER" | "ADMIN"

export interface AuthUser {
  id: string
  username: string
  displayName: string
  email?: string
  phone?: string
  avatarUrl?: string
  avatar?: string // backward compat alias for avatarUrl
  bannerUrl?: string
  bio?: string
  role: UserRole
  isVerified: boolean
  emailVerified: boolean
  kycTier: number
  balance: number
  interests: string[]
  streamKey?: string
  isBanned?: boolean
  banReason?: string
  onboardingCompleted?: boolean
  createdAt?: string
  followers?: number
  following?: number
  location?: string
  telefone?: string
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  isLoggedIn: boolean // backward compat alias
  login: (credentials: LoginCredentials) => Promise<void>
  loginWithOtp: (phone: string, code: string) => Promise<void>
  requestOtp: (phone: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  updateUser: (data: Partial<AuthUser>) => void
  updateProfile: (data: Partial<AuthUser>) => Promise<void>
}

interface LoginCredentials {
  email?: string
  phone?: string
  password?: string
}

interface RegisterData {
  username: string
  displayName?: string
  email?: string
  phone?: string
  password?: string
  dateOfBirth: string
  interests?: string[]
}

const AuthContext = createContext<AuthContextType | null>(null)

function setTokenCookie(token: string) {
  document.cookie = `ks_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
}

function clearTokenCookie() {
  document.cookie = "ks_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

function storeToken(token: string) {
  localStorage.setItem("ks_token", token)
  setTokenCookie(token)
}

function clearToken() {
  localStorage.removeItem("ks_token")
  clearTokenCookie()
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const res = await api.get("/api/auth/me")
      setUser(res.data.user)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false))
  }, [refreshUser])

  const login = async (credentials: LoginCredentials) => {
    const res = await api.post("/api/auth/login", credentials)
    const { accessToken, user: userData } = res.data
    if (accessToken) storeToken(accessToken)
    setUser(userData)
  }

  const requestOtp = async (phone: string) => {
    await api.post("/api/auth/request-otp", { phone })
  }

  const loginWithOtp = async (phone: string, code: string) => {
    const res = await api.post("/api/auth/verify-otp", { phone, code })
    const { accessToken, user: userData } = res.data
    if (accessToken) storeToken(accessToken)
    setUser(userData)
  }

  const register = async (data: RegisterData) => {
    const res = await api.post("/api/auth/register", data)
    const { accessToken, user: userData } = res.data
    if (accessToken) storeToken(accessToken)
    setUser(userData)
  }

  const logout = async () => {
    try {
      await api.post("/api/auth/logout")
    } finally {
      setUser(null)
      clearToken()
    }
  }

  const updateUser = (data: Partial<AuthUser>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null))
  }

  const updateProfile = async (data: Partial<AuthUser>) => {
    const response = await api.put("/api/users/me", data)
    setUser(response.data.user)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isLoggedIn: !!user,
        login,
        loginWithOtp,
        requestOtp,
        register,
        logout,
        refreshUser,
        updateUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
