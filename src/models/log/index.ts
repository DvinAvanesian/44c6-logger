import mongoose from 'mongoose'
import type { ILog } from './types'
import LogSchema from './schemas/log'

const Log = mongoose.models.Log || mongoose.model<ILog>('Log', LogSchema)

export default Log

export type { ILog } from './types'
