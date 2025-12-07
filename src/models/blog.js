import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    title: String,
    media: [{ type: String, default: null }],
    content: String,
    author: String
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);