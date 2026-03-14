import Badge from '../models/badge.js';
import User from '../models/user.js';

export const getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find({ active: true }).sort({ threshold: 1 });
    res.status(200).json({ success: true, count: badges.length, badges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserBadges = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('badges');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, badges: user.badges || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBadge = async (req, res) => {
  try {
    const badge = await Badge.create(req.body);
    res.status(201).json({ success: true, badge });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
