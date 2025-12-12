import { Router } from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { buyPremium, getPremium, strpieWeebHook } from '../controller/premiumController.js'

const router = Router()

router.post('/buy-premium', userAuth, buyPremium)
router.post('/stripe-webhook', strpieWeebHook)
router.post('/get-premium', userAuth, getPremium)

export default router