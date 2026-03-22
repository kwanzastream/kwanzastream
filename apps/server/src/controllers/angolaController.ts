import { Request, Response } from 'express';
import prisma from '../config/prisma';

// ===== ANGOLA STATS =====
export const getAngolaStats = async (_req: Request, res: Response) => {
    res.json({ liveStreams: 234, viewers: 12400, activeProvinces: 18, totalCreators: 1560, trending: ["Gaming", "Kuduro", "Futebol"] });
};

export const getMapData = async (_req: Request, res: Response) => {
    const data = [
        { slug: "luanda", streams: 156, viewers: 8900 }, { slug: "benguela", streams: 34, viewers: 1200 },
        { slug: "huambo", streams: 18, viewers: 670 }, { slug: "cabinda", streams: 15, viewers: 520 },
        { slug: "huila", streams: 12, viewers: 430 }, { slug: "cuanza-sul", streams: 10, viewers: 350 },
        { slug: "malanje", streams: 8, viewers: 280 }, { slug: "uige", streams: 7, viewers: 240 },
        { slug: "lunda-norte", streams: 6, viewers: 180 }, { slug: "bie", streams: 5, viewers: 150 },
        { slug: "moxico", streams: 4, viewers: 120 }, { slug: "namibe", streams: 4, viewers: 110 },
        { slug: "bengo", streams: 3, viewers: 90 }, { slug: "cuanza-norte", streams: 3, viewers: 85 },
        { slug: "cunene", streams: 2, viewers: 60 }, { slug: "cubango", streams: 2, viewers: 55 },
        { slug: "zaire", streams: 2, viewers: 50 }, { slug: "lunda-sul", streams: 1, viewers: 30 },
        { slug: "cuando", streams: 0, viewers: 0 }, { slug: "icolo-e-bengo", streams: 0, viewers: 0 },
    ];
    res.json(data);
};

export const getTrending = async (req: Request, res: Response) => {
    const period = req.query.period || 'hoje';
    res.json({
        period, streams: [
            { id: "s1", username: "voz-angola", title: "Gaming noturno", category: "Gaming", viewers: 456, province: "Luanda" },
            { id: "s2", username: "kuduro-king", title: "Kuduro live!", category: "Kuduro", viewers: 234, province: "Benguela" },
            { id: "s3", username: "girabola-cast", title: "Girabola ao vivo", category: "Futebol", viewers: 189, province: "Luanda" },
        ],
        categories: [{ name: "Gaming", change: "+45%" }, { name: "Kuduro", change: "+23%" }, { name: "Futebol", change: "+18%" }],
    });
};

export const getCreatorsAngola = async (req: Request, res: Response) => {
    const filter = req.query.filter || 'top';
    res.json([
        { id: "c1", username: "voz-angola", displayName: "Voz de Angola", avgViewers: 1234, province: "Luanda", category: "Gaming", isLive: true },
        { id: "c2", username: "kuduro-king", displayName: "Kuduro King", avgViewers: 987, province: "Benguela", category: "Música", isLive: true },
        { id: "c3", username: "girabola-cast", displayName: "Girabola Cast", avgViewers: 756, province: "Luanda", category: "Futebol", isLive: false },
        { id: "c4", username: "chef-angola", displayName: "Chef Angola", avgViewers: 543, province: "Huambo", category: "Culinária", isLive: true },
        { id: "c5", username: "code-luanda", displayName: "Code Luanda", avgViewers: 321, province: "Luanda", category: "Tecnologia", isLive: false },
    ]);
};

export const getCreatorsByProvince = async (req: Request, res: Response) => {
    const { slug } = req.params;
    res.json([
        { id: "c1", username: `streamer-${slug}-1`, displayName: `Streamer ${slug} 1`, avgViewers: 234, province: slug, isLive: true },
        { id: "c2", username: `streamer-${slug}-2`, displayName: `Streamer ${slug} 2`, avgViewers: 123, province: slug, isLive: false },
    ]);
};

