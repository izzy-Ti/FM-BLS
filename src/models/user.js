import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    verifyOTP: { type: String, default: '' },
    OTPExpireAt: { type: Number, default: 0 },
    IsAccVerified: { type: Boolean, default: false },
    ResetOTP: { type: String, default: '' },
    ResetOTPExpireAt: { type: Number, default: 0 },
    avater: { type: String, required: false },
    role: { type: String, required: true, enum: ['STUDENT', 'ADMIN'], default: 'STUDENT' },
    streak: { type: Number, default: 0 },
    league: { type: String, enum: ["BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND"], default: "BRONZE" },
    xp: { type: Number, default: 0 },
    LastactionDate: { type: Date, default: Date.now },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    completedQuizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'quiz' }],
    googleId: { type: String, default: null },
    authType: { type: String, enum: ["local", "google"], default: "local" },
    premium: { type: Boolean, default: false },
    premiumExpireAt: { type: Number, default: 0 },
    ViewedLessonsToday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', default: null }],
    lastLessonFetchDate: { type: Date, default: null },
}, { timestamps: true })

export const user = mongoose.model('user', UserSchema)
// Index for leaderboard ranking
// userSchema.index({ streak: -1, xp: -1 });
