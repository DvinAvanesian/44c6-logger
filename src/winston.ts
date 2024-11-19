import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

interface LoggerOptions {
  dir: string
}

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${message}`
    })
  ),
  transports: [new winston.transports.Console()]
})

export const configureLogger = async ({ dir }: LoggerOptions) => {
  const errorTransport = new DailyRotateFile({
    filename: '%DATE%_error',
    extension: '.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error',
    dirname: dir
  })

  const infoTransport = new DailyRotateFile({
    filename: '%DATE%_info',
    extension: '.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info',
    dirname: dir
  })

  logger.clear() // Clear existing transports
  logger.add(errorTransport)
  logger.add(infoTransport)
  logger.add(new winston.transports.Console())
}

export default logger
