"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function HistoricoPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/loja/pedidos") }, [router])
  return null
}
