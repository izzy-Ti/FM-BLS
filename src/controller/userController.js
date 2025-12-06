import { user } from "../models/user.js";

export const updateStreak = async (req, res) => {
    try {
        const userId = req.body.userId;
        const currentUser = await user.findById(userId);
        if (!currentUser) {
            return res.json({ success: false, message: "User not found" });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastAction = new Date(currentUser.LastactionDate);
        lastAction.setHours(0, 0, 0, 0);

        const diffTime = today - lastAction;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 0) {
            return res.json({ success: true, message: "Streak already updated today", streak: currentUser.streak });
        }
        if (diffDays === 1) {
            currentUser.streak += 1;
        } else if (diffDays > 1) {
            currentUser.streak = 1;
        }
        currentUser.LastactionDate = new Date();

        await currentUser.save();

        res.json({ success: true, message: "Streak updated successfully", streak: currentUser.streak });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const getXP = async (req, res) => {
    try {
        const userId = req.body.userId;
        const currentUser = await user.findById(userId);
        if (!currentUser) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, xp: currentUser.xp });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const getStreak = async (req, res) => {
    try {
        const userId = req.body.userId;
        const currentUser = await user.findById(userId);
        if (!currentUser) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, streak: currentUser.streak });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const updateBadge = async (req, res) => {
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
        res.json({ success: true, message: "league updated successfully", badges: User.badges })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}