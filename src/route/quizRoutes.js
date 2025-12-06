import { Router } from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createQuiz, getQuiz, submitQuiz } from '../controller/quizController.js'
import { isAdmin } from '../middleware/isAdmin.js'

const router = Router()

router.post('/create/:courseId', userAuth, isAdmin, createQuiz)
router.get('/:courseId', userAuth, getQuiz)
router.post('/submit/:quizId', userAuth, submitQuiz)

export default router