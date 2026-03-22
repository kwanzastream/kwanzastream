import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
    getAngolaStats, getMapData, getTrending, getCreatorsAngola, getCreatorsByProvince,
    getCategories, getNominees, vote, getResults,
    getImpactStats, getImpactReport,
    getWorkshops, registerWorkshop,
} from '../controllers/angolaController';

const router = Router();

// Angola
router.get('/angola/stats', getAngolaStats as any);
router.get('/angola/map-data', getMapData as any);
router.get('/angola/trending', getTrending as any);
router.get('/angola/creators', getCreatorsAngola as any);
router.get('/angola/creators/province/:slug', getCreatorsByProvince as any);

// Awards
router.get('/awards/:year/categories', getCategories as any);
router.get('/awards/:year/nominees', getNominees as any);
router.post('/awards/:year/vote', authMiddleware as any, vote as any);
router.get('/awards/:year/results', getResults as any);

// Impact
router.get('/impact/stats', getImpactStats as any);
router.get('/impact/report/:year', getImpactReport as any);

// Education
router.get('/education/workshops', getWorkshops as any);
router.post('/education/workshops/:id/register', authMiddleware as any, registerWorkshop as any);

export default router;
