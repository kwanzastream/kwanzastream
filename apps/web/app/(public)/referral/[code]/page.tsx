"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { ReferralLandingHero } from "@/components/referral/referral-landing-hero"
import api from "@/lib/api"
import { redirect } from "next/navigation"
export default function ReferralLandingPage() {
  const { code } = useParams()
  const [data, setData] = useState<any>(null)
  const [invalid, setInvalid] = useState(false)
  useEffect(() => {
    api.get(`/api/referral/validate/${code}`).then(r => {
      setData(r.data)
      // Set cookie for 7 days
      document.cookie = `ks_ref=${code};path=/;max-age=${7 * 24 * 60 * 60}`
    }).catch(() => setInvalid(true))
  }, [code])
  if (invalid) {
    if (typeof window !== "undefined") window.location.href = "/registar"
    return null
  }
  if (!data) return <div className="min-h-screen flex items-center justify-center"><p className="text-xs">A carregar...</p></div>
  return <ReferralLandingHero referrerName={data.referrer?.username || "utilizador"} code={data.code || (code as string)} />
}
