import mongoose from 'mongoose'
import config from 'server/config'

export const connect = async () => {
  await mongoose.connect(config.get('database.url'), {
    useNewUrlParser: true,
  })
}

export const disconnect = async () => {
  await mongoose.disconnect()
}
