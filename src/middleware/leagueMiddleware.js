
import { user } from "../models/user.js"

export const updateBadgeMiddle = async (req, res, next) => {
    try {
        const userId = req.body.userId
        const User = await user.findById(userId)
        if (!User) {
            return res.json({ success: false, message: "User not found" })
        }
        if (User.xp >= 2000) {
            User.league = "BRONZE"
        }
        if (User.xp >= 5000) {
            User.league = "SILVER"
        }
        if (User.xp >= 10000) {
            User.league = "GOLD"
        }
        if (User.xp >= 20000) {
            User.league = "PLATINUM"
        }
        if (User.xp >= 50000) {
            User.league = "DIAMOND"
        }
        await User.save()
        next()
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}