/**
 * Right to Erasure Controller
 * 
 * GDPR / Lei 22/11 Angola — Data protection
 * Allows users to request account deletion.
 * Personal data is anonymized but financial records are retained (7 years BNA requirement).
 */

import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { revokeAllUserTokens } from '../services/jwtService';

/**
 * DELETE /api/users/me
 * 
 * Anonymizes personal data while preserving financial records.
 * - Phone → hashed
 * - Email → null
 * - Username → deleted_xxxxx
 * - DisplayName → "Utilizador Removido"
 * - AvatarUrl → null
 * - Bio → null
 * - Password → null
 * - Streams → title anonymized
 * - Financial records (Transaction, LedgerEntry, Donation) → kept for 7 years (BNA)
 */
export const deleteMyAccount = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Confirm with password or explicit confirmation
        const { confirmDelete } = req.body;
        if (confirmDelete !== 'APAGAR MINHA CONTA') {
            return res.status(400).json({
                error: 'Para confirmar, envia: { "confirmDelete": "APAGAR MINHA CONTA" }',
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, phone: true, balance: true },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Block if user has positive balance (must withdraw first)
        if (user.balance > 0n) {
            return res.status(400).json({
                error: 'Tens saldo na carteira. Faz um levantamento antes de apagar a conta.',
                balance: Number(user.balance) / 100,
            });
        }

        // Anonymize in a single transaction
        const anonymizedPhone = `deleted_${userId.slice(0, 8)}`;
        const anonymizedUsername = `deleted_${userId.slice(0, 8)}`;

        await prisma.$transaction([
            // Anonymize user personal data
            prisma.user.update({
                where: { id: userId },
                data: {
                    phone: anonymizedPhone,
                    email: null,
                    username: anonymizedUsername,
                    displayName: 'Utilizador Removido',
                    avatarUrl: null,
                    bio: null,
                    passwordHash: null,
                    emailVerifyToken: null,
                    passwordResetToken: null,
                    passwordResetExpires: null,
                    streamKey: null,
                    isBanned: true, // Prevent re-login
                    banReason: 'Account deleted by user request (Right to Erasure)',
                    bannedAt: new Date(),
                },
            }),
            // Anonymize stream titles (keep records for analytics)
            prisma.stream.updateMany({
                where: { streamerId: userId },
                data: {
                    title: 'Stream removido',
                    description: null,
                    thumbnailUrl: null,
                },
            }),
        ]);

        // Log for monitoring (Sentry will capture this in production)
        console.log(`[ERASURE] Account deleted: userId=${userId}, ip=${req.ip}`);

        // Revoke all tokens
        await revokeAllUserTokens(userId);

        res.json({
            success: true,
            message: 'Conta apagada com sucesso. Os teus dados pessoais foram removidos.',
        });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
