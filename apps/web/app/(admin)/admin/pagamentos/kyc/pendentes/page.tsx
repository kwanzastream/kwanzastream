"use client"
import { KycReviewCard } from "@/components/admin/kyc-review-card"
import { toast } from "sonner"
export default function KycPendentesPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">KYC Pendentes</h1>
  <KycReviewCard id="kyc1" username="streamer-novo" name="João Manuel Silva" biNumber="000123456LA041" birthDate="15/03/1995" biValid selfieMatch={0.89} onApprove={() => toast.success("KYC aprovado")} onReject={() => toast.info("KYC rejeitado")} />
  <KycReviewCard id="kyc2" username="creator-bg" name="Maria Domingos" biNumber="000789012BG023" birthDate="20/08/2000" biValid selfieMatch={0.92} onApprove={() => toast.success("KYC aprovado")} onReject={() => toast.info("KYC rejeitado")} />
</div>) }
