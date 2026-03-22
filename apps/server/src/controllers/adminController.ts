import { Request, Response } from 'express';
import prisma from '../config/prisma';

type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'finance' | 'support';

const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: ['*'],
  admin: ['users.*', 'streamers.*', 'streams.*', 'content.*', 'moderation.*', 'categories.*', 'tribes.*', 'tournaments.*', 'drops.*', 'campaigns.*', 'analytics.*', 'notifications.*', 'awards.*', 'logs.read'],
  moderator: ['users.read', 'streams.read', 'streams.terminate', 'content.*', 'moderation.*', 'logs.moderation'],
  finance: ['payments.*', 'kyc.*', 'analytics.revenue', 'invoices.*', 'logs.payments'],
  support: ['users.read', 'users.verify', 'moderation.reports.read', 'logs.read'],
};

// ===== AUTH =====
export const getSession = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    try {
        const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, username: true, displayName: true, role: true, email: true } });
        if (!user || !['super_admin', 'admin', 'moderator', 'finance', 'support'].includes(user.role)) return res.status(403).json({ error: 'Sem permissão admin' });
        res.json({ user, permissions: ROLE_PERMISSIONS[user.role as AdminRole] || [] });
    } catch { res.status(500).json({ error: 'Erro' }); }
};

// ===== DASHBOARD =====
export const getDashboard = async (_req: Request, res: Response) => {
    try {
        const [totalUsers, totalStreams] = await Promise.all([prisma.user.count(), prisma.stream.count()]);
        res.json({
            today: { registrations: 45, streams: 234, viewers: 12400, transactions: 89, transactionValue: 234000, pendingReports: 12 },
            totals: { users: totalUsers, streams: totalStreams },
            health: { api: true, db: true, cdn: true, websocket: true, latencyP95: 45 },
            alerts: [
                { type: 'warning', message: 'Rate limiter: 3 IPs suspeitos (41.x.x.x)' },
                { type: 'urgent', message: 'Levantamentos pendentes há > 48h: 8 — acção urgente' },
            ],
        });
    } catch { res.status(500).json({ error: 'Erro' }); }
};

// ===== USERS =====
export const getUsers = async (req: Request, res: Response) => {
    try {
        const { filter, search, page = '1' } = req.query;
        const where: any = {};
        if (filter === 'suspended') where.status = 'suspended';
        if (filter === 'banned') where.status = 'banned';
        if (filter === 'verified') where.isVerified = true;
        if (search) where.OR = [{ username: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }];
        const users = await prisma.user.findMany({ where, take: 20, skip: (parseInt(page as string) - 1) * 20, orderBy: { createdAt: 'desc' }, select: { id: true, username: true, displayName: true, email: true, role: true, isVerified: true, createdAt: true } });
        const total = await prisma.user.count({ where });
        res.json({ users, total, page: parseInt(page as string), pages: Math.ceil(total / 20) });
    } catch { res.status(500).json({ error: 'Erro' }); }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.params.id } });
        if (!user) return res.status(404).json({ error: 'Utilizador não encontrado' });
        res.json(user);
    } catch { res.status(500).json({ error: 'Erro' }); }
};

export const suspendUser = async (req: Request, res: Response) => {
    try {
        const { reason, duration } = req.body;
        if (!reason) return res.status(400).json({ error: 'Motivo obrigatório' });
        await prisma.user.update({ where: { id: req.params.id }, data: { status: 'suspended' } });
        await prisma.adminAuditLog.create({ data: { adminId: (req as any).userId, action: 'user.suspend', targetId: req.params.id, targetType: 'user', details: { reason, duration }, ip: req.ip || '' } });
        res.json({ ok: true });
    } catch { res.status(500).json({ error: 'Erro' }); }
};

export const banUser = async (req: Request, res: Response) => {
    try {
        const { reason } = req.body;
        if (!reason) return res.status(400).json({ error: 'Motivo obrigatório' });
        await prisma.user.update({ where: { id: req.params.id }, data: { status: 'banned' } });
        await prisma.adminAuditLog.create({ data: { adminId: (req as any).userId, action: 'user.ban', targetId: req.params.id, targetType: 'user', details: { reason }, ip: req.ip || '' } });
        res.json({ ok: true });
    } catch { res.status(500).json({ error: 'Erro' }); }
};

export const verifyUser = async (req: Request, res: Response) => {
    try {
        await prisma.user.update({ where: { id: req.params.id }, data: { isVerified: true } });
        await prisma.adminAuditLog.create({ data: { adminId: (req as any).userId, action: 'user.verify', targetId: req.params.id, targetType: 'user', ip: req.ip || '' } });
        res.json({ ok: true });
    } catch { res.status(500).json({ error: 'Erro' }); }
};

// ===== CONFIG =====
export const getConfig = async (_req: Request, res: Response) => {
    res.json({
        platform: { name: 'Kwanza Stream', maintenance: false, maxStreamQuality: '1080p', maxStreamBitrate: 6000 },
        payments: { multicaixa: true, eKwanza: true, unitelMoney: true, salosCommission: 0.20, minWithdrawal: 5000 },
        streaming: { rtmpUrl: 'rtmp://stream.kwanzastream.ao/live', cdnUrl: 'https://cdn.kwanzastream.ao', maxConcurrentStreams: 1 },
        salosPrices: [{ amount: 50, price: 50 }, { amount: 200, price: 180 }, { amount: 500, price: 430 }, { amount: 1000, price: 850 }, { amount: 2500, price: 2000 }, { amount: 5000, price: 3900 }],
    });
};

