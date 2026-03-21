// ============================================================
// campController.ts — Kwanza Camp Learning Platform
// ============================================================

import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Full curriculum data
const CURRICULUM: Record<string, any> = {
    'nivel-1': {
        level: 1, title: 'Começa a Transmitir', subtitle: 'Para quem nunca fez stream',
        modules: [
            { slug: 'primeiro-stream', title: 'O teu Primeiro Stream', duration: 30, chapters: [
                { slug: 'o-que-precisas', title: 'O que precisas para começar', duration: 5 },
                { slug: 'configurar-obs', title: 'Configurar o OBS em 10 minutos', duration: 10 },
                { slug: 'transmitir-telemovel', title: 'Transmitir pelo telemóvel', duration: 8 },
                { slug: 'primeiro-go-live', title: 'O teu primeiro go-live', duration: 7 },
            ]},
            { slug: 'audio-video', title: 'Áudio e Vídeo', duration: 25, chapters: [
                { slug: 'iluminacao', title: 'Iluminação com o que tens em casa', duration: 6 },
                { slug: 'audio-claro', title: 'Áudio claro sem microfone profissional', duration: 7 },
                { slug: 'configuracoes-angola', title: 'Configurações recomendadas para Angola (3G/4G)', duration: 6 },
                { slug: 'economizar-dados', title: 'Economizar dados durante o stream', duration: 6 },
            ]},
            { slug: 'chat-comunidade', title: 'Chat e Comunidade', duration: 20, chapters: [
                { slug: 'interagir-viewers', title: 'Como interagir com os viewers', duration: 5 },
                { slug: 'moderar-chat', title: 'Moderar o chat sozinho', duration: 5 },
                { slug: 'regras-canal', title: 'Primeiras regras do canal', duration: 5 },
                { slug: 'responder-raids', title: 'Responder a raids', duration: 5 },
            ]},
        ],
    },
    'nivel-2': {
        level: 2, title: 'Cresce o teu Canal', subtitle: 'Para criadores com 1–3 meses',
        modules: [
            { slug: 'crescimento', title: 'Estratégias de Crescimento', duration: 30, chapters: [
                { slug: 'melhores-horarios', title: 'Melhores horários para Angola (heatmap)', duration: 8 },
                { slug: 'categorias-audiencia', title: 'Categorias com mais audiência angolana', duration: 7 },
                { slug: 'partilhar-whatsapp', title: 'Partilhar no WhatsApp e redes sociais', duration: 8 },
                { slug: 'colaborar-criadores', title: 'Colaborar com outros criadores AO', duration: 7 },
            ]},
            { slug: 'monetizacao-basica', title: 'Primeiros Rendimentos', duration: 25, chapters: [
                { slug: 'programa-afiliado', title: 'Como funciona o Programa Afiliado', duration: 6 },
                { slug: 'activar-salos', title: 'Activar Salos no teu canal', duration: 6 },
                { slug: 'configurar-subscricoes', title: 'Configurar subscrições', duration: 7 },
                { slug: 'primeiros-drops', title: 'Primeiros drops com marcas', duration: 6 },
            ]},
            { slug: 'conteudo', title: 'Qualidade do Conteúdo', duration: 25, chapters: [
                { slug: 'titulos-atractivos', title: 'Criar títulos que atraem viewers', duration: 6 },
                { slug: 'thumbnails', title: 'Thumbnails que funcionam', duration: 7 },
                { slug: 'clips-virais', title: 'Criar clips virais', duration: 6 },
                { slug: 'schedule-consistente', title: 'Schedule consistente', duration: 6 },
            ]},
        ],
    },
    'nivel-3': {
        level: 3, title: 'Torna-te Partner', subtitle: 'Para criadores estabelecidos',
        modules: [
            { slug: 'analytics-avancado', title: 'Analytics Avançado', duration: 30, chapters: [
                { slug: 'ler-dados', title: 'Ler os dados do teu canal', duration: 8 },
                { slug: 'retencao-viewers', title: 'Retenção de viewers', duration: 7 },
                { slug: 'optimizar-dados', title: 'Optimizar com base nos dados', duration: 8 },
                { slug: 'benchmarks-ao', title: 'Comparar com benchmarks do mercado AO', duration: 7 },
            ]},
            { slug: 'monetizacao-avancada', title: 'Monetização Avançada', duration: 30, chapters: [
                { slug: 'tiers-subscricao', title: 'Estruturar tiers de subscrição', duration: 8 },
                { slug: 'loja-canal', title: 'Loja do canal — o que vender', duration: 7 },
                { slug: 'patrocinios-marcas', title: 'Patrocínios com marcas angolanas', duration: 8 },
                { slug: 'candidatura-partner', title: 'Candidatura ao Programa Partner', duration: 7 },
            ]},
            { slug: 'marca-pessoal', title: 'Marca Pessoal', duration: 25, chapters: [
                { slug: 'identidade-visual', title: 'Identidade visual do canal', duration: 6 },
                { slug: 'redes-sociais', title: 'Presença nas redes sociais', duration: 7 },
                { slug: 'kwanza-awards', title: 'Kwanza Awards — como te destacar', duration: 6 },
                { slug: 'construir-tribo', title: 'Construir a tua Tribo', duration: 6 },
            ]},
        ],
    },
};

/**
 * GET /api/camp/curriculum
 * Full curriculum + user progress (if authed)
 */
