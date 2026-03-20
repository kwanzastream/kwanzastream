"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function BanidosHub() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard/comunidade/banidos/temporarios") }, [router])
  return null
}
