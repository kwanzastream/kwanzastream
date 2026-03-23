import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = [
    "/",
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
]

const AUTH_PATHS = [
    "/entrar",
    "/registar",
    "/recuperar-senha",
    "/verificar-email",
    "/verificar-telefone",
    "/auth",
]

const ADMIN_PATHS = ["/admin"]

const DASHBOARD_PATHS = ["/dashboard"]

function isPublicPath(pathname: string): boolean {
    if (pathname.startsWith("/stream/")) return true
    if (pathname.startsWith("/embed/")) return true

    return PUBLIC_PATHS.some(
        (path) => pathname === path || pathname.startsWith(path + "/")
    )
}

function isAuthPath(pathname: string): boolean {
    return AUTH_PATHS.some(
        (path) => pathname === path || pathname.startsWith(path + "/")
    )
}

const ADMIN_ROLES = ['super_admin', 'admin', 'moderator', 'finance', 'support']
const SUPER_ADMIN_ONLY = ['/admin/config', '/admin/feature-flags', '/admin/admins']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get("ks_token")?.value
    const userRole = request.cookies.get("ks_role")?.value

    // Admin paths — requer token + role admin
    if (ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
        if (!token) {
            return NextResponse.redirect(new URL("/entrar", request.url))
        }
        // Role check via cookie (layout also checks server-side)
        if (userRole && !ADMIN_ROLES.includes(userRole)) {
            return NextResponse.redirect(new URL("/403", request.url))
        }
        // Super admin only sections
        if (SUPER_ADMIN_ONLY.some(p => pathname.startsWith(p)) && userRole !== 'super_admin') {
            return NextResponse.redirect(new URL("/403", request.url))
        }
        return NextResponse.next()
    }

    // Dashboard paths — requer token
    if (DASHBOARD_PATHS.some((p) => pathname.startsWith(p))) {
        if (!token) {
            return NextResponse.redirect(new URL("/entrar", request.url))
        }
        return NextResponse.next()
    }

    // Auth paths — se já tem token, redireciona para feed
    if (isAuthPath(pathname)) {
        if (token) {
            return NextResponse.redirect(new URL("/feed", request.url))
        }
        return NextResponse.next()
    }

    // Public paths — sempre acessível
    if (isPublicPath(pathname)) {
        return NextResponse.next()
    }

    // Todas as outras paths — requer token
    if (!token) {
        const loginUrl = new URL("/entrar", request.url)
        loginUrl.searchParams.set("redirect", pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|manifest|icons|images|sw.js|workbox|kwanza-logo|apple-icon|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$).*)",
    ],
}
