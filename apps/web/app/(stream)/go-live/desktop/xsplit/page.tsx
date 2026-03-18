"use client"
import SoftwareSetupPage from "../software-setup"

export default function GoLiveDesktopXsplitPage() {
  return (
    <SoftwareSetupPage
      name="XSplit"
      downloadUrl="https://www.xsplit.com/broadcaster"
      steps={[
        "Descarrega e instala o XSplit Broadcaster",
        "Cria a tua conta ou faz login",
        "Vai a Broadcast → Adicionar Saída → Custom RTMP",
        "Em 'Name' escreve 'Kwanza Stream'",
        "Cola o URL do servidor RTMP e a Stream Key",
        "Define resolução 720p e bitrate 2500 kbps em Settings → Output",
        "Clica em 'Stream' no painel principal para iniciar",
      ]}
    />
  )
}
