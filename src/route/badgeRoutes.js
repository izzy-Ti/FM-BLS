import express from 'express';
import { getAllBadges, getUserBadges, createBadge } from '../controller/badgeController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/', getAllBadges);
router.get('/my-badges', authMiddleware, getUserBadges);
router.post('/', authMiddleware, isAdmin, createBadge);

export default router;
