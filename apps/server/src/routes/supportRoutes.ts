import { Router } from 'express';
import {
  createTicket, listTickets, getTicket, replyTicket,
  listArticles, getArticle, rateArticle,
  systemStatus, submitContact,
} from '../controllers/supportController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Tickets (auth required)
router.post('/tickets', authenticate, createTicket);
router.get('/tickets', authenticate, listTickets);
router.get('/tickets/:id', authenticate, getTicket);
router.post('/tickets/:id/reply', authenticate, replyTicket);

// Knowledge base (public)
router.get('/articles', listArticles);
router.get('/articles/:slug', getArticle);
router.post('/articles/:slug/rate', rateArticle);

// System status (public)
router.get('/system/status', systemStatus);

// Contact form (public)
router.post('/contact', submitContact);

export default router;
