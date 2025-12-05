import { user } from "../models/user";

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