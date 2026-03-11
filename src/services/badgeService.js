import Badge from '../models/badge.js';
import User from '../models/user.js';
import { createNotification } from './notificationService.js';

export const checkAndAwardBadges = async (userId, context = {}) => {
  const user = await User.findById(userId);
  if (!user) return [];

  const earnedBadges = [];
  const allBadges = await Badge.find({ active: true });

  for (const badge of allBadges) {
    let qualifies = false;

    if (badge.category === 'streak' && user.streak >= badge.threshold) {
      qualifies = true;
    } else if (badge.category === 'xp' && user.xp >= badge.threshold) {
      qualifies = true;
    }

    if (qualifies && (!user.badges || !user.badges.includes(badge._id))) {
      user.badges = user.badges || [];
      user.badges.push(badge._id);
      earnedBadges.push(badge);

      await createNotification(
        userId,
        `Achievement Unlocked: ${badge.name}!`,
        badge.description,
        'badge_unlocked'
      );
    }
  }

  if (earnedBadges.length > 0) {
    await user.save();
  }

  return earnedBadges;
};
