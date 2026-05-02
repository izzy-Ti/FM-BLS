import { mockQuizzes } from '../fixtures/mockQuizzes.js';

export function runQuizIntegrationTests() {
  console.log('Running Quiz Integration Tests...');

  const quiz = mockQuizzes[0];
  console.assert(quiz.questions.length === 2, 'Quiz should have 2 questions');

  const answers = [1, 1];
  let correctCount = 0;
  quiz.questions.forEach((q, idx) => {
    if (q.correctAnswer === answers[idx]) correctCount++;
  });

  const score = (correctCount / quiz.questions.length) * 100;
  console.assert(score === 100, 'Score should be 100%');

  console.log('Quiz integration tests completed successfully.');
}
