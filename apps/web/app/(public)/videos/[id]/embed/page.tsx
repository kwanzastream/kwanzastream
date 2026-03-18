import { Play } from "lucide-react"

// Embed page — uses (embed) route group for X-Frame-Options ALLOWALL
// params: ?muted=true, ?autoplay=false, ?quality=360p, ?t=1h23m45s

export default function VideoEmbedPage({ params }: { params: { id: string } }) {
  return (
    <html>
      <head><meta name="robots" content="noindex" /><title>Kwanza Stream — Embed</title></head>
      <body style={{ margin: 0, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, rgba(206,17,38,0.2), rgba(128,0,128,0.2))" }}>
          <Play style={{ width: 64, height: 64, color: "rgba(255,255,255,0.6)" }} />
          <div style={{ position: "absolute", bottom: 8, right: 8, color: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "sans-serif" }}>kwanzastream.ao</div>
        </div>
      </body>
    </html>
  )
}
