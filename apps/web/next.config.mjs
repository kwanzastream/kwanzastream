/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // Embed routes — allow iframe embedding on external sites
        source: "/embed/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // VOD embed routes — allow iframe embedding on external sites
        source: "/videos/:id/embed",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Auth
      { source: "/auth/login", destination: "/entrar", permanent: true },
      { source: "/auth/registro", destination: "/registar", permanent: true },
      { source: "/auth/recuperar", destination: "/recuperar-senha", permanent: true },
      { source: "/auth/verificar-email", destination: "/verificar-email", permanent: true },
      { source: "/auth", destination: "/entrar", permanent: true },
      { source: "/onboarding", destination: "/registar/interesses", permanent: true },

      // Studio → Dashboard
      { source: "/studio", destination: "/dashboard", permanent: true },
      { source: "/studio/:path*", destination: "/dashboard/:path*", permanent: true },

      // Profile
      { source: "/u/:username", destination: "/:username", permanent: true },
      { source: "/profile", destination: "/definicoes/perfil", permanent: true },
      { source: "/profile/:id", destination: "/definicoes/perfil", permanent: true },

      // Search
      { source: "/search", destination: "/pesquisa", permanent: true },

      // Settings
      { source: "/settings", destination: "/definicoes", permanent: true },
      { source: "/settings/security", destination: "/definicoes/seguranca", permanent: true },

      // Messages/Notifications
      { source: "/messages", destination: "/mensagens", permanent: true },
      { source: "/notifications", destination: "/notificacoes", permanent: true },

      // Content
      { source: "/vods", destination: "/videos", permanent: true },
      { source: "/streams", destination: "/ao-vivo", permanent: true },
      { source: "/watch/:id", destination: "/videos/:id", permanent: true },
      { source: "/watch", destination: "/videos", permanent: true },

      // Explore/Categories
      { source: "/explore", destination: "/explorar", permanent: true },
      { source: "/categories", destination: "/explorar/categorias", permanent: true },
      { source: "/categorias/:slug", destination: "/categoria/:slug", permanent: true },

      // Legal
      { source: "/terms", destination: "/termos", permanent: true },
      { source: "/legal/termos", destination: "/termos", permanent: true },
      { source: "/legal/privacidade", destination: "/privacidade", permanent: true },
      { source: "/legal/comunidade", destination: "/diretrizes-comunidade", permanent: true },
      { source: "/legal/transparencia", destination: "/transparencia", permanent: true },

      // Other
      { source: "/help", destination: "/suporte", permanent: true },
      { source: "/ajuda", destination: "/suporte", permanent: true },
      { source: "/ajuda/:path*", destination: "/suporte/:path*", permanent: true },
      { source: "/institucional", destination: "/sobre", permanent: true },
      { source: "/banned", destination: "/conta-banida", permanent: true },
      { source: "/subscriptions", destination: "/subscricao/gerir", permanent: true },
      { source: "/app/configuracoes", destination: "/definicoes", permanent: true },
      { source: "/app/notificacoes", destination: "/notificacoes", permanent: true },
      { source: "/maintenance", destination: "/manutencao", permanent: true },
      { source: "/leaderboard", destination: "/leaderboard", permanent: false },
      { source: "/lite", destination: "/", permanent: true },
      { source: "/status", destination: "/status", permanent: false },
      { source: "/stream", destination: "/ao-vivo", permanent: true },
      { source: "/convites", destination: "/convites", permanent: false },
      { source: "/report", destination: "/report", permanent: false },
    ]
  },
}

export default nextConfig
