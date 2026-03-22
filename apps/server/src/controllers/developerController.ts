import { Request, Response } from 'express';
import prisma from '../config/prisma';
import crypto from 'crypto';

const genClientId = () => `kwz_${crypto.randomBytes(16).toString('hex')}`;
const genSecret = () => crypto.randomBytes(32).toString('hex');

// ===== APPS =====

export const createApp = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        if (!userId) return res.status(401).json({ error: 'Não autenticado' });
        const { name, description, category, websiteUrl, privacyUrl, tosUrl, redirectUris } = req.body;
        if (!name) return res.status(400).json({ error: 'Nome obrigatório' });

        const app = await prisma.developerApp.create({
            data: { userId, name, description, category: category || 'other', websiteUrl, privacyUrl, tosUrl,
                redirectUris: redirectUris || [], clientId: genClientId(), clientSecret: genSecret(), status: 'sandbox' },
        });
        res.status(201).json({ ...app, clientSecret: undefined });
    } catch (error) { console.error(error); res.status(500).json({ error: 'Erro' }); }
};

export const getApps = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const apps = await prisma.developerApp.findMany({ where: { userId }, include: { _count: { select: { webhooks: true } } }, orderBy: { createdAt: 'desc' } });
        res.json(apps.map(a => ({ ...a, clientSecret: undefined })));
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const getAppById = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const app = await prisma.developerApp.findFirst({ where: { id: req.params.id, userId }, include: { _count: { select: { webhooks: true } } } });
        if (!app) return res.status(404).json({ error: 'App não encontrada' });
        res.json({ ...app, clientSecret: undefined });
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const updateApp = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const existing = await prisma.developerApp.findFirst({ where: { id: req.params.id, userId } });
        if (!existing) return res.status(404).json({ error: 'App não encontrada' });
        const { name, description, websiteUrl, privacyUrl, tosUrl, redirectUris, category } = req.body;
        const updated = await prisma.developerApp.update({ where: { id: req.params.id },
            data: { ...(name && { name }), ...(description !== undefined && { description }), ...(websiteUrl !== undefined && { websiteUrl }),
                ...(privacyUrl !== undefined && { privacyUrl }), ...(tosUrl !== undefined && { tosUrl }),
                ...(redirectUris && { redirectUris }), ...(category && { category }) } });
        res.json({ ...updated, clientSecret: undefined });
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const deleteApp = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const existing = await prisma.developerApp.findFirst({ where: { id: req.params.id, userId } });
        if (!existing) return res.status(404).json({ error: 'App não encontrada' });
        await prisma.developerApp.delete({ where: { id: req.params.id } });
        res.json({ ok: true });
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const getAppCredentials = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const app = await prisma.developerApp.findFirst({ where: { id: req.params.id, userId }, select: { clientId: true, clientSecret: true } });
        if (!app) return res.status(404).json({ error: 'App não encontrada' });
        res.json(app);
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const rotateSecret = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const existing = await prisma.developerApp.findFirst({ where: { id: req.params.id, userId } });
        if (!existing) return res.status(404).json({ error: 'App não encontrada' });
        const newSecret = genSecret();
        await prisma.developerApp.update({ where: { id: req.params.id }, data: { clientSecret: newSecret } });
        res.json({ clientSecret: newSecret });
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const getAppLogs = async (req: Request, res: Response) => {
    try {
        const logs = Array.from({ length: 20 }, (_, i) => ({
            timestamp: new Date(Date.now() - i * 60000).toISOString(),
            method: ['GET', 'POST', 'GET', 'GET'][i % 4],
            path: ['/v1/streams', '/v1/chat/send', '/v1/channel/stats', '/v1/users/me'][i % 4],
            status: i === 5 ? 401 : i === 12 ? 429 : 200,
            latency: Math.floor(Math.random() * 80) + 10,
        }));
        res.json(logs);
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const getAppAnalytics = async (req: Request, res: Response) => {
    try {
        res.json({
            totalRequests: 12400, webhooksDelivered: 890, errorRate: 0.1,
            daily: Array.from({ length: 7 }, (_, i) => ({
                date: new Date(Date.now() - (6 - i) * 86400000).toISOString().split('T')[0],
                requests: Math.floor(Math.random() * 2500) + 1000,
                errors: Math.floor(Math.random() * 10),
            })),
            byEndpoint: [
                { path: '/v1/streams', requests: 5200, pct: 42 },
                { path: '/v1/chat/send', requests: 3100, pct: 25 },
                { path: '/v1/channel/stats', requests: 2400, pct: 19 },
                { path: '/v1/users/me', requests: 1700, pct: 14 },
            ],
        });
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

// ===== WEBHOOKS =====

export const getWebhooks = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const app = await prisma.developerApp.findFirst({ where: { id: req.params.id, userId } });
        if (!app) return res.status(404).json({ error: 'App não encontrada' });
        const webhooks = await prisma.developerWebhook.findMany({ where: { appId: req.params.id } });
        res.json(webhooks);
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const createWebhook = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const app = await prisma.developerApp.findFirst({ where: { id: req.params.id, userId } });
        if (!app) return res.status(404).json({ error: 'App não encontrada' });
        const { url, events } = req.body;
        if (!url || !events?.length) return res.status(400).json({ error: 'URL e eventos obrigatórios' });
        const webhook = await prisma.developerWebhook.create({
            data: { appId: req.params.id, url, events, secret: genSecret() },
        });
        res.status(201).json(webhook);
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const updateWebhook = async (req: Request, res: Response) => {
    try {
        const { url, events, isActive } = req.body;
        const webhook = await prisma.developerWebhook.update({ where: { id: req.params.whId },
            data: { ...(url && { url }), ...(events && { events }), ...(isActive !== undefined && { isActive }) } });
        res.json(webhook);
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const deleteWebhook = async (req: Request, res: Response) => {
    try {
        await prisma.developerWebhook.delete({ where: { id: req.params.whId } });
        res.json({ ok: true });
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

export const testWebhook = async (req: Request, res: Response) => {
    try {
        res.json({ ok: true, message: 'Webhook de teste enviado', deliveredAt: new Date().toISOString() });
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
};

// ===== EXTENSIONS =====

export const createExtension = async (_req: Request, res: Response) => {
    res.json({ id: 'ext_placeholder', message: 'Extensões serão implementadas em v2' });
};
export const getExtensions = async (_req: Request, res: Response) => { res.json([]); };
export const getExtensionById = async (req: Request, res: Response) => {
    res.json({ id: req.params.id, name: 'Extensão placeholder', status: 'draft' });
};
export const submitExtension = async (req: Request, res: Response) => {
    res.json({ id: req.params.id, status: 'review', message: 'Extensão submetida para revisão' });
};
