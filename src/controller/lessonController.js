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
export const getCourse = async (req, res) => {
    const courseId = req.params.courseId
    try {
        const Course = await course.findById(courseId)
        if (!Course) {
            return res.json({ success: false, message: "Course not found" });
        }
        res.json({ success: true, message: "Course found successfully", course: Course })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const getLessons = async (req, res) => {
    const lessonId = req.params.lessonId
    try {
        const Lesson = await lesson.findById(lessonId)
        if (!Lesson) {
            return res.json({ success: false, message: "Lesson not found" });
        }
        res.json({ success: true, message: "Lesson found successfully", lesson: Lesson })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const getLessonByCourse = async (req, res) => {
    const courseId = req.params.courseId
    try {
        const Lesson = await lesson.find({ course: courseId })
        if (!Lesson) {
            return res.json({ success: false, message: "Lesson not found" });
        }
        res.json({ success: true, message: "Lesson found successfully", lesson: Lesson })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const deleteLesson = async (req, res) => {
    const lessonId = req.params.lessonId
    try {
        const Lesson = await lesson.findByIdAndDelete(lessonId)
        if (!Lesson) {
            return res.json({ success: false, message: "Lesson not found" });
        }
        res.json({ success: true, message: "Lesson deleted successfully", lesson: Lesson })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const deleteCourse = async (req, res) => {
    const courseId = req.params.courseId
    try {
        const Course = await course.findByIdAndDelete(courseId)
        if (!Course) {
            return res.json({ success: false, message: "Course not found" });
        }
        res.json({ success: true, message: "Course deleted successfully", course: Course })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const updateLesson = async (req, res) => {
    const lessonId = req.params.lessonId;
    const { title, order, text } = req.body;
    const file = req.file?.path;
    try {
        const updates = {};
        if (title !== undefined) updates.title = title;
        if (order !== undefined) updates.order = order;
        if (text !== undefined) updates.text = text;
        if (file !== undefined) updates.file = file;

        const Lesson = await lesson.findByIdAndUpdate(lessonId, updates, { new: true });

        if (!Lesson) {
            return res.json({ success: false, message: "Lesson not found" });
        }

        res.json({ success: true, message: "Lesson updated successfully", lesson: Lesson });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
