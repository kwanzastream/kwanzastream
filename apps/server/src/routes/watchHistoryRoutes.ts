import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { recordWatch, getWatchHistory, clearHistory } from '../controllers/watchHistoryController';

const router = Router();

router.post('/', authMiddleware, recordWatch);
router.get('/', authMiddleware, getWatchHistory);
router.delete('/', authMiddleware, clearHistory);

export default router;
