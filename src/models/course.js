import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lesson' }]
})

export const course = mongoose.model('course', courseSchema)