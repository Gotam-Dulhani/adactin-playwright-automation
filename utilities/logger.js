import fs from 'node:fs';

const LOG_FILE = 'logs/execution.log';

export function log(level, message) {
  const line = `[${new Date().toISOString()}] [${level}] ${message}`;
  console.log(line);
  try {
    fs.mkdirSync('logs', { recursive: true });
    fs.appendFileSync(LOG_FILE, `${line}\n`);
  } catch {
  }
}

export const logger = {
  info: (message) => log('INFO', message),
  warn: (message) => log('WARN', message),
  error: (message) => log('ERROR', message),
};
