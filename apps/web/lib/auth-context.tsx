"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import api from "./api"

interface User {
  id: string
  phone: string
  email?: string
  username?: string
  displayName?: string
  avatarUrl?: string
  avatar?: string
  bio?: string
  role: string
  isVerified: boolean
  isBanned?: boolean
  banReason?: string
  emailVerified?: boolean
  onboardingCompleted?: boolean
  balance: number
  streamKey?: string
  createdAt: string
  // Extended fields populated by profile/dashboard endpoints
  followers?: number
  following?: number
  location?: string
  telefone?: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  requestOtp: (phone: string, termsAccepted?: boolean, ageConfirmed?: boolean) => Promise<{ isNewUser: boolean; code?: string }>
  verifyOtp: (phone: string, code: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch current user from API (uses httpOnly cookie automatically)
  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get('/api/auth/me')
      setUser(response.data.user)
    } catch (error) {
      // 401 = not authenticated or expired cookie
      setUser(null)
    }
  }, [])

  // Check auth on mount
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true)
      await refreshUser()
      setIsLoading(false)
    }
    initAuth()
  }, [refreshUser])

  // Request OTP
  const requestOtp = async (phone: string, termsAccepted?: boolean, ageConfirmed?: boolean) => {
    const response = await api.post('/api/auth/request-otp', { phone, termsAccepted, ageConfirmed })
    return {
      isNewUser: response.data.isNewUser,
      code: response.data.code, // Only in development
    }
  }

  // Verify OTP and login — server sets httpOnly cookies automatically
  const verifyOtp = async (phone: string, code: string) => {
    const response = await api.post('/api/auth/verify-otp', { phone, code })
    // No need to store tokens — httpOnly cookies are set by the server
    setUser(response.data.user)
  }

  // Logout — server clears httpOnly cookies
  const logout = async () => {
    try {
      await api.post('/api/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
    }
  }

  // Update profile
  const updateProfile = async (data: Partial<User>) => {
    const response = await api.put('/api/users/me', data)
    setUser(response.data.user)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        requestOtp,
        verifyOtp,
        logout,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }
  return context
}
