import logger, { configureLogger } from '../winston'
import fs from 'fs'
import path from 'path'
import winston from 'winston'

const message = 'Message for testing info log function'
const dir = 'logs/'

describe('Logger', () => {
  const date = new Date().toISOString().slice(0, 10) // Current date in YYYY-MM-DD format

  beforeAll(async () => {
    await configureLogger({ dir })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (fs.existsSync(dir)) {
          fs.rmSync(dir, { recursive: true })
        }
        resolve()
      }, 1000)
    })
  })

  test('should log message to console', () => {
    const consoleSpy = jest.spyOn(winston.transports.Console.prototype, 'log')

    logger.info(message)

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'info',
        message,
        timestamp: expect.any(String),
        [Symbol.for('level')]: 'info',
        [Symbol.for('message')]: expect.stringContaining(message)
      }),
      expect.any(Function)
    )

    consoleSpy.mockRestore()
  })

  test('should write log to info file', () => {
    const infoLogFilePath = path.join(dir, `${date}_info.log`)

    // Call the info method on the logger
    logger.info(message)

    // Check if the file exists and contains the message
    expect(fs.existsSync(infoLogFilePath)).toBe(true)
    const fileContent = fs.readFileSync(infoLogFilePath, 'utf8')
    expect(fileContent).toContain(message)
  })

  test('should write log to error file for error level logs', () => {
    const errorLogFilePath = path.join(dir, `${date}_error.log`)

    // Call the error method on the logger
    logger.error(message)

    // Check if the error file exists and contains the message
    expect(fs.existsSync(errorLogFilePath)).toBe(true)
    const fileContent = fs.readFileSync(errorLogFilePath, 'utf8')
    expect(fileContent).toContain(message)
  })
})
