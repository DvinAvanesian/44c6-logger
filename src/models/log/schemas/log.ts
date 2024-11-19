import { Schema } from 'mongoose'
import { ILog } from '../types'

const LogSchema = new Schema<ILog>({
  action: {
    type: String,
    required: true
  },
  user: { type: Schema.Types.ObjectId, required: false },
  oldValues: {
    type: [{ type: String }],
    required: false
  },
  newValues: {
    type: [{ type: String }],
    required: false
  },
  message: { type: String, required: false },
  date: { type: Date, default: Date.now },
  group: { type: String, required: false, default: crypto.randomUUID() }, // update group specifier; for when multiple actions are done,
  affected: {
    type: [{ type: Schema.Types.ObjectId }],
    required: false
  },
  customFields: {
    type: Schema.Types.Mixed, // Allows any type, but we'll validate it as an object
    validate: {
      validator: function (value: Record<string, any>) {
        return value && typeof value === 'object' && !Array.isArray(value)
      },
      message: 'flexibleObject must be an object.'
    },
    required: false // Optional field, depending on your use case
  }
})

export default LogSchema
