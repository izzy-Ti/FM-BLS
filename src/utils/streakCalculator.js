export const calculateStreak = (lastActiveDate, currentStreak = 0, hasFreeze = false) => {
  if (!lastActiveDate) {
    return { streak: 1, freezeUsed: false, broken: false };
  }

  const now = new Date();
  const last = new Date(lastActiveDate);

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfLast = new Date(last.getFullYear(), last.getMonth(), last.getDate()).getTime();

  const diffDays = Math.round((startOfToday - startOfLast) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return { streak: currentStreak, freezeUsed: false, broken: false, alreadyActiveToday: true };
  }

  if (diffDays === 1) {
    return { streak: currentStreak + 1, freezeUsed: false, broken: false };
  }

  if (diffDays === 2 && hasFreeze) {
    return { streak: currentStreak + 1, freezeUsed: true, broken: false };
  }

  return { streak: 1, freezeUsed: false, broken: true };
};

export const getStreakBonusXP = (streak) => {
  if (streak >= 30) return 50;
  if (streak >= 14) return 25;
  if (streak >= 7) return 10;
  return 0;
};
