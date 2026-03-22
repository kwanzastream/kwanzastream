"use client"
import { useRouter } from "next/navigation"
import { ClearHistoryModal } from "@/components/history/clear-history-modal"
export default function LimparTudoPage() {
  const router = useRouter()
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-8">
      <ClearHistoryModal type="tudo" onCleared={() => router.push("/historico")} onCancel={() => router.back()} />
    </div>
  )
}
