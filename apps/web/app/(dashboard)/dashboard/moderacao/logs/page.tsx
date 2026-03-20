"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function LogsHub() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard/moderacao/logs/chat") }, [router])
  return null
}
