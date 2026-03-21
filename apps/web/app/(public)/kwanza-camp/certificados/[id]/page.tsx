"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { CampCertificateCard } from "@/components/kwanza-camp/camp-certificate-card"
import api from "@/lib/api"

export default function CertificadoPage() {
  const params = useParams()
  const id = params.id as string
  const [cert, setCert] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/camp/certificates/${id}`).then(res => setCert(res.data)).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  if (!cert) return <div className="text-center py-20 text-muted-foreground">Certificado não encontrado</div>

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-4">
      <CampCertificateCard certCode={cert.certCode} level={cert.level} issuedAt={cert.issuedAt} username={cert.user?.username || ""} />
      <p className="text-[10px] text-muted-foreground text-center">URL público: kwanzastream.ao/cert/{cert.certCode}</p>
    </div>
  )
}
