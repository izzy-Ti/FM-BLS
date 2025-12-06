import { Router } from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createCourse, createLesson, deleteCourse, deleteLesson, getCourse, getLessonByCourse, getLessons } from '../controller/lessonController.js'
import { upload } from '../config/cloudinary.js'

const router = Router()

router.post('/createCourse', userAuth, createCourse)
router.post('/createLesson/:courseId', upload.single('file'), userAuth, createLesson)
router.get('/getCourse/:courseId', userAuth, getCourse)
router.get('/getLessons/:lessonId', userAuth, getLessons)
router.get('/getLessonByCourse/:courseId', userAuth, getLessonByCourse)
router.delete('/deleteLesson/:lessonId', userAuth, deleteLesson)
router.delete('/deleteCourse/:courseId', userAuth, deleteCourse)

export default router