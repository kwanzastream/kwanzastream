import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import prisma from '../config/prisma';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';

// ============== Configuration ==============
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
// FIX: Limite de avatar alterado para 5MB — TestSprite #M3
const MAX_AVATAR_SIZE = 5 * 1024 * 1024;  // 5MB
const MAX_BANNER_SIZE = 5 * 1024 * 1024;  // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Ensure upload directories exist
const ensureDir = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

ensureDir(path.join(UPLOAD_DIR, 'avatars'));
ensureDir(path.join(UPLOAD_DIR, 'banners'));

// ============== Upload Avatar ==============
export const uploadAvatar = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(401).json({ success: false, message: 'Não tens permissão para aceder a este recurso.' });
        }

        const file = (req as any).file;
        if (!file) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(400).json({ success: false, message: 'Nenhum ficheiro fornecido.' });
        }

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.mimetype)) {
            // Clean up uploaded file
            fs.unlinkSync(file.path);
            // FIX: Mensagem PT-AO — TestSprite #M3
            return res.status(400).json({ success: false, message: 'Tipo de ficheiro inválido. Usa JPG ou PNG.' });
        }

        // Validate file size
        if (file.size > MAX_AVATAR_SIZE) {
            fs.unlinkSync(file.path);
            // FIX: Mensagem PT-AO com limite 5MB — TestSprite #M3
            return res.status(400).json({ success: false, message: 'O ficheiro excede o tamanho máximo de 5MB.' });
        }

        // Generate unique filename
        const ext = path.extname(file.originalname) || '.jpg';
        const filename = `avatar_${userId}_${randomUUID().slice(0, 8)}${ext}`;
        const destPath = path.join(UPLOAD_DIR, 'avatars', filename);

        // Move file to final destination
        fs.renameSync(file.path, destPath);

        // Build URL (relative, will be served by static middleware)
        const avatarUrl = `/uploads/avatars/${filename}`;

        // Update user
        const user = await prisma.user.update({
            where: { id: userId },
            data: { avatarUrl },
            select: { avatarUrl: true },
        });

        // Delete old avatar file if it exists and is a local upload
        // (skip if it's an external URL)
        const oldUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { avatarUrl: true },
        });
        if (oldUser?.avatarUrl?.startsWith('/uploads/')) {
            const oldPath = path.join(process.cwd(), oldUser.avatarUrl);
            if (fs.existsSync(oldPath) && oldPath !== destPath) {
                fs.unlinkSync(oldPath);
            }
        }

        res.json({ success: true, avatarUrl: user.avatarUrl });
    } catch (error) {
        console.error('Upload avatar error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};

// ============== Upload Banner ==============
export const uploadBanner = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(401).json({ success: false, message: 'Não tens permissão para aceder a este recurso.' });
        }

        const file = (req as any).file;
        if (!file) {
            // FIX: Mensagem PT-AO — TestSprite #M5
            return res.status(400).json({ success: false, message: 'Nenhum ficheiro fornecido.' });
        }

        if (!ALLOWED_TYPES.includes(file.mimetype)) {
            fs.unlinkSync(file.path);
            // FIX: Mensagem PT-AO — TestSprite #M3
            return res.status(400).json({ success: false, message: 'Tipo de ficheiro inválido. Usa JPG ou PNG.' });
        }

        if (file.size > MAX_BANNER_SIZE) {
            fs.unlinkSync(file.path);
            // FIX: Mensagem PT-AO — TestSprite #M3
            return res.status(400).json({ success: false, message: 'O ficheiro excede o tamanho máximo de 5MB.' });
        }

        const ext = path.extname(file.originalname) || '.jpg';
        const filename = `banner_${userId}_${randomUUID().slice(0, 8)}${ext}`;
        const destPath = path.join(UPLOAD_DIR, 'banners', filename);

        fs.renameSync(file.path, destPath);

        const bannerUrl = `/uploads/banners/${filename}`;

        const user = await prisma.user.update({
            where: { id: userId },
            data: { bannerUrl },
            select: { bannerUrl: true },
        });

        res.json({ success: true, bannerUrl: user.bannerUrl });
    } catch (error) {
        console.error('Upload banner error:', error);
        // FIX: Mensagem PT-AO — TestSprite #M5
        res.status(500).json({ success: false, message: 'Ocorreu um erro interno. Tenta novamente.' });
    }
};
