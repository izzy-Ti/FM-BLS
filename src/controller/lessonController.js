import { course } from "../models/course.js";
import { lesson } from "../models/lesson.js";

export const createCourse = async (req, res) => {
    try {
        const creator = req.body.userId
        const { title } = req.body
        const newCourse = new course({ title, creator })
        await newCourse.save()
        res.json({ success: true, message: "Course created successfully", course: newCourse })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const createLesson = async (req, res) => {
    const { title, order, text, userId } = req.body
    const courseId = req.params.courseId
    const file = req.file?.path


    try {
        const Course = await course.findById(courseId)
        if (!Course) {
            return res.json({ success: false, message: "Course not found" });
        }
        if (userId !== Course.creator.toString()) {
            return res.json({ success: false, message: "You are not authorized to create a lesson" })
        }
        const newLesson = new lesson({
            title,
            order,
            file,
            text,
            course: courseId
        })
        await newLesson.save()

        Course.lessons.push(newLesson._id);
        await Course.save();

        res.json({ success: true, message: "Lesson created successfully", lesson: newLesson })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}