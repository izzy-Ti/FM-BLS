import { Router } from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createCourse, createLesson } from '../controller/lessonController.js'
import { upload } from '../config/cloudinary.js'

const router = Router()

router.post('/createCourse', userAuth, createCourse)
router.post('/createLesson/:courseId', upload.single('file'), userAuth, createLesson)

export default router