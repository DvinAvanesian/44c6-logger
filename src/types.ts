import { Types } from 'mongoose'

export interface ILogger {
  info: (opts: IMessage) => void
  db: (opts: IActionOpts) => Promise<void>
  error: (opts: IGeneralOpts) => void
}

export interface IGeneralOpts {
  message: string
}

export interface IMessage extends IGeneralOpts {
  clientIP?: string | null
  user?: string
  url?: string
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
  customString?: string
}

export interface IActionOpts extends IGeneralOpts {
  oldValues?: string[]
  newValues?: string[]
  group?: string
  action: string
  user: Types.ObjectId
  affected?: Types.ObjectId[]
}

export interface ILoggerC {
  dir: string
}
