"use client"
import { useParams } from "next/navigation"
import { KycReviewCard } from "@/components/admin/kyc-review-card"
import { toast } from "sonner"
export default function KycDetailPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">KYC Review #{(id as string).slice(0,8)}</h1>
  <KycReviewCard id={id as string} username="streamer" name="João Manuel Silva" biNumber="000123456LA041" birthDate="15/03/1995" biValid selfieMatch={0.89} onApprove={() => toast.success("KYC aprovado — email automático enviado")} onReject={() => toast.info("KYC rejeitado")} />
</div>) }
