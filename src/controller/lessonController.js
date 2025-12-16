import { course } from "../models/course.js";
import { lesson } from "../models/lesson.js";
import { user } from "../models/user.js";
import { family } from "../models/family.js";


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
    const userId = req.body.userId;

    try {
        const User = await user.findById(userId);
        const Lesson = await lesson.findById(lessonId)

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (!User.lastLessonFetchDate || User.lastLessonFetchDate < today) {
            User.lastLessonFetchDate = new Date();
            User.ViewedLessonsToday = [];
        }
        if (!User.ViewedLessonsToday) {
            User.ViewedLessonsToday = [];
        }
        if (!User.premium) {
            if (User.ViewedLessonsToday.length >= 3) {
                return res.json({ success: false, message: "Please upgrade to premium to complete more lessons" });
            }
        }
        if (!User.ViewedLessonsToday.includes(lessonId)) {
            User.ViewedLessonsToday.push(lessonId);
        }
        await User.save();
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
        const lessons = Lesson.map(l => ({
            title: l.title,
            order: l.order,
            course: l.course,
            _id: l._id
        }));
        res.json({ success: true, message: "Lesson found successfully", lesson: lessons })
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
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const Lesson = await lesson.findById(lessonId);
        if (!Lesson) {
            return res.json({ success: false, message: "Lesson not found" });
        }
        const User = await user.findById(userId);
        const userFamily = await family.find({ members: userId });

        if (!User) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!User.lastLessonFetchDate || User.lastLessonFetchDate < today) {
            User.lastLessonFetchDate = new Date();
            User.ViewedLessonsToday = [];
        }
        if (!User.premium) {
            if (User.ViewedLessonsToday.length >= 3) {
                return res.json({ success: false, message: "Please upgrade to premium to complete more lessons" });
            }
        }

        if (User.completedLessons.includes(lessonId)) {
            return res.json({ success: false, message: "Lesson already completed" });
        }

        User.completedLessons.push(lessonId);
        User.xp += 50;


        const lastAction = new Date(User.LastactionDate);
        lastAction.setHours(0, 0, 0, 0);

        const diffTime = today - lastAction;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);


        if (diffDays === 1 || User.streak == 0) {
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
        if (User.familyId && userFamily) {
            userFamily.xp = (userFamily.xp || 0) + 50;
            await userFamily.save();
        }
        if (userFamily) {
            for (const fam of userFamily) {
                fam.xp = (fam.xp || 0) + 50;
                await fam.save();
            }
        }

        await User.save();
        res.json({ success: true, message: "Lesson completed successfully", lesson: Lesson });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}