// ===== KWANZA AWARDS =====
export const getCategories = async (req: Request, res: Response) => {
    res.json([
        { id: "gaming", name: "Melhor Streamer de Gaming", emoji: "🎮" },
        { id: "musica", name: "Melhor DJ / Músico ao Vivo", emoji: "🎵" },
        { id: "futebol", name: "Melhor Caster de Futebol", emoji: "⚽" },
        { id: "comedia", name: "Melhor Comediante", emoji: "🤣" },
        { id: "mobile", name: "Melhor Criador Mobile", emoji: "📱" },
        { id: "diaspora", name: "Melhor Representante da Diáspora", emoji: "🌍" },
        { id: "novo", name: "Melhor Novo Criador", emoji: "🆕" },
        { id: "ano", name: "Criador do Ano", emoji: "🏆" },
    ]);
};

export const getNominees = async (req: Request, res: Response) => {
    try {
        const nominees = await prisma.awardsNominee.findMany({ where: { year: parseInt(req.params.year) }, orderBy: { category: 'asc' } });
        if (nominees.length === 0) {
            return res.json([
                { id: "n1", year: 2026, category: "gaming", channelId: "voz-angola", votes: 456, isWinner: false },
                { id: "n2", year: 2026, category: "gaming", channelId: "fps-luanda", votes: 321, isWinner: false },
                { id: "n3", year: 2026, category: "musica", channelId: "dj-angola", votes: 234, isWinner: false },
                { id: "n4", year: 2026, category: "futebol", channelId: "girabola-cast", votes: 567, isWinner: false },
            ]);
        }
        res.json(nominees);
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const vote = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        if (!userId) return res.status(401).json({ error: 'Login obrigatório para votar' });
        const { category, nomineeId } = req.body;
        const year = parseInt(req.params.year);
        const existing = await prisma.awardsVote.findUnique({ where: { userId_year_category: { userId, year, category } } });
        if (existing) return res.status(409).json({ error: 'Já votaste nesta categoria' });
        await prisma.awardsVote.create({ data: { userId, year, category, nomineeId } });
        res.json({ ok: true, message: 'Voto registado!' });
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const getResults = async (req: Request, res: Response) => {
    res.json({ year: req.params.year, status: 'pending', message: 'Resultados serão publicados após a cerimónia' });
};

// ===== IMPACTO SOCIAL =====
export const getImpactStats = async (_req: Request, res: Response) => {
    res.json({ creatorsSupported: 234, provincesCount: 18, schoolPartners: 5, ongPartners: 3, totalHours: 45000, uniqueViewers: 234000, creatorFund: 12500000 });
};

export const getImpactReport = async (req: Request, res: Response) => {
    res.json({ year: req.params.year, creatorsActive: 1234, hoursStreamed: 45000, uniqueViewers: 234000, provincesActive: 18, creatorFundKz: 12500000, schoolPartners: 5, pdfUrl: `/reports/impacto-${req.params.year}.pdf` });
};

// ===== EDUCAÇÃO =====
export const getWorkshops = async (_req: Request, res: Response) => {
    try {
        const workshops = await prisma.educationWorkshop.findMany({ orderBy: { date: 'asc' } });
        if (workshops.length === 0) {
            return res.json([
                { id: "w1", title: "Intro à API do Kwanza Stream", description: "Aprende a fazer o primeiro pedido à API", date: "2026-04-02T14:00:00Z", registrations: [], maxAttendees: 50 },
                { id: "w2", title: "Construir um Bot de Chat em Node.js", description: "Bot que modera e responde a comandos", date: "2026-04-16T14:00:00Z", registrations: [], maxAttendees: 30 },
                { id: "w3", title: "Overlay para OBS com HTML/CSS", description: "Widget de alertas de Salos", date: "2026-05-07T14:00:00Z", registrations: [], maxAttendees: 30 },
            ]);
        }
        res.json(workshops);
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const registerWorkshop = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        if (!userId) return res.status(401).json({ error: 'Login obrigatório' });
        res.json({ ok: true, message: 'Inscrição registada!' });
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};
