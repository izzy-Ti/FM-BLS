import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    file: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true },
    order: { type: Number, required: true },
    text: { type: String, required: true },
})

export const lesson = mongoose.model('lesson', lessonSchema)

// Optimized courseId index for quick lesson lookups
