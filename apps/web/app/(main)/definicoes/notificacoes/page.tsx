"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function NotificacoesPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/notificacoes/preferencias") }, [router])
  return null
}
