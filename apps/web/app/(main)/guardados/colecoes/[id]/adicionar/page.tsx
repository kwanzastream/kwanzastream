"use client"
import { useParams, useRouter } from "next/navigation"
import { AddToCollectionModal } from "@/components/saved/add-to-collection-modal"
export default function AdicionarAColecaoPage() {
  const { id } = useParams(); const router = useRouter()
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-8">
      <AddToCollectionModal collectionId={id as string} collectionName="Colecção" onAdded={() => router.push(`/guardados/colecoes/${id}`)} onClose={() => router.back()} />
    </div>
  )
}
