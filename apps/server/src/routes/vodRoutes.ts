import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
    createVod,
    getVods,
    getVod,
    updateVod,
    deleteVod,
    getMyVods,
} from '../controllers/vodController';

const router = Router();

// Public routes
router.get('/', getVods);
router.get('/:id', getVod);

// Protected routes (must be before /:id to avoid conflicts)
router.post('/', authMiddleware, createVod);
router.get('/me/list', authMiddleware, getMyVods);
router.put('/:id', authMiddleware, updateVod);
router.delete('/:id', authMiddleware, deleteVod);

export default router;
