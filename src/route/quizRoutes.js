import { Router } from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createQuiz, getQuiz, submitQuiz } from '../controller/quizController.js'

const router = Router()

router.post('/create/:courseId', userAuth, createQuiz)
router.get('/:courseId', userAuth, getQuiz)
router.post('/submit/:quizId', userAuth, submitQuiz)

export default router
