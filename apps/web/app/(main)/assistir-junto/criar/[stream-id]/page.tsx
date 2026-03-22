"use client"
import { useParams } from "next/navigation"
import { WatchPartyCreateForm } from "@/components/watch-party/watch-party-create-form"
export default function CriarPartyStreamPage() {
  const { "stream-id": streamId } = useParams()
  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">Criar Watch Party</h1>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10"><p className="text-xs">Stream pré-seleccionado: <span className="font-semibold text-primary">{streamId}</span></p></div>
      <WatchPartyCreateForm preSelectedStream={streamId as string} />
    </div>
  )
}
