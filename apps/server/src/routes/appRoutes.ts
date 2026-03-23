import { Router } from 'express';
import { getVersion, getDownloadUrl, notifyIos, getChangelog, getVersionNotes } from '../controllers/appController';

const router = Router();

router.get('/version', getVersion);
router.get('/download-url', getDownloadUrl);
router.post('/notify-ios', notifyIos);
router.get('/changelog', getChangelog);
router.get('/changelog/:v', getVersionNotes);

export default router;
