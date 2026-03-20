"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function MonetizacaoHubPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard/monetizacao/overview") }, [router])
  return null
}
