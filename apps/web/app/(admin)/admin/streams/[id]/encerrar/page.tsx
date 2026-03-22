"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function StreamEncerrarPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold text-red-400">Encerrar Stream</h1>
  <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-2"><p className="text-xs">Esta acção encerra o stream imediatamente. O streamer será notificado. O motivo é obrigatório e registado no audit log.</p>
    <textarea placeholder="Motivo do encerramento..." className="w-full px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[60px]" />
    <Button variant="destructive" onClick={() => toast.success("Stream encerrado")} className="text-xs">🚫 Encerrar stream</Button></div></div>) }
