import { Router } from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { completeLesson, createCourse, createLesson, deleteCourse, deleteLesson, enrollCourse, getallcourses, getCourse, getEnrolledCourses, getLessonByCourse, getLessons, unenrollCourse, updateCourse, updateLesson } from '../controller/lessonController.js'
import { upload } from '../config/cloudinary.js'
import { isAdmin } from '../middleware/isAdmin.js'

const router = Router()

router.post('/createCourse', isAdmin, createCourse)
router.post('/createLesson/:courseId', upload.single('file'), isAdmin, createLesson)
router.get('/getCourse/:courseId', getCourse)
router.get('/getLessons/:lessonId', getLessons)
router.get('/getLessonByCourse/:courseId', getLessonByCourse)
router.delete('/deleteLesson/:lessonId', isAdmin, deleteLesson)
router.delete('/deleteCourse/:courseId', userAuth, isAdmin, deleteCourse)
router.post('/completeLesson/:lessonId', userAuth, completeLesson)
router.post('/updateLesson/:lessonId', userAuth, isAdmin, updateLesson)
router.post('/updateCourse/:courseId', userAuth, isAdmin, updateCourse)
router.post('/enrollCourse/:courseId', userAuth, enrollCourse)
router.post('/unenrollCourse/:courseId', userAuth, unenrollCourse)
router.get('/getEnrolledCourses', userAuth, getEnrolledCourses)
router.get('/getallcourses', userAuth, getallcourses)

export default router