import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';
import packageJson from './../../package.json';

const packageName = packageJson.name;

// Create a Winston logger instance
export const log = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(), // Enable colorization
    winston.format.simple(), // Use the simple format or your preferred format
  ),
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'logfile.log' })],
});

// Custom stream for Morgan to use with Winston
export const morganStream = {
  write: (message: string) => {
    log.info(message.trim());
  },
};

const logFiles = true;

// Log to file setup
if (logFiles) {
  const logDir = path.join(__dirname, '../../', `.${packageName}-logs`);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // A file based transport logging only errors
  log.add(
    new winston.transports.File({
      level: 'error',
      filename: path.join(logDir, `${packageName}-error.log`),
    }),
  );

  log.add(
    new winston.transports.File({
      level: 'warn',
      filename: path.join(logDir, `${packageName}-warn.log`),
    }),
  );

  log.add(
    new winston.transports.File({
      level: 'debug',
      filename: path.join(logDir, `${packageName}-debug.log`),
    }),
  );
}
