import { Router } from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { isAdmin } from '../middleware/isAdmin.js'
import { adminController } from '../controller/adminController.js'

const router = Router()

router.get('/', userAuth, isAdmin, adminController)


export default router