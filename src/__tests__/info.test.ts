import Logger from '../dbLogger'
import formatLogString from '../formatLogString'
import { IMessage } from '../types'
import wlog from '../winston'

jest.mock('../winston', () => ({
  info: jest.fn(),
  error: jest.fn(),
  configureLogger: jest.fn().mockResolvedValue(undefined)
}))

const message = 'Message for testing info log function'
const customString = 'Message for testing custom string message'

describe('Logger', () => {
  let logger: Logger

  beforeAll(() => {
    logger = new Logger({ dir: 'logs/' })
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  test('info method should log correct message to wlog.info', () => {
    const obj = {
      message,
      customString
    }

    logger.info(obj)

    expect(wlog.info).toHaveBeenCalledWith(customString)
  })

  test('info method should format message when customString is not provided', () => {
    const obj = {
      message
    }

    const formattedMessage = formatLogString(obj)

    logger.info(obj)

    expect(wlog.info).toHaveBeenCalledWith(formattedMessage)
  })

  test('info method with full parameters', () => {
    const obj: IMessage = {
      message,
      clientIP: '1.2.3.4',
      method: 'POST',
      url: '/api/v1/test',
      user: 'test_user'
    }

    const formattedMessage = formatLogString(obj)

    logger.info(obj)

    console.log(formattedMessage)

    expect(wlog.info).toHaveBeenCalledWith(formattedMessage)
  })
})
