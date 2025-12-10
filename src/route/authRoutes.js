import { Router } from 'express'
import { getUserData, isAuth, login, logout, register, resetPassword, sendResetOTP, sendVerifyOTP, updateProfile, verifyOTP } from '../controller/authController.js'
import userAuth, { isVerified } from '../middleware/authMiddleware.js'
import { updateBadgeMiddle } from '../middleware/leagueMiddleware.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/send-verification-otp', userAuth, sendVerifyOTP)
router.post('/verify-otp', userAuth, verifyOTP)
router.post('/is-auth', userAuth, isVerified, isAuth)
router.post('/send-reset-password', sendResetOTP)
router.post('/reset-password', resetPassword)
router.post('/get-user-data', userAuth, updateBadgeMiddle, getUserData)
router.post('/updateProfile', userAuth, isVerified, updateProfile)


export default router



//POST http://localhost:4000/api/auth/logout
//POST http://localhost:4000/api/auth/login
//POST http://localhost:4000/api/auth/register
//POST http://localhost:4000/api/auth/send-verification-otp
//POST http://localhost:4000/api/auth/verify-otp
//POST http://localhost:4000/api/auth/is-auth
//POST http://localhost:4000/api/auth/send-reset-password
//POST http://localhost:4000/api/auth/reset-password
//GET http://localhost:4000/api/auth/get-user-data