export const createMockReq = (overrides = {}) => {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    user: { id: '64f1a2b3c4d5e6f7a8b9c0d1', role: 'user' },
    ...overrides,
  };
};

export const createMockRes = () => {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
    setHeader(key, val) {
      this.headers[key] = val;
    },
  };
  return res;
};
