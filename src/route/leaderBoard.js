import { Router } from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { getFamilyLeaderboard, getLeaderboard } from '../controller/leaderboardController.js'

const router = Router()

router.get('/getLeaderboard', userAuth, getLeaderboard)
router.get('/getFamilyLeaderboard/:familyId', userAuth, getFamilyLeaderboard)

export default router