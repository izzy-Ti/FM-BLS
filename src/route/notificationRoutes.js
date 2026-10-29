import express from 'express';
import {
  getNotifications,
  readNotification,
  readAllNotifications,
} from '../controller/notificationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getNotifications);
router.put('/:id/read', authMiddleware, readNotification);
router.put('/read-all', authMiddleware, readAllNotifications);

export default router;