export const updateConfig = async (req: Request, res: Response) => {
    const { key } = req.params;
    await prisma.adminAuditLog.create({ data: { adminId: (req as any).userId, action: 'config.update', targetId: key, targetType: 'config', details: req.body, ip: req.ip || '' } });
    res.json({ ok: true, message: `Configuração ${key} actualizada` });
};

export const toggleMaintenance = async (req: Request, res: Response) => {
    await prisma.adminAuditLog.create({ data: { adminId: (req as any).userId, action: 'config.maintenance.toggle', targetType: 'config', details: req.body, ip: req.ip || '' } });
    res.json({ ok: true, maintenance: req.body.enabled });
};

// ===== FEATURE FLAGS =====
export const getFeatureFlags = async (_req: Request, res: Response) => {
    res.json([
        { name: 'SHORTS_FEED', enabled: true, rollout: 100, description: 'Feed de shorts' },
        { name: 'RADIO_MODE', enabled: true, rollout: 100, description: 'Modo rádio' },
        { name: 'MOBILE_STREAMING', enabled: true, rollout: 100, description: 'Go-live mobile' },
        { name: 'LIVE_ADS', enabled: false, rollout: 0, description: 'Ads ao vivo' },
        { name: 'KWANZA_AWARDS_VOTE', enabled: false, rollout: 0, description: 'Votação Awards Nov 2026' },
        { name: 'DISCORD_INTEGRATION', enabled: true, rollout: 10, description: 'Rollout gradual Discord' },
    ]);
};

export const toggleFeatureFlag = async (req: Request, res: Response) => {
    await prisma.adminAuditLog.create({ data: { adminId: (req as any).userId, action: 'feature_flag.toggle', targetId: req.params.name, targetType: 'feature_flag', details: req.body, ip: req.ip || '' } });
    res.json({ ok: true });
};

// ===== NOTIFICATIONS =====
export const broadcastNotification = async (req: Request, res: Response) => {
    const { audience, channel, title, message } = req.body;
    await prisma.adminAuditLog.create({ data: { adminId: (req as any).userId, action: 'notification.broadcast', targetType: 'notification', details: { audience, channel, title, message }, ip: req.ip || '' } });
    res.json({ ok: true, message: 'Notificação enviada' });
};

// ===== AUDIT LOG =====
export const getAuditLog = async (req: Request, res: Response) => {
    try {
        const { type, page = '1' } = req.query;
        const where: any = {};
        if (type && type !== 'all') where.action = { startsWith: type };
        const logs = await prisma.adminAuditLog.findMany({ where, take: 50, skip: (parseInt(page as string) - 1) * 50, orderBy: { timestamp: 'desc' }, include: { admin: { select: { username: true, role: true } } } });
        res.json(logs);
    } catch { res.status(500).json({ error: 'Erro' }); }
};

// ===== STREAMERS/APPLICATIONS =====
export const getApplications = async (req: Request, res: Response) => {
    res.json([
        { id: 'app1', username: 'canal-novo', type: req.params.type || 'partner', status: 'pending', followers: 567, avgViewers: 28, hoursPerMonth: 28, createdAt: '2026-03-15' },
    ]);
};

export const reviewApplication = async (req: Request, res: Response) => {
    const { decision, reason } = req.body;
    await prisma.adminAuditLog.create({ data: { adminId: (req as any).userId, action: `streamer.application.${decision}`, targetId: req.params.id, targetType: 'application', details: { reason }, ip: req.ip || '' } });
    res.json({ ok: true });
};

// ===== PAYMENTS =====
export const getPendingWithdrawals = async (_req: Request, res: Response) => {
    res.json([
        { id: 'w1', username: 'streamer1', amount: 45000, method: 'multicaixa', iban: 'AO06...', createdAt: '2026-03-19', status: 'pending' },
        { id: 'w2', username: 'streamer2', amount: 23000, method: 'unitel-money', phone: '+244923...', createdAt: '2026-03-18', status: 'pending' },
    ]);
};

export const approveWithdrawal = async (req: Request, res: Response) => {
    await prisma.adminAuditLog.create({ data: { adminId: (req as any).userId, action: 'payment.withdrawal.approve', targetId: req.params.id, targetType: 'payment', ip: req.ip || '' } });
    res.json({ ok: true });
};

export const rejectWithdrawal = async (req: Request, res: Response) => {
    await prisma.adminAuditLog.create({ data: { adminId: (req as any).userId, action: 'payment.withdrawal.reject', targetId: req.params.id, targetType: 'payment', details: { reason: req.body.reason }, ip: req.ip || '' } });
    res.json({ ok: true });
};

// ===== ADMINS =====
export const getAdmins = async (_req: Request, res: Response) => {
    try {
        const admins = await prisma.user.findMany({ where: { role: { in: ['super_admin', 'admin', 'moderator', 'finance', 'support'] } }, select: { id: true, username: true, displayName: true, role: true, email: true, createdAt: true } });
        res.json(admins);
    } catch { res.status(500).json({ error: 'Erro' }); }
};

export const inviteAdmin = async (req: Request, res: Response) => {
    const { email, role, username } = req.body;
    await prisma.adminAuditLog.create({ data: { adminId: (req as any).userId, action: 'admin.invite', targetType: 'admin', details: { email, role, username }, ip: req.ip || '' } });
    res.json({ ok: true, message: 'Convite enviado' });
};
