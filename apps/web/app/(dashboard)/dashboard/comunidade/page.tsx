"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function ComunidadeHubPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard/comunidade/seguidores") }, [router])
  return null
}
