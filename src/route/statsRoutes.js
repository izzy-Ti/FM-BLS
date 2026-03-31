import express from 'express';
import { getPlatformStats, getUserAnalytics } from '../controller/statsController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/overview', authMiddleware, isAdmin, getPlatformStats);
router.get('/me', authMiddleware, getUserAnalytics);

export default router;
