"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function DefinicoesPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/definicoes/perfil") }, [router])
  return null
}
