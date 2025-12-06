import { course } from "../models/course.js";
import { lesson } from "../models/lesson.js";
import { user } from "../models/user.js";

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
export const getallcourses = async (req, res) => {
    try {
        const Courses = await course.find()
        if (!Courses) {
            return res.json({ success: false, message: "Courses not found" });
        }
        res.json({ success: true, message: "Courses found successfully", courses: Courses })
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
export const updateCourse = async (req, res) => {
    const courseId = req.params.courseId;
    const { title } = req.body;
    try {
        const Course = await course.findByIdAndUpdate(courseId, { title }, { new: true });

        if (!Course) {
            return res.json({ success: false, message: "Course not found" });
        }

        res.json({ success: true, message: "Course updated successfully", course: Course });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const enrollCourse = async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.body.userId;
    try {
        const Course = await course.findById(courseId);
        if (!Course) {
            return res.json({ success: false, message: "Course not found" });
        }
        const User = await user.findById(userId);
        if (!User) {
            return res.json({ success: false, message: "User not found" });
        }
        User.enrolledCourses.push(courseId);
        await User.save();
        res.json({ success: true, message: "Course enrolled successfully", course: Course });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const unenrollCourse = async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.body.userId;
    try {
        const Course = await course.findById(courseId);
        if (!Course) {
            return res.json({ success: false, message: "Course not found" });
        }
        const User = await user.findById(userId);
        if (!User) {
            return res.json({ success: false, message: "User not found" });
        }
        User.enrolledCourses.pull(courseId);
        await User.save();
        res.json({ success: true, message: "Course unenrolled successfully", course: Course });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const getEnrolledCourses = async (req, res) => {
    const userId = req.body.userId;
    try {
        const User = await user.findById(userId);
        if (!User) {
            return res.json({ success: false, message: "User not found" });
        }
        const courseId = User.enrolledCourses;
        const courses = await course.find({ _id: { $in: courseId } });
        res.json({ success: true, message: "Enrolled courses found successfully", courses: courses });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const completeLesson = async (req, res) => {
    const lessonId = req.params.lessonId;
    const userId = req.body.userId;
    try {
        const Lesson = await lesson.findById(lessonId);
        if (!Lesson) {
            return res.json({ success: false, message: "Lesson not found" });
        }
        const User = await user.findById(userId);
        if (!User) {
            return res.json({ success: false, message: "User not found" });
        }
        User.completedLessons.push(lessonId);
        User.xp += 50;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastAction = new Date(User.LastactionDate);
        lastAction.setHours(0, 0, 0, 0);

        const diffTime = today - lastAction;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 0) {
            return res.json({ success: true, message: "Streak already updated today", streak: User.streak });
        }
        if (diffDays === 1) {
            User.streak += 1;
        } else if (diffDays > 1) {
            User.streak = 1;
        }

        if (User.xp >= 2000) {
            User.league = "BRONZE"
        }
        if (User.xp >= 5000) {
            User.league = "SILVER"
        }
        if (User.xp >= 10000) {
            User.league = "GOLD"
        }
        if (User.xp >= 20000) {
            User.league = "PLATINUM"
        }
        if (User.xp >= 50000) {
            User.league = "DIAMOND"
        }
        User.LastactionDate = new Date();
        await User.save();
        res.json({ success: true, message: "Lesson completed successfully", lesson: Lesson });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}