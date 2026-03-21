// ============================================================
// creatorRoutes.ts — Creator Studio Dashboard Routes
// ============================================================

import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getCreatorStats, getCreatorStreams, getEarningsChart } from '../controllers/creatorController';
import {
    getStreamAnalytics,
    getSubscriberAnalytics,
    getFollowerGrowth,
} from '../controllers/analyticsController';

const router = Router();

// All creator routes require authentication
router.use(authMiddleware);

// GET /api/creator/stats — Dashboard overview
router.get('/stats', getCreatorStats as any);

// GET /api/creator/streams — Stream history
router.get('/streams', getCreatorStreams as any);

// GET /api/creator/earnings-chart?days=30 — Earnings data for charts
router.get('/earnings-chart', getEarningsChart as any);

// Sprint 5: Creator analytics
router.get('/streams/:id/analytics', getStreamAnalytics as any);
router.get('/subscribers/analytics', getSubscriberAnalytics as any);
router.get('/followers/growth', getFollowerGrowth as any);

// Grupo 35: Featured & Shelf
import {
    getFeaturedSettings,
    updateSuggestedChannels,
    updateShelf,
    updateBanner,
    updateTrailer,
} from '../controllers/creator/featuredController';

router.get('/featured', getFeaturedSettings as any);
router.patch('/featured/suggested-channels', updateSuggestedChannels as any);
router.patch('/featured/shelf', updateShelf as any);
router.patch('/featured/banner', updateBanner as any);
router.patch('/featured/trailer', updateTrailer as any);

// Grupo 36: Tournaments
import {
    getCreatorTournaments,
    getCreatorTournament,
    updateParticipant,
    updateMatchResult,
    getInscriptionDetail,
} from '../controllers/creator/tournamentController';

router.get('/tournaments', getCreatorTournaments as any);
router.get('/tournaments/:id', getCreatorTournament as any);
router.patch('/tournaments/:id/participants/:userId', updateParticipant as any);
router.patch('/tournaments/:id/matches/:matchId', updateMatchResult as any);
router.get('/tournaments/inscriptions/:id', getInscriptionDetail as any);

// Grupo 37: Radio
import {
    getRadioOverview,
    updateRadioConfig,
    updateRadioArtwork,
    addScheduleSlot,
    removeScheduleSlot,
    getRadioAnalytics,
    getRadioStreamKey,
    rotateRadioStreamKey,
} from '../controllers/creator/radioController';

router.get('/radio', getRadioOverview as any);
router.patch('/radio/config', updateRadioConfig as any);
router.patch('/radio/artwork', updateRadioArtwork as any);
router.post('/radio/schedule', addScheduleSlot as any);
router.delete('/radio/schedule/:id', removeScheduleSlot as any);
router.get('/radio/analytics', getRadioAnalytics as any);
router.get('/radio/stream-key', getRadioStreamKey as any);
router.post('/radio/stream-key/rotate', rotateRadioStreamKey as any);

export default router;
