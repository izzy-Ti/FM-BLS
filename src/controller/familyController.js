import { family } from "../models/family.js";
import { user } from "../models/user.js";

export const createFamily = async (req, res) => {
    try {
        const { name, memebrEmail } = req.body;
        const users = await user.find({ email: { $in: memebrEmail } });
        const famXP = users.reduce((acc, user) => acc + user.xp, 0);
        const newFamily = new family({ name, members: users.map(u => u._id), xp: famXP });
        await newFamily.save();
        res.json({ success: true, message: "Family created successfully", family: newFamily });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const leaveFamily = async (req, res) => {
    try {
        const { familyId } = req.params;
        const { userId } = req.body;
        const userXP = await user.findById(userId);
        const fam = await family.findById(familyId);
        if (!fam) {
            return res.json({ success: false, message: "Family not found" });
        }
        fam.xp = fam.xp - userXP.xp;
        fam.members.pull(userId);
        await fam.save();
        res.json({ success: true, message: "Family left successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const getFamily = async (req, res) => {
    try {
        const { familyId } = req.params;
        const fam = await family.findById(familyId);
        if (!fam) {
            return res.json({ success: false, message: "Family not found" });
        }
        res.json({ success: true, family: fam });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const getFamilies = async (req, res) => {
    try {
        const fams = await family.find();
        res.json({ success: true, families: fams });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const famLeaderboard = async (req, res) => {
    try {
        const fams = await family.find().sort({ xp: -1 });
        res.json({ success: true, families: fams });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const addMember = async (req, res) => {
    try {
        const { familyId } = req.params;
        const { email } = req.body;
        const User = await user.findOne({ email });
        const fam = await family.findById(familyId);
        if (!fam) {
            return res.json({ success: false, message: "Family not found" });
        }
        fam.xp = fam.xp + User.xp;
        fam.members.push(User._id);
        await fam.save();
        res.json({ success: true, message: "Family member added successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}