import { user } from "../models/user.js";

export const getLeaderboard = async (req, res) => {
    try {
        const users = await user.find().sort({ xp: -1 });
        const leaderboard = users.map(user => ({
            name: user.name,
            xp: user.xp,
            league: user.league
        }));
        res.json({ success: true, leaderboard: leaderboard });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const getFamilyLeaderboard = async (req, res) => {
    try {
        const { familyId } = req.params;
        const users = await user.find({ family: familyId }).sort({ xp: -1 });
        const leaderboard = users.map(user => ({
            name: user.name,
            xp: user.xp,
            league: user.league
        }));
        res.json({ success: true, leaderboard: leaderboard });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}