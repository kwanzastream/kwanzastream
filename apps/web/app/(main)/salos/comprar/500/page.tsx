"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
export default function Page() {
  const router = useRouter()
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/salos/comprar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">500 Salos</h1></div>
      <div className="p-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 text-center space-y-3"><Heart className="w-12 h-12 text-yellow-400 mx-auto" /><p className="text-3xl font-black text-yellow-400">500</p><p className="text-xs text-muted-foreground">Salos</p><p className="text-xl font-bold">430 Kz</p></div>
      <Button className="w-full h-12 gap-2 font-bold" onClick={() => router.push("/salos/comprar/confirmar?pack=500")}><ArrowRight className="w-4 h-4" />Comprar por 430 Kz</Button>
    </div>)
}
