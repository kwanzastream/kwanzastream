"use client"

import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Contacto</h1>
        <p className="text-muted-foreground">Estamos aqui para te ajudar. Entra em contacto connosco.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Informações de Contacto</h2>
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email Geral", value: "geral@kwanzastream.ao", href: "mailto:geral@kwanzastream.ao" },
              { icon: Mail, label: "Suporte", value: "suporte@kwanzastream.ao", href: "mailto:suporte@kwanzastream.ao" },
              { icon: Mail, label: "Parcerias", value: "parcerias@kwanzastream.ao", href: "mailto:parcerias@kwanzastream.ao" },
              { icon: Phone, label: "WhatsApp", value: "+244 934 927 968", href: "https://wa.me/244934927968" },
              { icon: MapPin, label: "Sede", value: "Luanda, Angola 🇦🇴" },
              { icon: Clock, label: "Horário", value: "Seg–Sex, 9h–18h (WAT)" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <item.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener" className="text-sm font-medium hover:text-primary transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Enviar Mensagem</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Nome</label>
                <input type="text" placeholder="O teu nome" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm focus:border-primary/50 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Email</label>
                <input type="email" placeholder="email@exemplo.ao" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm focus:border-primary/50 focus:outline-none transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Assunto</label>
              <select className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm focus:border-primary/50 focus:outline-none transition-colors">
                <option value="">Seleciona um assunto</option>
                <option value="suporte">Suporte técnico</option>
                <option value="parceria">Parcerias e marcas</option>
                <option value="imprensa">Imprensa</option>
                <option value="feedback">Feedback</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Mensagem</label>
              <textarea rows={5} placeholder="Escreve a tua mensagem..." className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm focus:border-primary/50 focus:outline-none transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
              <Send className="w-4 h-4" /> Enviar mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
