import type { Document, Types } from 'mongoose'

interface ILog extends Document {
  action: string
  user: Types.ObjectId
  oldValues: string[]
  newValues: string[]
  message: string
  date: Date
  group: string
  affected: Types.ObjectId[]
  customFields: any
}

export type { ILog }
