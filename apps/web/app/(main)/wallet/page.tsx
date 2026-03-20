"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"

export default function WalletPage() {
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => { if (!user) router.replace("/entrar?redirectTo=/wallet"); else router.replace("/wallet/saldo") }, [user, router])
  return null
}
