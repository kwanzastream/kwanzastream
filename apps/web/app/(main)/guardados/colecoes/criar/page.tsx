"use client"
import { CollectionForm } from "@/components/saved/collection-form"
import { useRouter } from "next/navigation"
export default function CriarColecaoPage() {
  const router = useRouter()
  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">Nova colecção</h1>
      <CollectionForm onSaved={(c) => router.push(`/guardados/colecoes/${c.id || ""}`)} />
    </div>
  )
}
