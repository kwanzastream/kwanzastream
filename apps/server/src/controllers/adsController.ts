import { Request, Response } from 'express';
import prisma from '../config/prisma';

/**
 * POST /api/ads/campaigns — Create campaign
 */
export const createCampaign = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        if (!userId) return res.status(401).json({ error: 'Não autenticado' });

        const { name, objective, budget, startDate, endDate, targetProvinces, targetCategories, targetInterests, creativeUrl, destinationUrl, ctaText } = req.body;

        if (!name || !objective || !budget || !startDate || !endDate) {
            return res.status(400).json({ error: 'Campos obrigatórios em falta' });
        }
        if (budget < 10000) {
            return res.status(400).json({ error: 'Orçamento mínimo: 10.000 Kz' });
        }

        const ref = `ADS-${new Date().getFullYear()}-${String(Date.now()).slice(-5).padStart(5, '0')}`;

        const campaign = await prisma.adCampaign.create({
            data: {
                userId, name, objective, budget: parseFloat(budget),
                startDate: new Date(startDate), endDate: new Date(endDate),
                targetProvinces: targetProvinces || [], targetCategories: targetCategories || [],
                targetInterests: targetInterests || [], creativeUrl, destinationUrl, ctaText,
                status: 'review', reference: ref,
            },
        });

        res.status(201).json(campaign);
    } catch (error) {
        console.error('Create campaign error:', error);
        res.status(500).json({ error: 'Erro ao criar campanha' });
    }
};

/**
 * GET /api/ads/campaigns — List user campaigns
 */
export const getCampaigns = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        if (!userId) return res.status(401).json({ error: 'Não autenticado' });

        const campaigns = await prisma.adCampaign.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ error: 'Erro' });
    }
};

/**
 * GET /api/ads/campaigns/:id — Campaign detail
 */
export const getCampaignById = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { id } = req.params;

        const campaign = await prisma.adCampaign.findFirst({
            where: { id, userId },
        });

        if (!campaign) return res.status(404).json({ error: 'Campanha não encontrada' });
        res.json(campaign);
    } catch (error) {
        res.status(500).json({ error: 'Erro' });
    }
};

/**
 * PATCH /api/ads/campaigns/:id — Edit campaign
 */
export const updateCampaign = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { id } = req.params;

        const existing = await prisma.adCampaign.findFirst({ where: { id, userId } });
        if (!existing) return res.status(404).json({ error: 'Campanha não encontrada' });
        if (!['draft', 'review', 'paused'].includes(existing.status)) {
            return res.status(400).json({ error: 'Só podes editar campanhas em rascunho, revisão ou pausadas' });
        }

        const { name, budget, startDate, endDate, creativeUrl, destinationUrl, ctaText, targetProvinces, targetCategories, targetInterests } = req.body;

        const updated = await prisma.adCampaign.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(budget && { budget: parseFloat(budget) }),
                ...(startDate && { startDate: new Date(startDate) }),
                ...(endDate && { endDate: new Date(endDate) }),
                ...(creativeUrl !== undefined && { creativeUrl }),
                ...(destinationUrl !== undefined && { destinationUrl }),
                ...(ctaText !== undefined && { ctaText }),
                ...(targetProvinces && { targetProvinces }),
                ...(targetCategories && { targetCategories }),
                ...(targetInterests && { targetInterests }),
            },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Erro' });
    }
};

/**
 * PATCH /api/ads/campaigns/:id/status — Pause/resume
 */
export const updateCampaignStatus = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { id } = req.params;
        const { status } = req.body;

        if (!['paused', 'active'].includes(status)) {
            return res.status(400).json({ error: 'Status inválido' });
        }

        const existing = await prisma.adCampaign.findFirst({ where: { id, userId } });
        if (!existing) return res.status(404).json({ error: 'Campanha não encontrada' });

        const updated = await prisma.adCampaign.update({
            where: { id },
            data: { status },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Erro' });
    }
};

/**
 * GET /api/ads/campaigns/:id/analytics — Mock analytics
 */
export const getCampaignAnalytics = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { id } = req.params;

        const campaign = await prisma.adCampaign.findFirst({ where: { id, userId } });
        if (!campaign) return res.status(404).json({ error: 'Campanha não encontrada' });

        // Mock analytics data
        const days = Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / 86400000);
        const dailyData = Array.from({ length: Math.min(days, 7) }, (_, i) => ({
            date: new Date(Date.now() - (6 - i) * 86400000).toISOString().split('T')[0],
            impressions: Math.floor(Math.random() * 5000) + 1000,
            clicks: Math.floor(Math.random() * 200) + 20,
        }));

        res.json({
            campaign: { id: campaign.id, name: campaign.name, status: campaign.status },
            summary: { impressions: campaign.impressions || 18400, clicks: campaign.clicks || 423, ctr: 2.3, uniqueReach: 8900, costPerClick: 29 },
            dailyData,
            byProvince: [
                { name: 'Luanda', impressions: 10700, percentage: 58 },
                { name: 'Benguela', impressions: 2200, percentage: 12 },
                { name: 'Huambo', impressions: 1300, percentage: 7 },
                { name: 'Cabinda', impressions: 920, percentage: 5 },
                { name: 'Outras', impressions: 3280, percentage: 18 },
            ],
            byDevice: [{ name: 'Mobile', percentage: 68 }, { name: 'Desktop', percentage: 27 }, { name: 'Tablet', percentage: 5 }],
            peakHours: [{ hour: '20h', percentage: 22 }, { hour: '21h', percentage: 28 }, { hour: '22h', percentage: 25 }, { hour: '23h', percentage: 15 }],
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro' });
    }
};

/**
 * GET /api/ads/invoices — List invoices (mock)
 */
export const getInvoices = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        if (!userId) return res.status(401).json({ error: 'Não autenticado' });

        const campaigns = await prisma.adCampaign.findMany({
            where: { userId, status: { in: ['active', 'completed'] } },
            select: { id: true, name: true, budget: true, spent: true, reference: true, createdAt: true },
        });

        const invoices = campaigns.map((c, i) => ({
            id: `INV-${c.reference}`,
            campaignName: c.name,
            campaignRef: c.reference,
            amount: c.spent || c.budget * 0.4,
            date: c.createdAt,
            status: c.spent > 0 ? 'pago' : 'pendente',
        }));

        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: 'Erro' });
    }
};

/**
 * GET /api/ads/invoices/:id — Invoice detail (mock)
 */
export const getInvoiceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        res.json({
            id,
            date: new Date().toISOString(),
            company: 'Empresa Exemplo, Lda.',
            nif: '5417348291',
            address: 'Rua Major Kanhangulo 123, Luanda',
            items: [
                { description: 'Campanha de Awareness — CPM', quantity: 40000, unitPrice: 0.25, total: 10000 },
            ],
            subtotal: 10000,
            iva: 1400,
            total: 11400,
            currency: 'Kz',
            status: 'pago',
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro' });
    }
};
