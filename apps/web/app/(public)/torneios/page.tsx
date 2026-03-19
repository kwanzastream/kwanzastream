"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function TorneiosPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/torneios/proximos") }, [router])
  return null
}
