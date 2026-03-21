import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
    getCurriculum,
    getCampProgress,
    markChapterComplete,
    getCertificates,
    getCertificatePublic,
} from '../controllers/campController';

const router = Router();

// Public
router.get('/curriculum', getCurriculum as any);
router.get('/certificates/:certCode', getCertificatePublic as any);

// Authenticated
router.get('/progress', authMiddleware as any, getCampProgress as any);
router.post('/progress', authMiddleware as any, markChapterComplete as any);
router.get('/my-certificates', authMiddleware as any, getCertificates as any);

export default router;
