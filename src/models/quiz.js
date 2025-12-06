import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true },
    questions: [{
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: Number, required: true }
    }]
}, { timestamps: true })

export const quiz = mongoose.model('quiz', quizSchema)
