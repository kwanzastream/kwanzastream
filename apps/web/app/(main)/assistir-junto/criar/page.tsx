"use client"
import { WatchPartyCreateForm } from "@/components/watch-party/watch-party-create-form"
export default function CriarPartyPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">Nova Watch Party</h1>
      <WatchPartyCreateForm />
    </div>
  )
}
