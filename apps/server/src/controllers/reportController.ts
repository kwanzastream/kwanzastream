import { Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// ============== Validation ==============

const createReportSchema = z.object({
    reason: z.string().min(1).max(100),
    details: z.string().max(2000).optional(),
    targetId: z.string().uuid().optional(),
    targetType: z.enum(['USER', 'STREAM', 'MESSAGE']).optional().default('USER'),
});

// ============== Controllers ==============

export const createReport = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const reporterId = req.user?.userId;
        if (!reporterId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const data = createReportSchema.parse(req.body);

        const report = await prisma.report.create({
            data: {
                reporterId,
                reason: data.reason,
                details: data.details,
                targetId: data.targetId,
                targetType: data.targetType,
            },
        });

        // Generate a human-friendly reference number
        const refNumber = `KS-${report.id.slice(0, 6).toUpperCase()}`;

        res.status(201).json({
            success: true,
            report: {
                id: report.id,
                referenceNumber: refNumber,
                status: report.status,
                createdAt: report.createdAt,
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Create report error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getMyReports = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const reporterId = req.user?.userId;
        if (!reporterId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const reports = await prisma.report.findMany({
            where: { reporterId },
            orderBy: { createdAt: 'desc' },
            take: 50,
            select: {
                id: true,
                reason: true,
                status: true,
                createdAt: true,
                targetType: true,
            },
        });

        const formatted = reports.map((r: { id: string; reason: string; status: string; createdAt: Date; targetType: string }) => ({
            ...r,
            referenceNumber: `KS-${r.id.slice(0, 6).toUpperCase()}`,
        }));

        res.json({ reports: formatted });
    } catch (error) {
        console.error('Get my reports error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
