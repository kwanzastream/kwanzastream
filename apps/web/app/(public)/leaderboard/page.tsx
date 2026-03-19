"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LeaderboardPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/leaderboard/streamers") }, [router])
  return null
}
