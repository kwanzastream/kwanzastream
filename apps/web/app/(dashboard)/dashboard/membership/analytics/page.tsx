"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function AnalyticsHub() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard/membership/analytics/mrr") }, [router])
  return null
}
