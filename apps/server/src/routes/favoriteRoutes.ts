import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
    getFavoriteCreators,
    addFavoriteCreator,
    removeFavoriteCreator,
    checkFavoriteCreator,
    getFavoriteStreams,
    addFavoriteStream,
    removeFavoriteStream,
} from '../controllers/favoriteController';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Creator favorites
router.get('/creators', getFavoriteCreators);
router.post('/creators/:id', addFavoriteCreator);
router.delete('/creators/:id', removeFavoriteCreator);
router.get('/creators/:id/check', checkFavoriteCreator);

// Stream favorites
router.get('/streams', getFavoriteStreams);
router.post('/streams/:id', addFavoriteStream);
router.delete('/streams/:id', removeFavoriteStream);

export default router;
