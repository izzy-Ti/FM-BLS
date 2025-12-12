import { Router } from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { buyPremium, getPremium } from '../controller/premiumController.js'

const router = Router()

router.post('/buy-premium', userAuth, buyPremium)
router.post('/get-premium', userAuth, getPremium)

export default router