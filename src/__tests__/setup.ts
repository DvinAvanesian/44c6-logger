import mongoose from 'mongoose'
import Logger from '../'

const mongoURI = 'mongodb://localhost:27017/Test'

export const initDB = async () => {
  try {
    await mongoose.connect(mongoURI)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}

export const initLogger = () => {
  return new Logger({
    dir: 'logs'
  })
}
