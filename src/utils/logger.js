import chalk from 'chalk';

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

const currentLevel = process.env.LOG_LEVEL || 'INFO';

function getTimestamp() {
  return new Date().toISOString();
}

export const logger = {
  debug: (...args) => {
    if (LOG_LEVELS[currentLevel] <= LOG_LEVELS.DEBUG) {
      console.log(chalk.gray(`[${getTimestamp()}] [DEBUG]`), ...args);
    }
  },
  info: (...args) => {
    if (LOG_LEVELS[currentLevel] <= LOG_LEVELS.INFO) {
      console.log(chalk.blue(`[${getTimestamp()}] [INFO]`), ...args);
    }
  },
  warn: (...args) => {
    if (LOG_LEVELS[currentLevel] <= LOG_LEVELS.WARN) {
      console.warn(chalk.yellow(`[${getTimestamp()}] [WARN]`), ...args);
    }
  },
  error: (...args) => {
    if (LOG_LEVELS[currentLevel] <= LOG_LEVELS.ERROR) {
      console.error(chalk.red(`[${getTimestamp()}] [ERROR]`), ...args);
    }
  },
};

export default logger;
