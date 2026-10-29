import { validateRegister } from '../../src/middleware/validator.js';
import { createMockReq, createMockRes } from '../utils/testHelpers.js';

export function runValidationTests() {
  console.log('Running Validation Middleware Tests...');

  // 1. Rejects short username
  const req1 = createMockReq({ body: { username: 'al', email: 'valid@example.com', password: 'password123' } });
  const res1 = createMockRes();
  validateRegister(req1, res1, () => {});
  console.assert(res1.statusCode === 400, 'Should reject short username');

  // 2. Rejects invalid email
  const req2 = createMockReq({ body: { username: 'alex', email: 'notanemail', password: 'password123' } });
  const res2 = createMockRes();
  validateRegister(req2, res2, () => {});
  console.assert(res2.statusCode === 400, 'Should reject invalid email');

  console.log('Validation tests completed successfully.');
}
