// ============================================================
// creatorRoutes.ts — Creator Studio Dashboard Routes
// ============================================================

import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getCreatorStats, getCreatorStreams, getEarningsChart } from '../controllers/creatorController';

const router = Router();

// All creator routes require authentication
router.use(authMiddleware);

// GET /api/creator/stats — Dashboard overview
router.get('/stats', getCreatorStats as any);

// GET /api/creator/streams — Stream history
router.get('/streams', getCreatorStreams as any);

// GET /api/creator/earnings-chart?days=30 — Earnings data for charts
router.get('/earnings-chart', getEarningsChart as any);

export default router;
