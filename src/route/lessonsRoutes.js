import { Router } from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { completeLesson, createCourse, createLesson, deleteCourse, deleteLesson, enrollCourse, getCourse, getEnrolledCourses, getLessonByCourse, getLessons, unenrollCourse, updateCourse, updateLesson } from '../controller/lessonController.js'
import { upload } from '../config/cloudinary.js'

const router = Router()

router.post('/createCourse', userAuth, createCourse)
router.post('/createLesson/:courseId', upload.single('file'), userAuth, createLesson)
router.get('/getCourse/:courseId', userAuth, getCourse)
router.get('/getLessons/:lessonId', userAuth, getLessons)
router.get('/getLessonByCourse/:courseId', userAuth, getLessonByCourse)
router.delete('/deleteLesson/:lessonId', userAuth, deleteLesson)
router.delete('/deleteCourse/:courseId', userAuth, deleteCourse)
router.post('/completeLesson/:lessonId', userAuth, completeLesson)
router.post('/updateLesson/:lessonId', userAuth, updateLesson)
router.post('/updateCourse/:courseId', userAuth, updateCourse)
router.post('/enrollCourse/:courseId', userAuth, enrollCourse)
router.post('/unenrollCourse/:courseId', userAuth, unenrollCourse)
router.get('/getEnrolledCourses', userAuth, getEnrolledCourses)

export default router