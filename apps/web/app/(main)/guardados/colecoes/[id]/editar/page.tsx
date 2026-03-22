"use client"
import { useParams, useRouter } from "next/navigation"
import { CollectionForm } from "@/components/saved/collection-form"
export default function EditarColecaoPage() {
  const { id } = useParams(); const router = useRouter()
  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">Editar colecção</h1>
      <CollectionForm collectionId={id as string} initial={{ name: "Gaming Favourites", description: "Os meus streams favoritos", isPublic: false }} onSaved={() => router.push(`/guardados/colecoes/${id}`)} />
    </div>
  )
}
