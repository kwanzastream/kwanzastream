import { Router, Request, Response } from 'express';
import prisma from '../config/prisma';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiter for subscribe endpoint
const subscribeLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,
    message: { error: 'Muitas tentativas. Aguarda um momento.' },
    standardHeaders: true,
    legacyHeaders: false,
});

const subscribeSchema = z.object({
    email: z.string().email('Email inválido'),
    source: z.enum(['web', 'whatsapp', 'social']).optional().default('web'),
});

// POST /api/prelaunch/subscribe
router.post('/subscribe', subscribeLimiter, async (req: Request, res: Response) => {
    try {
        const parsed = subscribeSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                error: 'Por favor, insere um email válido.',
            });
        }

        const { email, source } = parsed.data;

        // Check for existing subscriber
        const existing = await prisma.preLaunchSubscriber.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (existing) {
            const count = await prisma.preLaunchSubscriber.count();
            return res.json({
                success: true,
                message: 'Já estás na lista! Vamos avisar-te quando estivermos ao vivo. 🎉',
                alreadySubscribed: true,
                count,
            });
        }

        await prisma.preLaunchSubscriber.create({
            data: {
                email: email.toLowerCase(),
                source,
            },
        });

        const count = await prisma.preLaunchSubscriber.count();

        return res.status(201).json({
            success: true,
            message: 'Inscrição feita com sucesso! Vamos avisar-te quando a plataforma estiver ao vivo. 🚀',
            alreadySubscribed: false,
            count,
        });
    } catch (error: any) {
        // Handle unique constraint violation gracefully
        if (error?.code === 'P2002') {
            const count = await prisma.preLaunchSubscriber.count();
            return res.json({
                success: true,
                message: 'Já estás na lista! Vamos avisar-te quando estivermos ao vivo. 🎉',
                alreadySubscribed: true,
                count,
            });
        }
        console.error('PreLaunch subscribe error:', error);
        return res.status(500).json({
            success: false,
            error: 'Erro interno. Tenta novamente.',
        });
    }
});

// GET /api/prelaunch/count
router.get('/count', async (_req: Request, res: Response) => {
    try {
        const count = await prisma.preLaunchSubscriber.count();
        return res.json({ count });
    } catch (error) {
        console.error('PreLaunch count error:', error);
        return res.status(500).json({ count: 0 });
    }
});

export default router;
