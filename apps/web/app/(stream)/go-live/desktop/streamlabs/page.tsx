"use client"
import SoftwareSetupPage from "../software-setup"

export default function GoLiveDesktopStreamlabsPage() {
  return (
    <SoftwareSetupPage
      name="Streamlabs"
      downloadUrl="https://streamlabs.com/streamlabs-live-streaming-software"
      steps={[
        "Descarrega e instala o Streamlabs Desktop",
        "Faz login ou cria uma conta no Streamlabs",
        "Vai a Definições (ícone de engrenagem) → Stream",
        'Em "Tipo de stream" selecciona "Servidor personalizado"',
        "Cola o URL do servidor e a Stream Key",
        "No painel principal, configura as fontes de vídeo/áudio",
        "Clica em 'Entrar em directo' para iniciar",
      ]}
    />
  )
}
