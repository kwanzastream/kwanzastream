// Centralised list of reserved usernames
// Only protects at root level — sub-routes don't conflict in Next.js App Router

export const RESERVED_USERNAMES = [
  // Platform routes
  "sobre", "schedule", "videos", "clips", "shorts",
  "explorar", "tendencias", "ao-vivo", "categoria",
  "tags", "radio", "drops", "rewards", "leaderboard",
  "wallet", "salos", "subscricao", "pagamento", "kyc",
  "loja", "gift", "torneios", "tribos", "eventos",
  "angola", "provincias", "idioma", "educacao",
  "developers", "ads", "kwanza-camp", "kwanza-awards",
  // Auth
  "entrar", "registar", "recuperar-senha", "verificar-email",
  "verificar-telefone", "auth",
  // Dashboard
  "admin", "dashboard", "definicoes", "feed", "inicio",
  "notificacoes", "mensagens", "amigos", "pesquisa",
  "guardados", "historico", "convidar", "app", "download",
  // Legal / info
  "suporte", "termos", "privacidade", "copyright",
  "faq", "contacto", "imprensa", "carreiras",
  "parceiros", "programa-partner", "programa-afiliado",
  "programa-embaixador", "anunciantes",
  // Technical
  "api", "www", "cdn", "mail", "help", "support",
  "stream", "stream-offline", "embed", "status",
  "transparencia", "diretrizes-comunidade",
  "como-funciona", "verificacao-necessaria",
  "conta-suspensa", "conta-banida", "manutencao",
  // Error pages
  "403", "404", "500",
  // Brand
  "kwanza", "kwanzastream", "admin", "bot", "live",
]

export function isReservedUsername(username: string): boolean {
  return RESERVED_USERNAMES.includes(username.toLowerCase())
}
