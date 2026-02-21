import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    iconUrl: { type: String, default: '' },
    category: {
      type: String,
      enum: ['streak', 'lessons', 'xp', 'family', 'special'],
      default: 'lessons',
    },
    threshold: { type: Number, required: true },
    xpBonus: { type: Number, default: 50 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Badge', badgeSchema);
