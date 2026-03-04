// ============================================================
// clipsRoutes.ts — Clips System Routes
// ============================================================

import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
    createClip,
    getTrendingClips,
    getStreamClips,
    getUserClips,
    viewClip,
    deleteClip,
} from '../controllers/clipsController';

const router = Router();

// Public routes
router.get('/trending', getTrendingClips as any);
router.get('/stream/:streamId', getStreamClips as any);
router.get('/:id', viewClip as any);

// Protected routes
router.post('/', authMiddleware, createClip as any);
router.get('/me/clips', authMiddleware, getUserClips as any);
router.delete('/:id', authMiddleware, deleteClip as any);

export default router;
