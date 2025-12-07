import { quiz } from "../models/quiz.js";
import { user } from "../models/user.js";

export const createQuiz = async (req, res) => {
    const { courseId } = req.params;
    const { questions } = req.body;

    try {
        const newQuiz = new quiz({
            course: courseId,
            questions
        });
        await newQuiz.save();
        res.json({ success: true, message: "Quiz created successfully", quiz: newQuiz });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const getQuiz = async (req, res) => {
    const { courseId } = req.params;
    try {
        const Quiz = await quiz.findOne({ course: courseId });
        if (!Quiz) {
            return res.json({ success: false, message: "Quiz not found" });
        }
        res.json({ success: true, quiz: Quiz });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const submitQuiz = async (req, res) => {
    const { quizId } = req.params;
    const { userId, answers } = req.body;

    try {
        const Quiz = await quiz.findById(quizId);
        if (!Quiz) {
            return res.json({ success: false, message: "Quiz not found" });
        }

        const User = await user.findById(userId);
        if (!User) {
            return res.json({ success: false, message: "User not found" });
        }

        if (User.completedQuizzes.includes(quizId)) {
            return res.json({ success: false, message: "Quiz already completed", score: null, passed: true });
        }

        let correctCount = 0;
        Quiz.questions.forEach((q, index) => {
            if (Number(answers[index]) === q.correctAnswer) {
                correctCount++;
            }
        });

        const score = (correctCount / Quiz.questions.length) * 100;
        const passed = score >= 80;

        if (passed) {
            User.xp += 150;
            User.completedQuizzes.push(quizId);
            await User.save();
        }

        res.json({
            success: true,
            message: passed ? "Quiz passed! +150 XP" : "Quiz failed. Try again.",
            score,
            passed
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
