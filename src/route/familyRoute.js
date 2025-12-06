import { Router } from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createFamily, famLeaderboard, getFamilies, getFamily, addMember } from '../controller/familyController.js'
import { leaveFamily } from '../controller/familyController.js'

const router = Router()

router.post('/createFamily', userAuth, createFamily)
router.delete('/leaveFamily/:familyId', userAuth, leaveFamily)
router.get('/famLeaderboard', userAuth, famLeaderboard)
router.get('/getFamily/:familyId', userAuth, getFamily)
router.get('/getFamilies', userAuth, getFamilies)
router.post('/addMember/:familyId', addMember)

export default router