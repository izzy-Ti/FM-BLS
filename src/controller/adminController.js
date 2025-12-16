import { blog } from "../models/blog.js";
import { course } from "../models/course.js";
import { family } from "../models/family.js";
import { lesson } from "../models/lesson.js";
import { quiz } from "../models/quiz.js";
import { user } from "../models/user.js";

export const adminController = async (req, res) => {
    try {
        const users = await user.find();
        const courses = await course.find();
        const lessons = await lesson.find();
        const quizzes = await quiz.find();
        const families = await family.find();
        const blogs = await blog.find();
        res.json({ users, courses, lessons, quizzes, families, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}