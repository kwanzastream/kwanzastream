/**
 * Public paths accessible without authentication.
 * @sync-with middleware.ts — keep both lists in sync
 */

export const PUBLIC_PATH_PREFIXES = [
  "/explorar",
  "/ao-vivo",
  "/tendencias",
  "/schedule",
  "/sobre",
  "/como-funciona",
  "/parceiros",
  "/kwanza-camp",
  "/angola",
  "/provincias",
  "/radio",
  "/drops",
  "/rewards",
  "/leaderboard",
  "/torneios",
  "/tribos",
  "/videos",
  "/clips",
  "/shorts",
  "/eventos",
  "/categoria",
  "/tags",
  "/pesquisa",
  "/programa-afiliado",
  "/programa-partner",
  "/programa-embaixador",
  "/developers",
  "/ads",
  "/termos",
  "/privacidade",
  "/copyright",
  "/diretrizes-comunidade",
  "/politica-reembolsos",
  "/faq",
  "/contacto",
  "/suporte",
  "/imprensa",
  "/carreiras",
  "/anunciantes",
  "/acessibilidade",
  "/404",
  "/500",
  "/403",
  "/manutencao",
  "/status",
  "/transparencia",
  "/conta-banida",
  "/conta-suspensa",
  "/verificacao-necessaria",
  "/stream-offline",
  "/kwanza-awards",
  "/conquistas",
  "/referral",
  "/app",
  "/download",
  "/r",
  "/impacto-social",
  "/em-breve",
]

export function isPublicPath(pathname: string): boolean {
  if (pathname === "/") return true
  if (pathname.startsWith("/stream/")) return true
  if (pathname.startsWith("/embed/")) return true
  return PUBLIC_PATH_PREFIXES.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  )
}
