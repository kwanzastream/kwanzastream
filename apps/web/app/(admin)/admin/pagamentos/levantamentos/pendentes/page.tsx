"use client"
import { PaymentApprovalRow } from "@/components/admin/payment-approval-row"
import { toast } from "sonner"
export default function LevantamentosPendentesPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Levantamentos Pendentes</h1>
  <div className="space-y-2">
    <PaymentApprovalRow id="w1" username="streamer1" amount={45000} method="Multicaixa" account="AO06..." createdAt="19 Mar" onApprove={() => toast.success("Aprovado")} onReject={() => toast.info("Rejeitado")} />
    <PaymentApprovalRow id="w2" username="streamer2" amount={23000} method="Unitel Money" account="+244923..." createdAt="18 Mar" onApprove={() => toast.success("Aprovado")} onReject={() => toast.info("Rejeitado")} />
    <PaymentApprovalRow id="w3" username="streamer3" amount={120000} method="Multicaixa" account="AO06..." createdAt="16 Mar" onApprove={() => toast.success("Aprovado")} onReject={() => toast.info("Rejeitado")} />
  </div></div>) }
