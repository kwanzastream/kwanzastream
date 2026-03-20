"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"

const PROVINCIAS = ["Luanda","Benguela","Huambo","Huíla","Cabinda","Bengo","Bié","Cuando Cubango","Cuanza Norte","Cuanza Sul","Cunene","Kwanza Norte","Kwanza Sul","Lunda Norte","Lunda Sul","Malanje","Moxico","Namibe","Uíge","Zaire"]

export default function CheckoutEntregaPage() {
  const router = useRouter()
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [morada, setMorada] = useState("")
  const [cidade, setCidade] = useState("")
  const [provincia, setProvincia] = useState("")
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/loja"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><MapPin className="w-5 h-5" />Morada de Entrega</h1></div>
      <div className="space-y-3">
        <div className="space-y-1"><p className="text-[10px] font-bold">Nome completo</p><Input value={nome} onChange={e => setNome(e.target.value)} className="bg-white/5" /></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Telefone</p><Input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="9XX XXX XXX" className="bg-white/5" /></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Morada</p><Input value={morada} onChange={e => setMorada(e.target.value)} className="bg-white/5" /></div>
        <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Cidade</p><Input value={cidade} onChange={e => setCidade(e.target.value)} className="bg-white/5" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Província</p><select value={provincia} onChange={e => setProvincia(e.target.value)} className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm">{PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}</select></div></div>
      </div>
      <Button className="w-full h-12 gap-2 font-bold" disabled={!nome || !telefone || !morada} onClick={() => router.push("/loja/checkout/pagamento")}><ArrowRight className="w-4 h-4" />Continuar para pagamento</Button>
    </div>
  )
}
