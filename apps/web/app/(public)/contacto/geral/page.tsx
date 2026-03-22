"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState } from "react"
import api from "@/lib/api"
export default function ContactoGeralPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" }); const [loading, setLoading] = useState(false)
  const submit = async () => { setLoading(true); try { await api.post("/api/support/contact", { ...form, type: "geral" }); toast.success("Mensagem enviada! Respondemos em 24-48h."); setForm({ name: "", email: "", subject: "", message: "" }) } catch { toast.error("Erro ao enviar.") } finally { setLoading(false) } }
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold">📧 Contacto Geral</h1>
      <div className="space-y-1 text-xs text-muted-foreground"><p>Email: info@kwanzastream.ao</p><p>WhatsApp: +244 XXX XXX XXX</p><p>Horário: Seg-Sex 9h-18h WAT</p><p>Endereço: Luanda, Angola</p></div>
      <div className="space-y-3">
        {[{ l: "Nome", k: "name", ph: "O teu nome" }, { l: "Email", k: "email", ph: "Email" }, { l: "Assunto", k: "subject", ph: "Assunto" }].map(f => <div key={f.k}><label className="text-[10px] text-muted-foreground">{f.l}</label><input value={(form as any)[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} placeholder={f.ph} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>)}
        <div><label className="text-[10px] text-muted-foreground">Mensagem</label><textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="A tua mensagem..." className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[100px]" /></div>
        <Button onClick={submit} disabled={loading} className="w-full">{loading ? "A enviar..." : "Enviar"}</Button>
      </div>
    </div>
  )
}