export const getCurriculum = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        let progress: string[] = [];

        if (userId) {
            const records = await prisma.userCampProgress.findMany({
                where: { userId },
                select: { chapterSlug: true },
            });
            progress = records.map(r => r.chapterSlug);
        }

        res.json({ curriculum: CURRICULUM, progress });
    } catch (error) {
        console.error('Get curriculum error:', error);
        res.status(500).json({ error: 'Erro ao carregar currículo' });
    }
};

/**
 * GET /api/camp/progress
 * User's camp progress summary
 */
export const getCampProgress = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        if (!userId) return res.status(401).json({ error: 'Não autenticado' });

        const completedChapters = await prisma.userCampProgress.findMany({
            where: { userId },
            orderBy: { completedAt: 'desc' },
        });

        const certificates = await prisma.campCertificate.findMany({
            where: { userId },
            orderBy: { level: 'asc' },
        });

        // Calculate per-level progress
        const levels = [1, 2, 3].map(level => {
            const levelKey = `nivel-${level}`;
            const levelData = CURRICULUM[levelKey];
            const totalChapters = levelData.modules.reduce((sum: number, m: any) => sum + m.chapters.length, 0);
            const completed = completedChapters.filter(c => c.chapterSlug.startsWith(levelKey)).length;
            const cert = certificates.find(c => c.level === level);
            return { level, total: totalChapters, completed, percentage: Math.round((completed / totalChapters) * 100), certificate: cert || null };
        });

        // Find next chapter
        let nextChapter = null;
        for (const levelKey of ['nivel-1', 'nivel-2', 'nivel-3']) {
            const levelData = CURRICULUM[levelKey];
            for (const mod of levelData.modules) {
                for (const ch of mod.chapters) {
                    const slug = `${levelKey}/${mod.slug}/${ch.slug}`;
                    if (!completedChapters.find(c => c.chapterSlug === slug)) {
                        nextChapter = { slug, title: ch.title, module: mod.title, level: levelKey };
                        break;
                    }
                }
                if (nextChapter) break;
            }
            if (nextChapter) break;
        }

        const totalMinutes = completedChapters.length * 7; // avg 7min/chapter

        res.json({ levels, nextChapter, totalMinutes, completedCount: completedChapters.length });
    } catch (error) {
        console.error('Get camp progress error:', error);
        res.status(500).json({ error: 'Erro' });
    }
};

/**
 * POST /api/camp/progress
 * Mark a chapter as complete
 */
export const markChapterComplete = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        if (!userId) return res.status(401).json({ error: 'Não autenticado' });

        const { chapterSlug } = req.body;
        if (!chapterSlug) return res.status(400).json({ error: 'chapterSlug obrigatório' });

        // Validate slug exists
        const parts = chapterSlug.split('/');
        if (parts.length !== 3) return res.status(400).json({ error: 'Slug inválido' });
        const [levelKey, moduleSlug, chapSlug] = parts;
        const level = CURRICULUM[levelKey];
        if (!level) return res.status(400).json({ error: 'Nível inválido' });
        const mod = level.modules.find((m: any) => m.slug === moduleSlug);
        if (!mod) return res.status(400).json({ error: 'Módulo inválido' });
        const ch = mod.chapters.find((c: any) => c.slug === chapSlug);
        if (!ch) return res.status(400).json({ error: 'Capítulo inválido' });

        await prisma.userCampProgress.upsert({
            where: { userId_chapterSlug: { userId, chapterSlug } },
            create: { userId, chapterSlug },
            update: {},
        });

        // Check if level completed → issue certificate
        const totalChapters = level.modules.reduce((sum: number, m: any) => sum + m.chapters.length, 0);
        const completed = await prisma.userCampProgress.count({
            where: { userId, chapterSlug: { startsWith: levelKey } },
        });

        let certificate = null;
        if (completed >= totalChapters) {
            const existing = await prisma.campCertificate.findFirst({
                where: { userId, level: level.level },
            });
            if (!existing) {
                const code = `KWC-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
                certificate = await prisma.campCertificate.create({
                    data: { userId, level: level.level, certCode: code },
                });
            }
        }

        res.json({ success: true, certificate });
    } catch (error) {
        console.error('Mark complete error:', error);
        res.status(500).json({ error: 'Erro' });
    }
};

/**
 * GET /api/camp/certificates
 */
export const getCertificates = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        if (!userId) return res.status(401).json({ error: 'Não autenticado' });

        const certs = await prisma.campCertificate.findMany({
            where: { userId },
            include: { user: { select: { username: true, displayName: true, avatarUrl: true } } },
            orderBy: { level: 'asc' },
        });

        res.json(certs);
    } catch (error) {
        res.status(500).json({ error: 'Erro' });
    }
};

/**
 * GET /api/camp/certificates/:certCode (public, no auth)
 */
export const getCertificatePublic = async (req: Request, res: Response) => {
    try {
        const { certCode } = req.params;

        const cert = await prisma.campCertificate.findUnique({
            where: { certCode },
            include: { user: { select: { username: true, displayName: true, avatarUrl: true } } },
        });

        if (!cert) return res.status(404).json({ error: 'Certificado não encontrado' });

        const levelNames: Record<number, string> = {
            1: 'Começa a Transmitir',
            2: 'Cresce o teu Canal',
            3: 'Torna-te Partner',
        };

        res.json({
            ...cert,
            levelName: levelNames[cert.level] || 'Kwanza Camp',
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro' });
    }
};
