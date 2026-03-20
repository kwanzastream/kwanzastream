"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function ReportsHub() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard/moderacao/reports/pendentes") }, [router])
  return null
}
