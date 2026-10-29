export const calculateLessonXP = (baseXP = 20, accuracy = 100, streak = 0, isWeekend = false) => {
  let earned = baseXP;

  if (accuracy >= 100) {
    earned += 10;
  } else if (accuracy >= 80) {
    earned += 5;
  }

  if (streak >= 7) {
    earned = Math.round(earned * 1.15);
  }

  if (isWeekend) {
    earned = Math.round(earned * 1.25);
  }

  return earned;
};

export const calculateLeaguePromotion = (xp, tier = 'Bronze') => {
  const THRESHOLDS = {
    Bronze: 500,
    Silver: 1200,
    Gold: 2500,
    Diamond: 5000,
  };

  if (tier === 'Bronze' && xp >= THRESHOLDS.Bronze) return 'Silver';
  if (tier === 'Silver' && xp >= THRESHOLDS.Silver) return 'Gold';
  if (tier === 'Gold' && xp >= THRESHOLDS.Gold) return 'Diamond';
  return tier;
};
