import formatLogString from './formatLogString'
import Log from './models/log'
import registerSchema from './registerSchema'
import { IActionOpts, ILogger, ILoggerC, IMessage } from './types'
import wlog, { configureLogger } from './winston'

class Logger implements ILogger {
  constructor({ dir }: ILoggerC) {
    registerSchema()
    configureLogger({ dir }).catch((err) => {
      wlog.error('Failed to configure logger:', err)
    })
  }

  info(opts: IMessage) {
    wlog.info(opts.customString || formatLogString(opts))
  }

  async db({ message, action, oldValues, newValues, group, user, affected }: IActionOpts) {
    try {
      const doc = new Log({
        action,
        message,
        oldValues,
        newValues,
        group,
        user,
        affected
      })
      await doc.save()
    } catch (e: any) {
      wlog.error(`Error creating log document: ${e.message}`)
    }
  }

  error(opts: IMessage) {
    wlog.error(opts.customString || formatLogString(opts))
  }
}

export default Logger
