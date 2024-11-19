import mongoose, { Types } from 'mongoose'
import Logger from '../'
import Log from '../models/log'
import { IActionOpts } from '../types'
import wlog from '../winston'
import { initDB } from './setup'
import { isMatch } from 'lodash'

jest.mock('../winston', () => ({
  info: jest.fn(),
  error: jest.fn(),
  configureLogger: jest.fn().mockResolvedValue(undefined)
}))

describe('Logger', () => {
  let logger: Logger

  afterAll(async () => {
    await Log.deleteMany()
    mongoose.disconnect()
  })

  beforeAll(async () => {
    await initDB()
  })

  beforeEach(() => {
    logger = new Logger({ dir: 'logs' })
    jest.clearAllMocks()
  })

  describe('db method', () => {
    it('should create and save a log document', async () => {
      const logData: IActionOpts = {
        message: 'Test message',
        action: 'testAction',
        user: new Types.ObjectId()
      }

      await logger.db(logData)

      expect(wlog.error).not.toHaveBeenCalled()

      const logDoc = await Log.findOne().sort({ _id: -1 }).exec()

      expect(logDoc).not.toBeNull()
      expect(isMatch(logDoc, logData)).toBe(true)
    })

    it('should log an error if saving fails', async () => {
      const error = new Error('Save failed')

      const logData = {
        message: 'Test message'
      }

      // @ts-ignore
      await logger.db(logData)

      expect(wlog.error).toHaveBeenCalledWith(expect.stringContaining('Error creating log document'))
    })
  })
})
