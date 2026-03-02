import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { uploadAvatar, uploadBanner } from '../controllers/uploadController';
import { authMiddleware } from '../middleware/authMiddleware';

// Configure multer for temporary file storage
const upload = multer({
    dest: path.join(process.cwd(), 'uploads', 'tmp'),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max (controller does per-type validation)
    },
});

const router = Router();

// Avatar upload (max 2MB, validated in controller)
router.post('/avatar', authMiddleware, upload.single('file'), uploadAvatar);

// Banner upload (max 5MB, validated in controller)
router.post('/banner', authMiddleware, upload.single('file'), uploadBanner);

export default router;
