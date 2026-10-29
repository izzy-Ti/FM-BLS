import { cache } from '../../src/utils/cache.js';

export function runCacheTests() {
  console.log('Running Cache Tests...');

  cache.set('testKey', { data: 123 }, 5000);
  console.assert(cache.has('testKey') === true, 'Cache should contain set key');
  console.assert(cache.get('testKey').data === 123, 'Cache value should match');

  cache.delete('testKey');
  console.assert(cache.has('testKey') === false, 'Cache key should be deleted');

  console.log('Cache tests completed successfully.');
}
