"use client"
import SoftwareSetupPage from "../software-setup"

export default function GoLiveDesktopObsPage() {
  return (
    <SoftwareSetupPage
      name="OBS Studio"
      downloadUrl="https://obsproject.com/download"
      steps={[
        "Descarrega e instala o OBS Studio",
        "Abre o OBS e vai a Definições → Stream",
        'Em "Serviço" selecciona "Personalizado"',
        "Cola o URL do servidor e a Stream Key mostrados abaixo",
        "Em Saída → Streaming: define BitRate para 2500 Kbps",
        "Em Vídeo: define Resolução para 1280×720 e FPS para 30",
        "Volta ao ecrã principal e clica em 'Iniciar Transmissão'",
      ]}
    />
  )
}
