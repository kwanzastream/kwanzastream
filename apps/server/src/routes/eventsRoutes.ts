// ============================================================
// eventsRoutes.ts — Events System Routes
// ============================================================

import { Router } from 'express';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/authMiddleware';
import {
    createEvent,
    listEvents,
    getEvent,
    updateEvent,
    cancelEvent,
    toggleRsvp,
    getMyEvents,
} from '../controllers/eventsController';

const router = Router();

// Public-ish (optionalAuth so we can check user RSVP status)
router.get('/', optionalAuthMiddleware, listEvents as any);
router.get('/:id', optionalAuthMiddleware, getEvent as any);

// Protected routes
router.post('/', authMiddleware, createEvent as any);
router.put('/:id', authMiddleware, updateEvent as any);
router.delete('/:id', authMiddleware, cancelEvent as any);
router.post('/:id/rsvp', authMiddleware, toggleRsvp as any);
router.get('/my/events', authMiddleware, getMyEvents as any);

export default router;
