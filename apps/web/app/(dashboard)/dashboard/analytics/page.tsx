"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function AnalyticsHubPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard/analytics/overview") }, [router])
  return null
}
