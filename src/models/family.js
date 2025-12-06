import mongoose from "mongoose";

const familySchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    xp: { type: Number, default: 0 },
})

export const family = mongoose.model('family', familySchema)    