import { user } from "../models/user.js"

export const isAdmin = async (req, res, next) => {
    const userId = req.body.userId
    const User = await user.findById(userId)
    if (User.role !== 'ADMIN') {
        return res.json({ success: false, message: 'Unauthorized' })
    }
    next()
}