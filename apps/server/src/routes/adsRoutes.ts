import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
    createCampaign, getCampaigns, getCampaignById, updateCampaign,
    updateCampaignStatus, getCampaignAnalytics, getInvoices, getInvoiceById,
} from '../controllers/adsController';

const router = Router();

// All routes require auth
router.use(authMiddleware as any);

router.post('/campaigns', createCampaign as any);
router.get('/campaigns', getCampaigns as any);
router.get('/campaigns/:id', getCampaignById as any);
router.patch('/campaigns/:id', updateCampaign as any);
router.patch('/campaigns/:id/status', updateCampaignStatus as any);
router.get('/campaigns/:id/analytics', getCampaignAnalytics as any);
router.get('/invoices', getInvoices as any);
router.get('/invoices/:id', getInvoiceById as any);

export default router;
