import User from '../models/user.js';
import Course from '../models/course.js';
import Lesson from '../models/lesson.js';

export const getPlatformStats = async (req, res) => {
  try {
    const [totalUsers, totalCourses, totalLessons] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Lesson.countDocuments(),
    ]);

    const activeUsers = await User.countDocuments({
      updatedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        totalCourses,
        totalLessons,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('xp streak league createdAt');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, analytics: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
