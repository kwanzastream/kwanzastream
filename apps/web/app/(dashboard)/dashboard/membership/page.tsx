"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function MembershipHubPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/dashboard/membership/tiers") }, [router])
  return null
}
