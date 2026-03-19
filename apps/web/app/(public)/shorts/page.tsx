"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ShortsPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/shorts/feed") }, [router])
  return null
}
