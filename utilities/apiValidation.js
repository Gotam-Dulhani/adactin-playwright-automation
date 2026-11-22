import { expect } from '@playwright/test';

export function expectStatus(response, expected) {
  expect(response.status()).toBe(expected);
}

export function expectHeader(response, name, expected) {
  expect(response.headers()[name.toLowerCase()]).toContain(expected);
}

export function expectJsonSchema(body, schema) {
  for (const [key, type] of Object.entries(schema)) {
    expect(body).toHaveProperty(key);
    const value = body[key];
    if (type === 'array') {
      expect(Array.isArray(value)).toBe(true);
    } else if (type === 'object') {
      expect(typeof value).toBe('object');
      expect(value).not.toBeNull();
    } else {
      expect(typeof value).toBe(type);
    }
  }
}

export async function timedRequest(action) {
  const start = Date.now();
  const response = await action();
  return { response, durationMs: Date.now() - start };
}

export function expectResponseTime(durationMs, maxMs) {
  expect(durationMs).toBeLessThan(maxMs);
}
