"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { CodeBlock } from "@/components/developers/code-block"
export default function CriarExtensaoPage() {
  return (<div className="max-w-5xl mx-auto px-4 py-8 flex gap-8"><DocsSidebar /><div className="flex-1 space-y-4">
    <h1 className="text-xl font-bold">Criar Extensão</h1>
    <p className="text-xs text-muted-foreground">Extensões são mini-apps HTML/JS/CSS embebidas no player de vídeo.</p>
    <div className="space-y-3">
      {["1. Cria uma app no Console com tipo 'Extensão'", "2. Desenvolve o painel como HTML5 (iframe sandboxed)", "3. Usa a Extension Helper Library para comunicar com a plataforma", "4. Testa no ambiente de sandbox", "5. Submete para review"].map((s, i) =>
        <div key={i} className="p-3 rounded-xl border border-white/10 text-xs text-muted-foreground">{s}</div>
      )}
    </div>
    <CodeBlock language="html" title="Estrutura básica" code={`<!DOCTYPE html>
<html><head><title>Minha Extensão</title></head>
<body>
  <div id="app"></div>
  <script src="https://cdn.kwanzastream.ao/ext-helper.js"></script>
  <script>
    KwanzaExt.onReady((ctx) => {
      document.getElementById('app').innerHTML =
        'Olá, ' + ctx.channel.displayName
    })
  </script>
</body></html>`} />
  </div></div>)
}
