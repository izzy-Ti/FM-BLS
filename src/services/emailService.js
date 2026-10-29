import logger from '../utils/logger.js';

export const sendWelcomeEmail = async (email, username) => {
  logger.info(`Sending welcome email to ${email} (${username})`);
  return { success: true, messageId: `welcome_${Date.now()}` };
};

export const sendStreakReminderEmail = async (email, streak) => {
  logger.info(`Sending streak reminder to ${email} for ${streak} day streak`);
  return { success: true, messageId: `streak_${Date.now()}` };
};

export const sendBadgeUnlockedEmail = async (email, badgeName) => {
  logger.info(`Sending badge achievement email to ${email} for ${badgeName}`);
  return { success: true, messageId: `badge_${Date.now()}` };
};

export default {
  sendWelcomeEmail,
  sendStreakReminderEmail,
  sendBadgeUnlockedEmail,
};
