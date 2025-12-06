import { Router } from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { getStreak, getXP, updateBadge, updateStreak } from '../controller/userController.js'

const router = Router()

router.post('/streak', userAuth, updateStreak)
router.post('/xp', userAuth, getXP)
router.post('/getStreak', userAuth, getStreak)
router.post('/updateBadge', userAuth, updateBadge)
export default router