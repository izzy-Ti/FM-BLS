class MemoryCache {
  constructor(defaultTtlMs = 60000) {
    this.store = new Map();
    this.defaultTtl = defaultTtlMs;
  }

  set(key, value, ttlMs = this.defaultTtl) {
    const expiresAt = Date.now() + ttlMs;
    this.store.set(key, { value, expiresAt });
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  has(key) {
    return this.get(key) !== null;
  }

  delete(key) {
    return this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }

  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
      }
    }
  }

  get size() {
    this.cleanup();
    return this.store.size;
  }
}

export const cache = new MemoryCache();
export default cache;

export const cacheVerse = (verse) => cache.set("daily_verse", verse, 24 * 3600 * 1000);
