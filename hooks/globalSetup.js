import fs from 'node:fs';
import { logger } from '../utilities/logger.js';

export default async function globalSetup() {
  for (const dir of ['allure-results', 'logs', 'test-results']) {
    fs.mkdirSync(dir, { recursive: true });
  }
  logger.info('Global setup completed');
}
