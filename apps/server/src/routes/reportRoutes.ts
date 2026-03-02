import { Router } from 'express';
import { createReport, getMyReports } from '../controllers/reportController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createReport);
router.get('/mine', authMiddleware, getMyReports);

export default router;
