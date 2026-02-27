import mongoose from 'mongoose';

const streakFreezeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    quantity: { type: Number, default: 1, min: 0, max: 3 },
    lastUsedAt: { type: Date },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('StreakFreeze', streakFreezeSchema);
