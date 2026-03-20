"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function CategoriasRecentesPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/definicoes/canal/categorias-recentes") }, [router])
  return null
}
