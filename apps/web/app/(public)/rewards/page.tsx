"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RewardsPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/rewards/activos") }, [router])
  return null
}
