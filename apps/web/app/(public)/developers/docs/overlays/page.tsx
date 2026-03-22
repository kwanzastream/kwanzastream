"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { CodeBlock } from "@/components/developers/code-block"
export default function OverlaysPage() {
  return (<div className="max-w-5xl mx-auto px-4 py-8 flex gap-8"><DocsSidebar /><div className="flex-1 space-y-4">
    <h1 className="text-xl font-bold">Overlays</h1>
    <p className="text-xs text-muted-foreground">Widgets HTML para OBS/Streamlabs que reagem a eventos em tempo real.</p>
    <div className="space-y-3">
      {[{ title: "Alerta de Salo", desc: "Animação quando alguém envia Salos" }, { title: "Sub Alert", desc: "Banner de novo subscritor" },
        { title: "Goal Bar", desc: "Progress bar para metas de Salos" }, { title: "Chat Overlay", desc: "Widget de chat para o stream" },
        { title: "Song Request", desc: "Widget de música (v2)" }].map((o, i) =>
        <div key={i} className="p-3 rounded-xl border border-white/10"><p className="text-sm font-semibold">{o.title}</p><p className="text-xs text-muted-foreground">{o.desc}</p></div>
      )}
    </div>
    <CodeBlock language="html" title="Overlay básico (OBS Browser Source)" code={`<!DOCTYPE html>
<html><body style="background:transparent">
  <div id="alert" style="display:none;position:fixed;bottom:20px;right:20px;
    background:#9333ea;padding:16px;border-radius:12px;color:white">
  </div>
  <script>
    const ws = new WebSocket('wss://eventsub.kwanzastream.ao')
    ws.onopen = () => ws.send(JSON.stringify({
      type:'subscribe', events:['donations.received'], token:TOKEN
    }))
    ws.onmessage = (e) => {
      const d = JSON.parse(e.data)
      if (d.type === 'donations.received') {
        const el = document.getElementById('alert')
        el.textContent = d.payload.username + ' enviou ' + d.payload.amount + ' Salos!'
        el.style.display = 'block'
        setTimeout(() => el.style.display = 'none', 5000)
      }
    }
  </script>
</body></html>`} />
  </div></div>)
}
