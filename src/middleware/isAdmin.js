import { user } from "../models/user.js"

export const isAdmin = async (req, res, next) => {
    const userId = req.body.userId
    const User = await user.findById(userId)
    if (User.role !== 'admin') {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    next()
}