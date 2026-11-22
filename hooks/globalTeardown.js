import { logger } from '../utilities/logger.js';

export default async function globalTeardown() {
  logger.info('Global teardown completed');
}
