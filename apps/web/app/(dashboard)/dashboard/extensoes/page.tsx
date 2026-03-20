"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function ExtensoesHub() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard/extensoes/instaladas") }, [router])
  return null
}
