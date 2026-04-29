import { generateAccessToken, verifyToken } from '../../src/utils/tokenHelper.js';

export function runAuthIntegrationTests() {
  console.log('Running Auth Integration Tests...');

  const token = generateAccessToken('user_123', 'admin');
  console.assert(typeof token === 'string', 'Token should be a string');

  const decoded = verifyToken(token);
  console.assert(decoded.id === 'user_123', 'Decoded token ID should match');
  console.assert(decoded.role === 'admin', 'Decoded token role should match');

  console.log('Auth integration tests completed successfully.');
}
