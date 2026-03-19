"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ConquistasPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/conquistas/minhas") }, [router])
  return null
}
