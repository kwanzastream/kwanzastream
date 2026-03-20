"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function CandidaturaEmbaixadorPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/programa-embaixador") }, [router])
  return null
}
