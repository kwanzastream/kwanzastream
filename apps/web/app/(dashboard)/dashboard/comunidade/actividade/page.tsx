"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function ActividadeHub() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard/comunidade/actividade/chat") }, [router])
  return null
}
