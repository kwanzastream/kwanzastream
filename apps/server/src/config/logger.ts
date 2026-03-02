import winston from 'winston';
import path from 'path';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Coloured dev format
const devFormat = winston.format.combine(
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
        return `${timestamp} ${level}: ${message}${extra}`;
    }),
);

// Structured JSON for production
const prodFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
);

const transports: winston.transport[] = [
    new winston.transports.Console({
        format: IS_PRODUCTION ? prodFormat : devFormat,
    }),
];

// File transports only in production
if (IS_PRODUCTION) {
    const logDir = process.env.LOG_DIR || path.join(process.cwd(), 'logs');

    transports.push(
        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
            maxsize: 5 * 1024 * 1024, // 5MB
            maxFiles: 5,
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'combined.log'),
            maxsize: 10 * 1024 * 1024, // 10MB
            maxFiles: 5,
        }),
    );
}

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || (IS_PRODUCTION ? 'info' : 'debug'),
    defaultMeta: { service: 'kwanza-stream' },
    transports,
});

// Replace console methods so existing console.log/error calls go through winston
if (IS_PRODUCTION) {
    console.log = (...args) => logger.info(args.map(String).join(' '));
    console.error = (...args) => logger.error(args.map(String).join(' '));
    console.warn = (...args) => logger.warn(args.map(String).join(' '));
}
