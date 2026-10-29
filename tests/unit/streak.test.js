import { calculateStreak, getStreakBonusXP } from '../../src/utils/streakCalculator.js';

export function runStreakTests() {
  console.log('Running Streak Calculator Tests...');

  // 1. Initial streak start
  const res1 = calculateStreak(null, 0);
  console.assert(res1.streak === 1, 'Initial streak should be 1');

  // 2. Consecutive day streak increment
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const res2 = calculateStreak(yesterday, 3);
  console.assert(res2.streak === 4, 'Consecutive day streak should be 4');

  // 3. Same day activity maintains streak
  const today = new Date();
  const res3 = calculateStreak(today, 5);
  console.assert(res3.streak === 5, 'Same day activity should maintain streak');

  // 4. Streak bonus thresholds
  console.assert(getStreakBonusXP(7) === 10, '7 day streak bonus should be 10 XP');
  console.assert(getStreakBonusXP(14) === 25, '14 day streak bonus should be 25 XP');
  console.assert(getStreakBonusXP(30) === 50, '30 day streak bonus should be 50 XP');

  console.log('Streak tests completed successfully.');
}
