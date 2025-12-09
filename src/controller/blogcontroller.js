import { blog } from "../models/blog.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const media = req.files;

        if (!media || !title || !content || !author) {
            return res.json({ success: false, message: "All fields are required" });
        }
        const mediaPaths = media.map(file => file.path);

        const newBlog = new blog({ title, content, author, media: mediaPaths });
        await newBlog.save();
        res.json({ success: true, message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const getBlog = async (req, res) => {
    try {
        const Blog = await blog.findById(req.params.id);
        if (!Blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, Blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blog.find();
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const updateBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const media = req.file?.path;
        const Blog = await blog.findById(req.params.id);
        if (!Blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        Blog.title = title;
        Blog.content = content;
        Blog.author = author;
        await Blog.save();
        res.json({ success: true, message: "Blog updated successfully", Blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const deleteBlog = async (req, res) => {
    try {
        const Blog = await blog.findByIdAndDelete(req.params.id);
        if (!Blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, message: "Blog deleted successfully", Blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const searchBlog = async (req, res) => {
    try {
        const Blog = await blog.find({ title: { $regex: req.params.query, $options: "i" } });
        res.json({ success: true, Blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}; 