import { calculateLessonXP, calculateLeaguePromotion } from '../../src/utils/xpCalculator.js';

export function runXpTests() {
  console.log('Running XP Calculator Tests...');

  // 1. Base lesson XP calculation
  const xp1 = calculateLessonXP(20, 100, 0, false);
  console.assert(xp1 === 30, 'Base 20 + 10 accuracy bonus should equal 30');

  // 2. Streak multiplier bonus
  const xp2 = calculateLessonXP(20, 100, 7, false);
  console.assert(xp2 === 35, 'Streak multiplier bonus should apply');

  // 3. League promotions
  console.assert(calculateLeaguePromotion(600, 'Bronze') === 'Silver', 'Bronze promotes to Silver');
  console.assert(calculateLeaguePromotion(1500, 'Silver') === 'Gold', 'Silver promotes to Gold');

  console.log('XP tests completed successfully.');
}
